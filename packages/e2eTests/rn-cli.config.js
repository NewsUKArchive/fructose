const blacklist = require("react-native/packager/blacklist");

module.exports = {
  getBlacklistRE: function() {
    return blacklist([
      /..\/app\/.*/,
      /node_modules\/fructose-app\/node_modules\/react-native\/.*/,
      /\/node_modules\/jest-haste-map\/node_modules\/sane\/node_modules\/fb-watchman\/package.json/
    ]);
  }
};
