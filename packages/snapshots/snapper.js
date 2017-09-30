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
    console.log(`SETTING PLATFORM ${this.platform}`);
  }

  snap(outpath) {
    if (typeof outpath !== "string") {
      throw Error("path must be string");
    }

    console.log("------------------------------------");
    console.log("SNAPPER : TAKING SCREENSHOT");
    console.log(outpath, this.platform);
    console.log("------------------------------------");
    spawnSync("npx", ["osnap", this.platform, "-f", outpath]);
  }
};
