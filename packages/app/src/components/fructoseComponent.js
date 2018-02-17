import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  container: {
    backgroundColor: "white",
    height: "100%",
    width: "100%"
  }
});

const FructoseComponent = (props) => (
      <View style={styles.container} testID="fructose">
        <StatusBar hidden />
        {props.component}
      </View>
    );

FructoseComponent.propTypes = {
  /* eslint react/forbid-prop-types: 0 */
  component: PropTypes.object.isRequired
};

export default FructoseComponent;