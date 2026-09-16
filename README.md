# Global Times blog

This is a source-linked current-affairs blog built with Next.js 16. It has statically generated category, post, and author pages.

## Getting Started

Install dependencies, copy `.env.example` to `.env.local`, set the site URL, and run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Article and author content is stored in `public/data`.

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
```
