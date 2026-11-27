# 野菜遺産 公式サイト プロトタイプ — 開発ルール

関係者に見せて操作感を確認するためのプロトタイプ。本番の決済・ログインは実装しない。

## 事業の前提
- 伝統野菜・在来野菜の種を扱う事業。本業は全国の種小売店への B2B 販売。
- 課題は野菜の魅力ではなく「認知」と「販売チャネル」。
- 世界観：いろんな伝統野菜と出会い、育てて、食べて楽しむ。
- 流れ：SNSで知る → ライブで見る → 育てる・つくる → つなぐ。
- 価値提案（リーンキャンバスより）：「食べられる文化遺産を、育てて、つくって、次の世代へつなぐ。」
  ＝ 図鑑 × ライブコマース × 栽培コミュニティ。

## 進め方
- 共通レイアウト → ホーム → 図鑑 → 種を買う → コミュニティ → その他（ライブ・レシピ投稿・マーケット・応援・マイページ）の順に1画面ずつ実装する。
- 1画面できるごとにスクリーンショット（スマホ幅とPC幅）を付けて、ユーザーに確認を求める。確認が取れるまで次の画面に進まない。
- ワイヤーフレームは `docs/wireframes/`。画面を作る前に必ず該当の画像を見る。
  - `home.png` `live.png` `zukan-detail.png` `buy.png` `community.png` `recipe-new.png` `market.png` `support.png` `mypage.png`
  - SNS（`sns-*.png`）はサイトへの導線の参考。`lean-canvas.webp` は事業の前提。
  - 図鑑一覧（`/zukan`）はワイヤーなし。ホームの野菜カードを並べ、地域・旬で絞り込む形で想定して作る。

## 技術
- Next.js 16（App Router）＋ TypeScript ＋ Tailwind CSS v4。外部APIは使わない（Vercelにそのままデプロイ可能）。
- 動的ルートの `params` は Promise（Next 16）。`await params` で受ける。
- データはすべて `/data/*.json` のモック。型は `lib/types.ts`、読み込みは `lib/data.ts` 経由で行い、ページから JSON を直接 import しない。
  - `vegetables.json` `stores.json` `posts.json` `recipes.json` `listings.json` `projects.json` `live.json` `user.json`
- モックの操作状態（投票・ポイント・投稿・クーポンなど）は `lib/mock-store.tsx` の Context に持ち、`sessionStorage` に保存する。読み書きは必ず try/catch し、保存できなくても表示が崩れないようにする。
- 画像は `components/illust/Illust.tsx` の自作SVGイラストを使う（外部の写真・生成画像は使わない）。
  - 野菜は `vegetables.json` の `art`（形 `shape` と色 `color`）で描き分ける。実在品種に見せない。
  - 場面は `kind` で選ぶ：`veg` `section` `field` `dish` `live` `seed` `market` `kids` `sprout` `map` `chef`。
  - 必ず `label` を渡す（`aria-label="イラスト：…"` になる）。
  - イラストの色は `--color-il-*` トークンだけを使う。文字色には使わない。
  - 映像の埋め込み枠など「中身が外部」のものだけ `<Placeholder label="…" />`（グレーの枠＋ラベル）を使う。
- Tailwind の `@theme` は `static` 指定（イラストが CSS 変数を直接参照するため、未使用の色も出力させる）。
- 確認コマンド：`npm run typecheck` / `npm run check:words` / `npm run build`。コミット前に3つとも通す。

## 文言のルール
- 「推し」「へんてこ」は使わない（`npm run check:words` で検査）。「変わった野菜」も画面には出さない。
- 使う語彙：「個性」「出会う」「育て比べ・食べ比べ」。
- 店舗の在庫は表示しない。取扱店の場所と店頭価格だけを出し、次の注記を必ず添える：
  「※ 在庫状況は表示していません。在庫は店舗へお問い合わせください。」

## ダミーデータのルール
- 実在データを捏造しない。固有名（野菜・地域・店舗・人・住所）は `[野菜名A]` `[地域A]` `[店舗名A]` `[シェフ名]` `[ニックネーム]` `[住所]` のようなプレースホルダーにする。
- 金額・人数・件数・距離・ポイント・月・日数・日付・% は、ダミーの数値で表示してよい（2026-11-27 ユーザー了承）。値は JSON に持たせ、`lib/format.ts`（`yen` `months` `seasons` `pct` など）で整形する。画面に直接数値を書かない。
- 数値がダミーであることは、各画面の下の注記（`Screen` が出す「名前・価格・人数などはすべてダミーです」）で伝える。
- 価格は必ず `storePrice < ecPrice`。販売所のほうが安いことは「おトク」ラベルでも伝える。
- ECのメリットはポイントと購入履歴（＋栽培日記の連携、種まき時期の通知）。
- ポイントの基準値は `lib/format.ts` の `POINTS`（レシピ投稿 50pt など）。

## モック動作
- 決済・支援・投稿・出品・ログインは、ボタンを押すと完了画面（`MockComplete`）を表示するだけ。入力値は送信しない。
- ユーザーは `user.json` のダミーユーザー1人に固定（ログイン画面なし）。

## デザイン
- 白地＋グレーの線。アクセントは深緑 `#2E6B3F`（`accent`）。
- 赤茶 `#B3471B`（`live`）は次の3か所だけ：ライブのバッジ、図鑑の「絶滅危惧度」、コミュニティの「質問」ラベル。
- フォントは Noto Sans JP（`next/font/google`）。
- 色はすべて `app/globals.css` の `@theme` のトークンを使う。任意の色コードを直接書かない。
- コントラストは WCAG AA 以上。本文の補助テキストは `text-muted`（#595954）以上の濃さ。入力欄の枠線は `border-strong`（3:1以上）。
- タップ領域は 44px 以上（`min-h-11` / `min-w-11`）。
- セマンティックなHTML：操作は `<button>`、遷移は `<Link>`、入力は `<label>` と関連付ける。タブは `role="tablist"`/`tab`、アイコンだけのボタンには `aria-label`。
- スマホファースト。PCでは本文を最大幅 640px（`max-w-app`）で中央寄せ。固定ヘッダー・下部タブ・固定ボタンもこの列の中に収める。

## 画面の型
| 型 | ヘッダー | 下部タブ | 画面下の固定ボタン | 画面 |
|---|---|---|---|---|
| タブ | `TabHeader`（タイトル＋操作） | あり | なし | `/` `/live` `/zukan` `/community` `/mypage` |
| 戻れるタブ | `BackHeader` | あり | なし | `/market`（ワイヤーどおり＜と下部タブの両方） |
| 詳細 | `BackHeader`（＜＋タイトル） | なし | `StickyActionBar` | `/zukan/[id]` `/support` `/buy/[id]`（固定ボタンなし） |
| フォーム | `CloseHeader`（×＋タイトル＋右操作） | なし | `StickyActionBar` | `/recipe/new` |

- 下部タブ：ホーム `/`・ライブ `/live`・図鑑 `/zukan`・みんな `/community`・マイ `/mypage`。
- `/market` `/support` `/recipe/new` へはホームとコミュニティから入る。
- タブの切り替え状態は URL クエリ（`?tab=` / `?mode=`）に持たせる。`useSearchParams` を使う部品は `<Suspense>` で囲む。
- `/styleguide` は共通パーツの見本ページ。新しい共通パーツを作ったらここにも並べる。
