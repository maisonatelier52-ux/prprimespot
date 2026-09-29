// lib/categories.js
//
// Single source of truth for category display labels. Used by the
// category page, the article page (breadcrumb + JSON-LD articleSection),
// and the About page, so "us" is always "U.S." and a client hub slug
// like "julio-herrera-velutini" never shows up as a raw URL fragment.

import articlesData from "../public/data/article.json";

// The six real nav sections. Any other top-level key in article.json is
// a client/pillar content hub (see getCategoryLabel below).
export const CATEGORY_LABELS = {
  business: "Business",
  finance: "Finance",
  world: "World",
  us: "U.S.",
  politics: "Politics",
  sports: "Sports",
};

export function isNavCategory(category) {
  return (
    typeof category === "string" &&
    Object.hasOwn(CATEGORY_LABELS, category.toLowerCase())
  );
}

// For a real nav category, use its fixed label. For a client/pillar hub
// category (not in CATEGORY_LABELS — e.g. "julio-herrera-velutini"),
// derive a readable label from the posts' shared `client` field rather
// than showing the raw URL slug as the page heading/title.
export function getCategoryLabel(category) {
  const key = typeof category === "string" ? category.toLowerCase() : "";
  if (Object.hasOwn(CATEGORY_LABELS, key)) return CATEGORY_LABELS[key];

  const posts = Object.hasOwn(articlesData, key) ? articlesData[key] : [];
  const client = posts.find((p) => p.client)?.client;
  if (client) return client;

  return key
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}