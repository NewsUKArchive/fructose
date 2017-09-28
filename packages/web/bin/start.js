#!/usr/bin/env node
const program = require("commander");

program
  .version("0.0.1")
  .option("-d, --build-dir [directory]", "specify the build directory")
  .parse(process.argv);

console.log(program.buildDir);
if (!program.buildDir)
  throw new Error(
    "you must define the build directory: --build-dir [directory]"
  );

const merge = require("webpack-merge");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const path = require("path");
const upperConfig = require("../../../../../../.fructose/webpack.config.js"); // eslint-disable-line import/no-unresolved
const config = require("../webpack.config.js")(
  path.join(process.cwd(), program.buildDir)
);

const mergedConfig = merge(upperConfig, config);
const configDir = path.join(process.cwd(), ".fructose");
const fs = require("fs");

function getHeadHtml(configDirPath) {
  const headHtmlPath = path.resolve(configDirPath, "head.html");
  const fallbackHtmlPath = path.resolve(configDirPath, "head.html");
  let headHtml = "";
  if (fs.existsSync(headHtmlPath)) {
    headHtml = fs.readFileSync(headHtmlPath, "utf8");
  } else if (fs.existsSync(fallbackHtmlPath)) {
    headHtml = fs.readFileSync(fallbackHtmlPath, "utf8");
  }
  return headHtml;
}

const headHtml = getHeadHtml(configDir);

const ejsTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>React Native Web</title>
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
    <meta name="viewport" content="width=device-width, initial-scale=0.9">
    ${headHtml}
    </head>
  <body>
    <div id="react-root"></div>
  </body>
</html>
`;

fs.writeFileSync(path.join(__dirname, "../index.ejs"), ejsTemplate);

new WebpackDevServer(webpack(mergedConfig), {
  publicPath: mergedConfig.output.publicPath,
  contentBase: mergedConfig.output.path,
  hot: false,
  historyApiFallback: true
}).listen(
  3000,
  "localhost",
  err =>
    err ? console.log(err) : console.log("Listening at http://localhost:3000/")
);
