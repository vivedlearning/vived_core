import { Angle } from "../ValueObjects";
import { MemoizedAngle } from "./MemoizedAngle";

test("Initial value is stored", () => {
  const memoizedNumber = new MemoizedAngle(Angle.FromDegrees(55), jest.fn());
  expect(memoizedNumber.val.degrees).toEqual(55);
});

test("Callback is called when something changes", () => {
  const cb = jest.fn();
  const memoizedNumber = new MemoizedAngle(Angle.FromDegrees(33), cb);

  expect(cb).not.toBeCalled();

  memoizedNumber.val = Angle.FromDegrees(55);

  expect(cb).toBeCalled();
});

test("CB is only called when something has changed", () => {
  const cb = jest.fn();
  const memoizedNumber = new MemoizedAngle(Angle.FromDegrees(33), cb);

  memoizedNumber.val = Angle.FromDegrees(33);
  memoizedNumber.val = Angle.FromDegrees(33);
  memoizedNumber.val = Angle.FromDegrees(33);

  expect(cb).not.toBeCalled();
});

test("Setting the value quietly should not notify", () => {
  const cb = jest.fn();
  const memoizedBoolean = new MemoizedAngle(Angle.FromDegrees(33), cb);

  memoizedBoolean.setValQuietly(Angle.FromDegrees(55));

  expect(cb).not.toBeCalled();
});
