// // lib/articles.js
// //
// // Shared data-access helpers for article detail pages. Pulled out of
// // app/[category]/[slug]/page.jsx so that generateStaticParams,
// // generateMetadata, and any layout component (common or custom) all read
// // from one place instead of three copies of the same lookup logic.
// //
// // Site name, URL, logo, and social handles live in lib/site.js — metadata
// // and JSON-LD are built in app/[category]/[slug]/page.jsx from those values.

// import articlesData from "../public/data/article.json";
// import authorsData from "../public/data/author.json";

// // Own-property lookup only. A plain `articlesData[category]` would also match
// // inherited keys like "constructor" or "valueOf" (returning a function), which
// // then crashes on `.find()` / `.filter()` and turns a bad URL into a 500.
// function getCategoryPosts(category) {
//   return typeof category === "string" && Object.hasOwn(articlesData, category)
//     ? articlesData[category]
//     : [];
// }

// // Posts marked `hideFromListings: true` are the supporting pieces of a
// // client pillar package (see FeatureLongform + getClientRelatedArticles
// // below) — they get their own direct URL and show up in the "More on..."
// // related section of other pages for that same client, but never through
// // ordinary discovery surfaces (homepage sections, category listing, author
// // pages, site search). The main/pillar article itself is NOT marked this
// // way, so it behaves like any other post and still shows in those places —
// // only its `client` field (shared by the supporting pieces) opts it into
// // the related-posts grouping.
// function isPublicListing(post) {
//   return !post.hideFromListings;
// }

// export function getPublicCategoryPosts(category) {
//   return getCategoryPosts(category).filter(isPublicListing);
// }

// export function getAllPublicArticles() {
//   return Object.entries(articlesData).flatMap(([category, posts]) =>
//     posts.filter(isPublicListing).map((post) => ({ ...post, category }))
//   );
// }

// export function getArticle(category, slug) {
//   const post = getCategoryPosts(category).find((p) => p.slug === slug);

//   if (!post) return null;

//   const authorInfo =
//     typeof post.authorSlug === "string" && Object.hasOwn(authorsData, post.authorSlug)
//       ? authorsData[post.authorSlug]
//       : {};

//   return {
//     category,
//     slug: post.slug,
//     headline: post.headline,
//     dek: post.dek,
//     author: authorInfo.name || post.authorSlug,
//     authorSlug: post.authorSlug,
//     authorRole: authorInfo.role || "",
//     authorImage: authorInfo.avatarImage || "",
//     authorBio: authorInfo.bio || "",
//     authorSocial: authorInfo.social || {},
//     authorUrl: authorInfo.url || "",
//     source: post.source,
//     sourceLinks: post.sourceLinks || [],
//     // Optional. Set this on pillar/profile pieces written for a specific
//     // client (e.g. "Julio Herrera Velutini") so getClientRelatedArticles()
//     // can find the rest of that client's coverage, wherever it's filed.
//     // Regular news posts simply omit this field.
//     client: post.client || null,
//     publishedAt: post.publishedAt,
//     updatedAt: post.updatedAt,
//     heroImage: post.heroImage,
//     heroCaption: post.heroCaption,
//     heroCredit: post.heroCredit,
//     tags: post.tags || [],
//     atAGlance: post.atAGlance || [],
//     faq: post.faq || [],
//     body: post.body || [],
//   };
// }

// // Up to `count` other articles from the same category, excluding the current one.
// // Uses the public (non-client) post list, so a client's pillar content never
// // shows up as a "related" suggestion on an ordinary news article either.
// export function getRelatedArticles(category, excludeSlug, count = 4) {
//   return getPublicCategoryPosts(category)
//     .filter((p) => p.slug !== excludeSlug)
//     .slice(0, count)
//     .map((p) => ({
//       category,
//       slug: p.slug,
//       headline: p.headline,
//       heroImage: p.heroImage,
//     }));
// }

// // Up to `count` other articles that belong to the SAME CLIENT, regardless
// // of which category they're filed under. Unlike getRelatedArticles() (which
// // is purely "same category"), this looks at the `client` field set on
// // pillar/profile posts, so a client's page never links out to unrelated
// // news — only to more coverage of that client.
// export function getClientRelatedArticles(clientName, excludeSlug, count = 5) {
//   if (!clientName) return [];

