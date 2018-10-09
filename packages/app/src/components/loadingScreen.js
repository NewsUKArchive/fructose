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
    textAlign: "center"
  },
  view: {
    backgroundColor: "lightpink",
    height: "100%",
    width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  }
});

const LoadingScreen = () => (
  <View style={styles.view}>
    <Text style={styles.text}>
      Brought to you by {"\n"} The Times Tooling Team
    </Text>
    <Text style={styles.header}>🛠 FRUCTOSE 🛠</Text>
    <Text style={styles.version}>Version: {version}</Text>
  </View>
);

export default LoadingScreen;
