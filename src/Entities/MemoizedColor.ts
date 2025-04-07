import { Color } from "../ValueObjects";

/**
 * A wrapper class for Color objects that tracks changes and triggers callbacks.
 * Only triggers the callback when the color value actually changes.
 */
export class MemoizedColor {
  private _val: Color;

  /**
   * Gets the current Color value
   */
  get val(): Color {
    return this._val;
  }

  /**
   * Sets the Color value and triggers the onChange callback if the value changed
   * @param v - The new Color value
   */
  set val(v: Color) {
    if (Color.Equal(v, this._val)) return;

    this._val = v;
    this.onChangeCallback();
  }

  /**
   * Sets the value without triggering the onChange callback
   * @param val - The new Color value
   */
  public setValQuietly(val: Color) {
    this._val = val;
  }

  private onChangeCallback: () => void;

  /**
   * Creates a new MemoizedColor instance
   *
   * @param initialValue - The initial Color value
   * @param onChangeCallback - Function to call when the value changes
   */
  constructor(initialValue: Color, onChangeCallback: () => void) {
    this._val = initialValue;
    this.onChangeCallback = onChangeCallback;
  }
}
