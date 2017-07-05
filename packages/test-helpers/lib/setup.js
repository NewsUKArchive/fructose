'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.teardown = exports.setup = undefined;

require('babel-polyfill');

require('./fakeCliArgs');

var _detox = require('detox');

var _detox2 = _interopRequireDefault(_detox);

var _fructoseServer = require('fructose-server');

var _fructoseClient = require('fructose-client');

var _fructoseClient2 = _interopRequireDefault(_fructoseClient);

var _child_process = require('child_process');

var _startPackager = require('./startPackager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The paths in this need to be relative to <rootDir>/packages/component
var detoxConfig = {
  configurations: {
    "ios.sim.debug": {
      binaryPath: "ios/build/Build/Products/Debug-iphonesimulator/e2eTests.app",
      type: "ios.simulator",
      name: "iPhone 7"
    }
  }
}; // the order is important - this file must run before we import detox

var fructosePackager;
var server;

var setup = exports.setup = async function setup() {
  fructosePackager = await (0, _startPackager.startPackager)();
  server = new _fructoseServer.FructoseServer(7811);
  await server.start();
  await _detox2.default.init(detoxConfig);
};

var teardown = exports.teardown = async function teardown() {
  await (0, _startPackager.kill)(fructosePackager);
  server.close();
  await _detox2.default.cleanup();
};