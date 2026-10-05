export const SITE_NAME = "PR Primespot";

export const SITE_URL = "https://www.prprimespot.com";

export const SITE_TWITTER_HANDLE = "@prprimespot";

export const SITE_SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/prprimespot/",
  twitter: "https://x.com/PRPRIMESPOT",
  substack: "https://substack.com/@primespot",
  medium: "https://medium.com/@prprimespot",
  reddit: "https://www.reddit.com/user/prprimespot/",
};

export const SITE_LOGO_PATH = "/images/icon-512.png";
export const SITE_LOGO_SVG_PATH = "/images/logo.svg";
export const SITE_LOGO_FOOTER_PATH = "/images/logo.svg";

export function getAbsoluteUrl(path) {
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export const ORGANIZATION_REF = { "@id": ORGANIZATION_ID };

export function getOrganizationSchema() {
  return {
    "@type": "NewsMediaOrganization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: getAbsoluteUrl(SITE_LOGO_PATH),
      width: 512,
      height: 512,
    },
    sameAs: [
      SITE_SOCIAL_LINKS.instagram,
      SITE_SOCIAL_LINKS.twitter,
      SITE_SOCIAL_LINKS.substack,
      SITE_SOCIAL_LINKS.medium,
    ].filter(Boolean),
    // Trust signals — these pages already exist on the site.
    publishingPrinciples: `${SITE_URL}/editorial-policy`,
    correctionsPolicy: `${SITE_URL}/corrections-policy`,
    ownershipFundingInfo: `${SITE_URL}/ownership-and-funding`,
    actionableFeedbackPolicy: `${SITE_URL}/right-of-reply-policy`,
  };
}