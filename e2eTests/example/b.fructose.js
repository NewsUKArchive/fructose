/* globals withComponent test expect element by */

import React from "react";
import { Text } from "react-native";

withComponent(<Text>The Philosopher&apos;s Stone</Text>, "basic text", () => {
  test("simple test", async () => {
    await expect(element(by.text(`The Philosopher's Stone`))).toBeVisible();
  });
});

withComponent(<Text>The Chamber of Secrets</Text>, "basic text", () => {
  test("simple test", async () => {
    await expect(element(by.text("The Chamber of Secrets"))).toBeVisible();
  });
});

withComponent(<Text>The Prisoner of Azkaban</Text>, "basic text", () => {
  test("simple test", async () => {
    await expect(element(by.text("The Prisoner of Azkaban"))).toBeVisible();
  });
});

withComponent(<Text>The Goblet of Fire</Text>, "basic text", () => {
  test("simple test", async () => {
    await expect(element(by.text("The Goblet of Fire"))).toBeVisible();
  });
});

withComponent(<Text>The Order of the Phoenix</Text>, "basic text", () => {
  test("simple test", async () => {
    await expect(element(by.text("The Order of the Phoenix"))).toBeVisible();
  });
});

withComponent(<Text>The Half Blood Prince</Text>, "basic text", () => {
  test("simple test", async () => {
    await expect(element(by.text("The Half Blood Prince"))).toBeVisible();
  });
});

withComponent(<Text>The Deathly Hallows</Text>, "basic text", () => {
  test("simple test", async () => {
    await expect(element(by.text("The Deathly Hallows"))).toBeVisible();
  });
});
