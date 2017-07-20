// const test = require("tape");

// test("fakeCliArgs adds the --reuse flag to process.argv", t => {
//   t.plan(2);
//   const beforeArgv = process.argv.slice();
//   require("./fakeCliArgs.js");

//   t.equal(
//     process.argv.length,
//     beforeArgv.length + 1,
//     "process.argv has one new item"
//   );
//   t.equal(process.argv.pop(), "--reuse", "the added item is a '--reuse' flag");
//   t.end();
// });
