import { spawn } from "child_process";
import EventEmitter from "events";

const log = require("../../../logger");

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
};

export default class Packager {
  constructor() {
    this.fructosePackager = null;
    this.events = new EventEmitter();
    this.dead = false;
  }

  packagerStarted() {
    return new Promise(resolve => {
      this.events.on("started", resolve);
    });
  }

  checkPackager() {
    if (this.fructosePackager === null) {
      throw Error("Packager is null");
    }
  }

  async start() {
    log.info("startPackager", "starting Packager");
    this.events.on("exit", () => {
      this.dead = true;
    });
    this.fructosePackager = spawn("npm", ["run", "fructose-app"], {
      cwd: getCwd()
    });
    this.handlePackager();
    await this.packagerStarted();
  }

  async kill() {
    this.checkPackager();
    return new Promise(resolve => {
      if (this.dead === true) {
        resolve();
      } else {
        log.info("startPackager", "killing Packager");
        this.fructosePackager.kill("SIGINT");
        resolve();
      }
    });
  }

  handlePackager() {
    this.fructosePackager.stdout.on("data", d => {
      log.verbose("startPackager", d.toString("utf8"));
      if (d.toString("utf8").includes("Loading dependency graph, done.")) {
        this.events.emit("started");
      }
    });

    this.fructosePackager.stderr.on("data", d => {
      log.error("startPackager", d.toString("utf8"));
    });

    this.fructosePackager.on("close", code => {
      if (code === 11) {
        log.error("startPackager", "Packager could not listen on port 8081");
        this.events.emit("exit");
      } else if (code !== 0) {
        log.error(
          "startPackager",
          `packager did not exit correctly: code ${code}`
        );
        this.events.emit("exit");
      }
    });
  }
}
