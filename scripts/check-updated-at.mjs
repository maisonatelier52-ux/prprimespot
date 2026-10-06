import { execSync } from "node:child_process";

const ARTICLE_PATH = "public/data/article.json";
const CONTENT_FIELDS = ["headline", "dek", "body"];

function getArg(name, fallback) {
  const prefix = `--${name}=`;
  const found = process.argv.find((a) => a.startsWith(prefix));
  return found ? found.slice(prefix.length) : fallback;
}

function readJsonAtRef(ref, path) {
  try {
    const raw = execSync(`git show ${ref}:${path}`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function flattenArticles(data) {
  const map = new Map();
  if (!data) return map;
  for (const [category, posts] of Object.entries(data)) {
    for (const post of posts) {
      map.set(`${category}/${post.slug}`, post);
    }
  }
  return map;
}

function contentChanged(before, after) {
  return CONTENT_FIELDS.some(
    (field) => JSON.stringify(before?.[field]) !== JSON.stringify(after?.[field])
  );
}

function main() {
  const base = getArg("base", "HEAD");

  const before = flattenArticles(readJsonAtRef(base, ARTICLE_PATH));

  let afterData;
  try {
    afterData = JSON.parse(
      execSync(`git show :${ARTICLE_PATH}`, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] })
    );
  } catch {
    afterData = JSON.parse(
      execSync(`cat ${ARTICLE_PATH}`, { encoding: "utf8" })
    );
  }
  const after = flattenArticles(afterData);

  const problems = [];

  for (const [key, afterPost] of after) {
    const beforePost = before.get(key);
    if (!beforePost) continue; // new article, nothing to compare

    if (contentChanged(beforePost, afterPost)) {
      const beforeUpdated = beforePost.updatedAt;
      const afterUpdated = afterPost.updatedAt;
      if (beforeUpdated === afterUpdated) {
        problems.push(key);
      }
    }
  }

  if (problems.length > 0) {
    console.error(
      `\n✖ check:updated-at — ${problems.length} article(s) changed content without bumping "updatedAt":\n`
    );
    for (const key of problems) {
      console.error(`  - ${key}`);
    }
    console.error(
      `\nEdit each article's "updatedAt" in ${ARTICLE_PATH} to the current ISO-8601\ntimestamp before committing. See README.md → "Editing article content".\n`
    );
    process.exit(1);
  }

  console.log("✓ check:updated-at — all changed articles have an updated \"updatedAt\".");
}

main();