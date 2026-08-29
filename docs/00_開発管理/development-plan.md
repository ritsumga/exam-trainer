# Exam Trainer 開発計画

## 1. 目的

Exam Trainer v1を、Codexが成果物を作成し、人が工程完了を承認するウォーターフォール形式で開発する。本書は工程、成果物、品質ゲート、責任分界を定める。

## 2. 開発原則

- 工程は順番に実施し、未承認の工程を入力として次工程を開始しない。
- Codexは調査、設計、実装、試験、文書化、自己レビューを担当する。
- 人は要求・設計・品質・公開可否の最終判断と工程承認を担当する。
- 他の生成AIと有料AI APIは使わない。無料OSS、Git、GitHub、GitHub Actions、GitHub Pagesは利用できる。
- v1はバックエンド、ログイン、クラウドDBを必要としないローカルファーストPWAとする。
- 承認結果と残課題はリポジトリ内に残し、会話履歴だけに依存しない。

## 3. 工程一覧

| 工程 | 名称 | 主な成果物 | 完了判定 |
| --- | --- | --- | --- |
| 0 | AI駆動開発基盤 | プロジェクト指示、プロジェクトスキル、開発計画、承認台帳、トレーサビリティ、リスク台帳、Git運用 | 開発方法、AI支援方法、承認方法、無料運用方針が合意済み |
| 1 | 要件確定 | 更新済み要件定義、要件決定記録、完成版トレーサビリティ | v1の未決要件がなく、受け入れ条件が検証可能 |
| 2 | 基本設計 | アーキテクチャ、画面・遷移、データフロー、PWA・AI拡張設計 | 主要構成と責務が合意済み |
| 3 | 詳細設計 | 型・スキーマ、DB、各エンジン、例外、試験仕様 | 実装者による追加判断が不要 |
| 4 | 実装 | アプリ、Exam Pack、Validator、CI、単体試験 | 実装範囲が設計と一致し、ローカル品質ゲート成功 |
| 5 | 結合・総合試験 | E2E、PWA、性能・異常系試験、試験結果報告 | 全自動試験成功、重大障害ゼロ、要件証跡完備 |
| 6 | 受入・リリース | 受入記録、利用・運用文書、GitHub Pages、リリース記録 | 12受入条件を人が確認し、公開後確認が完了 |

## 4. 工程別の実施内容

### 4.1 工程0：AI駆動開発基盤

- Codex向けプロジェクト指示を定義する。
- コミットメッセージ作成と問題妥当性レビューのプロジェクトスキルを定義する。
- 工程成果物、ブランチ、コミット、タグ、レビュー、公開手順を定義する。
- Node.js 24 LTSを標準とし、実装開始時にnpm依存と`package-lock.json`を固定する。
- 承認、要件追跡、リスク管理の初期台帳を作成する。

### 4.2 工程1：要件確定

- 採点、入力正規化、模擬試験割当、問題不足、弱点計算、バックアップ競合、中断再開、時間切れを決定する。
- Exam Packは開発者が配置し、再ビルドする方式に確定する。
- OSS-DB Silverは人が確認する独自問題10〜20問、第2試験は小規模デモPackとする。
- 50問・5,000問の自動試験fixtureは製品同梱Packと分離する。
- 問題の出典要件と妥当性判定基準を確定し、問題妥当性レビュースキルへ反映する。

### 4.3 工程2：基本設計

- React、TypeScript、Vite、Tailwind CSS、Dexie、Zod、Recharts、React Router、vite-plugin-pwaを採用する。
- Exam Packをビルド時に検証・変換し、静的PWAへ同梱する方式を設計する。
- 画面遷移、レスポンシブUI、IndexedDB、各ドメインエンジン、GitHub Pagesを設計する。
- 将来AIは`AIProvider`境界と承認状態だけ設計し、v1にProvider実装やAPIキーを含めない。
- 工程2の成果物は[基本アーキテクチャ設計](../20_基本設計/architecture-design.md)、[画面・遷移基本設計](../20_基本設計/ui-navigation-design.md)、[データフロー・保存基本設計](../20_基本設計/data-flow-storage-design.md)、[PWA・AI拡張基本設計](../20_基本設計/pwa-ai-extension-design.md)とする。

