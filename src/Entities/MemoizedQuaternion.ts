import { Quaternion } from "../ValueObjects";

/**
 * A wrapper class for Quaternion objects that tracks changes and triggers callbacks.
 * Only triggers the callback when the quaternion value actually changes.
 */
export class MemoizedQuaternion {
  private _val: Quaternion;

  /**
   * Gets the current Quaternion value
   */
  get val(): Quaternion {
    return this._val;
  }

  /**
   * Sets the Quaternion value and triggers the onChange callback if the value changed
   * @param v - The new Quaternion value
   */
  set val(v: Quaternion) {
    if (Quaternion.Equal(v, this._val)) return;

    this._val = v;
    this.onChangeCallback();
  }

  /**
   * Sets the value without triggering the onChange callback
   * @param val - The new Quaternion value
   */
  public setValQuietly(val: Quaternion) {
    this._val = val;
  }

  private onChangeCallback: () => void;

  /**
   * Creates a new MemoizedQuaternion instance
   *
   * @param initialValue - The initial Quaternion value
   * @param onChangeCallback - Function to call when the value changes
   */
  constructor(initialValue: Quaternion, onChangeCallback: () => void) {
    this._val = initialValue;
    this.onChangeCallback = onChangeCallback;
  }
}
