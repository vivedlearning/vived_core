import { Angle } from ".";
import { Vector2 } from "./Vector2";

describe("Vector 2 value object", () => {
  it("Creates a new vector", () => {
    const v = new Vector2(2, 5);
    expect(v.x).toEqual(2);
    expect(v.y).toEqual(5);
  });

  it("Returns the magnitude", () => {
    expect(new Vector2(0, 5).magnitude).toEqual(5);
    expect(new Vector2(0, -5).magnitude).toEqual(5);
    expect(new Vector2(5, 0).magnitude).toEqual(5);
    expect(new Vector2(-5, 0).magnitude).toEqual(5);
    expect(new Vector2(-1, -1).magnitude).toBeCloseTo(1.414);
    expect(new Vector2(1, 1).magnitude).toBeCloseTo(1.414);
  });

  it("Returns the unit", () => {
    expect(new Vector2(0, 5).unit).toEqual(new Vector2(0, 1));
    expect(new Vector2(0, -5).unit).toEqual(new Vector2(0, -1));
    expect(new Vector2(5, 0).unit).toEqual(new Vector2(1, 0));
    expect(new Vector2(-5, 0).unit).toEqual(new Vector2(-1, 0));

    const unit1 = new Vector2(5, 5).unit;
    expect(unit1.x).toBeCloseTo(0.707);
    expect(unit1.y).toBeCloseTo(0.707);
  });

  it("Retuns theta", () => {
    expect(new Vector2(0, 5).theta).toBeCloseTo(90);
    expect(new Vector2(0, -5).theta).toBeCloseTo(-90);
    expect(new Vector2(5, 0).theta).toBeCloseTo(0);
    expect(new Vector2(-5, 0).theta).toBeCloseTo(180);
  });

  test("Returns the vector as an array", () => {
    const v1 = new Vector2(1, 2);

    expect(v1.array[0]).toEqual(1);
    expect(v1.array[1]).toEqual(2);
  });
});

describe("Vector 2 static actions", () => {
  it("Create a zero vector", () => {
    expect(Vector2.Zero()).toEqual(new Vector2(0, 0));
  });

  it("Create a one vector", () => {
    expect(Vector2.One()).toEqual(new Vector2(1, 1));
  });

  it("Check for vectors to be Equal", () => {
    const v1 = new Vector2(1, 2);
    const v2 = new Vector2(2, 3);
    const v3 = new Vector2(1, 2);

    expect(Vector2.Equal(v1, v2)).toEqual(false);
    expect(Vector2.Equal(v1, v3)).toEqual(true);
  });

  it("Adds vectors", () => {
    const v1 = new Vector2(1, 2);
    const v2 = new Vector2(2, 3);
    const v3 = Vector2.Add(v1, v2);

    expect(v3).toEqual(new Vector2(3, 5));
  });

  it("Subtracts vectors", () => {
    const v1 = new Vector2(1, 2);
    const v2 = new Vector2(2, 3);
    const v3 = Vector2.Subtract(v1, v2);

    expect(v3).toEqual(new Vector2(-1, -1));
  });

  it("Checks to see if vectors are close using a default threshold", () => {
    const v1 = new Vector2(1, 2);
    const v2 = new Vector2(1.001, 2.001);
    const v3 = new Vector2(1.1, 2.1);

    expect(Vector2.Close(v1, v2)).toEqual(true);
    expect(Vector2.Close(v1, v3)).toEqual(false);
  });

  it("Checks to see if vectors are close using a passed threshold", () => {
    const v1 = new Vector2(1, 2);
    const v2 = new Vector2(1.1, 2.1);
    const v3 = new Vector2(2, 3);

    expect(Vector2.Close(v1, v2, 1)).toEqual(true);
    expect(Vector2.Close(v1, v3, 1)).toEqual(false);
  });

  it("Rotates to a new vector", () => {
    const v1 = new Vector2(1, 2);

    const r1 = Vector2.Rotate(v1, Angle.FromDegrees(90));
    expect(r1.x).toBeCloseTo(-2);
    expect(r1.y).toBeCloseTo(1);

    const r2 = Vector2.Rotate(v1, Angle.FromDegrees(-90));
    expect(r2.x).toBeCloseTo(2);
    expect(r2.y).toBeCloseTo(-1);
  });

  it("Scales a vector", () => {
    const v1 = new Vector2(1, 2);
    const scaled = Vector2.Scale(v1, 3);
    expect(scaled).toEqual(new Vector2(3, 6));
  });

  it("Make a new vector of length", () => {
    const v1 = new Vector2(1, 1);
    const lengthened = Vector2.NewVectorOfLength(v1, 3);
    expect(lengthened.x).toBeCloseTo(2.12);
    expect(lengthened.y).toBeCloseTo(2.12);
  });

  it("Calculates the dot between two vectors", () => {
    // https://onlinemschool.com/math/assistance/vector/multiply/
    const v1 = new Vector2(1, 2);
    const v2 = new Vector2(5, 6);

    const dot = Vector2.Dot(v1, v2);
    expect(dot).toEqual(17);
  });

  it("Calculates the angle between two vectors", () => {
    // https://www.omnicalculator.com/math/angle-between-two-vectors
    const v1 = new Vector2(1, 2);
    const v2 = new Vector2(3, 4);

    const angle = Vector2.AngleBetween(v1, v2);
    expect(angle.degrees).toBeCloseTo(10.305);
  });

  it("Calculates a Cross product", () => {
    const v1 = new Vector2(1, 2);
    const v2 = new Vector2(3, 4);

    const cross = Vector2.Cross(v1, v2);
    expect(cross).toEqual(-2);
  });

  it("Gets the Data Transfer Object", () => {
    const vec = new Vector2(1, 2);

    expect(vec.dto).toEqual({
      x: 1,
      y: 2,
    });
  });

  it("Makes a vector from a DTO", () => {
    const vec = Vector2.FromDTO({
      x: 1,
      y: 2,
    });

    expect(vec.x).toEqual(1);
    expect(vec.y).toEqual(2);
  });
});
