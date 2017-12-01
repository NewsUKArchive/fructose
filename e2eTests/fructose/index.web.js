/* globals document */
import { AppRegistry } from "react-native";
import fructose from "@times-components/fructose";
import { loadStories } from "./components"; // eslint-disable-line import/no-unresolved

AppRegistry.registerComponent("e2eTests", () => fructose(loadStories));
AppRegistry.runApplication("e2eTests", {
  rootTag: document.getElementById("react-root")
});
