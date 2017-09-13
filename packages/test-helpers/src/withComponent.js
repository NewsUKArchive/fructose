/* globals describe */

import assert from "assert";
import path from "path";
import stack from "callsite";
import Client from "../../client";
import AppSnaps from "../../snapshots";
import log from "../../../logger";
import rnComponentKey from "../../common/rnComponentKey";

const client = Client(7811);
log.info("withComponent", "client socket connected on 7811");
export default () => {
  const withComponent = (component, description, tests) => {
    const testfilePath = stack()[1].getFileName();
    const testDir = path.dirname(testfilePath);

    const hashed = rnComponentKey(component);

    const loadComponent = async () =>
      client
        .loadComponent(hashed)
        .then(() => log.verbose("withComponent", `loadComponent ${hashed}`));

    const disconnect = async () => {
      client.disconnect();
    };

    const snapshotTest = async (platform, testname) => {
      const snapsPath = `${testDir}/__snapshots__`;
      const snaps = new AppSnaps(platform, snapsPath);

      if (snaps.exists(testname)) {
        await snaps.snap(testname);
        const diffCount = await snaps.diff(testname);
        if (diffCount === 0) {
          assert(true, testname);
        } else {
          assert.equal(
            0,
            diffCount,
            "A mismatch has been detected between the baseline and new snapshot. Please review the new snapshot"
          );
        }
      } else {
        await snaps.snap(testname);
        assert(false, "A new snapshot has been created. Please review it");
      }
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
