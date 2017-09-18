import path from "path";
import assert from "assert";
import AppSnaps from "../../snapshots";
import log from "../../common/logger";

const assertSnapshot = async (snapper, testName) => {
  log.verbose("snapshotTest", `checking if image ${testName} exists`);
  if (snapper.exists(testName)) {
    log.verbose("snapshotTest", `awaiting new snapshot for test: ${testName}`);
    await snapper.snap(testName);
    log.verbose("snapshotTest", `snapshot for test: ${testName} taken`);
    const diffCount = await snapper.diff(testName);
    log.verbose("snapshotTest", `image dif count is: ${diffCount}`);
    if (diffCount === 0) {
      assert(true, testName);
    } else {
      assert.equal(
        0,
        diffCount,
        "A mismatch has been detected between the baseline and new snapshot. Please review the new snapshot"
      );
    }
  } else {
    await snapper.snap(testName);
    assert(false, "A new snapshot has been created. Please review it");
  }
};

const snapTest = async (platform, testFilePath, testname) => {
  const testDir = path.dirname(testFilePath);
  const snapsPath = `${testDir}/__snapshots__`;

  log.verbose(
    "snapshotTest",
    `path is ${snapsPath} on ${platform} for ${testname}`
  );
  const snaps = new AppSnaps(platform, snapsPath);
  await assertSnapshot(snaps, testname);
};

module.exports = { snapTest, assertSnapshot };
