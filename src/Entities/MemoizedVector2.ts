import { Vector2 } from "../ValueObjects";

export class MemoizedVector2 {
  private _val: Vector2;

  get val(): Vector2 {
    return this._val;
  }

  set val(v: Vector2) {
    if (Vector2.Equal(v, this._val)) return;

    this._val = v;
    this.onChangeCallback();
  }

  public setValQuietly(val: Vector2) {
    this._val = val;
  }

  private onChangeCallback: () => void;

  constructor(initialValue: Vector2, onChangeCallback: () => void) {
    this._val = initialValue;
    this.onChangeCallback = onChangeCallback;
  }
}
