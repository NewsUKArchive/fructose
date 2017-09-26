/* eslint-disable */
const enableOfflinePlugin = false;

const __DEV__ = process.env.NODE_ENV === "development";
const __OFFLINE__ = enableOfflinePlugin && !__DEV__;

const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const config = require("./shared.webpack.config.js");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const OfflinePlugin = require("offline-plugin");

const plugins = [
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    __DEV__,
    __OFFLINE__
  }),
  new HtmlWebpackPlugin({
    filename: "index.html",
    template: path.join(__dirname, "./index.ejs")
  }),
  // Split out any remaining node modules
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor/lib",
    minChunks: module =>
      module.context && module.context.indexOf("node_modules/") !== -1
  }),

  ...(__DEV__
    ? []
    : [
        ...config.productionPlugins

        // Add any app-specific production plugins here.
      ])
];

// If offline plugin is enabled, it has to come last.
if (__OFFLINE__) plugins.push(new OfflinePlugin());

module.exports = (outputPath) => ({
  module: {
    loaders: [
      {
        test: /\.js$/,
        // TODO: Set up react-hot-loader during development.
        loaders: ["babel-loader?cacheDirectory=true"],
        exclude: /node_modules\/react-native-web\//
      },
      ...config.loaders
    ]
  },
  output: {
    path: outputPath,
    filename: "javascript/[name]-[hash:16].js",
    publicPath: "/"
  },
  plugins: plugins,
  resolve: {
    alias: {
      "react-native": "react-native-web"
    },
    extensions: [".web.js", ".js", ".json"]
  }
});
