"use client";

import { useState } from "react";

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-8.1h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.6 1.6-1.6h1.7V3.2C16.5 3.1 15.4 3 14.2 3c-2.6 0-4.4 1.6-4.4 4.5v2.2H7.1v3.2h2.7V21h3.7z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.94 8.5H3.56V20.5H6.94V8.5ZM5.25 3.5A1.95 1.95 0 103.3 5.45 1.94 1.94 0 005.25 3.5ZM20.5 20.5V13.9c0-3.53-1.88-5.17-4.4-5.17a3.8 3.8 0 00-3.44 1.9h-.05V8.5H9.4c.05 1 0 12 0 12h3.38v-6.7c0-.36.03-.71.13-.97.29-.71.94-1.44 2.05-1.44 1.45 0 2.03 1.1 2.03 2.72V20.5h3.51Z" />
    </svg>
  );
}

function RedditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="14.1" r="7.4" />
      <circle cx="7.2" cy="14.3" r="1.35" fill="#fff" />
      <circle cx="16.8" cy="14.3" r="1.35" fill="#fff" />
      <path d="M8.3 16.9c1 .8 2.3 1.2 3.7 1.2s2.7-.4 3.7-1.2" stroke="#fff" strokeWidth="1" fill="none" strokeLinecap="round" />
      <circle cx="18.2" cy="8.3" r="1.6" />
      <path d="M12 9.2l.9-4.4 3.1.6" stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShareIconLink({ label, href, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E0DDD5] text-[#1A1A1A] hover:bg-[#D01418] hover:border-[#D01418] hover:text-white transition-colors duration-200"
    >
      {children}
    </a>
  );
}

export default function ShareButtons({ url, title }) {
  const [copied, setCopied] = useState(false);

  async function handleInstagramClick() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can fail (older browsers, insecure context) — the
      // button just won't show the "Copied" confirmation in that case.
    }
  }

  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const redditHref = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;

  return (
    <div className="mt-8 p-5 border border-[#0e0d0d] rounded-lg flex items-center justify-between gap-4">
      <p className="font-sans text-xs font-bold uppercase tracking-wide text-[#3c3838]">Share this article</p>
      <div className="flex items-center gap-2">
        <ShareIconLink label="Share on Facebook" href={facebookHref}>
          <FacebookIcon />
        </ShareIconLink>
        <ShareIconLink label="Share on LinkedIn" href={linkedinHref}>
          <LinkedinIcon />
        </ShareIconLink>
        <ShareIconLink label="Share on Reddit" href={redditHref}>
          <RedditIcon />
        </ShareIconLink>
        <button
          type="button"
          onClick={handleInstagramClick}
          aria-label={copied ? "Link copied" : "Copy link for Instagram"}
          title={copied ? "Link copied" : "Copy link for Instagram"}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E0DDD5] text-[#1A1A1A] hover:bg-[#D01418] hover:border-[#D01418] hover:text-white transition-colors duration-200"
        >
          {copied ? <CheckIcon /> : <InstagramIcon />}
        </button>
      </div>
    </div>
  );
}