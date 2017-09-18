import path from "path";
import assert from "assert";
import AppSnaps from "../../snapshots";
import log from "../../common/logger";

const assertSnapshot = async (snapper, testName) => {
  log.verbose("snapshotTest", `checking if ${testName} exists`);
  if (snapper.exists(testName)) {
    log.verbose("snapshotTest", `awaiting new snapshot for ${testName}`);
    await snapper.snap(testName);
    const diffCount = await snapper.diff(testName);
    log.verbose("snapshotTest", diffCount);
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

const snapshotTest = async (platform, testFilePath, testname) => {
  const testDir = path.dirname(testFilePath);
  const snapsPath = `${testDir}/__snapshots__`;

  log.verbose(
    "snapshotTest",
    `path is ${snapsPath} on ${platform} for ${testname}`
  );
  const snaps = new AppSnaps(platform, snapsPath);
  await assertSnapshot(snaps, testname);
};

module.exports = { snapshotTest, assertSnapshot };
