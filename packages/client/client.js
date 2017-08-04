const log = require("npmlog");

class FructoseClient {
  constructor(socket) {
    this.socket = socket;
  }

  loadComponent(component, props) {
    return new Promise(resolve => {
      log.verbose(`client: loadComponent ${component}`);
      this.socket.emit("loadComponent", component, props);
      this.socket.on("loaded", () => {
        log.verbose(`client: component loaded" ${component}`);
        resolve("component loaded");
      });
    });
  }

  disconnect() {
    log.verbose(`disconnecting client`);
    this.socket.disconnect();
  }
}

module.exports = FructoseClient;
