/* globals beforeAll afterAll*/
import fructose from "@times-components/fructose/setup";
import detox from "detox";
import webdriverio from "webdriverio";
import { spawn } from "child_process";
import config from "../package";

let appium;
fructose.withComponent();

beforeAll(async () => {
  await fructose.hooks.setup();
  if (process.env.ANDROID) {
    appium = await new Promise(resolve => {
      const proc = spawn("appium");
      proc.stdout.on("data", d => {
        if (d.toString("utf8").includes("started on 0.0.0.0:4723")) {
          console.log(d.toString("utf8"));
          resolve(proc);
        }
      });
    });
    const options = {
      desiredCapabilities: {
        platformName: "Android",
        platformVersion: "7.0",
        deviceName: "Android Emulator",
        app:
          "/Users/rohanjanjua/workspace/News/fructose/e2eTests/android/app/build/outputs/apk/app-debug.apk"
      },
      host: "localhost",
      port: 4723
    };
    global.driver = webdriverio.remote(options);
    await global.driver.init();
    await global.driver.waitForVisible('//*[@text="Fructose"]', 45000);
  } else {
    await detox.init(config.detox);
  }
}, 180000);

afterAll(async () => {
  await detox.cleanup();
  await fructose.hooks.cleanup();
  if (process.env.ANDROID) {
    appium.kill();
  }
});
