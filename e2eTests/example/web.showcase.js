/* globals Chromeless withComponent describe beforeEach afterEach test expect */

import React from "react";
import { Text } from "react-native";

const Break = props => {
  this.break();
  return (
    <View style={styles.red}>
      <Text>ERROR</Text>
    </View>
  );
};

export default {
  name: "Web-ExampleTests",
  children: [
    {
      type: "story",
      name: "Article Label",
      component: () => <Text>The Philosopher&apos;s Stone</Text>
    },
    {
      type: "story",
      name: "The Error",
      component: () => <Break />
    }
  ]
};
