"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startPackager = exports.kill = undefined;

var _child_process = require("child_process");

var forwardSlasesAfterRoot = process.cwd().substr(process.cwd().indexOf("e2eTests")).match(/\//g);
var numForwardSlashes = forwardSlasesAfterRoot ? forwardSlasesAfterRoot.length : 0;

var cwd = process.cwd();
for (var i = 0; i < numForwardSlashes; i++) {
  cwd = cwd + "/..";
}

var handlePackager = function handlePackager(fructosePackager) {
  return new Promise(function (resolve, reject) {
    fructosePackager.stdout.on("data", function (d) {
      if (d.toString("utf8").includes("Loading dependency graph, done.")) {
        resolve(fructosePackager);
      }
    });

    fructosePackager.stderr.on("data", function (d) {
      //not sure why I need this, but it prevents the packager from not loading on warnings
    });

    fructosePackager.on("close", function (code) {
      if (code != 0) {
        reject("closed with code " + code);
      }
    });
  });
};

var kill = exports.kill = function kill(packager) {
  return new Promise(function (resolve) {
    packager.on("exit", function () {
      resolve();
    });
    packager.kill("SIGINT");
  });
};

var startPackager = exports.startPackager = function startPackager() {
  var fructosePackager = (0, _child_process.spawn)("npm", ["run", "fructose-app"], { cwd: cwd });
  return handlePackager(fructosePackager);
};