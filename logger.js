const log = require("npmlog");

module.exports = {
  info: (file, textToLog) => {
    log.stream = process.stdout;
    log.info(`[${file}] :`, textToLog);
  },
  error: (file, textToError) => {
    log.stream = process.stderr;
    log.error(`[${file}] :`, textToError);
  }
};
