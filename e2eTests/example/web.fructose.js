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
    fructoseID="only"
    source={{
      uri:
        "http://i.dailymail.co.uk/i/pix/2016/04/13/00/331D901800000578-3536787-image-a-11_1460503122350.jpg"
    }}
  />,
  "basic text",
  fructose => {
    describe("blah", () => {
      beforeEach(setup);
      afterEach(async () => {
        await teardown;
      });
      test("simple test", async () => {
        await chromeless
          .goto("http://localhost:3000")
          .exists("[data-testid='fructose']");
        await fructose.loadComponent();
        const selector = `[src='http://i.dailymail.co.uk/i/pix/2016/04/13/00/331D901800000578-3536787-image-a-11_1460503122350.jpg']`;
        const exists = await chromeless.wait(selector).exists(selector);
        expect(exists).toBe(true);
      });
    });
  }
);

withComponent(
  <Image
    oneID="one"
    fructoseID="beginning"
    threeID="3"
    source={{
      uri:
        "https://helpx.adobe.com/stock/how-to/visual-reverse-image-search/_jcr_content/main-pars/image.img.jpg/visual-reverse-image-search-v2_1000x560.jpg"
    }}
  />,
  "basic text",
  fructose => {
    describe("blah2", () => {
      beforeEach(setup);
      afterEach(async () => {
        await teardown;
      });

      test("simple test", async () => {
        await chromeless
          .goto("http://localhost:3000")
          .exists("[data-testid='fructose']");
        await fructose.loadComponent();
        const selector = `[src='https://helpx.adobe.com/stock/how-to/visual-reverse-image-search/_jcr_content/main-pars/image.img.jpg/visual-reverse-image-search-v2_1000x560.jpg']`;
        const exists = await chromeless.wait(selector).exists(selector);
        expect(exists).toBe(true);
      });
    });
  }
);

withComponent(
  <Image
    bananaId="plantain"
    fructoseID="end"
    source={{
      uri: "http://wowslider.com/sliders/demo-69/data1/images/bubbles.jpg"
    }}
  />,
  "basic text",
  fructose => {
    describe("blah3", () => {
      beforeEach(setup);
      afterEach(async () => {
        await teardown;
      });

      test("simple test", async () => {
        await chromeless
          .goto("http://localhost:3000")
          .exists("[data-testid='fructose']");
        await fructose.loadComponent();
        const selector = `[src='http://wowslider.com/sliders/demo-69/data1/images/bubbles.jpg']`;
        const exists = await chromeless.wait(selector).exists(selector);

        expect(exists).toBe(true);
      });
    });
  }
);

withComponent(
  <Image
    oneID="one"
    fructoseID="middle"
    threeID="3"
    source={{
      uri:
        "https://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/4/11/1397210130748/Spring-Lamb.-Image-shot-2-011.jpg"
    }}
  />,
  "basic text",
  fructose => {
    describe("blah4", () => {
      beforeEach(setup);
      afterEach(async () => {
        await teardown;
      });

      test("simple test", async () => {
        await chromeless
          .goto("http://localhost:3000")
          .exists("[data-testid='fructose']");
        await fructose.loadComponent();
        const selector = `[src='https://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/4/11/1397210130748/Spring-Lamb.-Image-shot-2-011.jpg']`;
        const exists = await chromeless.wait(selector).exists(selector);
        expect(exists).toBe(true);
      });
    });
  }
);
