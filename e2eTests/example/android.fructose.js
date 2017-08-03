/* globals withComponent test expect element by*/

import React from "react";
import { Text } from "react-native";

withComponent(<Text>The Hobbit</Text>, "basic text", (fructose) => {
  beforeEach( async () => {
    console.log(JSON.stringify(<Text>The Hobbit</Text>));
    await fructose.loadComponent();
  });

  test("simple test", async () => {
    await driver.waitForVisible('//*[@text="The Hobbit"]', 6000);
    const a = await driver.getText('//*[@text="The Hobbit"]');
    if (a !== "The Hobbit"){
      throw new Error("should be the hobbit!")
    }
  });
});
