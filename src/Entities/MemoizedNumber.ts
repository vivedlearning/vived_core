/**
 * A wrapper class for numeric values that tracks changes and triggers callbacks.
 * Only triggers the callback when the value actually changes.
 */
export class MemoizedNumber {
  private _val: number;

  /**
   * Gets the current numeric value
   */
  get val(): number {
    return this._val;
  }

  /**
   * Sets the numeric value and triggers the onChange callback if the value changed
   * @param b - The new numeric value
   */
  set val(b: number) {
    if (this._val === b) return;

    this._val = b;
    this.onChangeCallback();
  }

  /**
   * Sets the value without triggering the onChange callback
   * @param val - The new numeric value
   */
  public setValQuietly(val: number) {
    this._val = val;
  }

  private onChangeCallback: () => void;

  /**
   * Creates a new MemoizedNumber instance
   *
   * @param initialValue - The initial numeric value
   * @param onChangeCallback - Function to call when the value changes
   */
  constructor(initialValue: number, onChangeCallback: () => void) {
    this._val = initialValue;
    this.onChangeCallback = onChangeCallback;
  }
}
