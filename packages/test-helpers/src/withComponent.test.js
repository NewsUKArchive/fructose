import sinon from "sinon";
import React from "react";
import { StyleSheet, Text } from "react-native";
import withComponent from "./withComponent";

test.only("withComponent", () => {
  it("describes with the component name", () => {
    withComponent(
      <Text fructoseID="seeME">LOLCATZ </Text>,
      "some description",
      {}
    );
  });
});
