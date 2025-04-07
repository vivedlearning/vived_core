/**
 * A wrapper class for string values that tracks changes and triggers callbacks.
 * Only triggers the callback when the value actually changes.
 */
export class MemoizedString {
  private _val: string;

  /**
   * Gets the current string value
   */
  get val(): string {
    return this._val;
  }

  /**
   * Sets the string value and triggers the onChange callback if the value changed
   * @param b - The new string value
   */
  set val(b: string) {
    if (this._val === b) return;

    this._val = b;
    this.onChangeCallback();
  }

  /**
   * Sets the value without triggering the onChange callback
   * @param val - The new string value
   */
  public setValQuietly(val: string) {
    this._val = val;
  }

  private onChangeCallback: () => void;

  /**
   * Creates a new MemoizedString instance
   *
   * @param initialValue - The initial string value
   * @param onChangeCallback - Function to call when the value changes
   */
  constructor(initialValue: string, onChangeCallback: () => void) {
    this._val = initialValue;
    this.onChangeCallback = onChangeCallback;
  }
}
