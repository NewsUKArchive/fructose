export default (events, socket) => {
  socket.on("load-on-device", componentName =>
    events.emit("load", componentName)
  );
  events.on("loaded", () => socket.emit("loadedOnDevice"));

  socket.on("get-app-components", () => {
    events.emit("publish-component-store");
  });

  events.on("loaded-app-components", loadedComponents =>
    socket.emit("loaded-app-components", loadedComponents)
  );

  events.on("error-loading-component", () => {
    socket.emit("error-loading-component");
  });
};
