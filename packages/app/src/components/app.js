import React from "react";
import PropTypes from "prop-types";
import { createDrawerNavigator } from "react-navigation";
import getNavigationScreens from "./getNavigationScreens";
import Navigation from "./navigation/navigation";

const App = ({ components }) => {
  const Root = createDrawerNavigator(getNavigationScreens(components), {
    contentComponent: Navigation
  });

  return <Root />;
};

App.propTypes = {
  components: PropTypes.objectOf(PropTypes.func).isRequired
};

export default App;
