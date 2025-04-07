import { Angle } from "../ValueObjects";

/**
 * A wrapper class for Angle objects that tracks changes and triggers callbacks.
 * Only triggers the callback when the angle value actually changes.
 */
export class MemoizedAngle {
  private _val: Angle;

  /**
   * Gets the current angle value
   */
  get val(): Angle {
    return this._val;
  }

  /**
   * Sets the angle value and triggers the onChange callback if the value changed
   * @param b - The new Angle value
   */
  set val(b: Angle) {
    if (this._val.degrees === b.degrees) return;

    this._val = b;
    this.onChangeCallback();
  }

  /**
   * Sets the value without triggering the onChange callback
   * @param val - The new Angle value
   */
  public setValQuietly(val: Angle) {
    this._val = val;
  }

  private onChangeCallback: () => void;

  /**
   * Creates a new MemoizedAngle instance
   *
   * @param initialValue - The initial Angle value
   * @param onChangeCallback - Function to call when the value changes
   */
  constructor(initialValue: Angle, onChangeCallback: () => void) {
    this._val = initialValue;
    this.onChangeCallback = onChangeCallback;
  }
}
