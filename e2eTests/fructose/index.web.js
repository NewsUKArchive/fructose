/* globals document */
import { AppRegistry } from "react-native";
import fructose from "@times-components/fructose";
import { stories } from "./components"; // eslint-disable-line import/no-unresolved

AppRegistry.registerComponent("e2eTests", () => fructose(stories));
AppRegistry.runApplication("e2eTests", {
  rootTag: document.getElementById("react-root")
});
