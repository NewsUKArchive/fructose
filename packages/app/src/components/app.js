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
};

export default App;
