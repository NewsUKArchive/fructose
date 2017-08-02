import config from "../package";
import fructose from "@times-components/fructose/setup";
import detox from "detox";

fructose.withComponent();

beforeAll( async () => {
  await fructose.hooks.setup();
  await detox.init(config.detox);
}, 180000);

afterAll( async () => {
  await detox.cleanup();
  await fructose.hooks.cleanup();
})