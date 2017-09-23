/* globals expect describe it jest */
import imageDiff from "./differ";

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

  it("returns 0 for equal objects", () => {
    const { diffCount } = imageDiff(img1, img2);
    expect(diffCount).toBe(0);
  });

  it("returns a diff stream", () => {
    const { diff } = imageDiff(img1, img2);
    expect(diff.readable).toBe(true);
  });
});
