# まちがいカード

中学受験の過去問の、まちがえた問題だけを復習する暗記カード（PWA）。

## ファイル
- `index.html` … アプリ本体
- `manifest.webmanifest` … ホーム画面に追加したときの名前・アイコン
- `sw.js` … オフラインで開けるようにする仕組み
- `icons/` … アイコン
- `.nojekyll` … GitHub Pages 用（中身は空でOK）

## GitHub Pages で公開する
1. GitHub で新しいリポジトリを作る（例: `machigai-card`）。Public にする。
2. 「Add file」→「Upload files」で、このフォルダの中身をすべてアップロードする（`icons` フォルダごと）。
3. 「Settings」→「Pages」→ Source を「Deploy from a branch」、Branch を `main` / `/ (root)` にして Save。
4. 1〜2分後、`https://<ユーザー名>.github.io/machigai-card/` で開けるようになる。

## スマホのホーム画面に追加する
- iPhone: Safari で開く → 共有ボタン →「ホーム画面に追加」
- Android: Chrome で開く → メニュー →「ホーム画面に追加」（または「アプリをインストール」）

## データについて
- 写真やカードは、その端末の中だけに保存されます（サーバーには送られません）。
- 別の端末へ移すときは「設定 → バックアップ → 書き出す」で作ったファイルを、相手の端末で「読み込む」。
- 「AIで問題を見つける」を使うときだけ、撮影したページの画像が Anthropic の API に送られます。

## アプリを更新したとき
`index.html` などを差し替えたら、`sw.js` の `CACHE = "machigai-card-v1"` の番号を上げてアップロードしてください。
