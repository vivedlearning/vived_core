import {
  feetToMeters,
  inchesToMeters,
  metersToFeet,
  metersToInches,
} from "./LengthConverters";

test("Converting inches to meters", () => {
  expect(inchesToMeters(0)).toEqual(0);
  expect(inchesToMeters(12)).toEqual(0.30479983540808886);
  expect(inchesToMeters(-12)).toEqual(-0.30479983540808886);
});

test("Converting meters to inches", () => {
  expect(metersToInches(0)).toEqual(0);
  expect(metersToInches(2)).toEqual(78.7402);
  expect(metersToInches(-2)).toEqual(-78.7402);
});

test("Converting feet to meters", () => {
  expect(feetToMeters(0)).toEqual(0);
  expect(feetToMeters(5)).toEqual(1.5239999512320015);
  expect(feetToMeters(-5)).toEqual(-1.5239999512320015);
});

test("Converting meters to feet", () => {
  expect(metersToFeet(0)).toEqual(0);
  expect(metersToFeet(2)).toEqual(6.56168);
  expect(metersToFeet(-2)).toEqual(-6.56168);
});
