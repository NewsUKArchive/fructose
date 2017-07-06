class FructoseClient {
  constructor(socket) {
    this.socket = socket;
  }

  loadComponent(component, props) {
    return new Promise(resolve => {
      this.socket.emit("loadComponent", component, props);
      this.socket.on("loaded", () => {
        resolve("component loaded");
      });
    });
  }

  disconnect() {
    this.socket.disconnect();
  }
}

module.exports = FructoseClient;
