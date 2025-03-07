import { Quaternion } from "../ValueObjects";

export class MemoizedQuaternion {
  private _val: Quaternion;

  get val(): Quaternion {
    return this._val;
  }

  set val(v: Quaternion) {
    if (Quaternion.Equal(v, this._val)) return;

    this._val = v;
    this.onChangeCallback();
  }

  public setValQuietly(val: Quaternion) {
    this._val = val;
  }

  private onChangeCallback: () => void;

  constructor(initialValue: Quaternion, onChangeCallback: () => void) {
    this._val = initialValue;
    this.onChangeCallback = onChangeCallback;
  }
}
