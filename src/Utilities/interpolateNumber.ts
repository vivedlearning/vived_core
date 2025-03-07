export function interpolateNumber(
  start: number,
  end: number,
  percent: number,
  clamp: boolean = false
): number {
  const range = end - start;

  if (!clamp) {
    return percent * range + start;
  }

  let clampedP = percent;
  if (clampedP < 0) {
    clampedP = 0;
  } else if (clampedP > 1) {
    clampedP = 1;
  }

  return clampedP * range + start;
}
