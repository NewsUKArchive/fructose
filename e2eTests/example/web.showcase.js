/* globals Chromeless withComponent describe beforeEach afterEach test expect */

import React from "react";
import { Text } from "react-native";

export default {
  name: "ios-ExampleTests",
  children: [
    {
      type: "story",
      name: "Article Label",
      component: () => (
        <Text fructoseID="book one" style={styles.green}>
          The Philosopher&apos;s Stone
        </Text>
      )
    }
  ]
};
