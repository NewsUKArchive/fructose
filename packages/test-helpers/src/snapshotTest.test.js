/* globals expect beforeEach */

const stack = require("callsite");
const path = require("path");
const log = require("../../common/logger");
const AppSnaps = require("../../snapshots");
const { assertSnapshot } = require("./snapshotTest");

describe.only("snapshotTest", () => {
  let snapper;

  beforeEach(() => {
    const testFilePath = stack()[0].getFileName();
    const testDir = path.dirname(testFilePath);
    const snapsPath = `${testDir}/__snapshots__`;
    const platform = "ios";

    snapper = new AppSnaps(platform, snapsPath);

    snapper.snap = async () => {
      return new Promise(resolve => {
        resolve();
      });
    };
  }), it("returns true if images match", () => {
    const testName = "returns-true";
    return assertSnapshot(snapper, testName);
  }), it("returns false if images to not match", async () => {
    const testName = "returns-false";
    expect.assertions(1);

    try {
      await assertSnapshot(snapper, testName);
    } catch (err) {
      expect(err.code).toEqual("ERR_ASSERTION");
    }
  }), it("asks to review the new snapshot if one does not exist", async () => {
    const testName = "fake";
    expect.assertions(1);

    try {
      await assertSnapshot(snapper, testName);
    } catch (err) {
      expect(err.code).toEqual("ERR_ASSERTION");
    }
  });
});
