export default loadComponents => {
  const componentsStore = {};
  const components = loadComponents();

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

  return componentsStore;
};
