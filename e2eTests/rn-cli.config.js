const blacklist = require("react-native/packager/blacklist");

module.exports = {
  getBlacklistRE() {
    return blacklist([
      /\/node_modules\/jest-haste-map\/node_modules\/.*/,
      /\/node_modules\/react-native\/node_modules\/fb-watchman\/.*/,
      /\/node_modules\/@times-components\/fructose\/node_modules\/react-native\/.*/,
      /\/node_modules\/@times-components\/fructose\/e2eTests\/node_modules\/react-native\/.*/
    ]);
  }
};
