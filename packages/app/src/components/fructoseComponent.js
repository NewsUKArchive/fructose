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
  }
});

export default class FructoseComponent extends Component {
  constructor(props) {
    super(props);

    this.getBundledComponents = () => {
      if (this.props.components.length === 0) {
        this.props.events.emit("no-components");
      }

      return Object.keys(this.props.components).map(key => key);
    };

    this.publishBundledComponents = () =>
      this.props.events.emit(
        "loaded-app-components",
        this.getBundledComponents()
      );

    this.loadComponent = name => {
      const component = this.props.components[name];
      if (!component) {
        throw new Error(`${name} does not exist in the componentStore`);
      }
      this.setState({ component });
    };

    this.props.events.on(
      "publish-component-store",
      this.publishBundledComponents
    );
    this.props.events.on("load", this.loadComponent);
    this.state = { component: <Text>Fructose</Text> };
  }

  componentDidUpdate() {
    this.props.events.emit("loaded");
  }

  componentWillUnmount() {
    this.props.events.removeListener("load", this.loadComponent);
  }

  render() {
    return (
      <View style={styles.container} testID="fructose">
        <StatusBar hidden />
        {this.state.component}
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
