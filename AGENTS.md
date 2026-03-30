# 記憶の回廊 — AGENTS.md

ビジュアルノベル × 記憶術トレーニングのモバイルWebアプリ。
毎日10〜15分、物語を読み進めながら記憶術を体験する。
記憶術の成績が物語の分岐に影響し、失われた記憶と館の謎が解けていく。

---

## 技術スタック

| 項目 | 技術 |
|---|---|
| フレームワーク | Next.js 14（App Router）|
| 言語 | TypeScript |
| スタイリング | Tailwind CSS |
| アニメーション | Framer Motion |
| AI | Gemini 2.5 Flash API（`gemini-2.5-flash`）|
| DB | Vercel KV |
| デプロイ | Vercel |
| プラットフォーム | モバイルファースト PWA |

---

## ドキュメント

実装前に必ず参照すること。

| ファイル | 内容 |
|---|---|
| `docs/design.md` | 全体設計・データ構造・UIデザイン・実装順序 |
| `docs/chapter1.md` | 第一章台本（場所法）全5話+隠しエピソード |
| `docs/chapter2.md` | 第二章台本（数字変換法）全5話+隠しエピソード |
| `docs/chapter3.md` | 第三章台本（連想法）全5話+隠しエピソード ※ネタバレ注意 |
| `docs/chapter4.md` | 第四章台本（ストーリー法）全5話+隠しエピソード ※ネタバレ注意 |
| `docs/chapter5.md` | 第五章・終章台本（統合）※ネタバレ注意 |

> ⚠️ chapter3〜5はのりおさん（オーナー）がプレイ予定のため、実装時以外は内容を会話に出さないこと。

---

## プロジェクト構成

```
src/
  app/
    page.tsx                    # ホーム（毎日の入場）
    story/[chapterId]/page.tsx  # 物語画面
    training/page.tsx           # トレーニング画面
    result/page.tsx             # 結果画面
    diary/page.tsx              # 記憶の日記
    api/
      generate-story/route.ts   # Gemini 物語生成
      score/route.ts            # Gemini 採点
  components/
    story/
      TextReveal.tsx            # テキスト一文ずつ表示
      ChoiceButton.tsx          # 選択肢
      CandleAmbient.tsx         # 燭台アニメーション
    training/
      PalaceSetup.tsx           # 記憶の宮殿設定
      WalkThrough.tsx           # 情報を置く画面
      BlankTime.tsx             # ブランクタイム
      RecallInput.tsx           # 想起入力
    result/
      ScoreCandles.tsx          # 燭台スコア表示
      NarrativeText.tsx         # フィードバックテキスト
  lib/
    gemini.ts                   # Gemini API クライアント
    kv.ts                       # Vercel KV ユーティリティ
    story-data.ts               # 章・物語の静的データ
  types/
    story.ts
    training.ts
    user.ts
docs/
  design.md
  chapter1.md
  chapter2.md
  chapter3.md
  chapter4.md
  chapter5.md
```

---

## データ構造（Vercel KV）

```
user:{userId}:progress      → 章・セッション数・総正解数
user:{userId}:palace        → 記憶の宮殿の場所・通過点
user:{userId}:memories      → 解放された記憶の断片
user:{userId}:sessions      → セッション履歴（忘却曲線計算用）
user:{userId}:flags         → 物語分岐フラグ
story:{chapterId}:branches  → 分岐ログ
```

---

## デザイン原則

- **フォント**: Noto Serif JP（物語）/ Noto Sans JP（UI）
- **カラー**: 背景 `#0a0804`、テキスト `#e0d0b0`、アクセント `#c8a050`
- **トーン**: 「本を読む体験」に近い没入感。UI要素を限りなく消す
- **アニメーション**: テキストのフェードイン、燭台のゆらぎ、ページ送り形式
- **モバイル**: タップ操作最適化、片手操作を考慮したボタン配置

---

## セッション構造（毎日10〜15分）

```
1. 物語パート（3〜5分）
   ├── テキストが一文ずつ現れる
   ├── ミラとの会話（選択肢あり）
   └── 章の進行度に応じた伏線・謎の提示

2. 記憶術パート（2〜3分）
   ├── その章の記憶術の解説（初回のみ詳細）
   ├── 記憶の宮殿の設定 or 確認
   └── 情報を「置く」体験

3. トレーニングパート（3〜5分）
   ├── ブランク時間（目を閉じる・カウントダウン）
   └── テキスト自由記述で想起

4. 結果パート（1〜2分）
   ├── Gemini APIによる採点・フィードバック
   ├── 成績に応じた物語テキストの変化
   └── 次回予告（1文）
```

---

## Gemini APIの使い方

**使用モデル**: `gemini-3-flash`

**物語生成**（`/api/generate-story`）
- 台本が「幹」、Gemini生成が「葉」
- 毎日の振り返り文・細かいリアクション・次回予告を動的生成
- 村上春樹的文体・一人称・現在進行形

**採点**（`/api/score`）
- 部分一致・表記ゆれ・意味的一致はすべて正解
- 結果は JSON で返す（scores配列・correct_count・narrative・feedback配列）
- narrativeはユーザーの記憶の宮殿を使った詩的な描写

---

## 実装フェーズ

```
フェーズ1（MVP）
  ├── Next.js + Tailwind 初期セットアップ
  ├── 第一章の物語テキスト（静的）
  ├── 記憶の宮殿入力 + 場所法トレーニング
  ├── Gemini API 採点連携
  └── Vercel デプロイ

フェーズ2（物語の深化）
  ├── Gemini による物語動的生成
  ├── 選択肢分岐の実装
  ├── 結果の物語への反映
  └── 記憶の日記画面

フェーズ3（継続設計）
  ├── Vercel KV でのデータ永続化
  ├── セッション履歴・忘却曲線
  ├── PWA 対応（ホーム追加・通知）
  └── 第二章の実装
```

---

## 作業開始時の手順

1. `docs/design.md` を読む
2. 実装する章の台本（例：`docs/chapter1.md`）を読む
3. 現在のタスクを確認して実装開始

---

## 現在のタスク

- [ ] フェーズ1：MVPの構築
  - [ ] Next.js プロジェクト初期化
  - [ ] デザインシステム（カラー・フォント・共通コンポーネント）
  - [ ] 第一章 物語パートの実装
  - [ ] 記憶の宮殿設定UIの実装
  - [ ] 場所法トレーニングUIの実装
  - [ ] Gemini API採点連携
  - [ ] Vercelデプロイ
