/* globals describe */
import log from "../../../logger";
import Client from "../../client";
import rnComponentKey from "../../common/rnComponentKey";

const client = Client(7811);
log.info("withComponent", "client socket connected on 7811");
export default () => {
  const withComponent = (component, description, tests) => {
    const hashed = rnComponentKey(component);

    const loadComponent = async () =>
      client
        .loadComponent(hashed)
        .then(() => log.verbose("withComponent", `loadComponent ${hashed}`));

    const disconnect = async () => {
      client.disconnect();
    };

    const fructose = {};
    fructose.loadComponent = loadComponent;
    fructose.disconnect = disconnect;
    if (describe !== undefined) {
      describe(`withComponent: description`, () => {
        tests(fructose);
      });
    } else {
      tests(fructose);
    }
  };

  global.withComponent = withComponent;
};
