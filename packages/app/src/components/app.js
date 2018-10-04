import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  createDrawerNavigator
} from 'react-navigation';
import getNavigationScreens from './getNavigationScreens';
import Navigation from "./navigation/navigation"

const rootStack = (components) => createDrawerNavigator(getNavigationScreens(components), {
    contentComponent: Navigation
  });

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const RootStack = rootStack(this.props.components)
    return <RootStack />;
  }
}

App.propTypes = {
  components: PropTypes.objectOf(PropTypes.func).isRequired,
  comms: PropTypes.shape({
    events: PropTypes.shape({
      emit: PropTypes.func.isRequired,
      on: PropTypes.func.isRequired
    }).isRequired,
    socket: PropTypes.shape({
      emit: PropTypes.func.isRequired,
      on: PropTypes.func.isRequired
    }).isRequired
  }).isRequired
};

export default App;
