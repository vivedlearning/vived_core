import { Vector3 } from "../ValueObjects/Vector3";

export interface LineParameters {
  x0: number;
  y0: number;
  z0: number;
  a: number;
  b: number;
  c: number;
}

export class ParametricLine {
  // See https://planetcalc.com/8253/

  public static FromTwoPoint(p1: Vector3, p2: Vector3): ParametricLine {
    const dir = Vector3.Subtract(p2, p1).unit;
    return this.FromPointDirection(p1, dir);
  }

  public static FromPointDirection(
    point: Vector3,
    direction: Vector3
  ): ParametricLine {
    return new ParametricLine({
      x0: point.x,
      y0: point.y,
      z0: point.z,
      a: direction.x,
      b: direction.y,
      c: direction.z,
    });
  }

  public static Forward(): ParametricLine {
    const p = Vector3.Zero();
    const d = new Vector3(0, 0, 1);
    return this.FromPointDirection(p, d);
  }

  public static Backward(): ParametricLine {
    const p = Vector3.Zero();
    const d = new Vector3(0, 0, -1);
    return this.FromPointDirection(p, d);
  }

  public static Up(): ParametricLine {
    const p = Vector3.Zero();
    const d = new Vector3(0, 1, 0);
    return this.FromPointDirection(p, d);
  }

  public static Down(): ParametricLine {
    const p = Vector3.Zero();
    const d = new Vector3(0, -1, 0);
    return this.FromPointDirection(p, d);
  }

  public static Left(): ParametricLine {
    const p = Vector3.Zero();
    const d = new Vector3(-1, 0, 0);
    return this.FromPointDirection(p, d);
  }

  public static Right(): ParametricLine {
    const p = Vector3.Zero();
    const d = new Vector3(1, 0, 0);
    return this.FromPointDirection(p, d);
  }

  public static GetPointAtDistance(
    line: ParametricLine,
    distance: number
  ): Vector3 {
    const x = line.x0 + line.a * distance;
    const y = line.y0 + line.b * distance;
    const z = line.z0 + line.c * distance;

    return new Vector3(x, y, z);
  }

  public static GetDistanceToPoint(
    line: ParametricLine,
    point: Vector3
  ): number {
    return Vector3.Subtract(line.origin, point).magnitude;
  }

  readonly x0: number;
  readonly y0: number;
  readonly z0: number;
  readonly a: number;
  readonly b: number;
  readonly c: number;

  get origin(): Vector3 {
    return new Vector3(this.x0, this.y0, this.z0);
  }

  get direction(): Vector3 {
    return new Vector3(this.a, this.b, this.c);
  }

  constructor(parameters: LineParameters) {
    this.x0 = parameters.x0;
    this.y0 = parameters.y0;
    this.z0 = parameters.z0;

    const dir = new Vector3(parameters.a, parameters.b, parameters.c).unit;

    this.a = dir.x;
    this.b = dir.y;
    this.c = dir.z;
  }
}
