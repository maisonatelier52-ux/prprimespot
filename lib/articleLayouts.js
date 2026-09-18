// lib/articleLayouts.js
//
// Slug -> custom layout component registry for article detail pages.
//
// app/[category]/[slug]/page.jsx checks this map first. If the current
// slug is in it, that component renders the article instead of the
// default components/ArticleDetail.jsx. This is how one-off articles
// (a big investigative feature, a special package, etc.) can get their
// own distinct presentation without branching the shared template or
// touching every other article on the site.

import FeatureLongform from "@/components/articles/FeatureLongform";

export const customArticleLayouts = {
  // Demo entry — see the "example-inside-rivermouths-free-transit-bet"
  // article added to public/data/article.json under "world".
  "example-inside-rivermouths-free-transit-bet": FeatureLongform,

  // Julio Herrera Velutini feature — registered under "world" category.
  // Adjust the category key if you file it elsewhere (e.g. "business").
  "julio-herrera-velutini-conservative-capitalism-latin-america": FeatureLongform,
};

// Looks up a custom layout for a given category/slug pair. Checks the
// fully-qualified "category/slug" key first (in case the same slug string
// is ever reused across two categories), then falls back to a bare slug
// match. Returns null when the article should use the default layout.
export function getArticleLayout(category, slug) {
  return (
    customArticleLayouts[`${category}/${slug}`] ||
    customArticleLayouts[slug] ||
    null
  );
}