import { Vector2 } from "../ValueObjects";

/**
 * A wrapper class for Vector2 objects that tracks changes and triggers callbacks.
 * Only triggers the callback when the vector value actually changes.
 */
export class MemoizedVector2 {
  private _val: Vector2;

  /**
   * Gets the current Vector2 value
   */
  get val(): Vector2 {
    return this._val;
  }

  /**
   * Sets the Vector2 value and triggers the onChange callback if the value changed
   * @param v - The new Vector2 value
   */
  set val(v: Vector2) {
    if (Vector2.Equal(v, this._val)) return;

    this._val = v;
    this.onChangeCallback();
  }

  /**
   * Sets the value without triggering the onChange callback
   * @param val - The new Vector2 value
   */
  public setValQuietly(val: Vector2) {
    this._val = val;
  }

  private onChangeCallback: () => void;

  /**
   * Creates a new MemoizedVector2 instance
   *
   * @param initialValue - The initial Vector2 value
   * @param onChangeCallback - Function to call when the value changes
   */
  constructor(initialValue: Vector2, onChangeCallback: () => void) {
    this._val = initialValue;
    this.onChangeCallback = onChangeCallback;
  }
}
