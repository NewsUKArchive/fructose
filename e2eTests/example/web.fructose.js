/* globals Chromeless withComponent describe beforeEach afterEach test expect */

import React from "react";
import { Text } from "react-native";
import io from "socket.io-client";

const deviceReady = () => {
  const config = {
    transports: ["websocket"],
    query: {
      clientType: "client"
    }
  };

  const socket = io("http://localhost:7811", config);

  return new Promise(resolve => {
    socket.on("fructose-app-ready", () => {
      resolve("ready");
    });
  });
};

let chromeless;
const setup = () => {
  chromeless = new Chromeless();
};

const teardown = async () => {
  await chromeless.end();
};

withComponent(
  () => (
    <Text fructoseID="test" testID="banana">
      BANANA
    </Text>
  ),
  "basic text",
  fructose => {
    describe("fructose", () => {
      beforeEach(setup);
      afterEach(async () => {
        await teardown;
      });

      test("loads up a component", async () => {
        chromeless
          .goto("http://localhost:3000")
          .exists("[data-testid='fructose']");
        await deviceReady();
        await fructose.loadComponent();
      });
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
  () => <Break fructoseID="error component" />,
  "this is a component that should throw an error",
  fructose => {
    describe("fructose", () => {
      beforeEach(setup);
      afterEach(async () => {
        await teardown;
      });

      test("it should throw an error and display the error component", async () => {
        chromeless
          .goto("http://localhost:3000")
          .exists("[data-testid='fructose']");
        await deviceReady();
        await fructose.loadComponent();
      });
    });
  }
);
