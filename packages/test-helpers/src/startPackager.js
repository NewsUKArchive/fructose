import { spawn } from "child_process";
import EventEmitter from "events";
var log = require('npmlog')


export default class Packager {
  constructor () {
    this.fructosePackager = null;
    this.events  = new EventEmitter();
    this.dead = false;
  }

  packagerStarted() {
    return new Promise( (resolve) => {
      this.events.on('started', resolve);
    });
  }
  
  checkPackager () {
    if (this.fructosePackager === null) {
      throw Error("Packager is null");
    }
  } 

  async start () {
    log.verbose("starting packager");
    this.events.on("exit", () => {
      this.dead = true;
    });
    this.fructosePackager = spawn("npm", ["run", "fructose-app"], { cwd: getCwd() });
    this.handlePackager();
    await this.packagerStarted();
  }

  
  async kill () {
    this.checkPackager();
    new Promise(resolve => {
      if (this.dead === true){
        resolve();
      } else {
        console.log('killing packager')
        log.verbose('killing packager');
        this.fructosePackager.kill('SIGINT');
        resolve();
      }
    });
  }

  handlePackager () {
    this.fructosePackager.stdout.on("data", d => {
      console.log(d.toString('utf8'))
      log.verbose(d.toString("utf8"));
      if (d.toString("utf8").includes("Loading dependency graph, done.")) {
        this.events.emit('started');
      }
    });

    this.fructosePackager.stderr.on("data", (d) => {
      log.error(d.toString("utf8"));
    });

    this.fructosePackager.on("close", code => {
      if (code === 11) {
        log.error('Packager could not listen on port 8081');
        this.events.emit("exit");
      }
      else if (code !== 0) {
        log.error(`packager did not exit correctly: code ${code}`)
        this.events.emit("exit");
      }
    });
  }
}



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
