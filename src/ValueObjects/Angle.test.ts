import { Angle } from "./Angle";
describe("Angle Value Object", () => {
  it("Creates an angle from degrees", () => {
    const ang = Angle.FromDegrees(125);
    expect(ang.degrees).toEqual(125);
  });

  it("Creates an angle from degrees", () => {
    const ang = Angle.FromRadians(1.25);
    expect(ang.radians).toEqual(1.25);
  });

  it("Converts from degrees and radians", () => {
    const ang = Angle.FromDegrees(125);
    expect(ang.radians).toBeCloseTo(2.18166);
  });

  it("Converts from radians to degrees", () => {
    const ang = Angle.FromRadians(1.25);
    expect(ang.degrees).toBeCloseTo(71.61972);
  });

  it("Checks for closeness", ()=>{
    const ang1 = Angle.FromDegrees(1.555);
    const ang2 = Angle.FromDegrees(1.556);

    expect(Angle.Close(ang1, ang2, 0.0011)).toEqual(true);
    expect(Angle.Close(ang1, ang2, 0.001)).toEqual(false);
  })
});
