import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
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

export default class FructoseComponent extends Component {

  render() {
    return (
      <View style={styles.container} testID="fructose">
        <StatusBar hidden />
        {this.props.component}
      </View>
    );
  }
}

FructoseComponent.propTypes = {
  events: PropTypes.shape({
    emit: PropTypes.func.isRequired,
    on: PropTypes.func.isRequired,
    removeListener: PropTypes.func.isRequired
  }).isRequired,
  /* eslint react/forbid-prop-types: 0 */
  components: PropTypes.array
};

FructoseComponent.defaultProps = {
  components: []
};
