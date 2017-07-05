export default (loadComponents) => {
  const componentsStore = {};

  // create withComponent global that will run when withComponent is encountered
  // in a test file

  global.withComponent = (component,description, callback) => {
    componentsStore[JSON.stringify(component)] = component;
  }

  loadComponents();

  //withComponent doesn't need to exist anymore
  global.withComponent = undefined;

  return componentsStore;
}
