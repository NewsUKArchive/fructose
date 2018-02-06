import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: "#B20000",
    height: "100%"
  },
  errorHeader: {
    fontWeight: "bold",
    fontSize: 24,
    color: "white",
    textAlign: "center"
  },
  stackTrace: {
    color: "white",
    fontSize: 16
  }
});

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.err = props.error;
  }

  render() {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorHeader}>Exception Found</Text>
        <Text style={styles.stackTrace}>{this.err.toString()}</Text>
      </View>
    );
  }
}

ErrorBoundary.propTypes = {
  /* eslint react/forbid-prop-types: 0 */
  error: PropTypes.object
};

ErrorBoundary.defaultProps = {
  error: {}
};
