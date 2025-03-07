import { degreesToRadians } from "./degreesToRadians"

test("Converting degrees to radians", ()=>{
  expect(degreesToRadians(0)).toEqual(0);
  expect(degreesToRadians(180)).toBeCloseTo(Math.PI);
  expect(degreesToRadians(-90)).toBeCloseTo(-Math.PI/2);
})

