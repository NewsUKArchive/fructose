/* globals describe */
import log from "npmlog";
import assert from "assert";
import path from "path";
import stack from "callsite";
import Client from "../../client";
import AppSnaps from "../../snapshots";
import rnComponentKey from "../../common/rnComponentKey";

const client = Client(7811);
log.verbose("client socket", client.socket);
export default () => {
  const withComponent = (component, description, tests) => {
    const testfilePath = stack()[1].getFileName();
    const testDir = path.dirname(testfilePath);

    const hashed = rnComponentKey(component);

    const loadComponent = async () =>
      client
        .loadComponent(hashed)
        .then(() => log.verbose("loadComponent", hashed));

    const disconnect = async () => {
      client.disconnect();
    };

    const snapshotTest = async (platform, testname) => {
      const snapsPath = `${testDir}/__snapshots__`;
      const snaps = new AppSnaps(platform, snapsPath);

      if (snaps.exists(testname)) {
        console.warn("IT EXISTS");
        await snaps.snap(testname);
        const diffCount = await snaps.diff(testname);
        console.warn("countywounty: ", diffCount);
        if (diffCount === 0) {
          assert(true, testname);
        } else {
          assert.equal(
            0,
            diffCount,
            "Mismatch. Please review the new snapshot"
          );
        }
      } else {
        await snaps.snap(testname);
        assert(false, "New. Please review the new snapshot");
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
