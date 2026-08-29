import type { ButtonHTMLAttributes, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Question } from "../types/exam-pack";

export function Button({ busy = false, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { busy?: boolean }) {
  return <button {...props} aria-disabled={busy || props.disabled} disabled={busy || props.disabled}>{busy ? "処理中…" : children}</button>;
}
export function Alert({ severity, title, children }: { severity: "info" | "success" | "warning" | "error"; title: string; children?: ReactNode }) {
  return <div className={`alert ${severity}`} role={severity === "error" ? "alert" : "status"}><strong>{title}</strong>{children}</div>;
}
export function Markdown({ children }: { children: string }) { return <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml>{children}</ReactMarkdown>; }
export function Loading() { return <div className="loading" role="status">読み込み中…</div>; }
export function Empty({ title, children }: { title: string; children?: ReactNode }) { return <section className="empty"><h2>{title}</h2>{children}</section>; }

export function QuestionInput({ question, value, disabled, onChange }: { question: Question; value: readonly string[]; disabled: boolean; onChange(value: readonly string[]): void }) {
  if (question.type === "input") return <label className="input-stack"><span>回答</span><textarea value={value[0] ?? ""} disabled={disabled} onChange={(event) => onChange([event.target.value])} rows={4} /></label>;
  const multiple = question.type === "multiple";
  return <fieldset disabled={disabled}><legend>{multiple ? `${question.answers.length}件選択してください` : "1件選択してください"}</legend><div className="choice-list">{question.choices.map((choice) => <label className="choice" key={choice.id}><input type={multiple ? "checkbox" : "radio"} name={`question-${question.id}`} checked={value.includes(choice.id)} onChange={() => {
    if (!multiple) onChange([choice.id]);
    else onChange(value.includes(choice.id) ? value.filter((item) => item !== choice.id) : [...value, choice.id]);
  }} /><span><strong>{choice.id.toUpperCase()}</strong> {choice.text}</span></label>)}</div></fieldset>;
}
