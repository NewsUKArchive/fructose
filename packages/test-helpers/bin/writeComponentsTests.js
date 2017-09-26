#!/usr/bin/env node

const fs = require("fs");

const writeFile = (data, path) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, err => {
      if (err) {
        reject(err);
      }
      resolve("wrote tests to file");
    });
  });

const readTestComponents = () =>
  new Promise(resolve => {
    fs.readFile(
      ".fructose/components.js",
      { encoding: "utf8" },
      (err, data) => {
        const tests = data
          .split("\n")
          .filter(line => line.trim().startsWith("require"))
          .join("\n");
        writeFile(tests, ".fructose/components.test.js").then(resolve);
      }
    );
  });

readTestComponents();
