import path from "path";
import stack from "callsite";
import assert from "assert";
import AppSnaps from "../../snapshots";
import log from "../../common/logger";

const snapshotTest = async (platform, testname) => {
  stack().forEach((site, index) => {
    const filePath = site.getFileName();
    const dir = path.dirname(filePath);
    log.info(index, dir);
  });

  const testFilePath = stack()[1].getFileName();
  const testDir = path.dirname(testFilePath);

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

module.exports = snapshotTest;
