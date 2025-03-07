import { Angle } from "./Angle";
import { Matrix } from "./Matrix";
import { Vector3 } from "./Vector3";

export interface QuaternionDTO {
  x: number;
  y: number;
  z: number;
  w: number;
}

export class Quaternion {
  /**
   * Checks to see if two Quaternions are equal
   * @param a Quaternion A
   * @param b Quaternion B
   * @returns True if they are equal, otherwise false
   */
  public static Equal(a: Quaternion, b: Quaternion): boolean {
    if (a.x === b.x && a.y === b.y && a.z === b.z && a.w === b.w) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Checks two quaternions to see if they are close
   * @param a Quaterion A
   * @param b Quaterion B
   * @param threshold "Close" threshold. Defaults to 0.001
   * @returns True if each of Quaterion's components are within the threshold of each other
   */
  public static Close(
    a: Quaternion,
    b: Quaternion,
    threshold = 0.001
  ): boolean {
    const aArray = a.toArray();
    const bArray = b.toArray();

    let areClose = true;
    for (let i = 0; i < 4; i++) {
      let diff = aArray[i] - bArray[i];
      if (diff < 0) {
        diff = -diff;
      }
      if (diff > threshold) {
        areClose = false;
        break;
      }
    }
    return areClose;
  }

  /**
   * Multiplies A*B
   * @param a Quaterion A
   * @param b Quaternion B
   * @returns The result of A*B
   */
  public static Multiply(a: Quaternion, b: Quaternion): Quaternion {
    const x = a.x * b.w + a.y * b.z - a.z * b.y + a.w * b.x;
    const y = -a.x * b.z + a.y * b.w + a.z * b.x + a.w * b.y;
    const z = a.x * b.y - a.y * b.x + a.z * b.w + a.w * b.z;
    const w = -a.x * b.x - a.y * b.y - a.z * b.z + a.w * b.w;
    return Quaternion.FromArray([x, y, z, w]);
  }

  /**
   * Creates a new Quaterion from an array of values
   * @param values The four values of the Quaterion: [x,y,z,w]
   * @returns A Quaterion
   */
  public static FromArray(
    values: [number, number, number, number]
  ): Quaternion {
    return new Quaternion(values[0], values[1], values[2], values[3]);
  }

  /**
   * Creates a Quaterion from a Data Transfer Object
   * @param dto The Data Transfer Object
   * @returns The Quaternion
   */
  public static FromDTO(dto: QuaternionDTO): Quaternion {
    return new Quaternion(dto.x, dto.y, dto.z, dto.w);
  }

  /**
   * Creates an Identity Quaternion
   * @returns An Identity Quaternion
   */
  public static Identity(): Quaternion {
    return new Quaternion(0, 0, 0, 1);
  }

  /**
   * Creates an quaterion about an axis for a given angle
   * @param axis The rotation axis
   * @param angle The rotation angle
   * @returns The resulting Quaterion
   */
  public static FromAngleAxis(axis: Vector3, angle: Angle): Quaternion {
    const sin = Math.sin(angle.radians / 2);
    const axisUnit = axis.unit;
    const w = Math.cos(angle.radians / 2);
    const x = axisUnit.x * sin;
    const y = axisUnit.y * sin;
    const z = axisUnit.z * sin;
    return new Quaternion(x, y, z, w);
  }

  public static FromDirectionVector(direction: Vector3): Quaternion {
    if (direction.magnitude === 0) {
      return Quaternion.Identity();
    }

    const dirUnit = direction.unit;

    if (dirUnit.x === 0 && dirUnit.z === 0) {
      if (dirUnit.y > 0) {
        return Quaternion.FromYawPitchRoll(
          Angle.FromDegrees(0),
          Angle.FromDegrees(-90),
          Angle.FromDegrees(0)
        );
      } else {
        return Quaternion.FromYawPitchRoll(
          Angle.FromDegrees(0),
          Angle.FromDegrees(90),
          Angle.FromDegrees(0)
        );
      }
    }

    const yawRadians = -Math.atan2(dirUnit.z, dirUnit.x) + Math.PI / 2;
    const len = Math.sqrt(dirUnit.x * dirUnit.x + dirUnit.z * dirUnit.z);
    const pitchRadians = -Math.atan2(dirUnit.y, len);

    const yaw = Angle.FromRadians(yawRadians);
    const pitch = Angle.FromRadians(pitchRadians);
    const roll = Angle.FromRadians(0);

    return Quaternion.FromYawPitchRoll(yaw, pitch, roll);
  }

  /**
   * Froms up a Quaternion from the Yaw-Pitch-Roll (Tait-Bryan) convetion
   * @param yaw defines the rotation around the y axis
   * @param pitch defines the rotation around the x axis
   * @param roll defines the rotation around the z axis
   * @returns the resulting quaterion
   */
  public static FromYawPitchRoll(
    yaw: Angle,
    pitch: Angle,
    roll: Angle
  ): Quaternion {
    const halfRoll = roll.radians * 0.5;
    const halfPitch = pitch.radians * 0.5;
    const halfYaw = yaw.radians * 0.5;

    const sinRoll = Math.sin(halfRoll);
    const cosRoll = Math.cos(halfRoll);
    const sinPitch = Math.sin(halfPitch);
    const cosPitch = Math.cos(halfPitch);
    const sinYaw = Math.sin(halfYaw);
    const cosYaw = Math.cos(halfYaw);

    const x = cosYaw * sinPitch * cosRoll + sinYaw * cosPitch * sinRoll;
    const y = sinYaw * cosPitch * cosRoll - cosYaw * sinPitch * sinRoll;
    const z = cosYaw * cosPitch * sinRoll - sinYaw * sinPitch * cosRoll;
    const w = cosYaw * cosPitch * cosRoll + sinYaw * sinPitch * sinRoll;

    return new Quaternion(x, y, z, w);
  }

  /**
   * Creates a Quaternion from three euler angles.
   * @param x Rotation about the x axis
   * @param y Rotation about the y axis
   * @param z Rotation about the z axis
   * @returns The Quaterion
   */
  public static FromEuler(x: Angle, y: Angle, z: Angle) {
    return this.FromYawPitchRoll(y, x, z);
  }

  /**
   * Returns a new Quaternion that is an invert of A
   * @param a The quaternion to invert
   * @returns The inverted Quaternion
   */
  public static Inverse(a: Quaternion): Quaternion {
    return new Quaternion(-a.x, -a.y, -a.z, a.w);
  }

  public static AngleBetween(a: Quaternion, b: Quaternion): Angle {
    const aInv = this.Inverse(a);
    const diffQ = this.Multiply(aInv, b);

    const angDeg = diffQ.angle.degrees;
    if(angDeg > 180) {
      return Angle.FromDegrees(360 - angDeg)
    } else {
      return diffQ.angle;
    }
  }

  /**
   * Spherically interpolates between two quaternions
   * @param initial The initial quaternion
   * @param final The final quaterion
   * @param percent The percent along the slerp. 0 will return the initial quaterion and 1 will return the final quaterion
   * @returns The interpolated quaterion
   */
  public static Slerp(
    initial: Quaternion,
    final: Quaternion,
    percent: number
  ): Quaternion {
    let A;
    let B;
    let C =
      initial.x * final.x +
      initial.y * final.y +
      initial.z * final.z +
      initial.w * final.w;
    let flip = false;

    if (C < 0) {
      flip = true;
      C = -C;
    }

    if (C > 0.999999) {
      B = 1 - percent;
      A = flip ? -percent : percent;
    } else {
      const D = Math.acos(C);
      const E = 1.0 / Math.sin(D);
      B = Math.sin((1.0 - percent) * D) * E;
      A = flip ? -Math.sin(percent * D) * E : Math.sin(percent * D) * E;
    }

    const x = B * initial.x + A * final.x;
    const y = B * initial.y + A * final.y;
    const z = B * initial.z + A * final.z;
    const w = B * initial.w + A * final.w;

    return new Quaternion(x, y, z, w);
  }

  /**
   * Calculates a Quaternion from a rotation matrix
   * @param rotationMatrix A normalized, non-scaled rotation matrix
   * @returns The Quaterion
   */
  public static FromRotationMatrix(rotationMatrix: Matrix): Quaternion {
    const m = rotationMatrix.m;
    const m11 = m[0];
    const m12 = m[4];
    const m13 = m[8];
    const m21 = m[1];
    const m22 = m[5];
    const m23 = m[9];
    const m31 = m[2];
    const m32 = m[6];
    const m33 = m[10];
    const trace = m11 + m22 + m33;
    let s;

    let x = 0;
    let y = 0;
    let z = 0;
    let w = 0;
    if (trace > 0) {
      s = 0.5 / Math.sqrt(trace + 1.0);

      w = 0.25 / s;
      x = (m32 - m23) * s;
      y = (m13 - m31) * s;
      z = (m21 - m12) * s;
    } else if (m11 > m22 && m11 > m33) {
      s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);

      w = (m32 - m23) / s;
      x = 0.25 * s;
      y = (m12 + m21) / s;
      z = (m13 + m31) / s;
    } else if (m22 > m33) {
      s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);

      w = (m13 - m31) / s;
      x = (m12 + m21) / s;
      y = 0.25 * s;
      z = (m23 + m32) / s;
    } else {
      s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);

