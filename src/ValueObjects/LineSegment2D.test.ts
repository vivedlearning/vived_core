import { Vector2 } from "./Vector2";
import { LineSegment2D } from "./LineSegment2D";

test("Construction stores the start and end pos", () => {
  const start = new Vector2(2, 3);
  const end = new Vector2(4, 5);
  const seg = new LineSegment2D(start, end);

  expect(seg.end.x).toEqual(4);
  expect(seg.end.y).toEqual(5);

  expect(seg.start.x).toEqual(2);
  expect(seg.start.y).toEqual(3);
});

test("Direction", () => {
  const start = new Vector2(2, 3);
  const end = new Vector2(2, 5);
  const seg = new LineSegment2D(start, end);

  expect(seg.direction.x).toEqual(0);
  expect(seg.direction.y).toEqual(1);
});

test("Direction", () => {
  const start = new Vector2(2, 3);
  const end = new Vector2(-10, 3);
  const seg = new LineSegment2D(start, end);

  expect(seg.direction.x).toEqual(-1);
  expect(seg.direction.y).toEqual(0);
});

test("Length", () => {
  const start = new Vector2(0, 0);
  const end = new Vector2(10, 0);
  const seg = new LineSegment2D(start, end);

  expect(seg.length).toEqual(10);
});

test("Position at percent", () => {
  const start = new Vector2(0, 0);
  const end = new Vector2(10, 0);
  const seg = new LineSegment2D(start, end);

  const zero = LineSegment2D.GetPositionAtPercent(seg, 0);
  expect(zero.x).toEqual(0);
  expect(zero.y).toEqual(0);

  const one = LineSegment2D.GetPositionAtPercent(seg, 1);
  expect(one.x).toEqual(10);
  expect(one.y).toEqual(0);
});

test("Intersect", () => {
  const lineA = new LineSegment2D(new Vector2(1, 1), new Vector2(15, 1));
  const lineB = new LineSegment2D(new Vector2(10, -2), new Vector2(10, 2));

  const intersection = LineSegment2D.Intersect(lineA, lineB);

  expect(intersection?.x).toEqual(10);
  expect(intersection?.y).toEqual(1);
});

test("Intersect with tolerance", () => {
  const lineA = new LineSegment2D(new Vector2(1, 1), new Vector2(9.5, 1));
  const lineB = new LineSegment2D(new Vector2(10, -2), new Vector2(10, 2));

  const intersection1 = LineSegment2D.Intersect(lineA, lineB, 0.2);
  expect(intersection1).toBeUndefined();

  const intersection2 = LineSegment2D.Intersect(lineA, lineB, 0.5);

  expect(intersection2?.x).toEqual(10);
  expect(intersection2?.y).toEqual(1);
});

test("Parallel line should not intersect", () => {
  const lineA = new LineSegment2D(new Vector2(1, 0), new Vector2(15, 0));
  const lineB = new LineSegment2D(new Vector2(0, 0), new Vector2(10, 0));

  const intersection = LineSegment2D.Intersect(lineA, lineB);

  expect(intersection).toBeUndefined();
});

test("Short segments should not intersect", () => {
  const lineA = new LineSegment2D(new Vector2(1, 1), new Vector2(9, 1));
  const lineB = new LineSegment2D(new Vector2(10, -2), new Vector2(10, 2));

  const intersection = LineSegment2D.Intersect(lineA, lineB);

  expect(intersection).toBeUndefined();
});

test("Equality", () => {
  const lineA = new LineSegment2D(new Vector2(1, 0), new Vector2(15, 0));
  const lineB = new LineSegment2D(new Vector2(1, 0), new Vector2(15, 0));

  expect(lineA).toEqual(lineB);
});

test("Closest point", () => {
  const startPosition = new Vector2(-9, 2);
  const endPosition = new Vector2(3, 2);
  const line = new LineSegment2D(startPosition, endPosition);

  const closestPoint = LineSegment2D.ClosestPointOnLine(
    line,
    new Vector2(1, 1)
  );

  expect(closestPoint.x).toEqual(1);
  expect(closestPoint.y).toEqual(2);
});

test("Closest point should be clamped to the start", () => {
  const startPosition = new Vector2(-9, 2);
  const endPosition = new Vector2(3, 2);
  const line = new LineSegment2D(startPosition, endPosition);

  const closestPoint = LineSegment2D.ClosestPointOnLine(
    line,
    new Vector2(-12, 2)
  );

  expect(closestPoint.x).toEqual(-9);
  expect(closestPoint.y).toEqual(2);
});

test("Closest point should be clamped to the end", () => {
  const startPosition = new Vector2(-9, 2);
  const endPosition = new Vector2(3, 2);
  const line = new LineSegment2D(startPosition, endPosition);

  const closestPoint = LineSegment2D.ClosestPointOnLine(
    line,
    new Vector2(5, 2)
  );

  expect(closestPoint.x).toEqual(3);
  expect(closestPoint.y).toEqual(2);
});
