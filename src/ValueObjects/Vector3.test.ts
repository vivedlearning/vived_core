import { Vector3 } from ".";
import { Angle } from "./Angle";
import { Matrix } from "./Matrix";
import { Quaternion } from "./Quaternion";

describe("Vector 3 Value object - Creation", () => {
  it("Creates a zero vector", () => {
    const v = Vector3.Zero();
    expect(v).toEqual(new Vector3(0, 0, 0));
  });
  it("Creates a one vector", () => {
    const v = Vector3.One();
    expect(v).toEqual(new Vector3(1, 1, 1));
  });

  it("Creates a vector from an array", () => {
    const v = Vector3.FromArray([2, 5, 7]);
    expect(v).toEqual(new Vector3(2, 5, 7));
  });

  it("Creates a unit right vector", () => {
    const v = Vector3.Right();
    expect(v).toEqual(new Vector3(1, 0, 0));
  });

  it("Creates a right vector with length", () => {
    const v = Vector3.Right(3);
    expect(v).toEqual(new Vector3(3, 0, 0));
  });

  it("Creates a unit left vector", () => {
    const v = Vector3.Left();
    expect(v).toEqual(new Vector3(-1, 0, 0));
  });

  it("Creates a left vector with length", () => {
    const v = Vector3.Left(3);
    expect(v).toEqual(new Vector3(-3, 0, 0));
  });

  it("Creates a unit up vector", () => {
    const v = Vector3.Up();
    expect(v).toEqual(new Vector3(0, 1, 0));
  });

  it("Creates a up vector with length", () => {
    const v = Vector3.Up(3);
    expect(v).toEqual(new Vector3(0, 3, 0));
  });

  it("Creates a unit down vector", () => {
    const v = Vector3.Down();
    expect(v).toEqual(new Vector3(0, -1, 0));
  });

  it("Creates a down vector with length", () => {
    const v = Vector3.Down(3);
    expect(v).toEqual(new Vector3(0, -3, 0));
  });

  it("Creates a unit forward vector", () => {
    const v = Vector3.Forward();
    expect(v).toEqual(new Vector3(0, 0, 1));
  });

  it("Creates a forward vector with length", () => {
    const v = Vector3.Forward(3);
    expect(v).toEqual(new Vector3(0, 0, 3));
  });

  it("Creates a unit backward vector", () => {
    const v = Vector3.Backward();
    expect(v).toEqual(new Vector3(0, 0, -1));
  });

  it("Creates a backward vector with length", () => {
    const v = Vector3.Backward(3);
    expect(v).toEqual(new Vector3(0, 0, -3));
  });
});

