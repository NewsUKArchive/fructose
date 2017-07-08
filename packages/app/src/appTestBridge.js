export default (events, socket) => {
  socket.on("load-on-device", componentName =>
    events.emit("load", componentName)
  );
  events.on("loaded", () => socket.emit("loadedOnDevice"));
};
