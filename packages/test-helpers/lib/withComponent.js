"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* globals describe beforeEach beforeAll afterAll */
var Client = require("hjkadshhjkl-client");

var _require = require("./setup"),
  setup = _require.setup,
  teardown = _require.teardown;

exports.default = function(config) {
  var first = true;

  beforeAll(async function() {
    if (first) {
      await setup(config);
      first = false;
    }
  }, 60000);

  afterAll(async function() {
    await teardown();
  });

  var withComponent = function withComponent(component, description, tests) {
    describe(description, function() {
      var hashed = JSON.stringify(component);
      var client = void 0;

      beforeAll(async function() {
        client = Client(7811);
      }, 60000);

      afterAll(async function() {
        return client.disconnect();
      });

      beforeEach(async function() {
        return client.loadComponent(hashed);
      });
      tests();
    });
  };

  global.withComponent = withComponent;
};
