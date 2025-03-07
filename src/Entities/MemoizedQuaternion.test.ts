import { Quaternion } from "../ValueObjects";
import { MemoizedQuaternion } from "./MemoizedQuaternion";

test("Initial value is stored", () => {
  const initialQuat = new Quaternion(5, 6, 7, 8);
  const memoizedVector = new MemoizedQuaternion(initialQuat, jest.fn());
  expect(memoizedVector.val).toEqual(new Quaternion(5, 6, 7, 8));
});

test("Callback is called when the val changes", () => {
  const cb = jest.fn();
  const initialQuat = new Quaternion(5, 6, 7, 8);
  const memoizedQuat = new MemoizedQuaternion(initialQuat, cb);

  memoizedQuat.val = new Quaternion(8, 9, 10, 11);

  expect(cb).toBeCalled();
});

test("Callback is called only when the val changes", () => {
  const cb = jest.fn();
  const initialQuat = new Quaternion(5, 6, 7, 8);
  const memoizedQuat = new MemoizedQuaternion(initialQuat, cb);

  memoizedQuat.val = new Quaternion(5, 6, 7, 8);
  memoizedQuat.val = new Quaternion(5, 6, 7, 8);
  memoizedQuat.val = new Quaternion(5, 6, 7, 8);

  expect(cb).not.toBeCalled();
});

test("Setting the value quietly should not notify", () => {
  const cb = jest.fn();
  const memoizedQuat = new MemoizedQuaternion(Quaternion.Identity(), cb);

  memoizedQuat.setValQuietly(Quaternion.Identity());

  expect(cb).not.toBeCalled();
});
