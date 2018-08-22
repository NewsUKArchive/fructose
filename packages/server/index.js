const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const enableDestroy = require("server-destroy");
const log = require("../common/logger");

const handleConnectionType = (io, clientType) => {
  if (clientType.includes("tests")) {
    log.info("server-index", "fructose client connected to Fructose Server");
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

        socket.on("fructose-app-ready", () => {
          this.io.emit("fructose-app-ready");
        });

        socket.on("load-component-in-app", componentName => {
          this.io.emit("load-component-in-app", componentName);
        });

        socket.on("component-loaded-in-app", () => {
          this.io.emit("component-loaded-in-app");
        });

        socket.on("send-loaded-app-components", componentKeys => {
          log.verbose(
            "server-index",
            "Fructose App sending bundled components"
          );
          this.io.emit("send-loaded-app-components", componentKeys);
        });

        socket.on("get-loaded-app-components", () => {
          this.io.emit("get-loaded-app-components");
        });

        socket.on("component-error", ({ component, error }) => {
          log.error("server-index", `Error found in component: ${component}`);
          log.error("server-index", error);
        });

        socket.on("component-not-found", component => {
          log.error(
            "server-index",
            `Error component not found in app: ${component}`
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
