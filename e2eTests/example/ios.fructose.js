/* globals withComponent test expect element by beforeEach */

import React from "react";
import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    fontWeight: "bold"
  }
});

withComponent(
  <Text fructoseID="1">
    The Philosopher&apos;s Stone
  </Text>,
  "basic text",
  fructose => {
    beforeEach(async () => {
      await fructose.loadComponent();
    });

    test("simple test", async () => {
      await expect(element(by.text(`The Philosopher's Stone`))).toBeVisible();
    });

    test(
      "snapshot test",
      async () => {
        await fructose.snapshotTest("ios", "philosophers-stone");
      },
      10000
    );
  }
);

withComponent(
  <Text style={styles.title} fructoseID="2">The Chamber of Secrets</Text>,
  "basic text",
  fructose => {
    test("with style", async () => {
      await fructose.loadComponent();
      await expect(element(by.text("The Chamber of Secrets"))).toBeVisible();
    });
  }
);

withComponent(
  <Text fructoseID="3">The Prisoner of Azkaban</Text>,
  "basic text",
  fructose => {
    test("simple test", async () => {
      await fructose.loadComponent();
      await expect(element(by.text("The Prisoner of Azkaban"))).toBeVisible();
    });
  }
);

withComponent(
  <Text fructoseID="4">The Goblet of Fire</Text>,
  "basic text",
  fructose => {
    test("simple test", async () => {
      await fructose.loadComponent();
      await expect(element(by.text("The Goblet of Fire"))).toBeVisible();
    });
  }
);

withComponent(
  <Text fructoseID="5">The Order of the Phoenix</Text>,
  "basic text",
  fructose => {
    test("simple test", async () => {
      await fructose.loadComponent();
      await expect(element(by.text("The Order of the Phoenix"))).toBeVisible();
    });
  }
);

withComponent(
  <Text fructoseID="6">The Half Blood Prince</Text>,
  "basic text",
  fructose => {
    test("simple test", async () => {
      await fructose.loadComponent();
      await expect(element(by.text("The Half Blood Prince"))).toBeVisible();
    });
  }
);

withComponent(
  <Text fructoseID="7" style={styles.title}>The Deathly Hallows</Text>,
  "basic text",
  fructose => {
    test("simple test", async () => {
      await fructose.loadComponent();
      await expect(element(by.text("The Deathly Hallows"))).toBeVisible();
    });
  }
);
