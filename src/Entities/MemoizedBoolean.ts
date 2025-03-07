export class MemoizedBoolean {
  private _val: boolean;
  get val(): boolean {
    return this._val;
  }
  set val(b: boolean) {
    if (this._val === b) return;

    this._val = b;
    this.onChangeCallback();
  }

  public setValQuietly(val: boolean) {
    this._val = val;
  }

  private onChangeCallback: () => void;

  constructor(initialValue: boolean, onChangeCallback: () => void) {
    this._val = initialValue;
    this.onChangeCallback = onChangeCallback;
  }
}
