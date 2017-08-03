import { AppRegistry } from "react-native";
import fructose from "@times-components/fructose";
import { loadStories } from "./components";

AppRegistry.registerComponent("e2eTests", () => fructose(loadStories));
