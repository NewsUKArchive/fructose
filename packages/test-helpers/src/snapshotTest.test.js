/* globals expect beforeEach */

import stack from "callsite";
import path from "path";
import log from "../../common/logger";
import AppSnaps from "../../snapshots";
import { assertSnapshot, snapTest } from "./snapshotTest";
import sinon from "sinon";
jest.unmock("pixelmatch");

describe("snapshotAssert", () => {
  let snapper;

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

  it("returns true if images match", () => {
    const testName = "returns-true";
    return assertSnapshot(snapper, testName);
  });

  it("returns false if images to not match", async () => {
    const testName = "returns-false";
    expect.assertions(1);

    try {
      await assertSnapshot(snapper, testName);
    } catch (err) {
      expect(err.code).toEqual("ERR_ASSERTION");
    }
  });

  it("asks to review the new snapshot if one does not exist", async () => {
    const testName = "fake";
    expect.assertions(1);

    try {
      await assertSnapshot(snapper, testName);
    } catch (err) {
      expect(err.code).toEqual("ERR_ASSERTION");
    }
  });

  it("calls snapshot snap", async () => {
    snapper.snap = jest.fn();
    const testName = "returns-true";
    await assertSnapshot(snapper, testName);
    expect(snapper.snap.mock.calls.length).toBe(1);
  });
});
