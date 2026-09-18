// lib/articles.js
//
// Shared data-access helpers for article detail pages. Pulled out of
// app/[category]/[slug]/page.jsx so that generateStaticParams,
// generateMetadata, and any layout component (common or custom) all read
// from one place instead of three copies of the same lookup logic.

import articlesData from "../public/data/article.json";
import authorsData from "../public/data/author.json";

export function getArticle(category, slug) {
  const post = (articlesData[category] || []).find((p) => p.slug === slug);

  if (!post) return null;

  const authorInfo = authorsData[post.authorSlug] || {};

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
    body: post.body || [],
  };
}

// Up to `count` other articles from the same category, excluding the current one
export function getRelatedArticles(category, excludeSlug, count = 4) {
  return (articlesData[category] || [])
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
// lib/articles.js — add below formatDate

const SITE_NAME = "Your Site Name";              // ← change to your site's name
const SITE_URL = "https://yourdomain.com";       // ← change to your production URL
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-default.jpg`; // ← fallback OG image
const TWITTER_HANDLE = "@yourhandle";            // ← change or remove

export function buildArticleMetadata(category, slug) {
  const article = getArticle(category, slug);
  if (!article) return {};

  const canonical = `${SITE_URL}/${category}/${slug}`;

  // Fallback description: dek, or first ~160 chars of the body
  const firstParagraph = Array.isArray(article.body)
    ? (article.body.find((b) => b.type === "paragraph")?.text || "")
    : "";
  const description =
    article.dek ||
    article.seo?.description ||
    firstParagraph.slice(0, 160).trim() + (firstParagraph.length > 160 ? "…" : "");

  // Image: absolute URL, prefer the article hero
  const ogImage = article.heroImage
    ? article.heroImage.startsWith("http")
      ? article.heroImage
      : `${SITE_URL}${article.heroImage}`
    : DEFAULT_OG_IMAGE;

  return {
    title: article.seo?.title || article.headline,
    description,
    alternates: { canonical },
    authors: article.author ? [{ name: article.author }] : undefined,
    keywords: article.tags || undefined,
    openGraph: {
      title: article.seo?.title || article.headline,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
      authors: article.author ? [article.author] : undefined,
      tags: article.tags || undefined,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.heroCaption || article.headline,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seo?.title || article.headline,
      description,
      images: [ogImage],
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    other: {
      // Optional: some aggregators still read these legacy tags
      "article:published_time": article.publishedAt,
      "article:modified_time": article.updatedAt || article.publishedAt,
      "article:author": article.author,
      "article:section": category,
    },
  };
}

export function buildArticleJsonLd(category, slug, categoryLabel) {
  const article = getArticle(category, slug);
  if (!article) return null;

  const canonical = `${SITE_URL}/${category}/${slug}`;
  const heroImage = article.heroImage
    ? article.heroImage.startsWith("http")
      ? article.heroImage
      : `${SITE_URL}${article.heroImage}`
    : DEFAULT_OG_IMAGE;

  const newsArticle = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
    headline: article.headline,
    description: article.dek || "",
    image: [heroImage],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: article.author
      ? [
          {
            "@type": "Person",
            name: article.author,
            ...(article.authorSlug
              ? { url: `${SITE_URL}/authors/${article.authorSlug}` }
              : {}),
            ...(article.authorBio ? { description: article.authorBio } : {}),
          },
        ]
      : undefined,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.png`,
        width: 512,
        height: 512,
      },
    },
    articleSection: categoryLabel || category,
    keywords: (article.tags || []).join(", "),
    inLanguage: "en-US",
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryLabel || category,
        item: `${SITE_URL}/${category}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.headline,
        item: canonical,
      },
    ],
  };

  return [newsArticle, breadcrumbs];
}