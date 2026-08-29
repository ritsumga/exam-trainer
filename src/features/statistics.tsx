import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { ExamStatistics } from "../core/statistics";
import { services } from "../services/app-services";
import { Loading } from "../components/ui";

export function StatisticsPage() {
  const { examId = "" } = useParams(); const [statistics, setStatistics] = useState<ExamStatistics>();
  useEffect(() => { void services.statistics(examId).then(setStatistics); }, [examId]);
  if (statistics === undefined) return <Loading />;
  return <section><Link className="back" to={`/exams/${examId}`}>← 試験ホーム</Link><p className="eyebrow">STATISTICS</p><h2>学習成績</h2><div className="metric-grid"><article><span>全体正答率</span><strong>{statistics.attemptCount === 0 ? "—" : `${statistics.percentage.toFixed(1)}%`}</strong></article><article><span>学習済み問題</span><strong>{statistics.studiedQuestionCount}</strong></article><article><span>回答回数</span><strong>{statistics.attemptCount}</strong></article><article><span>平均回答時間</span><strong>{(statistics.averageElapsedMs / 1000).toFixed(1)}秒</strong></article></div><div className="panel table-wrap"><table><caption>分野別成績</caption><thead><tr><th>分野</th><th>回答</th><th>正解</th><th>正答率</th></tr></thead><tbody>{statistics.domainResults.map((row) => <tr key={row.domainId}><th>{row.domainId}{row.domainId === statistics.weaknessDomainId && <span className="badge">弱点</span>}</th><td>{row.attemptCount}</td><td>{row.correctCount}</td><td>{row.attemptCount === 0 ? "—" : `${row.percentage.toFixed(1)}%`}</td></tr>)}</tbody></table></div><h3>模擬試験履歴</h3>{statistics.mockSessions.length === 0 ? <p>完了した模擬試験はありません。</p> : <div className="card-grid">{statistics.mockSessions.map((session) => <article className="exam-card" key={session.id}><strong>{session.result.percentage.toFixed(1)}%</strong><span>{new Date(session.submittedAt).toLocaleString("ja-JP")}</span><Link to={`/exams/${examId}/mock/${session.id}/result`}>結果を見る</Link></article>)}</div>}</section>;
}
