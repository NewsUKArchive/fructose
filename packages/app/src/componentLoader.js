export default loadComponents => {
  const componentsStore = {};

  // create withComponent global that will run when withComponent is encountered
  // in a test file
  
  global.withComponent = component => {
    const key = JSON.stringify(component).replace(/"\$\$typeof":.*?,/g, "");
    componentsStore[key] = component;
  };

  loadComponents();

  // withComponent doesn't need to exist anymore
  global.withComponent = undefined;

  return componentsStore;
};
