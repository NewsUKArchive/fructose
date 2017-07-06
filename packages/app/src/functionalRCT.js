export default function FunctionalRCT(events, socket) {
  events.on("loaded", () => {});

  const loadComponent = name => events.emit("load", name);

  socket.on("load-on-device", componentName => {
    loadComponent(componentName, {});
    socket.emit("loadedOnDevice");
  });

  const components = {};

  return {
    components: () => components,
    addComponents: c => Object.assign(components, c),
    getProps: () => ({
      events,
      components
    }),
    loadComponent
  };
}
