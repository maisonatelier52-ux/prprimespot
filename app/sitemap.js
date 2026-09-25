import articlesData from "../public/data/article.json";
import authorsData from "../public/data/author.json";
import { SITE_URL } from "@/lib/site";

function newestDate(posts) {
  return posts.reduce((latest, post) => {
    const candidate = post.updatedAt || post.publishedAt;
    return candidate && (!latest || candidate > latest) ? candidate : latest;
  }, null);
}

// Static, non-article pages. Content pages (About, Contact) get a
// slightly higher priority than pure legal/policy boilerplate, since
// they're more likely to be useful search-landing pages.
const STATIC_PAGES = [
  { path: "/about", changeFrequency: "monthly", priority: 0.5 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.5 },
  { path: "/source-methodology", changeFrequency: "yearly", priority: 0.4 },
  { path: "/ownership-and-funding", changeFrequency: "yearly", priority: 0.4 },
  { path: "/legal", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-and-conditions", changeFrequency: "yearly", priority: 0.3 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/advertising-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/editorial-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/corrections-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/right-of-reply-policy", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap() {
  const allArticles = Object.entries(articlesData).flatMap(([category, posts]) =>
    posts.map((post) => ({ ...post, category }))
  );
  const siteLastModified = newestDate(allArticles);

  // Real nav categories (business, finance, world, us, politics, sports)
  // get the standard 0.8 priority. Any other top-level article.json key
  // is a client/pillar content hub (e.g. "julio-herrera-velutini") — it's
  // a real, indexable page, just lower priority than the main sections.
  const NAV_CATEGORIES = {
    business: 1,
    finance: 1,
    world: 1,
    us: 1,
    politics: 1,
    sports: 1,
  };
  const categories = Object.entries(articlesData).map(([category, posts]) => ({
    url: `${SITE_URL}/${category}`,
    lastModified: newestDate(posts) || undefined,
    changeFrequency: "daily",
    priority: Object.hasOwn(NAV_CATEGORIES, category) ? 0.8 : 0.2,
  }));

  const articles = allArticles.map((post) => ({
    url: `${SITE_URL}/${post.category}/${post.slug}`,
    lastModified: post.updatedAt || post.publishedAt || undefined,
    changeFrequency: "weekly",
    // Most articles get the default 0.7. A post can opt into a higher
    // (or lower) value by setting "sitemapPriority" in article.json —
    // used sparingly, e.g. for a small number of flagship features.
    priority: typeof post.sitemapPriority === "number" ? post.sitemapPriority : 0.7,
    ...(post.heroImage
      ? { images: [`${SITE_URL}${post.heroImage.startsWith("/") ? "" : "/"}${post.heroImage}`] }
      : {}),
  }));

  const authors = Object.keys(authorsData).map((author) => ({
    url: `${SITE_URL}/authors/${author}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const staticPages = STATIC_PAGES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency,
    priority,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: siteLastModified || undefined,
      changeFrequency: "daily",
      priority: 1,
    },
    ...staticPages,
    ...categories,
    ...articles,
    ...authors,
  ];
}