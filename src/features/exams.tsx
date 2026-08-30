import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { ExamCatalogEntry } from "../schemas/exam-pack";
import type { ExamSession } from "../types/learning-data";
import { services } from "../services/app-services";
import { Alert, Button, Empty, Loading } from "../components/ui";

type ExamCard = ExamCatalogEntry & { studied: number; percentage?: number; lastStudiedAt?: string };

export function ExamsPage() {
  const [exams, setExams] = useState<readonly ExamCard[]>();
  useEffect(() => { void services.catalog.list().then(async (entries) => Promise.all(entries.map(async (entry) => {
    const [statistics, attempts] = await Promise.all([services.statistics(entry.examId), services.repository.listAttempts(entry.examId)]);
    const latest = [...attempts].sort((a, b) => b.answeredAt.localeCompare(a.answeredAt))[0];
    return { ...entry, studied: statistics.studiedQuestionCount, ...(statistics.attemptCount === 0 ? {} : { percentage: statistics.percentage }), ...(latest === undefined ? {} : { lastStudiedAt: latest.answeredAt }) };
  }))).then(setExams); }, []);
  if (exams === undefined) return <Loading />;
  return <section><p className="eyebrow">LOCAL-FIRST PWA</p><h2>学習する試験を選ぶ</h2><p className="lead">問題・履歴・模擬試験を、ログインなしで端末内に保存します。</p>{exams.length === 0 ? <Empty title="承認済みの試験問題はまだありません"><p>問題候補の人による承認後、製品Packがここに表示されます。</p></Empty> : <div className="card-grid">{exams.map((exam) => <article className="exam-card" key={exam.examId}><p className="eyebrow">{exam.vendor}</p><h3>{exam.name}</h3><dl><div><dt>学習済み</dt><dd>{exam.studied}問</dd></div><div><dt>正答率</dt><dd>{exam.percentage === undefined ? "—" : `${exam.percentage.toFixed(1)}%`}</dd></div><div><dt>最終学習</dt><dd>{exam.lastStudiedAt === undefined ? "未学習" : new Date(exam.lastStudiedAt).toLocaleDateString("ja-JP")}</dd></div></dl><p>{exam.availableQuestionCount}問 · {exam.questionTypes.join(" / ")}</p><Link className="button primary" to={`/exams/${exam.examId}`}>この試験を開く</Link></article>)}</div>}</section>;
}

export function ExamHomePage() {
  const { examId = "" } = useParams(); const [session, setSession] = useState<ExamSession>(); const [exists, setExists] = useState<boolean>(); const [discarding, setDiscarding] = useState(false);
  useEffect(() => { void Promise.all([services.catalog.list(), services.repository.findInProgressSession(examId)]).then(([entries, saved]) => { setExists(entries.some((entry) => entry.examId === examId)); setSession(saved); }); }, [examId]);
  async function discard() { if (session?.status !== "in-progress" || !window.confirm("未完了の模擬試験を破棄しますか？")) return; setDiscarding(true); await services.repository.discardExamSession(session.id, session.revision); setSession(undefined); setDiscarding(false); }
  if (exists === undefined) return <Loading />;
  if (!exists) return <Alert severity="error" title="試験が見つかりません"><Link to="/exams">試験選択へ戻る</Link></Alert>;
  return <section><Link className="back" to="/exams">← 試験選択</Link><p className="eyebrow">EXAM HOME</p><h2>{examId}</h2>{session?.status === "in-progress" && <Alert severity="warning" title="未完了の模擬試験があります"><p>期限: {new Date(session.deadline).toLocaleString("ja-JP")}</p><div className="pager"><Link className="button primary" to={`mock/${session.id}`}>模擬試験を再開</Link><Button className="danger" busy={discarding} onClick={() => void discard()}>破棄する</Button></div></Alert>}<div className="action-grid"><Link className="action-card" to="practice/setup"><strong>通常演習</strong><span>未回答・誤答・弱点・お気に入り・分野別・ランダム</span></Link><Link className="action-card" to="mock/setup"><strong>模擬試験</strong><span>時間制限、見直し、分野配分、中断再開</span></Link><Link className="action-card" to="statistics"><strong>成績</strong><span>全体・分野別の正答率と模試履歴</span></Link><Link className="action-card" to="/settings/data"><strong>データ管理</strong><span>JSONバックアップと原子的な全置換</span></Link></div></section>;
}
