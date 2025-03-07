import { RangedNumber, RangedNumberProperties } from "./RangedNumber";

it("Stores the initial value", () => {
  const props: RangedNumberProperties = {
    initialValue: 5,
    max: 10,
    min: 1,
  };

  const memoizedNumber = new RangedNumber(props, jest.fn());
  expect(memoizedNumber.val).toEqual(5);
});

it("Clamps the initial value", () => {
  const props: RangedNumberProperties = {
    initialValue: 50,
    max: 10,
    min: 1,
  };

  const memoizedNumber = new RangedNumber(props, jest.fn());
  expect(memoizedNumber.val).toEqual(10);
});

it("Clamps the value", () => {
  const props: RangedNumberProperties = {
    initialValue: 5,
    max: 10,
    min: 1,
  };

  const memoizedNumber = new RangedNumber(props, jest.fn());

  expect(memoizedNumber.val).toEqual(5);

  memoizedNumber.val = 11;
  expect(memoizedNumber.val).toEqual(10);

  memoizedNumber.val = 0;
  expect(memoizedNumber.val).toEqual(1);
});

it("Triggers the callback when something changes", () => {
  const cb = jest.fn();

  const props: RangedNumberProperties = {
    initialValue: 5,
    max: 10,
    min: 1,
  };
  const memoizedNumber = new RangedNumber(props, cb);

  expect(cb).not.toBeCalled();

  memoizedNumber.val = 6;

  expect(cb).toBeCalled();
});

it("Only triggers the CB when something changes", () => {
  const cb = jest.fn();
  const props: RangedNumberProperties = {
    initialValue: 5,
    max: 10,
    min: 1,
  };
  const memoizedNumber = new RangedNumber(props, cb);

  memoizedNumber.val = 5;
  memoizedNumber.val = 5;
  memoizedNumber.val = 5;

  expect(cb).not.toBeCalled();
});

it("Checks the clamped value before triggering", () => {
  const cb = jest.fn();
  const props: RangedNumberProperties = {
    initialValue: 10,
    max: 10,
    min: 1,
  };
  const memoizedNumber = new RangedNumber(props, cb);

  memoizedNumber.val = 11;
  memoizedNumber.val = 12;
  memoizedNumber.val = 13;

  expect(cb).not.toBeCalled();
});

it("Does not notify if set quietly", () => {
  const cb = jest.fn();
  const props: RangedNumberProperties = {
    initialValue: 5,
    max: 10,
    min: 1,
  };
  const memoizedNumber = new RangedNumber(props, cb);

  memoizedNumber.setValQuietly(6);

  expect(memoizedNumber.val).toEqual(6);
  expect(cb).not.toBeCalled();
});

it("Setting quietly is clamped", () => {
  const cb = jest.fn();
  const props: RangedNumberProperties = {
    initialValue: 5,
    max: 10,
    min: 1,
  };
  const memoizedNumber = new RangedNumber(props, cb);

  memoizedNumber.setValQuietly(-1);
  expect(memoizedNumber.val).toEqual(1);
});
