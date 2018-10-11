/* eslint-disable global-require */
const path = require("path");

module.exports = {
  entry: [path.join(__dirname, "./index.web.js")],
  node: {
    fs: "empty",
    net: "empty"
  }
};
