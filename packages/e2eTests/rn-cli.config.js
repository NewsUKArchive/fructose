const blacklist = require('react-native/packager/blacklist');

module.exports = {
  getBlacklistRE: function() {
    return blacklist([
      /..\/app\/.*/, 
      /node_modules\/fructose-app\/node_modules\/react-native\/.*/
    ]);
  }
};