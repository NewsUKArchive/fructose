import React from "react";
import PropTypes from "prop-types";

export default class ErrorView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null
    };

    this.handleError = this.handleError.bind(this);
  }

  componentDidMount() {
    this.props.events.on("load", () => {
      this.setState({ error: null });
    });
    this.props.events.emit("ready");
  }

  componentDidCatch(e) {
    this.setState({
      error: e
    });
  }

  handleError(e) {
    this.setState({
      error: e
    });
  }

  render() {
    return this.props.children({
      hasError: !!this.state.error,
      error: this.state.error,
      onError: this.handleError
    });
  }
}

ErrorView.propTypes = {
  events: PropTypes.shape({
    emit: PropTypes.func.isRequired,
    on: PropTypes.func.isRequired,
    removeListener: PropTypes.func.isRequired
  }).isRequired,
  children: PropTypes.func.isRequired
};
