/* globals describe it expect */

import React from "react";
import { Text } from "react-native";

const getKey = require("./rnComponentKey");

describe("rnComponentKey", () => {
  it("gets the fructoseID from the component", () => {
    const key = getKey(<Text fructoseID="test-id">LOL</Text>);
    expect(key).toBe("test-id");
  });

  it("throws an error if fructoseID does not exist", () => {
    expect(() => getKey(<Text>BOO</Text>)).toThrow();
  });
});
