import React from "react";
import Text from "react-native";
import Chromeless from "chromeless"

withComponent(
  <Text>The Hobbit</Text>,
  "basic text",
  fructose => {
    test("simple test", async () => {
      await fructose.loadComponent();
      // Write chromeless test here
      // const chromeless = new Chromeless()

    });
  }
);
