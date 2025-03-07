import { LerpNumber } from "./LerpNumber";

describe("Lerp Number", () => {
  let lerpNumber: LerpNumber;
  let updateFn: jest.Mock;

  beforeEach(() => {
    lerpNumber = new LerpNumber();
    updateFn = jest.fn();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should lerp from start to end value", async () => {
    lerpNumber.defaultDurationMS = 1000;
    const promise = lerpNumber.lerp({
      start: 0,
      end: 100,
      update: updateFn,
    });

    // Test middle point (should have multiple updates by this point)
    jest.advanceTimersByTime(500);
    expect(updateFn).toHaveBeenCalledWith(expect.closeTo(50, 5)); // Allow some margin due to interval timing

    // Complete animation
    jest.advanceTimersByTime(500);
    await promise;

    expect(updateFn).toHaveBeenCalledWith(0); // Start value
    expect(updateFn).toHaveBeenLastCalledWith(100); // End value
  });

  it("should cancel lerp when requested", async () => {
    const onCancel = jest.fn();
    const promise = lerpNumber.lerp({
      start: 0,
      end: 100,
      update: updateFn,
      onCancel,
    });

    expect(lerpNumber.isLerping).toBe(true);

    lerpNumber.cancel();
    jest.advanceTimersByTime(10); // Allow interval to execute
    await promise;

    expect(lerpNumber.isLerping).toBe(false);
    expect(onCancel).toHaveBeenCalled();
  });

  it("should respect custom duration", async () => {
    const promise = lerpNumber.lerp({
      start: 0,
      end: 100,
      update: updateFn,
      durationMS: 500,
    });

    jest.advanceTimersByTime(250); // Half way
    expect(updateFn).toHaveBeenLastCalledWith(expect.any(Number));

    jest.advanceTimersByTime(250); // Complete
    await promise;

    expect(updateFn).toHaveBeenLastCalledWith(100);
  });

  it("should call onComplete when finished", async () => {
    const onComplete = jest.fn();
    const promise = lerpNumber.lerp({
      start: 0,
      end: 100,
      update: updateFn,
      onComplete,
    });

    jest.advanceTimersByTime(1000);
    await promise;

    expect(onComplete).toHaveBeenCalled();
  });

  it("should cancel existing lerp when starting a new one", async () => {
    const onCancel = jest.fn();
    const firstPromise = lerpNumber.lerp({
      start: 0,
      end: 100,
      update: updateFn,
      onCancel,
    });

    const secondPromise = lerpNumber.lerp({
      start: 200,
      end: 300,
      update: updateFn,
    });

    jest.advanceTimersByTime(1000);
    await Promise.all([firstPromise, secondPromise]);

    expect(onCancel).toHaveBeenCalled();
    expect(updateFn).toHaveBeenLastCalledWith(300);
  });
});
