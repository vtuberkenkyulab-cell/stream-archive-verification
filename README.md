# 配信アーカイブ検証室

VTuber・配信者について検索で見かける話題を、元配信・本人SNS・公式発表などの公開資料まで遡って確認する非公式アーカイブです。

## 公開URL

[https://vtuberkenkyulab-cell.github.io/stream-archive-verification/](https://vtuberkenkyulab-cell.github.io/stream-archive-verification/)

## サイトの構造

- `src/content/articles/`：記事本文（Markdown）
- `src/content/people/`：人物ハブ用データ
- `src/pages/`：TOP、一覧、固定ページ、RSS、robots.txt
- `src/content.config.ts`：記事データの必須項目と型チェック
- `.github/workflows/deploy.yml`：mainへのpushで自動公開する設定

記事・人物ページは静的HTMLとして出力されます。JavaScriptが無効でも、本文、出典、ナビゲーションを読めます。

## 新しい記事を追加する方法

1. `src/content/articles/` 内の既存記事を1つ複製します。
2. ファイル名を、短い半角英数字とハイフンの名前に変更します。
3. ファイル冒頭の `---` で囲まれた部分を更新します。
4. `title`、`slug`、`person`、`personSlug`、`description`、3つの日付、`keyPoints`、`sources` を入力します。
5. 本文を `---` より下へ書きます。
6. 新しい人物の場合は `src/content/people/` に人物JSONも追加します。
7. mainへ反映すると、自動チェック後に公開されます。

必須情報が欠けている場合や、URL・日付の形式が違う場合は、公開前のチェックで止まります。

## 既存記事を修正する方法

対象のMarkdownを開き、本文または冒頭の情報を修正します。修正日には `updatedAt` を更新してください。事実確認日も変わる場合は `checkedAt` も更新します。

## 注目記事とTOPの表示順

- `featured: true`：TOPの「注目記事」に表示
- `featured: false`：注目記事には表示しない
- `displayOrder: 1`：注目記事の先頭
- `displayOrder: 2`：注目記事の2番目

数値が小さいほど先に表示されます。「人気ランキング」ではなく、編集上のピックアップ順です。

## 下書きの切り替え

- `draft: true`：記事一覧、人物ページ、sitemap、RSSに出さない
- `draft: false`：公開する

## 訂正履歴の追加

記事冒頭の `corrections` を次のように変更します。

```yaml
corrections:
  - date: 2026-10-04
    location: "該当する見出しや文章"
    reason: "変更理由"
```

追加した内容は、記事末尾と `/corrections/` に表示されます。

## Google Search Console

1. Google Search Consoleを開きます。
2. 「プロパティを追加」から「URLプレフィックス」を選び、公開URLを入力します。
3. 所有権の確認方法で「HTMLタグ」を選びます。
4. 表示された `<meta name="google-site-verification" content="...">` のうち、`content` の中身だけを取得します。
5. GitHubリポジトリの Settings → Secrets and variables → Actions → Variables に `PUBLIC_GOOGLE_SITE_VERIFICATION` という名前で登録します。
6. Actionsから再実行するか、mainへ変更を反映します。
7. 所有権を確認後、Search Consoleの「サイトマップ」へ `sitemap-index.xml` を送信します。

設定値は1か所だけで、すべてのページのheadへ反映されます。

## OAI-SearchBot / GPTBot

`robots.txt` では、通常の検索クローラーに加えて次を許可しています。

- `OAI-SearchBot`：ChatGPT Searchの検索結果でサイトを見つけ、表示するためのクローラー
- `GPTBot`：OpenAIの基盤モデル改善のために公開ページを利用するクローラー

両者は用途が異なるため、別々の指定を置いています。

## 独自ドメインへ移行する方法

1. ドメイン提供会社でGitHub Pages向けのDNSを設定します。
2. `public/CNAME` を作り、使用するドメインを1行で書きます。
3. GitHubの Settings → Pages で同じドメインを指定します。
4. Actionsの変数 `PUBLIC_SITE_URL` を `https://独自ドメイン`、`PUBLIC_BASE_PATH` を `/` に設定します。
5. Search Consoleへ独自ドメインを追加し、新しいsitemapを送信します。

記事URLの末尾は維持されるため、将来の移行時も転送設定を作りやすい構成です。

## 手元で確認する場合

```sh
pnpm install
pnpm dev
```

公開用の最終チェックは次で行います。

```sh
pnpm build
```
