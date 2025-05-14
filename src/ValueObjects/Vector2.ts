import { Angle } from ".";

export class Vector2 {
  /**
   * Creates a zero vector
   * @returns Vector [0,0]
   */
  public static Zero(): Vector2 {
    return new Vector2(0, 0);
  }

  /**
   * Creates a one vector
   * @returns Vector [1,1]
   */
  public static One(): Vector2 {
    return new Vector2(1, 1);
  }

  /**
   * Checks to see if Vector A equals Vector B
   * @param a Vector A
   * @param b Vector B
   * @returns True if Vector A === Vector B
   */
  public static Equal(a: Vector2, b: Vector2): boolean {
    if (a.x !== b.x) return false;
    if (a.y !== b.y) return false;
    return true;
  }

  /**
   * Creates a Vector from a Data Transfer Object
   * @param dto The Data Transfer Object
   * @returns The Vector
   */
  public static FromDTO(dto: { x: number; y: number }): Vector2 {
    return new Vector2(dto.x, dto.y);
  }

  /**
   * Adds Vector B to Vector A
   * @param a Vector A
   * @param b Vector B
   * @returns A + B
   */
  public static Add(a: Vector2, b: Vector2): Vector2 {
    return new Vector2(a.x + b.x, a.y + b.y);
  }

  /**
   * Subtracts Vector B from Vector A
   * @param a Vector A
   * @param b Vector B
   * @returns A - B
   */
  public static Subtract(a: Vector2, b: Vector2): Vector2 {
    return new Vector2(a.x - b.x, a.y - b.y);
  }

  /**
   * Checks to see if Vector A is close to Vector B
   * @param a Vector A
   * @param b Vector B
   * @param threshold Tolerance to define "close". Defaults to 0.01
   * @returns True if A and B are close enough
   */
  public static Close = (
    a: Vector2,
    b: Vector2,
    threshold: number = 0.01
  ): boolean => {
    const diff = Vector2.Subtract(a, b);
    const diffMag = diff.magnitude;

    if (diffMag < threshold) return true;
    else return false;
  };

  /**
   * Rotates a vector by an angle
   * @param vec The original vector
   * @param angle The angle
   * @returns A new Vector that has been rotated from the original by an angle
   */
  public static Rotate = (vec: Vector2, angle: Angle): Vector2 => {
    const x = vec.x * Math.cos(angle.radians) - vec.y * Math.sin(angle.radians);
    const y = vec.x * Math.sin(angle.radians) + vec.y * Math.cos(angle.radians);
    return new Vector2(x, y);
  };

  /**
   * Scales a vector uniformly
   * @param vector The original vector
   * @param scale Scale factor
   * @returns A new, scaled vector
   */
  public static Scale = (vector: Vector2, scale: number): Vector2 => {
    const x = scale * vector.x;
    const y = scale * vector.y;
    return new Vector2(x, y);
  };

  /**
   * Creates a new vector of a given length and a unit that is equal to the original vector
   * @param vector The original vector. This determines the unit of the final vector
   * @param length The desired length of the final vector
   * @returns The final vector
   */
  public static NewVectorOfLength = (
    vector: Vector2,
    length: number
  ): Vector2 => {
    const unit = vector.unit;
    const x = length * unit.x;
    const y = length * unit.y;
    return new Vector2(x, y);
  };

  /**
   * Calculate the dot product between Vectors A and B
   * @param a Vector A
   * @param b Vector B
   * @returns The Dot product between A and B
   */
  public static Dot = (a: Vector2, b: Vector2): number => {
    return a.x * b.x + a.y * b.y;
  };
  /**
   * Calculates the angle between Vectors A and B
   * @param a Vector A
   * @param b Vector B
   * @returns The angle between A and B
   */
  public static AngleBetween = (a: Vector2, b: Vector2): Angle => {
    const angleA = Math.atan2(a.y, a.x);
    const angleB = Math.atan2(b.y, b.x);

    return Angle.FromRadians(angleB - angleA);
  };

  /**
   * Calculates the Cross product between Vectors A and B
   * @param a Vector A
   * @param b Vector B
   * @returns A X B
   */
  public static Cross = (a: Vector2, b: Vector2): number => {
    return a.x * b.y - a.y * b.x;
  };

  readonly x: number;
  readonly y: number;

  /**
   * Get the magnitude (length) of the vector
   */
  get magnitude(): number {
    const xSqr = this.x * this.x;
    const ySqr = this.y * this.y;

    const magnitude = Math.sqrt(xSqr + ySqr);
    return magnitude;
  }

  /**
   * @deprecated Use magnitude instead - this property is kept for backward compatibility
   * Get the magnitude (length) of the vector
   */
  get magnitued(): number {
    return this.magnitude;
  }

  /**
   * Get the unit vector
   */
  get unit(): Vector2 {
    const mag = this.magnitude;
    if (mag === 0) {
      return Vector2.Zero();
    }

    const unitX = this.x / mag;
    const unitY = this.y / mag;
    return new Vector2(unitX, unitY);
  }

  /**
   * Returns the angle of the direction of this vector in degrees.
   * A right vector [1,0] will return 0, a left vector [-1,0] will return 180, an up vector [0,1] will return 90 and a down vector [0,-1] will return -90
   */
  get theta(): number {
    return (Math.atan2(this.y, this.x) * 180) / Math.PI;
  }

  /**
   * Returns the vector as an array of numbers [x,y]
   */
  get array(): [number, number] {
    return [this.x, this.y];
  }

  /**
   * Get the vector as a Data Transfer Object
   */
  get dto(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
