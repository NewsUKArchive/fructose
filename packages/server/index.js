const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const enableDestroy = require("server-destroy");
const log = require("../common/logger");

const handleConnectionType = (io, clientType) => {
  if (clientType.includes("tests")) {
    log.info(
      "server-index",
      "Fructose Test Client connected to Fructose Server"
    );
  } else if (clientType.includes("app")) {
    io.emit("fructose-app-loaded");
    log.info("server-index", "App connected to Fructose Server");
  } else if (clientType.includes("snapper")) {
    log.info("server-index", "Dextrose Client connected to Fructose Server");
  }
};
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
      log.info("server-index", "Fructose Server starting");
      this.app = express();
      this.server = http.Server(this.app);
      this.io = socketio(this.server);

      this.app.get("/", (req, res) => {
        res.sendFile(`${__dirname}/index.html`);
      });

      this.io.on("connection", socket => {
        if (socket.handshake.query.clientType) {
          handleConnectionType(this.io, socket.handshake.query.clientType);
        }

        socket.on("loadComponent", (componentName, props) => {
          this.io.emit("load-on-device", componentName, props);
        });

        socket.on("loadedOnDevice", () => {
          log.verbose("server-index", "Fructose App loaded component");
          this.io.emit("loaded");
        });

        socket.on("loaded-app-components", componentKeys => {
          log.verbose(
            "server-index",
            "Fructose App sending bundled components"
          );
          this.io.emit("bundled-components", componentKeys);
        });

        socket.on("getAppComponents", () => {
          this.io.emit("get-app-components");
        });

        socket.on("no-components", () => {
          throw new Error("No Components found in app");
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
