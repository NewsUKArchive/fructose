const fs = require("fs");

const c = require("./comparer");
const l = require("./loader");
const S = require("./snapper");

const dir = `${__dirname}/tmpSnaps`;

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const doStuff = async () => {
  const s = new S("ios");
  s.snap(`${__dirname}/tmpSnaps/snappy.png`);
  const a = await l(`${__dirname}/snappy.png`);
  const b = await l(`${__dirname}/tmpSnaps/snappy.png`);
  const d = c(a, b);

  d.pack().pipe(fs.createWriteStream(`${__dirname}/tmpSnaps/snappy-diff.png`));
};

doStuff();
