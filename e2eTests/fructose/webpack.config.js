/* eslint-disable global-require */
const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: {
    app: path.join(__dirname, "./index.web.js")
  },
  resolve: {
    
    extensions: ["showcase.js", ".web.js", ".js", ".ios.js", ".android.js"],
    mainFields: ["module", "main"],
    plugins: [
      // Use the DLL in development.
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require("../dist/public/vendor-manifest.json") // eslint-disable-line import/no-unresolved
      })
    ]
  },
  node: {
    fs: "empty",
    net: "empty"
  }
};
