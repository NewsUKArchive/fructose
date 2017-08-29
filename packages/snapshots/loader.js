var fs = require('fs');
const PNG = require('pngjs').PNG;

module.exports = (imgPath) => {
  return new Promise( (resolve) => {
    console.log(imgPath)
    const done = () => resolve(img1);
    const img1 = fs.createReadStream(imgPath).pipe(new PNG()).on('parsed', done);
  });
}