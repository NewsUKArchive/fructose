const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const enableDestroy = require("server-destroy");
var log = require('npmlog')

class FructoseServer {
  constructor(port) {
    this.app = null;
    this.server = null;
    this.io = null;
    this.i = null;
    this.port = port;
  }

  close() {
    this.server.destroy();
  }

  start() {
    return new Promise(resolve => {
      this.app = express();
      this.server = http.Server(this.app);
      this.io = socketio(this.server);

      this.app.get("/", (req, res) => {
        res.sendFile(`${__dirname}/index.html`);
      });

      this.io.on("connection", socket => {
        console.log('yay')
        log.verbose(`connected to socket: ${socket}`);
        socket.on("loadComponent", (componentName, props) => {
          console.log('doing')
          log.verbose(`emitting loadComponent event to device with component: ${componentName}`);
          this.io.emit("load-on-device", componentName, props);
        });

        socket.on("loadedOnDevice", () => {
          log.verbose('loaded component on device');
          this.io.emit("loaded");
        });

        socket.on("debug", r => {
          log(r);
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
