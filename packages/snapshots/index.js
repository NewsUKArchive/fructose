const fs = require("fs");
const Jimp = require("jimp");
// const imageDiff = require("./differ");
// const imageLoader = require("./loader");
const Snapper = require("./snapper");
const BlinkDiff = require("blink-diff");

const mkdir = path => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

module.exports = class AppSnapper {
  constructor(platform, snapsPath) {
    this.platform = platform;
    this.snapper = new Snapper(platform);
    this.tempSnaps = `${snapsPath}/__tmpSnapshots__`;
    this.diffSnaps = `${snapsPath}/__diffshots__`;
    this.approvedSnaps = `${snapsPath}`;
    mkdir(this.approvedSnaps);
    mkdir(this.tempSnaps);
    mkdir(this.diffSnaps);
  }

  async snap(testname) {
    console.warn("snap!");
    this.snapper.snap(`${this.tempSnaps}/${testname}.png`);
    console.warn("snap2!");
    const image = await Jimp.read(`${this.tempSnaps}/${testname}.png`);
    return new Promise(resolve => {
      image.scale(0.37, (err, _image) => {
        _image.write(`${this.tempSnaps}/${testname}.png`, resolve);
      });
    });
    // .then(image => {
    //   console.warn('snap3!');
    //   return new Promise (resolve => {
    //     image.scale(0.33, (err, image) => {
    //       image.write("philosophers-stone3.png", resolve);
    //     });
    //   });
    // }).catch((err) => {
    //   console.warn('snaperror!', err);
    // });
  }

  async diff(testname) {
    const diff = new BlinkDiff({
      imageAPath: `${this.tempSnaps}/${testname}.png`, // Use file-path
      imageBPath: `${this.approvedSnaps}/${testname}.png`,

      thresholdType: BlinkDiff.THRESHOLD_PERCENT,
      threshold: 0.01, // 1% threshold

      imageOutputPath: `${this.diffSnaps}/${testname}.png`
    });
    console.warn("hello");
    const diffs = await new Promise(resolve => {
      diff.run((error, result) => {
        if (error) {
          throw error;
        } else {
          console.log(diff.hasPassed(result.code) ? "Passed" : "Failed");
          console.log(`Found ${result.differences} differences.`);
          resolve(result.differences);
        }
      });
    });

    return diffs;

    // const tempShot = await imageLoader(`${this.tempSnaps}/${testname}.png`);
    // const approvedShot = await imageLoader(`${this.approvedSnaps}/${testname}.png`);
    // const {diffCount, diff} = imageDiff(approvedShot, tempShot);
    // if (diffCount > 0 ){
    //   diff.pack().pipe(fs.createWriteStream(`${this.diffSnaps}/${testname}.png`));
    // }
    // console.warn("diffcount", diffCount);
    // return diffCount;
  }

  exists(testname) {
    const exists = fs.existsSync(`${this.approvedSnaps}/${testname}.png`);
    return exists;
  }
};