      w = (m21 - m12) / s;
      x = (m13 + m31) / s;
      y = (m23 + m32) / s;
      z = 0.25 * s;
    }

    return new Quaternion(x, y, z, w);
  }

  public static ToRotationMatrix(quat: Quaternion): Matrix {
    return Matrix.Compose(Vector3.One(), quat, Vector3.Zero());
  }

  /**
   * Copy the quaternion to an array
   * @returns an array populated with 4 elements from the quaternion coordinates
   */
  toArray(): [number, number, number, number] {
    return [this.x, this.y, this.z, this.w];
  }

  get angle(): Angle {
    const angle = 2 * Math.acos(this.w);
    return Angle.FromRadians(angle);
  }

  get axis(): Vector3 {
    const x = this.x / Math.sqrt(1 - this.w * this.w);
    const y = this.y / Math.sqrt(1 - this.w * this.w);
    const z = this.z / Math.sqrt(1 - this.w * this.w);
    return new Vector3(x, y, z);
  }

  /**
   * Get the quaternion as a Data Transfer Object
   */
  get dto(): QuaternionDTO {
    return { x: this.x, y: this.y, z: this.z, w: this.w };
  }

  readonly x: number;
  readonly y: number;
  readonly z: number;
  readonly w: number;

  constructor(x: number, y: number, z: number, w: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }
}
