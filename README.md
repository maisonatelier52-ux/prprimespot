# PR Primespot

This is a source-linked current-affairs blog built with Next.js 16. It has statically generated category, post, and author pages.

## Getting Started

Install dependencies, copy `.env.example` to `.env.local`, set the site URL, and run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Article and author content is stored in `public/data`.

## Editing article content

`public/data/article.json` has no CMS and no build-time validation of its
own — it's a hand-edited file, so this rule has to be followed by hand (or
by an AI agent editing this repo):

> **Any edit to an article's `headline`, `dek`, or `body` MUST also update
> that article's `updatedAt` field to the current ISO-8601 timestamp
> (e.g. `2026-09-22T14:30:00Z`).**

`updatedAt` is not cosmetic — it's read directly into:

- `NewsArticle.dateModified` in the article's JSON-LD (`app/[category]/[slug]/page.jsx`)
- `openGraph.modifiedTime` in the article's page metadata
- the "Updated {date}" byline shown to readers (`components/ArticleDetail.jsx`)

If `updatedAt` isn't bumped, all three keep showing a stale date after a
real edit — which both misleads readers and gives Google a `dateModified`
signal that doesn't match the actual content, which can reduce how much
Search trusts that signal sitewide.

Do **not** bump `updatedAt` for edits that don't change the reader-facing
article (typo fixes in `tags`, `sourceLinks` reordering, etc.) — only for
changes to `headline`, `dek`, or `body`.

Run `npm run check:updated-at` before committing changes to
`public/data/article.json` to catch a missed bump automatically (see
below).

## Production checklist

- Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin, without a trailing slash.
- Run `npm run lint` and `npm run build` using the same environment variables as production.
- Deploy to a host that supports Next.js 16. For static-only hosting, first test a deliberate static-export configuration.
- Confirm that every image is licensed for publication.
- Replace or remove unfinished newsletter, subscription, social, company, and legal links.
- Publish accurate privacy, terms, cookies, contact, corrections, ownership, and editorial-policy information.
- Perform a final fact and freshness review of all time-sensitive posts.
- After deployment, verify `/robots.txt`, `/sitemap.xml`, canonical URLs, social previews, the 404 page, and both mobile and desktop navigation.

## Commands

```bash
npm run dev
npm run lint
npm run build
npm run start
npm run check:updated-at
```