/* globals document */

import fructose from "../../packages/app/src";
import { getStories } from "./components"; // eslint-disable-line import/no-unresolved
import { AppRegistry, Text } from "react-native"

AppRegistry.registerComponent("e2eTests", () => fructose(getStories, { platform: "web" }));
AppRegistry.runApplication("e2eTests", {
  rootTag: document.getElementById("react-root")
});



