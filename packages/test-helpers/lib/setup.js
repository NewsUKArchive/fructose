'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.teardown = exports.setup = undefined;

require('babel-polyfill');

require('./fakeCliArgs');

var _detox = require('detox');

var _detox2 = _interopRequireDefault(_detox);

var _hjkadshhjklServer = require('hjkadshhjkl-server');

var _child_process = require('child_process');

var _startPackager = require('./startPackager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The paths in this need to be relative to <rootDir>/packages/component
// the order is important - this file must run before we import detox
var detoxConfig = {
  configurations: {
    "ios.sim.debug": {
      binaryPath: "",
      type: "ios.simulator",
      name: "iPhone 7"
    }
  }
};
var fructosePackager;
var server;

var setup = exports.setup = async function setup() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  fructosePackager = await (0, _startPackager.startPackager)();
  server = new _hjkadshhjklServer.FructoseServer(7811);
  await server.start();
  if (config.binaryPath) {
    detoxConfig.configurations["ios.sim.debug"].binaryPath = config.binaryPath;
  } else {
    throw "No binaryPath was provided, you need to pass in a config object";
  }
  await _detox2.default.init(detoxConfig);
};

var teardown = exports.teardown = async function teardown() {
  await (0, _startPackager.kill)(fructosePackager);
  server.close();
  await _detox2.default.cleanup();
};