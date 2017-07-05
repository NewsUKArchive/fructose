export default class FunctionalRCT {
  constructor(events, socket) {
    this.socket = socket;
    this.events = events;
    this.events.on("loaded", () => {});

    this.socket.on("load-on-device", (componentName, props) => {
      this.loadComponent(componentName, {});
      this.socket.emit("loadedOnDevice");
    });

    this.components = {};
  }

  addComponents = (components) => {
    Object.assign(this.components, components);
  }

  addComponent = (name, component) => {
    this.components[name] = component;
  };

  loadComponent = (name) => {
    this.events.emit("load", name);
  };

  getProps = () => {
    return {
      events: this.events,
      components: this.components
    };
  }
}
