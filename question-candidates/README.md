# 問題承認候補

人による承認前の問題は、製品入力`exam-packs/`へ置かず、このディレクトリ配下で管理する。

候補は`status: reviewed`を維持し、`npm run validate:candidates`で構造検証する。問題妥当性レビューと人による明示承認後に限り、対象問題を`status: approved`として`exam-packs/`へ昇格できる。
