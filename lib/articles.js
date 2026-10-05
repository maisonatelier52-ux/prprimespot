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
    seoTitle: post.seoTitle || null,
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