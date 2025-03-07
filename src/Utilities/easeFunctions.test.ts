import {
  easeLinear,
  quadIn,
  quadInOut,
  quadOut,
  cubicIn,
  cubicInOut,
  cubicOut,
  expoIn,
  expoInOut,
  expoOut,
  sinIn,
  sinInOut,
  sinOut,
  quartIn,
  quartInOut,
  quartOut,
  quintIn,
  quintInOut,
  quintOut,
  circIn,
  circInOut,
  circOut,
} from "./easeFunctions";

it("Returns the proper values for ease linear", () => {
  expect(easeLinear(-1)).toEqual(0);
  expect(easeLinear(0)).toEqual(0);
  expect(easeLinear(0.25)).toEqual(0.25);
  expect(easeLinear(0.5)).toEqual(0.5);
  expect(easeLinear(0.75)).toEqual(0.75);
  expect(easeLinear(1)).toEqual(1);
  expect(easeLinear(2)).toEqual(1);
});

// Quad
it("Returns the proper val for quad in", () => {
  expect(quadIn(-1)).toEqual(0);
  expect(quadIn(0)).toEqual(0);
  expect(quadIn(0.25)).toEqual(0.0625);
  expect(quadIn(0.5)).toEqual(0.25);
  expect(quadIn(0.75)).toEqual(0.5625);
  expect(quadIn(1)).toEqual(1);
  expect(quadIn(2)).toEqual(1);
});

it("Returns the proper val for quad out", () => {
  expect(quadOut(-1)).toEqual(0);
  expect(quadOut(0)).toEqual(0);
  expect(quadOut(0.25)).toEqual(0.4375);
  expect(quadOut(0.5)).toEqual(0.75);
  expect(quadOut(0.75)).toEqual(0.9375);
  expect(quadOut(1)).toEqual(1);
  expect(quadOut(2)).toEqual(1);
});

it("Returns the proper val for quad in out", () => {
  expect(quadInOut(-1)).toEqual(0);
  expect(quadInOut(0)).toEqual(0);
  expect(quadInOut(0.25)).toEqual(0.125);
  expect(quadInOut(0.5)).toEqual(0.5);
  expect(quadInOut(0.75)).toEqual(0.875);
  expect(quadInOut(1)).toEqual(1);
  expect(quadInOut(2)).toEqual(1);
});

// Cubic
it("Returns the proper val for cubic in", () => {
  expect(cubicIn(-1)).toEqual(0);
  expect(cubicIn(0)).toEqual(0);
  expect(cubicIn(0.25)).toEqual(0.015625);
  expect(cubicIn(0.5)).toEqual(0.125);
  expect(cubicIn(0.75)).toEqual(0.421875);
  expect(cubicIn(1)).toEqual(1);
  expect(cubicIn(2)).toEqual(1);
});

it("Returns the proper val for cubic out", () => {
  expect(cubicOut(-1)).toEqual(0);
  expect(cubicOut(0)).toEqual(0);
  expect(cubicOut(0.25)).toEqual(0.578125);
  expect(cubicOut(0.5)).toEqual(0.875);
  expect(cubicOut(0.75)).toEqual(0.984375);
  expect(cubicOut(1)).toEqual(1);
  expect(cubicOut(2)).toEqual(1);
});

it("Returns the proper val for cubic in out", () => {
  expect(cubicInOut(-1)).toEqual(0);
  expect(cubicInOut(0)).toEqual(0);
  expect(cubicInOut(0.25)).toEqual(0.0625);
  expect(cubicInOut(0.5)).toEqual(0.5);
  expect(cubicInOut(0.75)).toEqual(0.9375);
  expect(cubicInOut(1)).toEqual(1);
  expect(cubicInOut(2)).toEqual(1);
});

// Expo
it("Returns the proper val for Expo in", () => {
  expect(expoIn(-1)).toEqual(0);
  expect(expoIn(0)).toEqual(0);
  expect(expoIn(0.25)).toEqual(0.005524271728019902);
  expect(expoIn(0.5)).toEqual(0.03125);
  expect(expoIn(0.75)).toEqual(0.17677669529663687);
  expect(expoIn(1)).toEqual(1);
  expect(expoIn(2)).toEqual(1);
});

it("Returns the proper val for Expo out", () => {
  expect(expoOut(-1)).toEqual(0);
  expect(expoOut(0)).toEqual(0);
  expect(expoOut(0.25)).toEqual(0.8232233047033631);
  expect(expoOut(0.5)).toEqual(0.96875);
  expect(expoOut(0.75)).toEqual(0.99447572827198);
  expect(expoOut(1)).toEqual(1);
  expect(expoOut(2)).toEqual(1);
});

it("Returns the proper val for Expo in out", () => {
  expect(expoInOut(-1)).toEqual(0);
  expect(expoInOut(0)).toEqual(0);
  expect(expoInOut(0.25)).toEqual(0.015625);
  expect(expoInOut(0.5)).toEqual(0.5);
  expect(expoInOut(0.75)).toEqual(0.984375);
  expect(expoInOut(1)).toEqual(1);
  expect(expoInOut(2)).toEqual(1);
});

// Sin
it("Returns the proper val for Sin in", () => {
  expect(sinIn(-1)).toEqual(0);
  expect(sinIn(0)).toEqual(0);
  expect(sinIn(0.25)).toEqual(0.07612046748871326);
  expect(sinIn(0.5)).toEqual(0.2928932188134524);
  expect(sinIn(0.75)).toEqual(0.6173165676349102);
  expect(sinIn(1)).toEqual(1);
  expect(sinIn(2)).toEqual(1);
});

