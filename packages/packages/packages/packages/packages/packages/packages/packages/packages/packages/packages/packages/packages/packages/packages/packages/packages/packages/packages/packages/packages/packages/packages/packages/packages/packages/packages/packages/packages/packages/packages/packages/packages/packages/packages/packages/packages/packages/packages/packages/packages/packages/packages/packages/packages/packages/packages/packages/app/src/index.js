import React from "react";

import App from "./components/app";
import Messaging from "./messaging";
import componentLoader from "./componentLoader";

export default loadComponents => () => {
  const components = componentLoader(loadComponents);
  const componentList = Object.keys(components).map(key => key);

  return (
    <App
      components={components}
      componentList={componentList}
      comms={Messaging()}
    />
  );
};
