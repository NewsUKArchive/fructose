/* globals expect describe it jest */
import pixelmatch from "pixelmatch";
import imageDiff from "./differ";

const PNG = require("pngjs").PNG;

describe("Snapshot differ", () => {
  jest.mock("pixelmatch");

  const img1 = {
    data: new Buffer("abc"),
    width: 5,
    height: 2
  };

  const img2 = {
    data: new Buffer("abc"),
    width: 5,
    height: 2
  };

  it("returns 0 for equal objects", async () => {
    const diff = new PNG({ width: img1.width, height: img1.height });
    await imageDiff(img1, img2);
    expect(pixelmatch).toBeCalledWith(img1.data, img2.data, diff.data, 5, 2, {
      threshold: 0.1
    });
  });

  it("returns a diff stream", () => {
    const { diff } = imageDiff(img1, img2);
    expect(diff.readable).toBe(true);
  });
});
