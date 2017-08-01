import config from "../package";
import setup from "@times-components/fructose/setup";
import detox from "detox";

setup(config.fructose);
beforeAll( async () => {
  await detox.init(config.detox);
}, 180000);

afterAll( async () => {
  console.log('ended');
  await detox.cleanup();
})