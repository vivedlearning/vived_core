import { EaseFn } from "../Types";
import { quintInOut } from "./easeFunctions";

/**
 * Configuration object for performing a linear interpolation (lerp) operation.
 * @interface LerpNumberDTO
 */
export interface LerpNumberDTO {
  /** Starting value of the lerp */
  start: number;
  /** Target/ending value of the lerp */
  end: number;
  /** Callback function that receives the interpolated value on each update */
  update: (value: number) => void;
  /** Duration of the lerp in milliseconds. Defaults to LerpNumber.defaultDurationMS */
  durationMS?: number;
  /** Easing function to modify the interpolation curve. Defaults to LerpNumber.defaultEase */
  ease?: EaseFn;
  /** Optional callback function called when lerp completes naturally */
  onComplete?: () => void;
  /** Optional callback function called when lerp is cancelled */
  onCancel?: () => void;
}

/**
 * Utility class for smoothly interpolating between two numbers over time.
 * Uses requestAnimationFrame for smooth animation and supports custom easing functions.
 *
 * @example
 * const lerper = new LerpNumber();
 * // Animate from 0 to 100 over 2 seconds
 * await lerper.lerp({
 *   start: 0,
 *   end: 100,
 *   durationMS: 2000,
 *   update: (value) => console.log(value)
 * });
 */
export class LerpNumber {
  public defaultDurationMS = 1000;
  public defaultEase: EaseFn = quintInOut;

  public get isLerping() {
    return this._isLerping;
  }
  private _isLerping = false;

  /**
   * Cancels the current lerp operation if one is in progress.
   * Triggers the onCancel callback if provided in the original lerp configuration.
   */
  public cancel() {
    if (!this._isLerping) return;

    this._cancelLerp = true;
  }

  private _cancelLerp = false;

  /**
   * Initiates a lerp (linear interpolation) operation.
   * If a lerp is already in progress, it will be cancelled before starting the new one.
   *
   * @param data - Configuration object for the lerp operation
   * @returns Promise that resolves when the lerp completes or is cancelled
   * @throws Never throws, but may reject if the update function throws
   */
  lerp = (data: LerpNumberDTO): Promise<void> => {
    if (this._isLerping) {
      this.cancel();
    }
    const { start, end, durationMS, ease, onComplete, update, onCancel } = data;

    const durationToUse = durationMS ?? this.defaultDurationMS;
    const easeToUse = ease ?? this.defaultEase;

    return new Promise((resolve) => {
      const startTime = performance.now();
      this._isLerping = true;

      update(start);

      const interval = setInterval(() => {
        if (this._cancelLerp) {
          clearInterval(interval);
          this._isLerping = false;
          this._cancelLerp = false;
          if (onCancel) onCancel();
          return resolve();
        }

        const currentTime = performance.now();
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / durationToUse, 1);
        const easedProgress = easeToUse(progress);
        const value = start + (end - start) * easedProgress;
        update(value);

        if (progress >= 1) {
          clearInterval(interval);
          this._isLerping = false;
          update(end);
          if (onComplete) onComplete();
          resolve();
        }
      }, 10);
    });
  };
}
