import { Vector2 } from "../ValueObjects";
import { MemoizedVector2 } from "./MemoizedVector2";

test("Initial value is stored", () => {
  const initialVec = new Vector2(5, 6);
  const memoizedVector = new MemoizedVector2(initialVec, jest.fn());
  expect(memoizedVector.val).toEqual(new Vector2(5, 6));
});

test("Callback is called when the val changes", () => {
  const cb = jest.fn();
  const initialVec = new Vector2(5, 6);
  const memoizedVector = new MemoizedVector2(initialVec, cb);

  memoizedVector.val = new Vector2(8, 9);

  expect(cb).toBeCalled();
});

test("Callback is called only when the val changes", () => {
  const cb = jest.fn();
  const initialVec = new Vector2(5, 6);
  const memoizedVector = new MemoizedVector2(initialVec, cb);

  memoizedVector.val = new Vector2(5, 6);
  memoizedVector.val = new Vector2(5, 6);
  memoizedVector.val = new Vector2(5, 6);

  expect(cb).not.toBeCalled();
});

test("Setting the value quietly should not notify", () => {
  const cb = jest.fn();
  const memoizedBoolean = new MemoizedVector2(Vector2.One(), cb);

  memoizedBoolean.setValQuietly(Vector2.Zero());

  expect(cb).not.toBeCalled();
});
