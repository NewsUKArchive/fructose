export default (loadComponents, platform) => {
  const componentsStore = {};
  const components = loadComponents();

  if (components) {
    components.forEach(parent => {
      const showcases = parent.default;
      const partiallyFilteredShowcases = showcases.children.filter(
        showcase => showcase.type === "story"
      );

      const filteredShowcases = partiallyFilteredShowcases.filter(showcase => {
        if (showcase.platform) {
          return showcase.platform.includes(platform);
        }
        return showcase;
      });

      filteredShowcases.forEach(showcase => {
        const showCaseName = `${showcases.name}/${showcase.name}`;
        componentsStore[showCaseName] = showcase.component;
      });
    });
  }

  return componentsStore;
};
