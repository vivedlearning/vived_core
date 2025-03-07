import { EaseFn } from "../Types";


export const easeLinear: EaseFn = (x: number): number => {
  if (x <= 0) return 0;
  if (x >= 1) return 1;

  return x;
};

export const quadIn: EaseFn = (x: number) => {
  if (x <= 0) return 0;
  if (x >= 1) return 1;

  return x * x;
};

export const quadOut: EaseFn = (x: number) => {
  if (x <= 0) return 0;
  if (x >= 1) return 1;

  return x * (2 - x);
};

export const quadInOut: EaseFn = (x: number): number => {
  if (x <= 0) return 0;
  if (x >= 1) return 1;

  if (x < 0.5) {
    return 2 * x * x;
  } else {
    return 1 - Math.pow(-2 * x + 2, 2) / 2;
  }
};

export const cubicIn: EaseFn = (x: number): number => {
  if (x <= 0) return 0;
  if (x >= 1) return 1;

  return x * x * x;
};

export const cubicOut: EaseFn = (x: number): number => {
  if (x <= 0) return 0;
  if (x >= 1) return 1;

  return --x * x * x + 1;
};

export const cubicInOut: EaseFn = (x: number): number => {
  if (x <= 0) return 0;
  if (x >= 1) return 1;

  x *= 2;

  if (x <= 1) {
    return (x * x * x) / 2;
  } else {
    return ((x -= 2) * x * x + 2) / 2;
  }
};

export const expoIn: EaseFn = (x: number): number => {
  if (x <= 0) return 0;
  if (x >= 1) return 1;

  return Math.pow(2, 10 * x - 10);
};

export const expoOut: EaseFn = (x: number): number => {
  if (x <= 0) return 0;
  if (x >= 1) return 1;

  return 1 - Math.pow(2, -10 * x);
};

export const expoInOut: EaseFn = (x: number): number => {
  if (x <= 0) return 0;
  if (x >= 1) return 1;

  return x < 0.5
    ? Math.pow(2, 20 * x - 10) / 2
    : (2 - Math.pow(2, -20 * x + 10)) / 2;
};

export const sinIn: EaseFn = (x: number): number => {
  if (x <= 0) return 0;
  if (x >= 1) return 1;

  return 1 - Math.cos((x * Math.PI) / 2);
};

export const sinOut: EaseFn = (x: number): number => {
  if (x <= 0) return 0;
  if (x >= 1) return 1;

  return Math.sin((x * Math.PI) / 2);
};

export const sinInOut: EaseFn = (x: number): number => {
  if (x <= 0) return 0;
  if (x >= 1) return 1;

  return -(Math.cos(Math.PI * x) - 1) / 2;
};

export const quartIn: EaseFn = (x: number): number => {
  if (x <= 0) return 0;
  if (x >= 1) return 1;

  return x * x * x * x;
};

export const quartOut: EaseFn = (x: number): number => {
  if (x <= 0) return 0;
  if (x >= 1) return 1;

  return 1 - Math.pow(1 - x, 4);
};

export const quartInOut: EaseFn = (x: number): number => {
  if (x <= 0) return 0;
  if (x >= 1) return 1;

  if (x < 0.5) {
    return 8 * x * x * x * x;
  } else {
    return 1 - Math.pow(-2 * x + 2, 4) / 2;
  }
};

export const quintIn: EaseFn = (x: number): number => {
  if (x <= 0) return 0;
  if (x >= 1) return 1;

  return x * x * x * x * x;
};

export const quintOut: EaseFn = (x: number): number => {
  if (x <= 0) return 0;
  if (x >= 1) return 1;

  return 1 - Math.pow(1 - x, 5);
};

export const quintInOut: EaseFn = (x: number): number => {
  if (x <= 0) return 0;
  if (x >= 1) return 1;

  if (x < 0.5) {
    return 16 * x * x * x * x * x;
  } else {
    return 1 - Math.pow(-2 * x + 2, 5) / 2;
  }
};

export const circIn: EaseFn = (x: number): number => {
  if (x <= 0) return 0;
  if (x >= 1) return 1;

  return 1 - Math.sqrt(1 - Math.pow(x, 2));
};

export const circOut: EaseFn = (x: number): number => {
  if (x <= 0) return 0;
  if (x >= 1) return 1;

  return Math.sqrt(1 - Math.pow(x - 1, 2));
};

export const circInOut: EaseFn = (x: number): number => {
  if (x <= 0) return 0;
  if (x >= 1) return 1;

  if (x < 0.5) {
    return (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2;
  } else {
    return (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
  }
};
