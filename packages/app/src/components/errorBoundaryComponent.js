import React from "react";
import ErrorView from "./errorViewComponent";

export default class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
    };
  }

  componentDidCatch(error) {
    this.setState({
      error
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorView error={this.state.error} />;
    }

    return this.props.children; //eslint-disable-line
  }
}