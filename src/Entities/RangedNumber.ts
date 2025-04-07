/**
 * Properties required to initialize a RangedNumber
 */
export interface RangedNumberProperties {
  /** The minimum allowed value */
  min: number;
  /** The maximum allowed value */
  max: number;
  /** The initial value (will be clamped between min and max) */
  initialValue: number;
}

/**
 * A numeric value that is constrained to a specified range.
 * Values set outside the range will be automatically clamped.
 * Triggers a callback when the value changes.
 */
export class RangedNumber {
  /** The maximum allowed value */
  public readonly maxValue: number;
  /** The minimum allowed value */
  public readonly minValue: number;

  private _val: number;

  /**
   * Gets the current numeric value (guaranteed to be within min/max range)
   */
  get val(): number {
    return this._val;
  }

  /**
   * Sets the numeric value and triggers the onChange callback if the value changed.
   * The input value will be automatically clamped to the defined min/max range.
   * @param x - The new numeric value
   */
  set val(x: number) {
    const y = this.clamp(x);
    if (this._val === y) return;

    this._val = y;
    this.onChangeCallback();
  }

  /**
   * Sets the value without triggering the onChange callback.
   * The input value will still be clamped to the defined range.
   * @param val - The new numeric value
   */
  public setValQuietly(val: number) {
    this._val = this.clamp(val);
  }

  /**
   * Ensures a value is within the min/max range
   * @param x - The value to clamp
   * @returns The clamped value
   */
  private clamp(x: number): number {
    let rVal = x;
    if (x > this.maxValue) {
      rVal = this.maxValue;
    } else if (x < this.minValue) {
      rVal = this.minValue;
    }

    return rVal;
  }

  private onChangeCallback: () => void;

  /**
   * Creates a new RangedNumber instance
   *
   * @param props - Object containing min, max, and initialValue properties
   * @param onChangeCallback - Function to call when the value changes
   */
  constructor(props: RangedNumberProperties, onChangeCallback: () => void) {
    this.maxValue = props.max;
    this.minValue = props.min;

    this._val = this.clamp(props.initialValue);
    this.onChangeCallback = onChangeCallback;
  }
}
