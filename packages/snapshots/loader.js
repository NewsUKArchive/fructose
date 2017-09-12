const fs = require("fs");
const PNG = require("pngjs").PNG;

module.exports = imgPath =>
  new Promise(resolve => {
    // eslint-disable-next-line no-use-before-define
    const done = () => resolve(image);
    const image = fs
      .createReadStream(imgPath)
      .pipe(new PNG())
      .on("parsed", done);
  });
