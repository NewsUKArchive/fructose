/* globals document */

import { AppRegistry, Text } from "react-native";
import fructose from "../../packages/app/src";
import { getStories } from "./components"; // eslint-disable-line import/no-unresolved

AppRegistry.registerComponent("e2eTests", () =>
  fructose(getStories, { platform: "web" })
);
AppRegistry.runApplication("e2eTests", {
  rootTag: document.getElementById("react-root")
});
