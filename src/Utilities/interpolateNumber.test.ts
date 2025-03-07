import { interpolateNumber } from "./interpolateNumber";

describe("Lerp number", () => {
  it("Interpolate as expected", () => {
    const lerpedVal = interpolateNumber(0, 10, 0.5);
    expect(lerpedVal).toEqual(5);
  });

  it("Interpolate without clamping", () => {
    const lerpedVal = interpolateNumber(0, 10, -0.5);
    expect(lerpedVal).toEqual(-5);
  });

  it("Interpolate without clamping", () => {
    const lerpedVal = interpolateNumber(0, 10, 1.5);
    expect(lerpedVal).toEqual(15);
  });

  it("Interpolate with clamping", () => {
    const lerpedVal = interpolateNumber(0, 10, -0.5, true);
    expect(lerpedVal).toEqual(0);
  });

  it("Interpolate with clamping", () => {
    const lerpedVal = interpolateNumber(0, 10, 1.5, true);
    expect(lerpedVal).toEqual(10);
  });
});
