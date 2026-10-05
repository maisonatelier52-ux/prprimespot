import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

const cache = new Map();

export function getLocalImageSize(publicPath) {
  if (typeof publicPath !== "string" || !publicPath.startsWith("/")) return null;
  if (cache.has(publicPath)) return cache.get(publicPath);

  let result = null;
  try {
    const file = path.join(process.cwd(), "public", publicPath);
    const { width, height } = imageSize(fs.readFileSync(file));
    if (width && height) result = { width, height };
  } catch {
    result = null;
  }

  cache.set(publicPath, result);
  return result;
}