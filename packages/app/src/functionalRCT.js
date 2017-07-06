export default class FunctionalRCT {
  constructor(events, socket) {
    this.socket = socket;
    this.events = events;
    this.events.on("loaded", () => {});

    this.socket.on("load-on-device", componentName => {
      this.loadComponent(componentName, {});
      this.socket.emit("loadedOnDevice");
    });

    this.addComponents.bind(this);
    this.addComponent.bind(this);
    this.loadComponent.bind(this);
    this.getProps.bind(this);

    this.components = {};
  }

  addComponents(components) {
    Object.assign(this.components, components);
  }

  addComponent(name, component) {
    this.components[name] = component;
  }

  loadComponent(name) {
    this.events.emit("load", name);
  }

  getProps() {
    return {
      events: this.events,
      components: this.components
    };
  }
}
