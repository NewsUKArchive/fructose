const { spawnSync } = require('child_process');

class Snapper {
  constructor(platform) {
    setPlatform(platform); 
  }

  setPlatform(platform) {
    const p = platform
    if (platform !== "ios" || platform !== "android"){
      throw Error("platform "+ platform + "is not either ios or android");
    }
  }

  snap(outname) {
    if(typeof(outpath) !== 'string'){
      throw Error('path must be string')
    }
    spawnSync('npx', ['osnap', platform, '-f', outname]);
  }
}