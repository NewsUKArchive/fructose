const fs = require("fs");
const Jimp = require("jimp");
const imageDiff = require("./differ");
const imageLoader = require("./loader");
const Snapper = require("./snapper");

const mkdir = path => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

module.exports = class AppSnapper {
  constructor(platform, snapsPath) {
    this.platform = platform;
    this.snapper = new Snapper(platform);
    this.tempSnaps = `${snapsPath}/${platform}/tmp`;
    this.approvedSnaps = `${snapsPath}/${platform}`;
  }

  async snap(testname) {
    mkdir(this.approvedSnaps);
    mkdir(this.tempSnaps);
    this.snapper.snap(`${this.tempSnaps}/${testname}.png`);
    const image = await Jimp.read(`${this.tempSnaps}/${testname}.png`);
    return new Promise(resolve => {
      image.scale(0.37, (err, _image) => {
        _image.write(`${this.tempSnaps}/${testname}.png`, resolve);
      });
    });
  }

  async diff(testname) {
    const tempShot = await imageLoader(`${this.tempSnaps}/${testname}.png`);
    const approvedShot = await imageLoader(
      `${this.approvedSnaps}/${testname}.png`
    );
    const { diffCount } = imageDiff(approvedShot, tempShot);
    return diffCount;
  }

  exists(testname) {
    const exists = fs.existsSync(`${this.approvedSnaps}/${testname}.png`);
    return exists;
  }
};
