export default (events, socket) => {
  socket.on("load-on-device", componentName =>
    events.emit("load", componentName)
  );
  events.on("loaded", () => socket.emit("loadedOnDevice"));

  socket.on("get-loaded-app-components", () =>
    events.emit("publish-component-store")
  );
};
