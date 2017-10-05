const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const enableDestroy = require("server-destroy");
const log = require("../common/logger");

class FructoseServer {
  constructor(port) {
    this.app = null;
    this.server = null;
    this.io = null;
    this.i = null;
    this.port = port;
  }

  close() {
    return new Promise(resolve => {
      log.info("server-index", "Fructose server terminating");
      this.server.destroy(resolve);
    });
  }

  start() {
    return new Promise(resolve => {
      log.info("server-index", `Fructose Server starting`);
      this.app = express();
      this.server = http.Server(this.app);
      this.io = socketio(this.server);

      this.app.get("/", (req, res) => {
        res.sendFile(`${__dirname}/index.html`);
      });

      this.io.on("connection", socket => {
        log.info("server-index", `Fructose Server connected to socket`);
        socket.on("loadComponent", (componentName, props) => {
          log.verbose(
            "server-index",
            `Fructose Server emitting 'loadComponent' event with component: ${componentName}`
          );
          this.io.emit("load-on-device", componentName, props);
        });

        socket.on("loadedOnDevice", () => {
          log.verbose("server-index", "Fructose Server emitting 'loaded'");
          this.io.emit("loaded");
        });

        socket.on("debug", message => {
          log.info(
            "server-index",
            "Fructose server recieved debug message : ",
            message
          );
        });
      });

      this.server.listen(this.port, () => {
        enableDestroy(this.server);
        resolve();
      });
    });
  }
}

module.exports = { FructoseServer };
