/* globals jest */

let mockPixelMatch = (data1, data2) => {
  if (data1.equals(data2)) {
    return 0;
  }
  return 1;
};

mockPixelMatch = jest.fn();
module.exports = mockPixelMatch;
