/* globals Chromeless withComponent describe beforeEach afterEach test expect */

import React from "react";
import Image from "@times-components/image";

let chromeless;
const setup = () => {
  chromeless = new Chromeless();
};

const teardown = async () => {
  await chromeless.end();
};

withComponent(
  <Image
    fructoseID="web-component"
    source={{
      uri:
        "/react-logo.png"
    }}
  />,
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
        const selector = `[src='/react-logo.png']`;
        const exists = await chromeless.wait(selector).exists(selector);
        expect(exists).toBe(true);
      });
    });
  }
);
