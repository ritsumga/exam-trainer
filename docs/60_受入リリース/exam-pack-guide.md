# Exam Pack作成ガイド

## 1. 原則

Exam Packは試験固有データだけを保持し、共通UI、採点、演習、模試、統計へ試験固有の条件分岐を追加しない。v1では開発者がPackを配置し、検証後にアプリを再ビルドして同梱する。

## 2. 構成

```text
exam-packs/<exam-id>/
├─ exam.yaml
├─ domains.yaml
└─ questions/
   └─ <question-id>.md
```

`exam.yaml`にはPack ID、表示名、提供元、模試の既定時間・問題数、対応問題形式を定義する。`domains.yaml`には分野ID、表示名、必要に応じて全分野の正の重みを定義する。

問題MarkdownはYAML Front Matterと`# Question`、`# Explanation`から構成する。選択式では`choices`と各選択肢の解説見出しを必須とする。製品同梱問題には、正解と主要な解説を直接確認できるHTTPSの公式・一次資料、最終照合日`verifiedAt`、人の承認後の`status: approved`が必要である。

詳細な契約は[型・スキーマ・Exam Pack詳細設計](../30_詳細設計/type-schema-pack-design.md)と既存Packを参照する。

## 3. 問題の作成と承認

1. 下書きを`question-candidates/<exam-id>/`へ置く。
2. 実在試験の記憶問題、試験ダンプ、第三者問題集を使用せず、公式資料の技術的事実から独自に構成する。
3. `npm run validate:candidates`で構造を検証する。
4. `.agents/skills/question-validity-review/SKILL.md`に従い、技術的正確性、設問品質、出典、独自性をレビューする。
5. 人が問題単位または明示した集合単位で承認する。
6. 承認対象だけを`exam-packs/`へ移し、`status: approved`として製品Validatorと全品質ゲートを実行する。

ValidatorやAIレビューだけで問題を承認済みに変更してはならない。問題内容または根拠を変更した場合は再レビューし、必要な人の承認を得る。

## 4. 検証

```powershell
npm run validate:candidates
npm run validate
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Pack追加後は、共通実装に試験ID、分野ID、固有問題数が埋め込まれていないことと、`dist`およびPWA precacheへ試験fixtureや承認前候補が混入していないことも確認する。
