import path from "path";
import setup from "./setup";

jest.mock("child_process");

describe("Test helper setup", () => {
  it("exposes a snapshot function for native", async () => {
    const { spawnSync } = require("child_process"); // eslint-disable-line
    const filePath = path.join(__dirname, ".png");
    const platform = "ios";

    await setup.mobile.takeScreenShot(platform, filePath);
    expect(spawnSync.mock.calls[0]).toEqual([
      "npx",
      ["osnap", "ios", "-f", filePath]
    ]);
  });
});
