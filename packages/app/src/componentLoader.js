const isValidShowcase = parent => {
  if (!parent) return false;
  if (!parent.default) return false;
  if (!parent.default.children) return false;
  return true;
};
export default (loadComponents, platform) => {
  const componentsStore = {};
  const components = loadComponents();

  if (components) {
    components.forEach(parent => {
      if (isValidShowcase(parent)) {
        const showcases = parent.default;
        const partiallyFilteredShowcases = showcases.children.filter(
          showcase => showcase.type === "story"
        );

        const filteredShowcases = partiallyFilteredShowcases.filter(
          showcase => {
            if (showcase.platform) {
              return showcase.platform.includes(platform);
            }
            return showcase;
          }
        );

        filteredShowcases.forEach(showcase => {
          const nameWithoutSlash = showcases.name.split("/")[0];
          const showCaseName = `${nameWithoutSlash}/${showcase.name}`;
          componentsStore[showCaseName] = showcase.component;
        });
      }
    });
  }
  console.log(componentsStore);
  return componentsStore;
};
