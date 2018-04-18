#!/usr/bin/env node

const fs = require("fs");
const ngrok = require("ngrok");
const path = require("path");
const log = require("../../common/logger");

function serverUrlString(url) {
  const json = {
    "server-url": url
  };
  return `${JSON.stringify(json)}\n`;
}

function writeProperties(contents) {
  fs.writeFile(
    path.join(__dirname, "./../../app/src/properties.json"),
    contents,
    err => {
      if (err) throw err;
      log.info("createTunnel", "Properties file updated");
    }
  );
}

if (process.env.LOCAL) {
  writeProperties(serverUrlString("http://localhost:7811"));
} else {
  ngrok.connect(7811, (err, url) => {
    if (err) throw err;
    writeProperties(serverUrlString(url));
  });
}
