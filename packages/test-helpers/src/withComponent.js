/* globals describe */

import stack from "callsite";
import Client from "../../client";
import log from "../../common/logger";
import rnComponentKey from "../../common/rnComponentKey";
import { snapTest } from "./snapshotTest";

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

    const snapshotTest = (platform, testname) => {
      const testfilePath = stack()[1].getFileName();
      log.verbose("withComponent", `snapshot file path is : ${testfilePath}`);
      return snapTest(platform, testfilePath, testname);
    };

    const fructose = {
      loadComponent,
      disconnect,
      snapshotTest
    };

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
