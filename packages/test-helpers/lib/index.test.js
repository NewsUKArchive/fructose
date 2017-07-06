"use strict";

var _typeof = typeof Symbol === "function" &&
  typeof Symbol.iterator === "symbol"
  ? function(obj) {
      return typeof obj;
    }
  : function(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };

var test = require("tape");
var index = require("./index").default;

test("index exports function as default", function(t) {
  t.plan(1);
  t.equal(
    typeof index === "undefined" ? "undefined" : _typeof(index),
    "function",
    "index exports function"
  );
  t.end();
});
