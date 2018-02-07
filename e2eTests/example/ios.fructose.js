/* globals withComponent device test expect element by afterEach beforeEach */

import React from "react";
import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    fontWeight: "bold"
  }
});

withComponent(
  <Text fructoseID="book one">The Philosopher&apos;s Stone</Text>,
  "basic text",
  fructose => {
    beforeEach(async () => {
      await fructose.loadComponent();
    });

    afterEach(async () => {
      await device.reloadReactNative();
    });

    test("simple test", async () => {
      await expect(element(by.text(`The Philosopher's Stone`))).toBeVisible();
    });
  }
);

withComponent(
  <Text style={styles.title} fructoseID="second book">
    The Chamber of Secrets
  </Text>,
  "basic text",
  fructose => {
    test("with style", async () => {
      await fructose.loadComponent();
      await expect(element(by.text("The Chamber of Secrets"))).toBeVisible();
    });
  }
);

withComponent(
  <Text fructoseID="book the 3rd">The Prisoner of Azkaban</Text>,
  "basic text",
  fructose => {
    test("simple test", async () => {
      await fructose.loadComponent();
      await expect(element(by.text("The Prisoner of Azkaban"))).toBeVisible();
    });
  }
);

withComponent(
  <Text fructoseID="The Fourth">The Goblet of Fire</Text>,
  "basic text",
  fructose => {
    test("simple test", async () => {
      await fructose.loadComponent();
      await expect(element(by.text("The Goblet of Fire"))).toBeVisible();
    });
  }
);

withComponent(
  <Text fructoseID="Book number five">The Order of the Phoenix</Text>,
  "basic text",
  fructose => {
    test("simple test", async () => {
      await fructose.loadComponent();
      await expect(element(by.text("The Order of the Phoenix"))).toBeVisible();
    });
  }
);

withComponent(
  <Text fructoseID="Sixth">The Half Blood Prince</Text>,
  "basic text",
  fructose => {
    test("simple test", async () => {
      await fructose.loadComponent();
      await expect(element(by.text("The Half Blood Prince"))).toBeVisible();
    });
  }
);

withComponent(
  <Text fructoseID="Book Seven" style={styles.title}>
    The Deathly Hallows
  </Text>,
  "basic text",
  fructose => {
    test("simple test", async () => {
      await fructose.loadComponent();
      await expect(element(by.text("The Deathly Hallows"))).toBeVisible();
    });
  }
);

const Break = props => {
  this.break();
  return (
    <View style={styles.red}>
      <Text>ERROR</Text>
    </View>
  );
};

withComponent(
  <Break fructoseID="error component" />,
  "this is a component that should throw an error",
  fructose => {
    test("breaking shit", async () => {
      await fructose.loadComponent();
      await expect(element(by.id("error"))).toBeVisible();
    });
  }
);
