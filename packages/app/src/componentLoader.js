import rnComponentKey from "../../common/rnComponentKey";

export default loadComponents => {
  const componentsStore = {};

  class StoryLoader {
    constructor(name) {
      this.name = name;
    }

    add(name, componentCreator) {
      componentsStore[`${this.name}${name}`] = () => componentCreator();
      return this;
    }

    addDecorator() {
      return this;
    }
  }

  // create withComponent global that will run when withComponent is encountered
  // in a test file

  global.withComponent = component => {
    const key = rnComponentKey(component);
    componentsStore[key] = () => component;
  };

  global.storiesOf = name => {
    const loader = new StoryLoader(name, componentsStore);
    return loader;
  };

  const components = loadComponents();

  // if components exist .showcase files are being used
  if (components) {
    components.forEach(parent => {
      const showcases = parent.default;
      const filteredChildren = showcases.children.filter(
        showcase => showcase.type === "story"
      );

      filteredChildren.forEach(showcase => {
        const showCaseName = `${showcases.name}/${showcase.name}`;
        componentsStore[showCaseName] = showcase.component;
      });
    });
  }

  // withComponent doesn't need to exist anymore
  global.withComponent = undefined;
  return componentsStore;
};
