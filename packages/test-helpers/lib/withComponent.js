"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var Client = require('fructose-client');

  var _require = require("./setup"),
      setup = _require.setup,
      teardown = _require.teardown;

  var first = true;

  beforeAll(async function () {
    if (first) {
      await setup();
      first = false;
    }
  }, 60000);

  afterAll(async function () {
    await teardown();
  });

  var withComponent = function withComponent(component, description, tests) {
    describe(description, function () {
      var hashed = JSON.stringify(component);
      var client;

      beforeAll(async function () {
        client = Client(7811);
      }, 60000);

      afterAll(async function () {
        await client.disconnect();
      });

      beforeEach(async function () {
        return await client.loadComponent(hashed);
      });
      tests();
    });
  };

  global.withComponent = withComponent;
};