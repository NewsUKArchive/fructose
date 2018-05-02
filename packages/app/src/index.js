import React from "react";

import App from "./components/app";
import Messaging from "./messaging";
import componentLoader from "./componentLoader";

const defaultPlatform = "native";

export default (componentsToLoad, config) => () => {
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
