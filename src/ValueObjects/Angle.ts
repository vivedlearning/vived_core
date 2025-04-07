export class Angle {
  /**
   * Creates an angle from degrees
   * @param degrees Angle in degrees
   * @returns The angle
   */
  public static FromDegrees(degrees: number): Angle {
    return new Angle(degrees);
  }

  /**
   * Creates an angle from radians
   * @param radians Angle in radians
   * @returns The angle
   */
  public static FromRadians(radians: number): Angle {
    return new Angle((radians * 180) / Math.PI);
  }

  /**
   * Check to see if two angles are close
   * @param a Angle A
   * @param b Angle B
   * @param tolerance Tolerance for "Close" in degrees. Defaults to 0.001;
   * @returns True if the difference between A and B (in degrees) is less than the tolerance
   */
  public static Close(a: Angle, b: Angle, tolerance: number = 0.001): boolean {
    let diff = a.degrees - b.degrees;
    if (diff < 0) {
      diff = -diff;
    }
    return diff < tolerance;
  }

  private _degrees = 0;
  public get degrees() {
    return this._degrees;
  }

  public get radians() {
    return (this._degrees * Math.PI) / 180;
  }

  private constructor(degrees: number) {
    this._degrees = degrees;
  }
}
