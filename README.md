# 記憶の回廊

ビジュアルノベル × 記憶術トレーニングのモバイルWebアプリ。
毎日10〜15分、物語を読み進めながら記憶術を体験する。

## 技術スタック

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Google Gemini API

## セットアップ

```bash
# 依存関係をインストール
npm install

# 環境変数を設定
cp .env.local.example .env.local
# .env.localにGEMINI_API_KEYを設定

# 開発サーバーを起動
npm run dev
```

## 開発

```bash
# ビルド
npm run build

# 本番サーバー起動
npm start
```

## ドキュメント

- `docs/design.md` - 全体設計
- `docs/chapter1.md` - 第一章台本
- `CLAUDE.md` - プロジェクトガイドライン
