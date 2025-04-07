/**
 * A wrapper class for boolean values that tracks changes and triggers callbacks.
 * Only triggers the callback when the value actually changes.
 */
export class MemoizedBoolean {
  private _val: boolean;

  /**
   * Gets the current boolean value
   */
  get val(): boolean {
    return this._val;
  }

  /**
   * Sets the boolean value and triggers the onChange callback if the value changed
   * @param b - The new boolean value
   */
  set val(b: boolean) {
    if (this._val === b) return;

    this._val = b;
    this.onChangeCallback();
  }

  /**
   * Sets the value without triggering the onChange callback
   * @param val - The new boolean value
   */
  public setValQuietly(val: boolean) {
    this._val = val;
  }

  private onChangeCallback: () => void;

  /**
   * Creates a new MemoizedBoolean instance
   *
   * @param initialValue - The initial boolean value
   * @param onChangeCallback - Function to call when the value changes
   */
  constructor(initialValue: boolean, onChangeCallback: () => void) {
    this._val = initialValue;
    this.onChangeCallback = onChangeCallback;
  }
}
