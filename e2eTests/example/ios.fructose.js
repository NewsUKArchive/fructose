/* globals withComponent device test expect element by afterEach beforeEach */

import React from "react";
import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  green: {
    backgroundColor: "green",
    height: "100%",
    width: "100%"
  },
  aqua: {
    backgroundColor: "aqua",
    height: "100%",
    width: "100%"
  },
  blue: {
    backgroundColor: "blue",
    height: "100%",
    width: "100%"
  },
  black: {
    backgroundColor: "black",
    height: "100%",
    width: "100%",
    color: "white",
    fontSize: 100
  },
  orange: {
    backgroundColor: "orange",
    height: "100%",
    width: "100%"
  },
  purple: {
    backgroundColor: "purple",
    height: "100%",
    width: "100%"
  },
  yellow: {
    backgroundColor: "yellow",
    height: "100%",
    width: "100%",
    fontSize: 50,
    fontWeight: "bold"
  },

});

withComponent(
  <Text fructoseID="book one" style={styles.green}>
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
  <Text style={styles.aqua} fructoseID="second book">
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
  <Text style={styles.blue} fructoseID="book the 3rd">The Prisoner of Azkaban</Text>,
  "basic text", 
  fructose => {
    test("simple test", async () => {
      await fructose.loadComponent();
    });
  }
);

withComponent(
  <Text style={styles.black}  fructoseID="The Fourth">The Goblet of Fire</Text>,
  "basic text",
  fructose => {
    test("simple test", async () => {
      await fructose.loadComponent();
    });
  }
);

withComponent(
  <Text style={styles.orange} fructoseID="Book number five">The Order of the Phoenix</Text>,
  "basic text",
  fructose => {
    test("simple test", async () => {
      await fructose.loadComponent();
    });
  }
);

withComponent(
  <Text style={styles.purple} fructoseID="Sixth">The Half Blood Prince</Text>,
  "basic text",
  fructose => {
    test("simple test", async () => {
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
      test("error component", async () => {
        await fructose.loadComponent();
      });
    });
  }
);

withComponent(
  <Text style={styles.yellow} fructoseID="Book Seven">
    The Deathly Hallows
  </Text>,
  "basic text",
  fructose => {
    test("simple test", async () => {
      await fructose.loadComponent();
    });
  }
);