### 4.4 工程3：詳細設計

- Zodをデータ契約の基準とし、公開型、純粋関数、DBスキーマ、マイグレーションを確定する。
- すべての問題形式の回答を配列として正規化する。
- 正常系、異常系、データ移行、E2E、PWA試験を要件へ紐付ける。

### 4.5 工程4：実装

次の順序で実装する。

1. Vite基盤、品質チェック、CI
2. 共通型、Zod、Exam Packビルド・Validator
3. 通常演習、採点、解説、理解度、お気に入り
4. IndexedDB、履歴、演習モード、弱点復習
5. 模擬試験、中断再開、結果、統計
6. バックアップ・復元、PWA、レスポンシブ対応
7. OSS-DB Silverサンプルと第2デモPack

### 4.6 工程5：結合・総合試験

- Vitest、Testing Library、Playwrightで単体、結合、E2Eを検証する。
- 5,000問fixture、オフライン、ブラウザ再起動、異常Pack、未知バックアップ版、問題不足を検証する。
- 第2デモPack追加時に共通実装が変わらないことを確認する。

### 4.7 工程6：受入・リリース

- 要件定義の12受入条件を人が確認する。
- README、利用方法、Pack作成、バックアップ、既知制約を整備する。
- CI成功後に、人の明示承認を得てGitHub Pagesを公開する。
- 公開後確認を終えてから`v1.0.0`を確定する。

## 5. 工程共通の完了手順

1. Codexが承認済み入力と対象要件を確認する。
2. 専用ブランチで成果物を作成する。
3. 自己レビュー、自動検証、トレーサビリティ更新を行う。
4. 変更、判断、検証結果、残存リスクを人へ提出する。
5. 指摘を同じ工程内で修正し、再提出する。
6. 人の承認後に台帳、コミット、`main`統合、工程タグを確定する。
7. 次工程の入力を明記して停止する。

## 6. 費用方針

- 月額運用費と必須サービス費を0円に保つ。
- CodexはChatGPT Plusの含有枠だけを使い、追加クレジットを購入しない。
- 利用枠に達した場合は成果物を保存した状態で中断し、回復後に同じ工程から再開する。
- GitHub Pagesを無料で公開できる条件として、リリース時にリポジトリを公開可能な状態とする。可視性変更は人が承認する。

## 7. 参照

- [Exam Trainer 要件定義書](../10_要件定義/exam-trainer-requirements.md)
- [工程1 要件決定記録](../10_要件定義/requirements-decision-record.md)
- [開発ワークフロー](development-workflow.md)
- [承認台帳](approval-ledger.md)
- [要件トレーサビリティ](requirements-traceability.md)
- [リスク・課題台帳](risk-issue-register.md)
- [コミットメッセージ作成スキル](../../.agents/skills/commit-message/SKILL.md)
- [問題妥当性レビュースキル](../../.agents/skills/question-validity-review/SKILL.md)
- [基本アーキテクチャ設計](../20_基本設計/architecture-design.md)
- [画面・遷移基本設計](../20_基本設計/ui-navigation-design.md)
- [データフロー・保存基本設計](../20_基本設計/data-flow-storage-design.md)
- [PWA・AI拡張基本設計](../20_基本設計/pwa-ai-extension-design.md)
- [OpenAI文書：AGENTS.mdによるカスタム指示](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [OpenAI文書：スキルの作成](https://learn.chatgpt.com/docs/build-skills)
- [OpenAI文書：エージェントの承認とセキュリティ](https://learn.chatgpt.com/docs/agent-approvals-security)
- [OpenAI文書：料金](https://learn.chatgpt.com/docs/pricing)
