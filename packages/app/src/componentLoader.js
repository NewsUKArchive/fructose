const isValidShowcase = parent => {
  if (!parent) return false;
  if (!parent.default) return false;
  if (!parent.default.children) return false;
  return true;
};

const filterShowcases = (showcases, platform) =>
  showcases.children
    .filter(showcase => showcase.type === "story")
    .filter(showcase => !showcase.fructoseIgnoredStory)
    .filter(showcase => {
      if (showcase.platform) {
        return showcase.platform.includes(platform);
      }
      return showcase;
    });

export default (loadComponents, platform) => {
  const componentsStore = {};
  const components = loadComponents();

  if (components) {
    components.forEach(parent => {
      if (isValidShowcase(parent)) {
        const showcases = parent.default;

        const filteredShowcases = filterShowcases(showcases, platform);

        filteredShowcases.forEach(showcase => {
          const showCaseName = `${showcases.name}:${
            showcase.name
          }`.toLowerCase();
          componentsStore[showCaseName] = showcase.component;
        });
      }
    });
  }
  return componentsStore;
};
