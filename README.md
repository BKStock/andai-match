# &AI MATCH

> PayPayマネーライトを現金・USDTに交換できる、日本唯一のP2Pマッチングマーケットプレイス

## 🎯 概要

PayPayマネーライト（使用制限付き残高）を持つユーザーと、JPY/USDTを求めるユーザーをAIがリアルタイムにマッチング。
エスクロー決済・KYC・詐欺検知を内蔵し、安全で透明な交換体験を提供する。
手数料モデルで収益化し、PayPayエコシステムの盲点を突く独自サービス。

## ✨ 主な機能

- **AIマッチング** — 最適な取引相手を自動選定（価格・評価・実績スコア）
- **エスクロー決済** — 資金を保護しながらP2P取引を実行
- **詐欺検知 & KYC** — リアルタイム異常検知・本人確認フロー
- **レーティングシステム** — 双方向評価で信頼スコアを蓄積
- **ダークモード対応・日英切替** — プレミアムフィンテックUI

## 🛠️ 技術スタック

- **フロントエンド:** Next.js 16 + React 19 + TypeScript (strict) + Tailwind CSS 4 + shadcn/ui
- **バックエンド:** Supabase (Auth + DB)
- **DB:** Supabase PostgreSQL
- **決済:** PayPay API + Stripe
- **インフラ:** Vercel

## 🌐 URL

- **本番:** 未デプロイ（Vercel設定済み）
- **開発:** http://localhost:3000

## 📊 ステータス

🔵 設計済み — MVPフロントエンド完成、バックエンド統合待ち

## 🔗 関連プロジェクト

- **統合元:** paypay-match
- **連携先:** &AI BRAIN（AI価格最適化シグナル）

## 📁 プロジェクト構造

```
src/
├── app/
│   ├── page.tsx          # ランディングページ（LP）
│   ├── register/         # ユーザー登録フロー
│   ├── deposit/          # 入金フロー
│   └── dashboard/        # ユーザーダッシュボード
├── components/
│   ├── ui/               # shadcn/ui デザインシステム
│   └── Nav.tsx           # ナビゲーション
├── context/              # AppContext（状態管理）
└── lib/                  # ユーティリティ
```

## 🚀 開始方法

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build
```

### 環境変数

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
PAYPAY_API_KEY=
STRIPE_SECRET_KEY=
```

---
*BKグループ &AI ブランド / 2026-04-06*
