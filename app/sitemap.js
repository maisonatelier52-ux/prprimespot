import articlesData from "../public/data/article.json";
import authorsData from "../public/data/author.json";
import { SITE_URL } from "@/lib/site";

function newestDate(posts) {
  return posts.reduce((latest, post) => {
    const candidate = post.updatedAt || post.publishedAt;
    return candidate && (!latest || candidate > latest) ? candidate : latest;
  }, null);
}

export default function sitemap() {
  const allArticles = Object.entries(articlesData).flatMap(([category, posts]) =>
    posts.map((post) => ({ ...post, category }))
  );
  const siteLastModified = newestDate(allArticles);

  const categories = Object.entries(articlesData).map(([category, posts]) => ({
    url: `${SITE_URL}/${category}`,
    lastModified: newestDate(posts) || undefined,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const articles = allArticles.map((post) => ({
    url: `${SITE_URL}/${post.category}/${post.slug}`,
    lastModified: post.updatedAt || post.publishedAt || undefined,
    changeFrequency: "weekly",
    priority: 0.7,
    ...(post.heroImage
      ? { images: [`${SITE_URL}${post.heroImage.startsWith("/") ? "" : "/"}${post.heroImage}`] }
      : {}),
  }));

  const authors = Object.keys(authorsData).map((author) => ({
    url: `${SITE_URL}/authors/${author}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: siteLastModified || undefined,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...categories,
    ...articles,
    ...authors,
  ];
}