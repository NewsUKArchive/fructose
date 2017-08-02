import config from "../package";
import fructose from "@times-components/fructose/setup";
import detox from "detox";

fructose.withComponent();

beforeAll( async () => {
  console.log(1)
  await fructose.hooks.setup();
    console.log(2)


  await detox.init(config.detox);
    console.log(4)

}, 180000);

afterAll( async () => {
        await detox.cleanup();

    console.log('ended-1');
  await fructose.hooks.cleanup();

  console.log('ended0');
    console.log('ended1');
})