describe("Vector 3 Value object - Static actions", () => {
  it("Adds two vectors", () => {
    const v1 = new Vector3(1, 2, 3);
    const v2 = new Vector3(4, 5, 6);

    const v3 = Vector3.Add(v1, v2);
    expect(v3).toEqual(new Vector3(5, 7, 9));
  });

  test("Subtracts two vectors", () => {
    const v1 = new Vector3(1, 2, 3);
    const v2 = new Vector3(6, 5, 4);

    const v3 = Vector3.Subtract(v1, v2);
    expect(v3).toEqual(new Vector3(-5, -3, -1));
  });

  test("Checks if two vectors are equal", () => {
    const v1 = new Vector3(1, 2, 3);
    const v2 = new Vector3(4, 5, 6);
    const v3 = new Vector3(1, 2, 3);
    expect(Vector3.Equal(v1, v2)).toEqual(false);
    expect(Vector3.Equal(v1, v3)).toEqual(true);
  });

  it("Checks if Vectors are close without a tolerance", () => {
    const v1 = new Vector3(1, 2, 3);
    const v2 = new Vector3(1.1, 2.2, 3.3);
    const v3 = new Vector3(1.001, 2.001, 3.001);
    expect(Vector3.Close(v1, v2)).toEqual(false);
    expect(Vector3.Close(v1, v3)).toEqual(true);
  });

  it("Checks if Vectors are close with a tolerance", () => {
    const v1 = new Vector3(1, 2, 3);
    const v2 = new Vector3(1.1, 2.2, 3.3);
    expect(Vector3.Close(v1, v2, 0.3)).toEqual(false);
    expect(Vector3.Close(v1, v2, 0.4)).toEqual(true);
  });

  it("Computes the cross product", () => {
    //From https://www.symbolab.com/solver/vector-cross-product-calculator
    const v1 = new Vector3(1, 2, 3);
    const v2 = new Vector3(4, 5, -6);

    const cross = Vector3.Cross(v1, v2);
    expect(cross).toEqual(new Vector3(-27, 18, -3));
  });

  test("Cross product", () => {
    // From https://www.symbolab.com/solver/vector-cross-product-calculator
    const v1 = new Vector3(1, 2, 3);
    const v2 = new Vector3(4, 5, -6);

    const cross = Vector3.Cross(v2, v1);
    expect(cross).toEqual(new Vector3(27, -18, 3));
  });

  test("Dot product", () => {
    // From https://www.calculatorsoup.com/calculators/algebra/dot-product-calculator.php
    const v1 = new Vector3(1, 5, 3);
    const v2 = new Vector3(2, 3, 6);

    const dot = Vector3.Dot(v1, v2);
    expect(dot).toEqual(35);
  });

  test("New vector of length", () => {
    const v1 = new Vector3(1, -5, 3);
    const v2 = Vector3.NewVectorOfLength(v1, 10);

    expect(v2.x).toBeCloseTo(1.69);
    expect(v2.y).toBeCloseTo(-8.45);
    expect(v2.z).toBeCloseTo(5.07);
  });
});

describe("Vector 3 Value object - parameters", () => {
  it("Gets the vector components", () => {
    const v = new Vector3(2, 5, 7);
    expect(v.x).toEqual(2);
    expect(v.y).toEqual(5);
    expect(v.z).toEqual(7);
  });

  it("Gets the magnitue", () => {
    // https://www.omnicalculator.com/math/unit-vector
    const v1 = new Vector3(1, -5, 3);
    expect(v1.magnitude).toBeCloseTo(5.916);
  });

  it("Gets the unit vector", () => {
    // https://www.omnicalculator.com/math/unit-vector
    const v1 = new Vector3(1, -5, 3);

    expect(v1.unit.x).toBeCloseTo(0.169);
    expect(v1.unit.y).toBeCloseTo(-0.845);
    expect(v1.unit.z).toBeCloseTo(0.507);
  });

  it("Gets the vector as an array", () => {
    const v1 = new Vector3(1, -5, 3);
    expect(v1.array).toEqual([1, -5, 3]);
  });

  it("Lerps", () => {
    const start = new Vector3(10, 20, 30);
    const end = new Vector3(20, 30, 40);
    const lerped = Vector3.Lerp(start, end, 0.5);

    expect(lerped).toEqual(new Vector3(15, 25, 35));
  });

  it("Transforms a Vector with a matrix", () => {
    const pos = new Vector3(5, 0, 0);
    const rot = Quaternion.FromAngleAxis(Vector3.Up(), Angle.FromDegrees(-90));
    const scale = new Vector3(2, 2, 2);
    const matrix = Matrix.Compose(scale, rot, pos);

    const transformed = Vector3.Transform(new Vector3(2, 1, -1), matrix);
    const expected = new Vector3(7, 2, 4);

    expect(Vector3.Close(transformed, expected)).toEqual(true);
  });

  it("Gets the Data Transfer Object", () => {
    const vec = new Vector3(1, 2, 3);

    expect(vec.dto).toEqual({
      x: 1,
      y: 2,
      z: 3,
    });
  });

  it("Makes a vector from a DTO", () => {
    const vec = Vector3.FromDTO({
      x: 1,
      y: 2,
      z: 3,
    });

    expect(vec.x).toEqual(1);
    expect(vec.y).toEqual(2);
    expect(vec.z).toEqual(3);
  });
});
