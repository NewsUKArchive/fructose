"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (loadStories) {
  var componentsStore = {};

  // create withComponent global that will run when withComponent is encountered
  // in a test file

  global.withComponent = function (component, description, callback) {
    componentsStore[JSON.stringify(component)] = component;
  };

  loadStories();

  //withComponent doesn't need to exist anymore
  global.withComponent = undefined;

  return componentsStore;
};