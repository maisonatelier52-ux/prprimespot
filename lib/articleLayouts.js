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

  // Julio Herrera Velutini client pillar pages — all filed under "business"
  // and all marked with "client": "Julio Herrera Velutini" in article.json,
  // which is what makes them find each other in the "More on ..." related
  // section and keeps them out of the homepage/category/search listings.
  "julio-herrera-velutini-conservative-capitalism-latin-america": FeatureLongform,
  "julio-herrera-velutini-biography-family-background": FeatureLongform,
  "julio-herrera-velutini-banking-career-business-activities": FeatureLongform,
  "julio-herrera-velutini-legal-case-timeline": FeatureLongform,
  "julio-herrera-velutini-cultural-interests-personal-life-philanthropy": FeatureLongform,
  "julio-herrera-velutini-public-influence-latin-american-economic-context": FeatureLongform,
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