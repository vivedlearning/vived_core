export interface RangedNumberProperties {
  min: number;
  max: number;
  initialValue: number;
}

export class RangedNumber {
  public readonly maxValue: number;
  public readonly minValue: number;
  private _val: number;
  get val(): number {
    return this._val;
  }
  set val(x: number) {
    const y = this.clamp(x);
    if (this._val === y) return;

    this._val = y;
    this.onChangeCallback();
  }

  public setValQuietly(val: number) {
    this._val = this.clamp(val);
  }

  private clamp(x: number): number {
    let rVal = x;
    if (x > this.maxValue) {
      rVal = this.maxValue;
    } else if (x < this.minValue) {
      rVal = this.minValue;
    }

    return rVal;
  }
  private onChangeCallback: () => void;

  constructor(props: RangedNumberProperties, onChangeCallback: () => void) {
    this.maxValue = props.max;
    this.minValue = props.min;

    this._val = this.clamp(props.initialValue);
    this.onChangeCallback = onChangeCallback;
  }
}
