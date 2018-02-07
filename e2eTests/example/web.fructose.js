/* globals Chromeless withComponent describe beforeEach afterEach test expect */

import React from "react";
import { Text } from "react-native";

let chromeless;
const setup = () => {
  chromeless = new Chromeless();
};

const teardown = async () => {
  await chromeless.end();
};

withComponent(
  <Text fructoseID="test" testID="banana">
    BANANA
  </Text>,
  "basic text",
  fructose => {
    describe("fructose", () => {
      beforeEach(setup);
      afterEach(async () => {
        await teardown;
      });

      test("loads up a component", async () => {
        await chromeless
          .goto("http://localhost:3000")
          .exists("[data-testid='fructose']");
        await fructose.loadComponent();
        const selector = `[data-testid='banana']`;
        const exists = await chromeless.wait(selector).exists(selector);
        expect(exists).toBe(true);
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
  <Break fructoseID="error component" />,
  "this is a component that should throw an error",
  fructose => {
    describe("fructose", () => {
      beforeEach(setup);
      afterEach(async () => {
        await teardown;
      });

      test("breaking shit", async () => {
        await chromeless
          .goto("http://localhost:3000")
          .exists("[data-testid='fructose']");
        await fructose.loadComponent();
        const selector = "[data-testid='error']";
        const exists = await chromeless.wait(selector).exists(selector);
        expect(exists).toBe(true);
      });
    });
  }
);