it("Returns the proper val for Sin out", () => {
  expect(sinOut(-1)).toEqual(0);
  expect(sinOut(0)).toEqual(0);
  expect(sinOut(0.25)).toEqual(0.3826834323650898);
  expect(sinOut(0.5)).toEqual(0.7071067811865475);
  expect(sinOut(0.75)).toEqual(0.9238795325112867);
  expect(sinOut(1)).toEqual(1);
  expect(sinOut(2)).toEqual(1);
});

it("Returns the proper val for Sin in out", () => {
  expect(sinInOut(-1)).toEqual(0);
  expect(sinInOut(0)).toEqual(0);
  expect(sinInOut(0.25)).toEqual(0.1464466094067262);
  expect(sinInOut(0.5)).toBeCloseTo(0.5);
  expect(sinInOut(0.75)).toEqual(0.8535533905932737);
  expect(sinInOut(1)).toEqual(1);
  expect(sinInOut(2)).toEqual(1);
});

// Quart
it("Returns the proper val for Quart in", () => {
  expect(quartIn(-1)).toEqual(0);
  expect(quartIn(0)).toEqual(0);
  expect(quartIn(0.25)).toEqual(0.00390625);
  expect(quartIn(0.5)).toEqual(0.0625);
  expect(quartIn(0.75)).toEqual(0.31640625);
  expect(quartIn(1)).toEqual(1);
  expect(quartIn(2)).toEqual(1);
});

it("Returns the proper val for Quart out", () => {
  expect(quartOut(-1)).toEqual(0);
  expect(quartOut(0)).toEqual(0);
  expect(quartOut(0.25)).toEqual(0.68359375);
  expect(quartOut(0.5)).toEqual(0.9375);
  expect(quartOut(0.75)).toEqual(0.99609375);
  expect(quartOut(1)).toEqual(1);
  expect(quartOut(2)).toEqual(1);
});

it("Returns the proper val for Quart in out", () => {
  expect(quartInOut(-1)).toEqual(0);
  expect(quartInOut(0)).toEqual(0);
  expect(quartInOut(0.25)).toEqual(0.03125);
  expect(quartInOut(0.5)).toBeCloseTo(0.5);
  expect(quartInOut(0.75)).toEqual(0.96875);
  expect(quartInOut(1)).toEqual(1);
  expect(quartInOut(2)).toEqual(1);
});

// Quint
it("Returns the proper val for Quint in", () => {
  expect(quintIn(-1)).toEqual(0);
  expect(quintIn(0)).toEqual(0);
  expect(quintIn(0.25)).toEqual(0.0009765625);
  expect(quintIn(0.5)).toEqual(0.03125);
  expect(quintIn(0.75)).toEqual(0.2373046875);
  expect(quintIn(1)).toEqual(1);
  expect(quintIn(2)).toEqual(1);
});

it("Returns the proper val for Quint out", () => {
  expect(quintOut(-1)).toEqual(0);
  expect(quintOut(0)).toEqual(0);
  expect(quintOut(0.25)).toEqual(0.7626953125);
  expect(quintOut(0.5)).toEqual(0.96875);
  expect(quintOut(0.75)).toEqual(0.9990234375);
  expect(quintOut(1)).toEqual(1);
  expect(quintOut(2)).toEqual(1);
});

it("Returns the proper val for Quint in out", () => {
  expect(quintInOut(-1)).toEqual(0);
  expect(quintInOut(0)).toEqual(0);
  expect(quintInOut(0.25)).toEqual(0.015625);
  expect(quintInOut(0.5)).toBeCloseTo(0.5);
  expect(quintInOut(0.75)).toEqual(0.984375);
  expect(quintInOut(1)).toEqual(1);
  expect(quintInOut(2)).toEqual(1);
});

// Circ
it("Returns the proper val for Circ in", () => {
  expect(circIn(-1)).toEqual(0);
  expect(circIn(0)).toEqual(0);
  expect(circIn(0.25)).toEqual(0.031754163448145745);
  expect(circIn(0.5)).toEqual(0.1339745962155614);
  expect(circIn(0.75)).toEqual(0.3385621722338523);
  expect(circIn(1)).toEqual(1);
  expect(circIn(2)).toEqual(1);
});

it("Returns the proper val for Circ out", () => {
  expect(circOut(-1)).toEqual(0);
  expect(circOut(0)).toEqual(0);
  expect(circOut(0.25)).toEqual(0.6614378277661477);
  expect(circOut(0.5)).toEqual(0.8660254037844386);
  expect(circOut(0.75)).toEqual(0.9682458365518543);
  expect(circOut(1)).toEqual(1);
  expect(circOut(2)).toEqual(1);
});

it("Returns the proper val for Circ in out", () => {
  expect(circInOut(-1)).toEqual(0);
  expect(circInOut(0)).toEqual(0);
  expect(circInOut(0.25)).toEqual(0.0669872981077807);
  expect(circInOut(0.5)).toBeCloseTo(0.5);
  expect(circInOut(0.75)).toEqual(0.9330127018922193);
  expect(circInOut(1)).toEqual(1);
  expect(circInOut(2)).toEqual(1);
});
