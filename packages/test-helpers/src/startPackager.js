import { spawn } from "child_process";

const getCwd = () => {
  const forwardSlasesAfterRoot = process
    .cwd()
    .substr(process.cwd().indexOf("e2eTests"))
    .match(/\//g);
  const numForwardSlashes = forwardSlasesAfterRoot
    ? forwardSlasesAfterRoot.length
    : 0;

  let cwd = process.cwd();
  for (let i = 0; i < numForwardSlashes; i += 1) {
    cwd += "/..";
  }
  return cwd;
}

const handlePackager = fructosePackager =>
  new Promise((resolve, reject) => {
    fructosePackager.stdout.on("data", d => {
      if (d.toString("utf8").includes("Loading dependency graph, done.")) {
        resolve(fructosePackager);
      }
    });

    fructosePackager.stderr.on("data", () => {
      // not sure why I need this, but it prevents the packager from not loading on warnings
    });

    fructosePackager.on("close", code => {
      if (code !== 0) {
        reject(`closed with code ${code}`);
      }
    });
  });

export const kill = packager =>
  new Promise(resolve => {
    packager.on("exit", () => {
      resolve();
    });
    packager.kill("SIGINT");
  });

export const startPackager = () => {
  const fructosePackager = spawn("npm", ["run", "fructose-app"], { cwd: getCwd() });
  return handlePackager(fructosePackager);
};
