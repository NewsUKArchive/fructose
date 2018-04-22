import { AppRegistry } from "react-native";
import fructose from "../../index.js";
import { loadStories } from "./components"; // eslint-disable-line import/no-unresolved

AppRegistry.registerComponent("e2eTests", () => fructose(loadStories));
