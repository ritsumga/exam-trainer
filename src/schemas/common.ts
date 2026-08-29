import { z } from "zod";

export const idSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(100);
export const nonEmptyTextSchema = z.string().trim().min(1);
export const dateOnlySchema = z.string().refine((value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().startsWith(value);
}, "実在する日付をYYYY-MM-DDで指定してください");
export const isoDateTimeSchema = z.string().datetime({ offset: false });
export const nonNegativeIntegerSchema = z.number().int().nonnegative();

export const questionTypeSchema = z.enum(["single", "multiple", "input"]);
export const difficultySchema = z.union([
  z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5),
]);
