const log = require("../common/logger");

class FructoseClient {
  constructor(socketClient) {
    this.socket = socketClient;
  }

  waitForApp() {
    return new Promise(resolve => {
      log.verbose("fructose Client", "waiting for app to boot");
      this.socket.on("fructose-app-ready", () => {
        log.info("fructose Client", "fructose app Loaded 💯");
        resolve();
      });
    });
  }

  getLoadedComponents() {
    return new Promise(resolve => {
      this.socket.on("bundled-components", componentList => {
        resolve(componentList);
      });
      log.verbose("fructose Client", "getting loaded app components");
      this.socket.emit("get-loaded-app-components");
    });
  }

  loadComponent(component) {
    return new Promise(resolve => {
      this.socket.on("loaded", () => {
        log.info("fructose client", `component loaded: ${component}`);
        this.socket.removeListener("loaded");
        resolve("component loaded");
      });

      log.info("fructose client", `loading component: ${component}`);
      this.socket.emit("loadComponent", component);
    });
  }

  disconnect() {
    this.socket.disconnect();
    log.info("fructose client", "client terminated");
  }
}

module.exports = FructoseClient;
