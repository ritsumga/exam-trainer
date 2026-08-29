import catalogData from "../generated/exam-packs/catalog.json";
import { examCatalogSchema, generatedExamPackSchema, type ExamCatalogEntry } from "../schemas/exam-pack";
import type { ExamPackIndex } from "../types/exam-pack";
import { AppError } from "../types/errors";

const packUrls = import.meta.glob("../generated/exam-packs/*.json", { eager: true, query: "?url", import: "default" }) as Record<string, string>;

export type ExamPackCatalog = {
  list(): Promise<readonly ExamCatalogEntry[]>;
  load(examId: string): Promise<ExamPackIndex>;
};

class GeneratedExamPackCatalog implements ExamPackCatalog {
  private readonly loads = new Map<string, Promise<ExamPackIndex>>();
  async list(): Promise<readonly ExamCatalogEntry[]> { return examCatalogSchema.parse(catalogData).exams; }
  async load(examId: string): Promise<ExamPackIndex> {
    const existing = this.loads.get(examId); if (existing !== undefined) return existing;
    const promise = this.loadUncached(examId); this.loads.set(examId, promise);
    try { return await promise; } catch (error) { this.loads.delete(examId); throw error; }
  }
  private async loadUncached(examId: string): Promise<ExamPackIndex> {
    const entry = (await this.list()).find((item) => item.examId === examId);
    if (entry === undefined) throw new AppError("not-found", "試験が見つかりません");
    const url = packUrls[`../generated/exam-packs/${entry.dataPath}`];
    if (url === undefined) throw new AppError("pack-load", "試験データを読み込めません");
    let response: Response;
    try { response = await fetch(url); } catch (cause) { throw new AppError("pack-load", "試験データを読み込めません", { cause }); }
    if (!response.ok) throw new AppError("pack-load", "試験データを読み込めません");
    const pack = generatedExamPackSchema.parse(await response.json());
    return {
      pack,
      questionById: new Map(pack.questions.map((question) => [question.id, question])),
      questionsByDomainId: new Map(pack.domains.map((domain) => [domain.id, pack.questions.filter((question) => question.domainId === domain.id)])),
    };
  }
}

export const examPackCatalog: ExamPackCatalog = new GeneratedExamPackCatalog();
