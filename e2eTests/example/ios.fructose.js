/* globals withComponent device test expect element by afterEach beforeEach */

import React from "react";
import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    fontWeight: "bold"
  },
  lol: {
    backgroundColor: "green"
  }
});

withComponent(
  <Text fructoseID="book one" style={styles.lol}>
    The Philosopher&apos;s Stone
  </Text>,
  "basic text",
  fructose => {
    test("simple test", async () => {
      await fructose.loadComponent();
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
    });
  }
);

withComponent(
  <Text fructoseID="book the 3rd">The Prisoner of Azkaban</Text>,
  "basic text",
  fructose => {
    test("simple test", async () => {
      await fructose.loadComponent();
    });
  }
);

withComponent(
  <Text fructoseID="The Fourth">The Goblet of Fire</Text>,
  "basic text",
  fructose => {
    test("simple test", async () => {
      await fructose.loadComponent();
    });
  }
);

withComponent(
  <Text fructoseID="Book number five">The Order of the Phoenix</Text>,
  "basic text",
  fructose => {
    test("simple test", async () => {
      await fructose.loadComponent();
    });
  }
);

withComponent(
  <Text fructoseID="Sixth">The Half Blood Prince</Text>,
  "basic text",
  fructose => {
    test("simple test", async () => {
      await fructose.loadComponent();
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
    });
  }
);
