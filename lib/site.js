// lib/site.js
//
// Central place for site-wide constants used in metadata, JSON-LD,
// OG tags, and canonical URLs across the app. Keeping these in one
// file means changing the domain, name, or socials only requires an
// edit here — every page that imports SITE_URL/SITE_NAME/getAbsoluteUrl
// picks it up automatically.

export const SITE_NAME = "PR Primespot";

// No trailing slash — every consumer appends its own leading slash
// (e.g. `${SITE_URL}/${category}/${slug}`), so a trailing slash here
// would produce double slashes in canonical URLs, OG URLs, and JSON-LD.
export const SITE_URL = "https://www.prprimespot.com";

// Official social handles (for Twitter card meta, JSON-LD sameAs, etc.)
export const SITE_TWITTER_HANDLE = "@prprimespot";

export const SITE_SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/prprimespot/",
  twitter: "https://x.com/PRPRIMESPOT",
  substack: "https://substack.com/@primespot",
  medium: "https://medium.com/@prprimespot",
  reddit: "https://www.reddit.com/user/prprimespot/",
};

// JSON-LD publisher/Organization logo. Google's structured-data
// guidelines require this to be a JPG, PNG, or WEBP (SVG is not
// supported and fails validation) and roughly square — so this points
// at the 512x512 PNG app icon rather than /images/logo.svg. Use
// SITE_LOGO_SVG_PATH below for visual/header use, where SVG is fine.
export const SITE_LOGO_PATH = "/images/icon-512.png";

// Real logo asset served by the site — used anywhere the actual visual
// mark is rendered (header, footer, etc.), where SVG is fully fine.
export const SITE_LOGO_SVG_PATH = "/images/logo.svg";
export const SITE_LOGO_FOOTER_PATH = "/images/logo.svg";

/**
 * Resolve a possibly-relative path (or already-absolute URL) against
 * SITE_URL. Used anywhere we need a guaranteed-absolute URL — OG images,
 * JSON-LD image/logo fields, Twitter card images, etc.
 *
 * getAbsoluteUrl("/uploads/hero.webp") -> "https://www.prprimespot.com/uploads/hero.webp"
 * getAbsoluteUrl("https://cdn.example.com/x.jpg") -> unchanged (already absolute)
 */
export function getAbsoluteUrl(path) {
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}