/* globals describe */

import stack from "callsite";
import path from "path";
import AppSnaps from "../../snapshots";
import Client from "../../client";
import log from "../../common/logger";
import rnComponentKey from "../../common/rnComponentKey";
import { assertSnapshot } from "./snapshotTest";

const client = Client(7811);

log.info("withComponent", "client socket connected on 7811");
export default () => {
  const withComponent = (component, description, tests) => {
    let hashed;

    try {
      hashed = rnComponentKey(component);
    } catch (err) {
      throw new Error(`${err} to test: ${description}`);
    }

    const testFilePath = stack()[1].getFileName();

    const loadComponent = async () =>
      client
        .loadComponent(hashed)
        .then(() => log.verbose("withComponent", `loadComponent ${hashed}`));

    const disconnect = async () => {
      client.disconnect();
    };

    const snapshotTest = async (platform, testname) => {
      const testDir = path.dirname(testFilePath);
      const snapsPath = `${testDir}/__snapshots__`;

      log.verbose("withComponent", `snapshot file path is : ${snapsPath}`);
      const snaps = new AppSnaps(platform, snapsPath);
      await assertSnapshot(snaps, testname);
    };

    const fructose = {
      loadComponent,
      disconnect,
      snapshotTest
    };

    if (describe !== undefined) {
      describe(`withComponent: ${component.props.fructoseID}`, () => {
        tests(fructose);
      });
    } else {
      tests(fructose);
    }
  };

  log.verbose("withComponent", "setting up withComponent Global");
  global.withComponent = withComponent;
};
