/* globals withComponent test beforeEach driver afterEach */

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

    afterEach(async () => {});

    const text = '//*[@text="The Hobbit"]';

    test("simple test", async () => {
      await driver.waitForElementByXPath(text, 6000);
    });
  }
);

withComponent(
  <Text style={styles.manutd} fructoseID="manutd">
    MAN U
  </Text>,
  "basic text",
  fructose => {
    test("with red style", async () => {
      await fructose.loadComponent();

      const text = '//*[@text="MAN U"]';
      await driver.waitForElementByXPath(text, 6000);
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
      await driver.waitForElementByXPath('//*[@text="Mayo 4 Sam"]', 6000);
    });
  }
);
