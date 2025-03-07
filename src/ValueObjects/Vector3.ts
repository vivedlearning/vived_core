import { Matrix } from "./Matrix";

export interface Vector3DTO {
  x: number;
  y: number;
  z: number;
}

export class Vector3 {
  /**
   * Creates a zero vector
   * @returns Vector [0,0,0]
   */
  public static Zero() {
    return new Vector3(0, 0, 0);
  }

  /**
   * Creates a vector of ones
   * @returns Vector [1,1,1]
   */
  public static One() {
    return new Vector3(1, 1, 1);
  }

  /**
   * Creates a Right vector (positive X)
   * @param length optional length of the right unit. Default is 1
   * @returns Vector [length, 0,0]
   */
  public static Right(length = 1) {
    return new Vector3(length, 0, 0);
  }

  /**
   * Creates a Left vector (negative X)
   * @param length optional length of the left unit. Default is 1
   * @returns Vector [-length, 0, 0]
   */
  public static Left(length = 1) {
    return new Vector3(-length, 0, 0);
  }

  /**
   * Creates an Up vector (positive Y)
   * @param length optional length of the vector. Default is 1
   * @returns Vector [0, length, 0]
   */
  public static Up(length = 1) {
    return new Vector3(0, length, 0);
  }

  /**
   * Creates a Down vector (negative Y)
   * @param length optional length of the vector. Default is 1
   * @returns Vector [0, -length, 0]
   */
  public static Down(length = 1) {
    return new Vector3(0, -length, 0);
  }

  /**
   * Creates a Forward vector (positive Z)
   * @param length optional length of the vector. Default is 1
   * @returns Vector [0, 0, length]
   */
  public static Forward(length = 1) {
    return new Vector3(0, 0, length);
  }

  /**
   * Creates a Backward vector (negative Z)
   * @param length optional length of the vector. Default is 1
   * @returns Vector [0, 0, -length]
   */
  public static Backward(length = 1) {
    return new Vector3(0, 0, -length);
  }

  /**
   * Creates a Vector from an array of components
   * @param values The x, y, z components as an array
   * @returns The Vector
   */
  public static FromArray(values: [number, number, number]): Vector3 {
    return new Vector3(values[0], values[1], values[2]);
  }

  /**
   * Creates a Vector from a Data Transfer Object
   * @param dto The Data Transfer Object
   * @returns The Vector
   */
  public static FromDTO(dto: Vector3DTO): Vector3 {
    return new Vector3(dto.x, dto.y, dto.z);
  }

  /**
   * Adds Vector B to Vector A
   * @param a Vector A
   * @param b Vector B
   * @return Result of A + B
   */
  static Add = (a: Vector3, b: Vector3): Vector3 => {
    return new Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
  };

  /**
   * Subtracts Vector B from Vector A
   * @param a Vector A
   * @param b Vector B
   * @return Result of A - B
   */
  static Subtract = (a: Vector3, b: Vector3): Vector3 => {
    return new Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
  };

  /**
   * Checks to see if the two vectors are equal
   * @param a Vector A
   * @param b Vector B
   * @return True if the two vectors are equal, otherwise false
   */
  static Equal = (a: Vector3, b: Vector3): boolean => {
    if (a.x === b.x && a.y === b.y && a.z === b.z) return true;
    else return false;
  };

  /**
   * Checks to see if the two vectors are close
   * @param a Vector A
   * @param b Vector B
   * @param tolerance Tolerance for checking. Defaulted to 0.01
   * @return True if the distance between the two vectors is less than the tolerance, otherwise false
   */
  static Close = (a: Vector3, b: Vector3, tolerance = 0.01): boolean => {
    const diff = Vector3.Subtract(a, b);
    const diffMag = diff.magnitude;

    if (diffMag < tolerance) return true;
    else return false;
  };

  /**
   * Calculates the Cross Product between two vectors
   * @param a Vector A
   * @param b Vector B
   * @return the cross product between the two vectors
   */
  static Cross = (a: Vector3, b: Vector3): Vector3 => {
    const x = a.y * b.z - a.z * b.y;
    const y = a.z * b.x - a.x * b.z;
    const z = a.x * b.y - a.y * b.x;
    return new Vector3(x, y, z);
  };

  /**
   * Calculates the Dot Product between two vectors
   * @param a Vector A
   * @param b Vector B
   * @return the dot product between the two vectors
   */
  static Dot = (a: Vector3, b: Vector3): number => {
    return a.x * b.x + a.y * b.y + a.z * b.z;
  };

  /**
   * Create a new vector that will have the same unit as the original vector but set to the desired length
   * @param vec The original vector
   * @param length Desired length of the final vector
   * @return The resulting vector
   */
  static NewVectorOfLength = (vec: Vector3, length: number): Vector3 => {
    const unit = vec.unit;
    return new Vector3(length * unit.x, length * unit.y, length * unit.z);
  };

  static Transform = (vector: Vector3, matrix: Matrix): Vector3 => {
    const m = matrix.m;
    const rx = vector.x * m[0] + vector.y * m[4] + vector.z * m[8] + m[12];
    const ry = vector.x * m[1] + vector.y * m[5] + vector.z * m[9] + m[13];
    const rz = vector.x * m[2] + vector.y * m[6] + vector.z * m[10] + m[14];
    const rw =
      1 / (vector.x * m[3] + vector.y * m[7] + vector.z * m[11] + m[15]);

    const x = rx * rw;
    const y = ry * rw;
    const z = rz * rw;

    return new Vector3(x, y, z);
  };

  /**
   * Linearly interpolates between two vectors
   * @param initial The starting point
   * @param final The end point
   * @param percent Percent of the lerp. 0 will return initial and 1 will return final
   * @return the LERP result Vector3
   */
  static Lerp = (
    initial: Vector3,
    final: Vector3,
    percent: number
  ): Vector3 => {
    const x = Vector3.interpolateNumber(initial.x, final.x, percent);
    const y = Vector3.interpolateNumber(initial.y, final.y, percent);
    const z = Vector3.interpolateNumber(initial.z, final.z, percent);

    return new Vector3(x, y, z);
  };

  private static interpolateNumber(a: number, b: number, percent: number) {
    return a + (b - a) * percent;
  }

  readonly x: number;
  readonly y: number;
  readonly z: number;

  /**
   * Gets the magnitude of the Vector3
   * @returns the magnitude of the Vector3
   */
  get magnitude(): number {
    const xSqr = this.x * this.x;
    const ySqr = this.y * this.y;
    const zSqr = this.z * this.z;

    const magnitude = Math.sqrt(xSqr + ySqr + zSqr);
    return magnitude;
  }

  /**
   * Gets the unit vector for this Vector3
   * @returns the unit vector
   */
  get unit(): Vector3 {
    const mag = this.magnitude;
    if (mag === 0) {
      return Vector3.Zero();
    }

    const unitX = this.x / mag;
    const unitY = this.y / mag;
    const unitZ = this.z / mag;
    return new Vector3(unitX, unitY, unitZ);
  }

  /**
   * Gets the vector as an array
   * @returns an array representing the vector
   */
  get array(): [number, number, number] {
    return [this.x, this.y, this.z];
  }

  /**
   * Get the vector as a Data Transfer Object
   */
  get dto(): Vector3DTO {
    return { x: this.x, y: this.y, z: this.z };
  }

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}
