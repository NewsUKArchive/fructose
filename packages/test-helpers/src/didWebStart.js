import request from "request";
import EventEmitter from "events";

const isWebStarted = port =>
  new Promise(resolve => {
    request(
      {
        uri: `http://localhost:${port}`,
        timeout: 1000
      },
      error => {
        if (error) {
          resolve(false);
        } else {
          resolve(true);
        }
      }
    );
  });

export default (port, timeout) =>
  new Promise(resolve => {
    const intervalLength = 1100;
    let intervals = timeout / intervalLength;
    const event = new EventEmitter();
    event.on("taken", taken => {
      resolve(taken);
    });
    let taken;
    const interval = setInterval(async () => {
      intervals -= 1;
      taken = await isWebStarted(port, timeout);
      if (taken) {
        event.emit("taken", true);
        clearInterval(interval);
      }
      if (!taken && intervals === 0) {
        event.emit("taken", false);
        clearInterval(interval);
      }
    }, intervalLength);
  });
