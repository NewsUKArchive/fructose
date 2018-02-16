import React from "react";
import fructoseApp from "./fructoseApp";
import automatedEvents from "./automated";
import manualEvents from "./manual";
import NavigationWrapper from "./components/navigation";

export const manual = loadComponents => () => (
  <NavigationWrapper
    loadComponents={loadComponents}
    app={fructoseApp(manualEvents.eventEmitter)}
    events={manualEvents}
  />
);
export const automated = fructoseApp(automatedEvents);
