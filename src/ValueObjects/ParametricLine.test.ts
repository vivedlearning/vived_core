import { Vector3 } from ".";
import { LineParameters, ParametricLine } from "./ParametricLine";

test("Setting and getting the parameters", () => {
  const inputParameters: LineParameters = {
    x0: 1,
    y0: 2,
    z0: 3,
    a: 4,
    b: 5,
    c: 6,
  };
  const line = new ParametricLine(inputParameters);

  const dirUnit = new Vector3(4, 5, 6).unit;

  expect(line.x0).toEqual(inputParameters.x0);
  expect(line.y0).toEqual(inputParameters.y0);
  expect(line.z0).toEqual(inputParameters.z0);
  expect(line.a).toBeCloseTo(dirUnit.x);
  expect(line.b).toBeCloseTo(dirUnit.y);
  expect(line.c).toBeCloseTo(dirUnit.z);
});

test("Line from point and direction", () => {
  const point = new Vector3(1, 2, 3);
  const dir = new Vector3(10, 20, 30).unit;

  const line = ParametricLine.FromPointDirection(point, dir);

  expect(line.x0).toEqual(1);
  expect(line.y0).toEqual(2);
  expect(line.z0).toEqual(3);
  expect(line.a).toBeCloseTo(dir.x);
  expect(line.b).toBeCloseTo(dir.y);
  expect(line.c).toBeCloseTo(dir.z);
});

test("From two points", () => {
  const p1 = new Vector3(1, 2, 3);
  const p2 = new Vector3(4, 5, 6);

  const line = ParametricLine.FromTwoPoint(p1, p2);

  const dir = Vector3.Subtract(p2, p1).unit;

  expect(line.x0).toEqual(1);
  expect(line.y0).toEqual(2);
  expect(line.z0).toEqual(3);
  expect(line.a).toEqual(dir.x);
  expect(line.b).toEqual(dir.y);
  expect(line.c).toEqual(dir.z);
});

test("Get point", () => {
  const p1 = new Vector3(1, 2, 3);
  const p2 = new Vector3(4, 5, 6);

  let dir = Vector3.Subtract(p2, p1).unit;

  const distance = 11;
  dir = Vector3.NewVectorOfLength(dir, distance);
  const expectedPoint = Vector3.Add(p1, dir);

  const line = ParametricLine.FromTwoPoint(p1, p2);
  const point = ParametricLine.GetPointAtDistance(line, distance);
  expect(point.array).toEqual(expectedPoint.array);
});

test("Get point along forward", () => {
  const line = ParametricLine.Forward();
  const point = ParametricLine.GetPointAtDistance(line, 11);
  expect(point.array).toEqual([0, 0, 11]);
});

test("Get point along backwards", () => {
  const line = ParametricLine.Backward();
  const point = ParametricLine.GetPointAtDistance(line, 11);
  expect(point.array).toEqual([0, 0, -11]);
});

test("Get point along up", () => {
  const line = ParametricLine.Up();
  const point = ParametricLine.GetPointAtDistance(line, 11);
  expect(point.array).toEqual([0, 11, 0]);
});

test("Get point along down", () => {
  const line = ParametricLine.Down();
  const point = ParametricLine.GetPointAtDistance(line, 11);
  expect(point.array).toEqual([0, -11, 0]);
});

test("Get point along left", () => {
  const line = ParametricLine.Left();
  const point = ParametricLine.GetPointAtDistance(line, 11);
  expect(point.array).toEqual([-11, 0, 0]);
});

test("Get point along right", () => {
  const line = ParametricLine.Right();
  const point = ParametricLine.GetPointAtDistance(line, 11);
  expect(point.array).toEqual([11, 0, 0]);
});

test("Check for equality", () => {
  const inputParameters: LineParameters = {
    x0: 1,
    y0: 2,
    z0: 3,
    a: 4,
    b: 5,
    c: 6,
  };
  const line1 = new ParametricLine(inputParameters);
  const line2 = new ParametricLine(inputParameters);

  expect(line1).toEqual(line2);
});

test("Geting the origin", () => {
  const origin = new Vector3(1, 2, 3);
  const direction = new Vector3(4, 5, 6).unit;
  const line = ParametricLine.FromPointDirection(origin, direction);

  expect(line.origin).toEqual(origin);
});

test("Getting the direction", () => {
  const origin = new Vector3(1, 2, 3);
  const direction = new Vector3(4, 5, 6).unit;
  const line = ParametricLine.FromPointDirection(origin, direction);

  expect(Vector3.Close(line.direction, direction)).toEqual(true);
});

test("Ensures the direction is unit", () => {
  const origin = new Vector3(1, 2, 3);
  const direction = new Vector3(4, 5, 6);
  const line = ParametricLine.FromPointDirection(origin, direction);

  expect(line.direction).toEqual(direction.unit);
});

test("Get distance to point", () => {
  const origin = new Vector3(1, 2, 3);
  const direction = new Vector3(4, 5, 6);
  const line = ParametricLine.FromPointDirection(origin, direction);

  const point = new Vector3(10, 20, 30);

  const expected = Vector3.Subtract(point, origin).magnitude;

  expect(ParametricLine.GetDistanceToPoint(line, point)).toEqual(expected);
});
