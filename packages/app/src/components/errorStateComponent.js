import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  text: { color: "white", fontSize: 20 },
  background: {
    backgroundColor: "red"
  },
  customError: {
    width: 400,
    height: 300,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default class ErrorState extends Component {
  constructor(props) {
    super(props);

    this.props.events.emit("error-loading-component");
  }

  render() {
    return (
      <View testID="error" style={[styles.background, styles.customError]}>
        <Text style={styles.text}>
          Error Message: {this.props.error.message}
        </Text>
      </View>
    );
  }
}

ErrorState.propTypes = {
  events: PropTypes.shape({
    emit: PropTypes.func.isRequired,
    on: PropTypes.func.isRequired,
    removeListener: PropTypes.func.isRequired
  }).isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
    stack: PropTypes.string
  })
};

ErrorState.defaultProps = {
  error: {}
};
