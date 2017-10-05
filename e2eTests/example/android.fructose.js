/* globals withComponent test beforeEach driver device afterEach */

import React from "react";
import { Text } from "react-native";

withComponent(
  <Text fructoseID="hobbit">The Hobbit</Text>,
  "basic text",
  fructose => {
    beforeEach(async () => {
      await fructose.loadComponent();
    });

    afterEach(async () => {
      await device.reloadReactNative();
    });

    test("simple test", async () => {
      await driver.waitForVisible('//*[@text="The Hobbit"]', 6000);
      const a = await driver.getText('//*[@text="The Hobbit"]');
      if (a !== "The Hobbit") {
        throw new Error("should be the hobbit!");
      }
    });
  }
);
