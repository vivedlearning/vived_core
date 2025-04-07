import { Vector3 } from "../ValueObjects";

/**
 * A wrapper class for Vector3 objects that tracks changes and triggers callbacks.
 * Only triggers the callback when the vector value actually changes.
 */
export class MemoizedVector3 {
  private _val: Vector3;

  /**
   * Gets the current Vector3 value
   */
  get val(): Vector3 {
    return this._val;
  }

  /**
   * Sets the Vector3 value and triggers the onChange callback if the value changed
   * @param v - The new Vector3 value
   */
  set val(v: Vector3) {
    if (Vector3.Equal(v, this._val)) return;

    this._val = v;
    this.onChangeCallback();
  }

  /**
   * Sets the value without triggering the onChange callback
   * @param val - The new Vector3 value
   */
  public setValQuietly(val: Vector3) {
    this._val = val;
  }

  private onChangeCallback: () => void;

  /**
   * Creates a new MemoizedVector3 instance
   *
   * @param initialValue - The initial Vector3 value
   * @param onChangeCallback - Function to call when the value changes
   */
  constructor(initialValue: Vector3, onChangeCallback: () => void) {
    this._val = initialValue;
    this.onChangeCallback = onChangeCallback;
  }
}