//   return Object.entries(articlesData)
//     .flatMap(([category, posts]) =>
//       posts
//         .filter((p) => p.client === clientName && p.slug !== excludeSlug)
//         .map((p) => ({
//           category,
//           slug: p.slug,
//           headline: p.headline,
//           dek: p.dek,
//           heroImage: p.heroImage,
//           publishedAt: p.publishedAt,
//         }))
//     )
//     .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
//     .slice(0, count);
// }

// export function getAllArticleParams() {
//   return Object.entries(articlesData).flatMap(([category, articles]) =>
//     articles.map((article) => ({ category, slug: article.slug }))
//   );
// }

// export function formatDate(iso) {
//   if (!iso) return null;
//   return new Date(iso).toLocaleDateString("en-US", {
//     month: "long",
//     day: "numeric",
//     year: "numeric",
//     hour: "numeric",
//     minute: "2-digit",
//   });
// }

// lib/articles.js
//
// Shared data-access helpers for article detail pages.

import articlesData from "../public/data/article.json";
import authorsData from "../public/data/author.json";

function getCategoryPosts(category) {
  return typeof category === "string" && Object.hasOwn(articlesData, category)
    ? articlesData[category]
    : [];
}

function isPublicListing(post) {
  return !post.hideFromListings;
}

export function getPublicCategoryPosts(category) {
  return getCategoryPosts(category).filter(isPublicListing);
}

export function getAllPublicArticles() {
  return Object.entries(articlesData).flatMap(([category, posts]) =>
    posts.filter(isPublicListing).map((post) => ({ ...post, category }))
  );
}

export function getArticle(category, slug) {
  const post = getCategoryPosts(category).find((p) => p.slug === slug);
  if (!post) return null;

  const authorInfo =
    typeof post.authorSlug === "string" && Object.hasOwn(authorsData, post.authorSlug)
      ? authorsData[post.authorSlug]
      : {};

  return {
    category,
    slug: post.slug,
    headline: post.headline,
    dek: post.dek,
    author: authorInfo.name || post.authorSlug,
    authorSlug: post.authorSlug,
    authorRole: authorInfo.role || "",
    authorImage: authorInfo.avatarImage || "",
    authorBio: authorInfo.bio || "",
    authorSocial: authorInfo.social || {},
    authorUrl: authorInfo.url || "",
    source: post.source,
    sourceLinks: post.sourceLinks || [],
    client: post.client || null,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    heroImage: post.heroImage,
    heroCaption: post.heroCaption,
    heroCredit: post.heroCredit,
    tags: post.tags || [],
    atAGlance: post.atAGlance || [],
    faq: post.faq || [],
    body: post.body || [],
  };
}

export function getRelatedArticles(category, excludeSlug, count = 4) {
  return getPublicCategoryPosts(category)
    .filter((p) => p.slug !== excludeSlug)
    .slice(0, count)
    .map((p) => ({
      category,
      slug: p.slug,
      headline: p.headline,
      heroImage: p.heroImage,
    }));
}

// FIX: use each post's own `category` field (falls back to the outer JSON
// key only if a post doesn't carry one), instead of always using the outer
// key. Previously every related-post link built here pointed at
// `/julio-herrera-velutini/<slug>` instead of `/business/<slug>`, a 404.
export function getClientRelatedArticles(clientName, excludeSlug, count = 5) {
  if (!clientName) return [];

  return Object.entries(articlesData)
    .flatMap(([outerKey, posts]) =>
      posts
        .filter((p) => p.client === clientName && p.slug !== excludeSlug)
        .map((p) => ({
          category: p.category || outerKey,
          slug: p.slug,
          headline: p.headline,
          dek: p.dek,
          heroImage: p.heroImage,
          publishedAt: p.publishedAt,
        }))
    )
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, count);
}

export function getAllArticleParams() {
  return Object.entries(articlesData).flatMap(([category, articles]) =>
    articles.map((article) => ({ category, slug: article.slug }))
  );
}

export function formatDate(iso) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}