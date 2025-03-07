import { ParametricLine } from "./ParametricLine";
import { ParametricPlane } from "./ParametricPlane";
import { Vector3 } from "../ValueObjects";

test("Setting from point and normal", () => {
  const point = new Vector3(1, 2, 3);
  const normal = new Vector3(4, 5, 6);
  const plane = ParametricPlane.FromPointNormal(point, normal);

  const parameters = plane.GetParameters();

  const dot = Vector3.Dot(point, normal);
  expect(parameters.a).toEqual(normal.x);
  expect(parameters.b).toEqual(normal.y);
  expect(parameters.c).toEqual(normal.z);
  expect(parameters.d).toEqual(-dot);
});

test("From three points", () => {
  //From https://keisan.casio.com/exec/system/1223596129
  const A = new Vector3(1, 2, -2);
  const B = new Vector3(3, -2, 1);
  const C = new Vector3(5, 1, -4);

  const plane = ParametricPlane.FromThreePoints(A, B, C);
  const parameters = plane.GetParameters();

  expect(parameters.a).toEqual(11);
  expect(parameters.b).toEqual(16);
  expect(parameters.c).toEqual(14);
  expect(parameters.d).toEqual(-15);
});

test("Intersection", () => {
  const point = new Vector3(1, 1, 1);
  const dir = new Vector3(1, 0, 0);
  const line = ParametricLine.FromPointDirection(point, dir);

  const plane1 = new Vector3(-1, 0, 0);
  const plane2 = new Vector3(-1, 1, 0);
  const plane3 = new Vector3(-1, 0, 1);
  const plane = ParametricPlane.FromThreePoints(plane1, plane2, plane3);

  const intersect = plane.intersectLine(line);

  expect(intersect?.x).toBeCloseTo(-1);
  expect(intersect?.y).toBeCloseTo(1);
  expect(intersect?.z).toBeCloseTo(1);
});

test("Intersection", () => {
  //From http://www.ambrsoft.com/TrigoCalc/Plan3D/PlaneLineIntersection_.htm

  const line1 = new Vector3(4, 1, 1);
  const line2 = new Vector3(8, -2, -2);
  const line = ParametricLine.FromTwoPoint(line1, line2);

  const plane1 = new Vector3(-1, 2, 4);
  const plane2 = new Vector3(2, 1, 3);
  const plane3 = new Vector3(1, 3, 2);
  const plane = ParametricPlane.FromThreePoints(plane1, plane2, plane3);

  const intersect = plane.intersectLine(line);

  expect(intersect?.x).toBeCloseTo(2.93);
  expect(intersect?.y).toBeCloseTo(1.8);
  expect(intersect?.z).toBeCloseTo(1.8);
});

test("If parallel, intersect should come back undefined", () => {
  const line1 = new Vector3(0, 1, 0);
  const line2 = new Vector3(0, -1, 0);
  const line = ParametricLine.FromTwoPoint(line1, line2); //Vertical line going through the origin

  const plane1 = new Vector3(0, 0, 0);
  const plane2 = new Vector3(0, 1, 0);
  const plane3 = new Vector3(0, 0, 1);
  const plane = ParametricPlane.FromThreePoints(plane1, plane2, plane3); //y-z plane

  const intersect = plane.intersectLine(line);

  expect(intersect).toBeUndefined();
});

test("XY Plane", () => {
  const plane = ParametricPlane.XY();
  expect(plane.GetParameters()).toEqual({
    a: 0,
    b: 0,
    c: 1,
    d: 0,
  });
});

test("ZX Plane", () => {
  const plane = ParametricPlane.ZX();
  expect(plane.GetParameters()).toEqual({
    a: 0,
    b: 1,
    c: 0,
    d: 0,
  });
});

test("YZ Plane", () => {
  const plane = ParametricPlane.YZ();
  expect(plane.GetParameters()).toEqual({
    a: 1,
    b: 0,
    c: 0,
    d: 0,
  });
});

test("Check for equality", () => {
  const point = new Vector3(1, 2, 3);
  const normal = new Vector3(4, 5, 6);
  const plane1 = ParametricPlane.FromPointNormal(point, normal);
  const plane2 = ParametricPlane.FromPointNormal(point, normal);

  expect(plane1).toEqual(plane2);
});
