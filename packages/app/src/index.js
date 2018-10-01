import React from 'react';

import App from './components/app';
import Messaging from './messaging';
import componentLoader from './componentLoader';

const defaultPlatform = 'native';

export default (componentsToLoad, config) => () => {
  // disable red + yellow pop ups and allow our own error component to render
  // console._errorOriginal = console.error.bind(console); // eslint-disable-line
  // console.error = () => {}; // eslint-disable-line
  // console.disableYellowBox = true; // eslint-disable-line

  const platform = config.platform || defaultPlatform;
  const components = componentLoader(componentsToLoad, platform);
  const componentList = Object.keys(components).map(key => key);

  return (
    <App
      components={components}
      componentList={componentList}
      comms={Messaging()}
    />
  );
};
