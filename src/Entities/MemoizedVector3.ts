import { Vector3 } from "../ValueObjects";

export class MemoizedVector3 {
  private _val: Vector3;

  get val(): Vector3 {
    return this._val;
  }

  set val(v: Vector3) {
    if (Vector3.Equal(v, this._val)) return;

    this._val = v;
    this.onChangeCallback();
  }

  public setValQuietly(val: Vector3) {
    this._val = val;
  }

  private onChangeCallback: () => void;

  constructor(initialValue: Vector3, onChangeCallback: () => void) {
    this._val = initialValue;
    this.onChangeCallback = onChangeCallback;
  }
}
