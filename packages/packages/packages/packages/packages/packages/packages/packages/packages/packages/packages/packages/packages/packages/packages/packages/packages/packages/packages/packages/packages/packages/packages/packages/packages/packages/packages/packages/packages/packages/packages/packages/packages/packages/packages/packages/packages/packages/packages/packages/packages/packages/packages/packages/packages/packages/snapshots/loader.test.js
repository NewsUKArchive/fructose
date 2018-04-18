/* globals describe it expect  */

import path from "path";
import imageLoader from "./loader";

describe("image loader", () => {
  it("returns a readable image at path", async () => {
    const aPath = path.join(__dirname, "/__mocks__/image.png");
    const image = await imageLoader(aPath);
    expect(image.readable).toBe(true);
  });
});
