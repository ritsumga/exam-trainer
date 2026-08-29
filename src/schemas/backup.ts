import { z } from "zod";
import {
  attemptSchema,
  bookmarkSchema,
  examSessionSchema,
  reviewStateSchema,
  settingSchema,
} from "./learning-data";

export const backupEnvelopeV1Schema = z.object({
  product: z.literal("exam-trainer"),
  schemaVersion: z.literal(1),
  createdAt: z.string().datetime({ offset: false }),
  data: z.object({
    attempts: z.array(attemptSchema),
    bookmarks: z.array(bookmarkSchema),
    reviewStates: z.array(reviewStateSchema),
    examSessions: z.array(examSessionSchema),
    settings: z.array(settingSchema),
  }).strict(),
}).strict();

export type BackupEnvelopeV1 = z.infer<typeof backupEnvelopeV1Schema>;
