import { Vector3 } from "../ValueObjects";
import { MemoizedVector3 } from "./MemoizedVector3";

test("Initial value is stored", () => {
  const initialVec = new Vector3(5, 6, 7);
  const memoizedVector = new MemoizedVector3(initialVec, jest.fn());
  expect(memoizedVector.val).toEqual(new Vector3(5, 6, 7));
});

test("Callback is called when the val changes", () => {
  const cb = jest.fn();
  const initialVec = new Vector3(5, 6, 7);
  const memoizedVector = new MemoizedVector3(initialVec, cb);

  memoizedVector.val = new Vector3(8, 9, 10);

  expect(cb).toBeCalled();
});

test("Callback is called only when the val changes", () => {
  const cb = jest.fn();
  const initialVec = new Vector3(5, 6, 7);
  const memoizedVector = new MemoizedVector3(initialVec, cb);

  memoizedVector.val = new Vector3(5, 6, 7);
  memoizedVector.val = new Vector3(5, 6, 7);
  memoizedVector.val = new Vector3(5, 6, 7);

  expect(cb).not.toBeCalled();
});

test("Setting the value quietly should not notify", () => {
  const cb = jest.fn();
  const memoizedBoolean = new MemoizedVector3(Vector3.One(), cb);

  memoizedBoolean.setValQuietly(Vector3.Zero());

  expect(cb).not.toBeCalled();
});
