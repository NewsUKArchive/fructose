/* globals beforeAll jasmine afterAll */
import fructose from "@times-components/fructose/setup";
import detox from "detox";
import webdriverio from "webdriverio";
import { spawn } from "child_process";
import { Chromeless } from "chromeless";
import path from "path";
import config from "../package";

const createPath = text => {
  const png = String.join(text, ".png");
  const removeWhitespace = png.replace(/ /g, "_");
  return path.join(__dirname, "__failures__", removeWhitespace);
};

const reporter = {
  specDone: async testResult => {
    if (testResult.status === "failed") {
      const filePath = createPath(testResult.fullName);
      await fructose.hooks.mobile.takeScreenShot("ios", filePath);
    }
  }
};

let appium;

beforeAll(async () => {
  // to deal with with the long running snap shot tests
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

  if (process.env.ANDROID || process.env.IOS) {
    jasmine.getEnv().addReporter(reporter);
    await fructose.hooks.mobile.setup();
    if (process.env.ANDROID) {
      appium = await new Promise(resolve => {
        const proc = spawn("appium");
        proc.stdout.on("data", d => {
          if (d.toString("utf8").includes("started on 0.0.0.0:4723")) {
            resolve(proc);
          }
        });
      });
      const options = {
        desiredCapabilities: {
          platformName: "Android",
          platformVersion: "7.0",
          deviceName: "Android Emulator",
          app: path.join(
            __dirname,
            "../android/app/build/outputs/apk/app-debug.apk"
          )
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
  } else if (process.env.WEB) {
    await fructose.hooks.web.setup(3000, 20000);
    global.Chromeless = Chromeless;
  }
}, 180000);

afterAll(async () => {
  if (process.env.IOS) {
    await detox.cleanup();
    await fructose.hooks.mobile.cleanup();
  }
  if (process.env.ANDROID) {
    appium.kill();
    await fructose.hooks.mobile.cleanup();
  }
  if (process.env.WEB) {
    await fructose.hooks.web.cleanup();
  }
  await fructose.hooks.disconnectClient();
});
