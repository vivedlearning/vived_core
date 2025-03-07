import { Angle } from "../ValueObjects";

export class MemoizedAngle {
  private _val: Angle;
  get val(): Angle {
    return this._val;
  }
  set val(b: Angle) {
    if (this._val.degrees === b.degrees) return;

    this._val = b;
    this.onChangeCallback();
  }

  public setValQuietly(val: Angle) {
    this._val = val;
  }

  private onChangeCallback: () => void;

  constructor(initialValue: Angle, onChangeCallback: () => void) {
    this._val = initialValue;
    this.onChangeCallback = onChangeCallback;
  }
}
