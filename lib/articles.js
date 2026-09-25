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

// Shared by the header's client-side search dropdown (components/header.jsx)
// and the /search page (app/search/page.jsx), so both match the same set of
// articles with the same rule (headline/dek substring match, public listings
// only) instead of drifting apart as two separate implementations.
export function searchArticles(query, count = 8) {
  const q = typeof query === "string" ? query.trim().toLowerCase() : "";
  if (!q) return [];

  return getAllPublicArticles()
    .filter(
      (post) =>
        post.headline.toLowerCase().includes(q) ||
        (post.dek && post.dek.toLowerCase().includes(q))
    )
    .slice(0, count);
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