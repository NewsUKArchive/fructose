/* globals expect beforeEach */

import stack from "callsite";
import path from "path";
import log from "../../common/logger";
import AppSnaps from "../../snapshots";
import { assertSnapshot } from "./snapshotTest";

describe("snapshotAssert", () => {
  let snapper;

  const fakeDiff = () => {
    snapper.diff = async bool => {
      return new Promise(resolve => {
        resolve(bool.includes("true") ? 0 : 1);
      });
    };
  };

  const fakeFileExists = () => {
    snapper.exists = async () => {
      return new Promise(resolve => {
        resolve();
      });
    };
  };

  beforeEach(() => {
    const snapsPath = `${__dirname}/__snapshots__`;
    const platform = "ios";

    snapper = new AppSnaps(platform, snapsPath);

    snapper.snap = async () => {
      return new Promise(resolve => {
        resolve();
      });
    };
  });

  it("does not throw assertion error if images match", async () => {
    fakeDiff();
    fakeFileExists();
    const testName = "resolve-true";
    await assertSnapshot(snapper, testName);
  });

  it("throws error if images do not match", async () => {
    fakeDiff();
    fakeFileExists();
    const testName = "resolve-false";
    expect.assertions(1);

    try {
      await assertSnapshot(snapper, testName);
    } catch (err) {
      expect(err.code).toEqual("ERR_ASSERTION");
    }
  });

  it("asks to review the new snapshot if one does not exist at file path", async () => {
    const testName = "fake";
    expect.assertions(1);

    try {
      await assertSnapshot(snapper, testName);
    } catch (err) {
      expect(err.code).toEqual("ERR_ASSERTION");
    }
  });

  it("takes a snapshot to compare against", async () => {
    snapper.snap = jest.fn();
    fakeDiff();
    fakeFileExists();
    const testName = "resolve-true";
    await assertSnapshot(snapper, testName);
    expect(snapper.snap.mock.calls.length).toBe(1);
  });
});
