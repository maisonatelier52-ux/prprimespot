// lib/articles.js
//
// Shared data-access helpers for article detail pages. Pulled out of
// app/[category]/[slug]/page.jsx so that generateStaticParams,
// generateMetadata, and any layout component (common or custom) all read
// from one place instead of three copies of the same lookup logic.
//
// Site name, URL, logo, and social handles live in lib/site.js — metadata
// and JSON-LD are built in app/[category]/[slug]/page.jsx from those values.

import articlesData from "../public/data/article.json";
import authorsData from "../public/data/author.json";

// Own-property lookup only. A plain `articlesData[category]` would also match
// inherited keys like "constructor" or "valueOf" (returning a function), which
// then crashes on `.find()` / `.filter()` and turns a bad URL into a 500.
function getCategoryPosts(category) {
  return typeof category === "string" && Object.hasOwn(articlesData, category)
    ? articlesData[category]
    : [];
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

// Up to `count` other articles from the same category, excluding the current one
export function getRelatedArticles(category, excludeSlug, count = 4) {
  return getCategoryPosts(category)
    .filter((p) => p.slug !== excludeSlug)
    .slice(0, count)
    .map((p) => ({
      category,
      slug: p.slug,
      headline: p.headline,
      heroImage: p.heroImage,
    }));
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