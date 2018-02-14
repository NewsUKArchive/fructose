/* globals withComponent test beforeEach driver afterEach */

import React from "react";
import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "bold",
    fontStyle: "italic"
  },

  manutd: {
    fontSize: 72,
    color: "red",
    backgroundColor: "black"
  },

  mayo: {
    fontSize: 72,
    color: "red",
    backgroundColor: "green"
  }
});

withComponent(
  <Text style={styles.title} fructoseID="hobbit">
    The Hobbit
  </Text>,
  "basic text",
  fructose => {
    test("simple test", async () => {
      await fructose.loadComponent();
    });
  }
);

withComponent(
  <Text style={styles.manutd} fructoseID="manutd">
    MAN U
  </Text>,
  "basic text",
  fructose => {
    test("with red style", async () => {
      await fructose.loadComponent();
    });
  }
);

withComponent(
  <Text style={styles.mayo} fructoseID="mayo">
    Mayo 4 Sam
  </Text>,
  "basic text",
  fructose => {
    test("with mayo style", async () => {
      await fructose.loadComponent();
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
    describe("fructose", () => {
      test("error comonent", async () => {
        await fructose.loadComponent();
      });
    });
  }
);
