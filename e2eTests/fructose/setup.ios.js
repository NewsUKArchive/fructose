/* globals beforeAll jasmine afterAll */
import fructose from "@times-components/fructose/setup";

beforeAll(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
  await fructose.hooks.mobile.setup();
}, 180000);

afterAll(async () => {
  await fructose.hooks.mobile.cleanup();
});
