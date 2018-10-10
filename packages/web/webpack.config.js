const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const alias = {
  "react-native": "react-native-web"
};
const extensions = [".web.js", ".js", ".jsx", ".mjs"];
const mode = "production";

const babelConfig = [
  {
    test: /\.js$/,
    use: {
      loader: "babel-loader",
      options: {
        cacheDirectory: true,
        presets: ["react-native"],
        plugins: ["transform-regenerator", "react-native-web"]
      }
    }
  },
  {
    test: /\.ttf$/,
    loader: "url-loader",
    include: path.resolve(
      __dirname,
      "../node_modules/react-native-vector-icons"
    )
  },
  {
    include: /node_modules/,
    test: /\.mjs$/,
    type: "javascript/auto"
  },
  {
    test: /\.(gif|jpe?g|png|svg)$/,
    loader: "url-loader",
    query: {
      name: "images/[name]-[hash:16].[ext]"
    }
  }
];

module.exports = {
  mode,
  entry: ["babel-polyfill"],
  module: {
    rules: babelConfig
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "./index.ejs")
    }),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || "true"))
    })
  ],
  output: {
    filename: "test.bundle.js",
    path: path.resolve(__dirname, "./dist")
  },
  resolve: {
    alias,
    extensions
  }
};
