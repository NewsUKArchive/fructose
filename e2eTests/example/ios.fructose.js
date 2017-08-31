/* globals withComponent test expect element by */

import React from "react";
import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    fontWeight: "bold"
  }
});

withComponent(
  <Text>
    The Philosopher&apos;s Stone, the bumbler&apos;s tome, the one book that
    made them all groan
  </Text>,
  "basic text",
  fructose => {
    test(
      "simple test",
      async () => {
        await fructose.loadComponent();
        await fructose.snapshotTest("ios", "philosophers-stone");
        /* creates a snapshot in __snapshots__/ios/tmp/philosophers-stone.png, asks to approve snapshot at http:localhost:7812, 
      once snapshot approved gets written to __snapshots__/ios/philosophers-stone.png. 

      If snapshot already exists, and is different, creates a diff in __snapshots__/ios/diff/philosophers-stone.png, then asks to approve
      */
        await expect(element(by.text(`The Philosopher's Stone`))).toBeVisible();
      },
      60000
    );
  }
);

withComponent(
  <Text style={styles.title}>The Chamber of Secrets</Text>,
  "basic text",
  fructose => {
    test("with style", async () => {
      await fructose.loadComponent();
      await expect(element(by.text("The Chamber of Secrets"))).toBeVisible();
    });
  }
);

withComponent(<Text>The Prisoner of Azkaban</Text>, "basic text", fructose => {
  test("simple test", async () => {
    await fructose.loadComponent();
    await expect(element(by.text("The Prisoner of Azkaban"))).toBeVisible();
  });
});

withComponent(<Text>The Goblet of Fire</Text>, "basic text", fructose => {
  test("simple test", async () => {
    await fructose.loadComponent();
    await expect(element(by.text("The Goblet of Fire"))).toBeVisible();
  });
});

withComponent(<Text>The Order of the Phoenix</Text>, "basic text", fructose => {
  test("simple test", async () => {
    await fructose.loadComponent();
    await expect(element(by.text("The Order of the Phoenix"))).toBeVisible();
  });
});

withComponent(<Text>The Half Blood Prince</Text>, "basic text", fructose => {
  test("simple test", async () => {
    await fructose.loadComponent();
    await expect(element(by.text("The Half Blood Prince"))).toBeVisible();
  });
});

withComponent(
  <Text style={styles.title}>The Deathly Hallows</Text>,
  "basic text",
  fructose => {
    test("simple test", async () => {
      await fructose.loadComponent();
      await expect(element(by.text("The Deathly Hallows"))).toBeVisible();
    });
  }
);
