import { spawn } from "child_process";
var log = require('npmlog')

const getCwd = () => {
  const forwardSlashesAfterRoot = process
    .cwd()
    .substr(process.cwd().indexOf("e2eTests"))
    .match(/\//g);
  const numForwardSlashes = forwardSlashesAfterRoot
    ? forwardSlashesAfterRoot.length
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
      console.log(d.toString("utf8"));
      if (d.toString("utf8").includes("Loading dependency graph, done.")) {
        resolve(fructosePackager);
      }
    });

    fructosePackager.stderr.on("data", (d) => {
      console.log(d.toString("utf8"));
      // not sure why I need this, but it prevents the packager from not loading on warnings
    });

    fructosePackager.on("close", code => {
      if (code === 11) {
        console.log('Packager could not listen on port 8081');
        resolve("Packager can't listen on port 8081");
      }
      else if (code !== 0) {
        console.log(`packager did not exit correctly: code ${code}`)
        resolve(`closed with code ${code}`);
      }
    });
  });

export const kill = packager =>
  new Promise(resolve => {
    console.log('killing packager');
    packager.on("exit", () => {
      resolve();
    });
    packager.kill("SIGINT");
  });

export const startPackager = () => {
  console.log("starting packager");
  const fructosePackager = spawn("npm", ["run", "fructose-app"], { cwd: getCwd() });
  return handlePackager(fructosePackager);
};
