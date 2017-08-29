var fs = require('fs'),
PNG = require('pngjs').PNG,
pixelmatch = require('pixelmatch');

module.exports = (img1, img2) => {
  var diff = new PNG({width: img1.width, height: img1.height});  
  pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {threshold: 0.1});
  return diff;
}
