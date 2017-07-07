/* globals withComponent test expect element by*/

import React from "react";
import { Text } from "react-native";

withComponent(<Text>The Hobbit</Text>, "basic text", () => {
  test("simple test", async () => {
    await expect(element(by.text("The Hobbit"))).toBeVisible();
  });
});

withComponent(<Text>The Fellowship of the Ring</Text>, "basic text", () => {
  test("simple test", async () => {
    await expect(element(by.text("The Fellowship of the Ring"))).toBeVisible();
  });
});

withComponent(<Text>The Two Towers</Text>, "basic text", () => {
  test("simple test", async () => {
    await expect(element(by.text("The Two Towers"))).toBeVisible();
  });
});

withComponent(<Text>The Return of the King</Text>, "basic text", () => {
  test("simple test", async () => {
    await expect(element(by.text("The Return of the King"))).toBeVisible();
  });
});
