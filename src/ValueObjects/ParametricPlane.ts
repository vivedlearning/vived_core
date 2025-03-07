import { ParametricLine } from "./ParametricLine";
import { Vector3 } from "../ValueObjects/Vector3";

// Plane equation: a*x + b*y + c*x + d = 0;

export interface PlaneParameters {
  a: number;
  b: number;
  c: number;
  d: number;
}

export class ParametricPlane {
  static FromPointNormal(point: Vector3, normal: Vector3): ParametricPlane {
    return new ParametricPlane(point, normal);
  }

  static FromThreePoints(A: Vector3, B: Vector3, C: Vector3): ParametricPlane {
    const point = A;
    const AB = Vector3.Subtract(B, A);
    const AC = Vector3.Subtract(C, A);
    const normal = Vector3.Cross(AB, AC);

    return new ParametricPlane(point, normal);
  }

  static XY(): ParametricPlane {
    const p = Vector3.Zero();
    const n = new Vector3(0, 0, 1);
    return new ParametricPlane(p, n);
  }

  static ZX(): ParametricPlane {
    const p = Vector3.Zero();
    const n = new Vector3(0, 1, 0);
    return new ParametricPlane(p, n);
  }

  static YZ(): ParametricPlane {
    const p = Vector3.Zero();
    const n = new Vector3(1, 0, 0);
    return new ParametricPlane(p, n);
  }

  GetParameters(): PlaneParameters {
    const a = this.normal.x;
    const b = this.normal.y;
    const c = this.normal.z;
    let d = Vector3.Dot(this.point, this.normal);

    if (d !== 0) {
      d *= -1;
    }

    return {
      a,
      b,
      c,
      d,
    };
  }

  public intersectLine(line: ParametricLine): Vector3 | undefined {
    const { x0, y0, z0, a, b, c } = line;
    const { a: A, b: B, c: C, d: D } = this.GetParameters();

    const tNumerator = -(A * x0 + B * y0 + C * z0 + D);
    const tDenominator = A * a + B * b + C * c;

    if (tDenominator === 0) {
      return undefined;
    }

    const t = tNumerator / tDenominator;

    const intersect = ParametricLine.GetPointAtDistance(line, t);

    return intersect;
  }

  constructor(private point: Vector3, private normal: Vector3) {}
}
