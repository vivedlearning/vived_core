export class MemoizedNumber {
  private _val: number;
  get val(): number {
    return this._val;
  }
  set val(b: number) {
    if (this._val === b) return;

    this._val = b;
    this.onChangeCallback();
  }

  public setValQuietly(val: number) {
    this._val = val;
  }
  
  private onChangeCallback: () => void;

  constructor(initialValue: number, onChangeCallback: () => void) {
    this._val = initialValue;
    this.onChangeCallback = onChangeCallback;
  }
}
