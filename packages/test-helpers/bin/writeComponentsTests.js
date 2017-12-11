#!/usr/bin/env node
const program = require("commander");
const fs = require("fs");

const version = require("../../../package").version;

program
  .version(version)
  .option(
    "-d, --directory <directory>",
    "Specify fructose root, default is [.fructose]"
  )
  .option(
    "-t, --test-entry-filename <testEntryFile>",
    "Specify the test entry file name, default is [components.test.js]"
  )
  .option(
    "-a, --app-entry-filename <appEntryFile>",
    "Specify the app entry file name, default is [components.js]"
  )
  .parse(process.argv);

const directory = program.directory ? program.directory : ".fructose";
const testEntryFilename = program.testEntryFilename
  ? program.testEntryFilename
  : "components.test.js";
const appEntryFilename = program.appEntryFilename
  ? program.appEntryFilename
  : "components.js";

const writeFile = (data, path) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });

const readTestComponents = () =>
  new Promise(resolve => {
    fs.readFile(
      `${directory}/${appEntryFilename}`,
      { encoding: "utf8" },
      (err, data) => {
        let tests;

        if (data) {
          tests = data
            .split("\n")
            .filter(line => line.trim().startsWith("require"))
            .join("\n");
        } else {
          tests = "";
        }

        writeFile(tests, `${directory}/${testEntryFilename}`).then(resolve);
      }
    );
  });

readTestComponents();
