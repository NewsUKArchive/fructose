/* globals it describe expect jest */

import path from "path";
import Snapper from "./snapper";

jest.mock("child_process");

describe("snapper", () => {
  it("sets a platform to snap", () => {
    const platform = "ios";
    const snapper = new Snapper(platform);
    expect(snapper.platform).toBe("ios");
  });

  it("throws if an unknown platform is set", () => {
    const platform = "rubbish";
    expect(() => new Snapper(platform)).toThrow();
  });

  it("calls snap", async () => {
    const { spawnSync } = require("child_process"); // eslint-disable-line
    const platform = "ios";
    const snapper = new Snapper(platform);
    const outputFile = path.join(__dirname, ".png");
    await snapper.snap(outputFile);

    expect(spawnSync.mock.calls[0]).toEqual([
      "npx",
      ["osnap", "ios", "-f", path.join(__dirname, ".png")]
    ]);
  });

  it("throws if output path is not a string", async () => {
    const platform = "ios";
    const snapper = new Snapper(platform);
    expect(() => snapper.snap({})).toThrow();
  });
});
