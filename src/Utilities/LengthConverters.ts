const inchesPerMeter = 39.3701;
const feetPerMeter = 3.28084;

export function inchesToMeters(inches: number): number {
  return inches / inchesPerMeter;
}

export function metersToInches(meters: number): number {
  return meters * inchesPerMeter;
}

export function feetToMeters(feet: number): number {
  return feet / feetPerMeter;
}

export function metersToFeet(meters: number): number {
  return meters * feetPerMeter;
}
