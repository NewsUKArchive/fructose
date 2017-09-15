import path from "path";
import assert from "assert";
import AppSnaps from "../../snapshots";
import log from "../../common/logger";

const snapshotTest = async (platform, testFilePath, testname) => {
  const testDir = path.dirname(testFilePath);
  const snapsPath = `${testDir}/__snapshots__`;

  log.verbose(
    "snapshotTest",
    `path is ${snapsPath} on ${platform} for ${testname}`
  );
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

module.exports = snapshotTest;
