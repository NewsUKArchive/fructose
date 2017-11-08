/* globals beforeAll afterAll jasmine */
import fructose from "@times-components/fructose/setup";
import wd from "wd";

global.asserter = wd.asserters;
const driver = wd.promiseChainRemote(
  "https://tnlweb:32571499-872a-4f5f-8b22-5dd1c2184049@ondemand.saucelabs.com:443/wd/hub"
);

beforeAll(async () => {
  await fructose.hooks.mobile.setup();

  const options = {
    desiredCapabilities: {
      appiumVersion: "1.6.5",
      platformName: "Android",
      browserName: "",
      deviceName: "Android GoogleAPI Emulator",
      platformVersion: "7.1",
      app: "sauce-storage:fructose-e2e.apk",
      autoGrantPermissions: true
    },
    host: "localhost",
    port: 4723
  };

  global.driver = driver;
  await driver.init(options.desiredCapabilities).setImplicitWaitTimeout(300000);

  await global.driver.waitForElementsByXPath(
    '//*[@text="Fructose"]',
    global.asserter.isDisplayed,
    1800000
  );

  jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
}, 1800000);

afterAll(async () => {
  await fructose.hooks.mobile.cleanup();
});
