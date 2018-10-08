import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { version } from "../../../../package.json";

const styles = StyleSheet.create({
  header: {
    color: "white",
    fontSize: 40,
    textAlign: "center"
  },
  version: {
    padding: 10,
    color: "white",
    fontSize: 20,
    textAlign: "left"
  },
  text: {
    paddingTop: 10,
    color: "white",
    fontSize: 16,
    textAlign: "center",
    height: "100%"
  },
  view: {
    flex: 1,
    width: "100%",
    height: "100%",
    margin: 0,
    padding: 0,
    backgroundColor: "lightpink"
  }
});

const LoadingScreen = () => (
  <View id="thing" style={styles.view}>
    <Text style={styles.text}>
      Brought to you by {"\n"} The Times Tooling Team
    </Text>
    <Text style={styles.header}>🛠 FRUCTOSE 🛠</Text>
    <Text style={styles.version}>Version: {version}</Text>
  </View>
);

export default LoadingScreen;
