const log = require("../common/logger");

class FructoseClient {
  constructor(socket) {
    this.socket = socket;
  }

  loadComponent(component, props) {
    return new Promise(resolve => {
      log.info("client", `tests emitting 'loadComponent' with : ${component}`);
      this.socket.emit("loadComponent", component, props);

      this.socket.on("loaded", () => {
        log.info("client", `tests recieved component loaded" ${component}`);
        this.socket.removeListener("loaded");
        resolve("component loaded");
      });
    });
  }
}

module.exports = FructoseClient;
