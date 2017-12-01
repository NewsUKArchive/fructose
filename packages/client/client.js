const log = require("../common/logger");

class FructoseClient {
  constructor(socket) {
    this.socket = socket;
  }

  loadComponent(component, props) {
    return new Promise(resolve => {
      log.verbose(
        "client",
        `tests emitting 'loadComponent' with : ${component}`
      );
      this.socket.emit("loadComponent", component, props);
      this.socket.on("loaded", () => {
        log.verbose("client", `tests recieved component loaded" ${component}`);
        resolve("component loaded");
      });
    });
  }

  disconnect() {
    log.info("client", `disconnecting client`);
    this.socket.disconnect();
  }
}

module.exports = FructoseClient;
