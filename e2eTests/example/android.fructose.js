/* globals withComponent test beforeEach driver device afterEach */

import React from "react";
import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "bold",
    fontStyle: "italic"
  },

  manutd: {
    fontSize: 72,
    color: "red",
    backgroundColor: "black"
  },

  mayo: {
    fontSize: 72,
    color: "red",
    backgroundColor: "green"
  }
});

withComponent(
  <Text style={styles.title} fructoseID="hobbit">The Hobbit</Text>,
  "basic text",
  fructose => {
    beforeEach(async () => {
      await fructose.loadComponent();
    });

    afterEach(async () => {
      await device.reloadReactNative();
    });

    const text = '//*[@text="The Hobbit"]';
    
    test("simple test", async () => {
      await driver.waitForVisible(text, 6000);
      const a = await driver.getText(text);
      if (a !== "The Hobbit") {
        throw new Error("should be the hobbit!");
      }
    });
  }
);

withComponent(
  <Text style={styles.manutd} fructoseID="manutd">
    Manchester United
  </Text>,
  "basic text",
  fructose => {
    test("with red style", async () => {
      await fructose.loadComponent();

      const text = '//*[@text="Manchester United"]';
      await driver.waitForVisible(text, 6000);
      const a = await driver.getText(text);
      if (a !== "Manchester United") {
        throw new Error("should be Manchester United!");
      }
    });
  }
);

withComponent(
  <Text style={styles.mayo} fructoseID="mayo">
    Mayo 4 Sam
  </Text>,
  "basic text",
  fructose => {
    test("with mayo style", async () => {
      await fructose.loadComponent();
      await driver.waitForVisible('//*[@text="Mayo 4 Sam"]', 6000);
      const a = await driver.getText('//*[@text="Mayo 4 Sam"]');
      if (a !== "Mayo 4 Sam") {
        throw new Error("should be Mayo 4 Sam!");
      }
    });
  }
);
