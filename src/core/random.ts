import type { RandomSource } from "../types/ports";

export class InvalidRandomSourceError extends Error {}

export function createMulberry32(seed: number): RandomSource {
  if (!Number.isInteger(seed) || seed < 0 || seed > 0xffffffff) {
    throw new RangeError("seedは符号なし32 bit整数で指定してください");
  }
  let value = seed >>> 0;
  return {
    next() {
      value = (value + 0x6d2b79f5) >>> 0;
      let result = value;
      result = Math.imul(result ^ (result >>> 15), result | 1);
      result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
      return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
    },
  };
}

export function shuffle<T>(values: readonly T[], random: RandomSource): readonly T[] {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const value = random.next();
    if (!Number.isFinite(value) || value < 0 || value >= 1) throw new InvalidRandomSourceError();
    const target = Math.floor(value * (index + 1));
    const currentValue = result[index];
    const targetValue = result[target];
    if (currentValue === undefined || targetValue === undefined) throw new InvalidRandomSourceError();
    result[index] = targetValue;
    result[target] = currentValue;
  }
  return result;
}
