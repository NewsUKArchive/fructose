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
  <Text fructoseID="book one">
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
  <Text fructoseID="Book Seven" style={styles.title}>The Deathly Hallows</Text>,
  "basic text",
  fructose => {
    test("simple test", async () => {
      await fructose.loadComponent();
      await expect(element(by.text("The Deathly Hallows"))).toBeVisible();
    });
  }
);
