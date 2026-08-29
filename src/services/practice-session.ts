type StoredPractice = { examId: string; questionIds: readonly string[]; startedAt: number };

export const practiceSessionKey = (id: string): string => `practice:${id}`;

export function storePracticeSession(examId: string, questionIds: readonly string[]): string {
  const sessionId = crypto.randomUUID();
  sessionStorage.setItem(
    practiceSessionKey(sessionId),
    JSON.stringify({ examId, questionIds, startedAt: Date.now() } satisfies StoredPractice),
  );
  return sessionId;
}

export type { StoredPractice };
