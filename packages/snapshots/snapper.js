const { spawnSync } = require("child_process");

module.exports = class Snapper {
  constructor(platform) {
    this.setPlatform(platform);
  }

  setPlatform(platform) {
    if (!(platform === "ios" || platform === "android")) {
      throw Error(`platform ${platform} is not either ios or android`);
    }
    this.platform = platform;
  }

  snap(outpath) {
    if (typeof outpath !== "string") {
      throw Error("path must be string");
    }
    spawnSync("npx", ["osnap", this.platform, "-f", outpath]);
  }
};
