import articlesData from "../public/data/article.json";

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