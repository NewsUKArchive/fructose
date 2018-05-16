import React from "react";
import PropTypes from "prop-types";
import ErrorView from "./errorViewComponent";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null
    };
  }

  componentWillMount() {
    this.props.events.on("load-component", () => {
      this.state.error = null;
    });
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

ErrorBoundary.propTypes = {
  events: PropTypes.shape({
    emit: PropTypes.func.isRequired,
    on: PropTypes.func.isRequired
  }).isRequired
};
