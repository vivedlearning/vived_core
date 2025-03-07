import { Vector2 } from "./Vector2";

export class LineSegment2D {
  public static GetPositionAtPercent(
    line: LineSegment2D,
    percent: number
  ): Vector2 {
    const dir = line.direction;
    const length = percent * line.length;

    const localPos = Vector2.NewVectorOfLength(dir, length);

    return Vector2.Add(line.start, localPos);
  }

  public static Intersect(
    a: LineSegment2D,
    b: LineSegment2D,
    tolerance = 0
  ): Vector2 | undefined {
    // See https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
    const x1 = a.start.x;
    const y1 = a.start.y;
    const x2 = a.end.x;
    const y2 = a.end.y;
    const x3 = b.start.x;
    const y3 = b.start.y;
    const x4 = b.end.x;
    const y4 = b.end.y;

    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (denominator === 0) {
      return undefined;
    }

    const tNumerator = (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4);
    const t = tNumerator / denominator;

    const tTolearnce = tolerance / a.length;
    if (t < -tTolearnce || t > 1 + tTolearnce) {
      return undefined;
    }

    const uNumerator = (x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3);
    const u = uNumerator / denominator;

    const uTolearnce = tolerance / b.length;
    if (u < -uTolearnce || u > 1 + uTolearnce) return undefined;

    const px = x1 + t * (x2 - x1);
    const py = y1 + t * (y2 - y1);

    return new Vector2(px, py);
  }

  public static ClosestPointOnLine(
    line: LineSegment2D,
    point: Vector2
  ): Vector2 {
    // see https://monkeyproofsolutions.nl/wordpress/how-to-calculate-the-shortest-distance-between-a-point-and-a-line/
    let direction = Vector2.Subtract(line.end, line.start);
    const pointToStart = Vector2.Subtract(point, line.start);
    const tNumerator = Vector2.Dot(direction, pointToStart);
    const tDenominator = Vector2.Dot(direction, direction);
    const t = tNumerator / tDenominator;

    if (t < 0) {
      return line.start;
    } else if (t > 1) {
      return line.end;
    } else {
      const length = t * direction.magnitued;
      direction = Vector2.NewVectorOfLength(direction, length);
      return Vector2.Add(line.start, direction);
    }
  }

  readonly start: Vector2;
  readonly end: Vector2;

  public get length(): number {
    return Vector2.Subtract(this.start, this.end).magnitued;
  }

  public get direction(): Vector2 {
    return Vector2.Subtract(this.end, this.start).unit;
  }

  constructor(start: Vector2, end: Vector2) {
    this.start = start;
    this.end = end;
  }
}
