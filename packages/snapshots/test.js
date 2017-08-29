var fs = require('fs');

const c = require('./comparer');
const l = require('./loader');

const doStuff = async() => {
  const a = await l(__dirname + '/face_ico.png')
  const b = await l(__dirname + '/face_ico_a.png');
  const d = c(a,b);
  
  d.pack().pipe(fs.createWriteStream('d.png'));
}
doStuff();