/* globals withComponent test expect element by beforeEach */

const stack = require("callsite");
const path = require("path");
const log = require("../../common/logger");
const AppSnaps = require("../../snapshots");
const { assertSnapshot } = require("./snapshotTest");

describe.only("snapshotTest", () => {
  it("returns true if images match", () => {
    const testFilePath = stack()[0].getFileName();
    const testDir = path.dirname(testFilePath);
    const snapsPath = `${testDir}/__snapshots__`;
    const platform = "ios";
    const testName = "returns-true";
    const snapper = new AppSnaps(platform, snapsPath);

    snapper.snap = async () => {
      return new Promise(resolve => {
        resolve();
      });
    };

    return assertSnapshot(snapper, testName);
  }), it("returns false if images to not match", async () => {
    const testFilePath = stack()[0].getFileName();
    const testDir = path.dirname(testFilePath);
    const snapsPath = `${testDir}/__snapshots__`;
    const platform = "ios";
    const testName = "returns-false";
    const snapper = new AppSnaps(platform, snapsPath);

    snapper.snap = async () => {
      return new Promise(resolve => {
        resolve();
      });
    };

    expect.assertions(1);
    try {
      await assertSnapshot(snapper, testName);
    } catch (err) {
      expect(err.code).toEqual("ERR_ASSERTION");
    }
  });
});
