"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import articlesData from "../public/data/article.json";
import { SITE_NAME, SITE_SOCIAL_LINKS } from "@/lib/site";

const NAV_LINKS = ["Home", "Business", "Finance", "World", "U.S.", "Politics", "Sports"];

function navHref(label) {
  return label === "Home" ? "/" : `/${slugify(label)}`;
}

function slugify(label) {
  return label
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Flattens articles.json (grouped by category) into one searchable list.
function getAllArticles() {
  const all = [];
  for (const category of Object.keys(articlesData)) {
    for (const post of articlesData[category]) {
      all.push({ category, ...post });
    }
  }
  return all;
}

const ALL_ARTICLES = getAllArticles();

function searchArticles(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return ALL_ARTICLES.filter(
    (a) =>
      a.headline.toLowerCase().includes(q) ||
      (a.dek && a.dek.toLowerCase().includes(q))
  ).slice(0, 8);
}

function IconButton({ label, children, href = "#", onClick }) {
  const className =
    "flex h-8 w-8 items-center justify-center rounded-full text-[#1A1A1A] hover:bg-[#F5EEDD] hover:text-[#D01418] transition-colors";

  if (onClick) {
    return (
      <button type="button" onClick={onClick} aria-label={label} className={className}>
        {children}
      </button>
    );
  }

  return (
    <a href={href} aria-label={label} className={className}>
      {children}
    </a>
  );
}

// Bordered circle treatment for the social row — fills solid red on hover
// instead of just a tinted background, a bit more premium than IconButton.
function SocialIconButton({ label, children, href = "#" }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-[#E0DDD5] text-[#1A1A1A] hover:bg-[#D01418] hover:border-[#D01418] hover:text-white hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
    >
      {children}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="sm:w-[18px] sm:h-[18px]">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function SubstackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="sm:w-[18px] sm:h-[18px]">
      <path d="M4 3h16v3.2H4V3zm0 5.4h16V12H4V8.4zm0 5.4h16v1.9L12 21l-8-5.3v-1.9z" />
    </svg>
  );
}

function MediumIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="sm:w-[18px] sm:h-[18px]">
      <circle cx="6.2" cy="12" r="4.2" />
      <ellipse cx="14.5" cy="12" rx="2.6" ry="4.2" />
      <ellipse cx="20.2" cy="12" rx="1.1" ry="4" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="sm:w-[18px] sm:h-[18px]">
      <path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4a4.1 4.1 0 0 1-1.9.1 4.1 4.1 0 0 0 3.8 2.9A8.2 8.2 0 0 1 2 18.4a11.6 11.6 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z" />
    </svg>
  );
}

function RedditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="sm:w-[18px] sm:h-[18px]">
      <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="0" />
      <circle cx="12" cy="14.1" r="7.4" />
      <circle cx="7.2" cy="14.3" r="1.35" fill="#fff" />
      <circle cx="16.8" cy="14.3" r="1.35" fill="#fff" />
      <path d="M8.3 16.9c1 .8 2.3 1.2 3.7 1.2s2.7-.4 3.7-1.2" stroke="#fff" strokeWidth="1" fill="none" strokeLinecap="round" />
      <circle cx="18.2" cy="8.3" r="1.6" />
      <path d="M12 9.2l.9-4.4 3.1.6" stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="sm:w-[19px] sm:h-[19px]">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <line x1="21" y1="21" x2="16.2" y2="16.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  // subscribe modal state
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribeError, setSubscribeError] = useState("");

  // lock body scroll while the mobile drawer or subscribe modal is open
  useEffect(() => {
    document.body.style.overflow = menuOpen || subscribeOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, subscribeOpen]);

  function toggleSearch() {
    setSearchOpen((open) => !open);
    setQuery("");
  }

  function closeSearch() {
    setSearchOpen(false);
    setQuery("");
  }

  function openSubscribe() {
    setSubscribeOpen(true);
    setSubscribed(false);
    setSubscribeError("");
    setEmail("");
  }

  function closeSubscribe() {
    setSubscribeOpen(false);
    setSubscribed(false);
    setSubscribeError("");
    setEmail("");
  }

  function handleSubscribeSubmit(e) {
    e.preventDefault();
    const trimmed = email.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);

    if (!isValidEmail) {
      setSubscribeError("Please enter a valid email address.");
      return;
    }

    setSubscribeError("");
    // TODO: wire this up to your real subscribe endpoint / API call.
    setSubscribed(true);
  }

  const results = searchArticles(query);

  return (
    <header className="w-full max-w-[100vw] overflow-x-hidden bg-white text-[#1A1A1A]">
      {/* Row 1 — social / masthead / account */}
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center py-3 sm:py-5">
          {/* left — search icon on mobile, social icons from md up */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* mobile only: search */}
            <div className="flex md:hidden">
              <IconButton label={searchOpen ? "Close search" : "Search"} onClick={toggleSearch}>
                {searchOpen ? <CloseIcon /> : <SearchIcon />}
              </IconButton>
            </div>
            
            <div className="hidden md:flex items-center gap-2 sm:gap-2.5">
              <SocialIconButton label="Instagram" href={SITE_SOCIAL_LINKS.instagram}><InstagramIcon /></SocialIconButton>
              <SocialIconButton label="Twitter" href={SITE_SOCIAL_LINKS.twitter}><TwitterIcon /></SocialIconButton>
              <SocialIconButton label="Substack" href={SITE_SOCIAL_LINKS.substack}><SubstackIcon /></SocialIconButton>
              <SocialIconButton label="Medium" href={SITE_SOCIAL_LINKS.medium}><MediumIcon /></SocialIconButton>
              <SocialIconButton label="Reddit" href={SITE_SOCIAL_LINKS.reddit}><RedditIcon /></SocialIconButton>
            </div>
          </div>

          {/* center — masthead */}
          <Link href="/" className="group flex justify-center select-none min-w-0" aria-label={`${SITE_NAME} — home`}>
            <div className="flex flex-col items-center w-full max-w-[220px] sm:max-w-none transition-transform duration-300 ease-out group-hover:scale-[1.03]">
              <div className="h-[2.5px] sm:h-[5px] w-full bg-[#E8B23D]" />
              <span className="font-serif leading-[0.95] text-center text-[#D01418] text-lg xs:text-xl sm:text-3xl md:text-4xl font-bold tracking-tight py-3 whitespace-nowrap">
                PR PRIMESPOT
              </span>
              <div className="h-[2.5px] sm:h-[5px] w-full bg-[#E8B23D]" />
              <span className="mt-1 text-center text-[7px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.2em] text-[#8A8A8A] font-sans leading-tight">
                U.S. BREAKING NEWS, POLITICS &amp; BUSINESS
              </span>
            </div>
          </Link>

          {/* right — subscribe / search (desktop) */}
          <div className="hidden md:flex items-center justify-end gap-5 font-sans text-sm">
            <button
              type="button"
              onClick={openSubscribe}
              className="rounded-full bg-[#D01418] px-5 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-[#a80f13] hover:shadow-md transition-all"
            >
              Subscribe
            </button>
            <IconButton label={searchOpen ? "Close search" : "Search"} onClick={toggleSearch}>
              {searchOpen ? <CloseIcon /> : <SearchIcon />}
            </IconButton>
          </div>

          {/* right — menu trigger (mobile) */}
          <div className="flex md:hidden items-center justify-end gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#1A1A1A] hover:bg-[#F5EEDD] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D01418] focus-visible:ring-offset-2"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Search dropdown panel */}
      {searchOpen && (
        <div className="border-t border-[#E5E5E5] bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Escape" && closeSearch()}
              placeholder="Search articles..."
              className="w-full border border-[#E5E5E5] rounded-sm px-4 py-2 font-sans text-sm text-[#1A1A1A] focus:outline-none focus:border-[#D01418]"
            />

            {query.trim() && (
              <div className="mt-3 max-h-80 overflow-y-auto divide-y divide-[#E5E5E5]">
                {results.length === 0 ? (
                  <p className="py-4 font-sans text-sm text-[#8A8A8A]">
                    No results for &ldquo;{query}&rdquo;.
                  </p>
                ) : (
                  results.map((article) => (
                    <a
                      key={`${article.category}-${article.slug}`}
                      href={`/${slugify(article.category)}/${article.slug}`}
                      onClick={closeSearch}
                      className="flex items-center justify-between gap-4 py-3 hover:bg-[#F7F5EF] transition-colors"
                    >
                      <span className="font-sans text-sm text-[#1A1A1A]">{article.headline}</span>
                      <span className="shrink-0 font-sans text-[10px] font-bold uppercase tracking-wide text-[#D01418]">
                        {article.category}
                      </span>
                    </a>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Row 2 — category nav, desktop only, no menu button needed */}
      <div className="hidden md:block border-t border-b border-[#E5E5E5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-center gap-6 lg:gap-10 h-14 font-sans text-[13px] font-medium tracking-wide text-[#2d2b2b]">
            {NAV_LINKS.map((label) =>
              label === "Home" ? (
                <a key={label} href={navHref(label)} className="uppercase py-1 px-3 rounded-full bg-[#D01418] text-[#efeaea] hover:bg-[#d9a22e] transition-colors">
                  {label}
                </a>
              ) : (
                <a key={label} href={navHref(label)} className="relative uppercase py-1 hover:text-[#D01418] transition-colors after:absolute after:left-1/2 after:-bottom-[1px] after:h-[2px] after:w-0 after:-translate-x-1/2 after:bg-[#D01418] after:transition-all after:duration-300 hover:after:w-full">
                  {label}
                </a>
              )
            )}
          </nav>
        </div>
      </div>

      {/* Mobile sliding drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        {/* backdrop */}
        <div
          onClick={() => setMenuOpen(false)}
          className="absolute inset-0 bg-black/40"
        />

        {/* panel */}
        <div
          className={`absolute top-0 left-0 h-full w-[78%] max-w-xs bg-white shadow-2xl transition-transform duration-300 ease-out ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between px-5 h-16 border-b border-[#E5E5E5]">
            <span className="font-serif text-lg font-bold text-[#D01418]">Menu</span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#1A1A1A] hover:bg-[#F5EEDD] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D01418] focus-visible:ring-offset-2"
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </div>

          <nav className="flex flex-col px-5 py-2">
            {NAV_LINKS.map((label) =>
              label === "Home" ? (
                <a
                  key={label}
                  href={navHref(label)}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 border-b border-[#E5E5E5] last:border-none font-sans text-sm font-medium uppercase tracking-wide text-[#1A1A1A] transition-all"
                >
                  <span className="inline-block rounded-full bg-[#E8B23D] px-3 py-1 hover:bg-[#d9a22e] transition-colors">
                    {label}
                  </span>
                </a>
              ) : (
                <a
                  key={label}
                  href={navHref(label)}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 border-b border-[#E5E5E5] last:border-none font-sans text-sm font-medium uppercase tracking-wide text-[#1A1A1A] hover:text-[#D01418] hover:pl-1 transition-all"
                >
                  {label}
                </a>
              )
            )}
          </nav>

          <div className="flex items-center gap-4 px-5 pt-4">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openSubscribe();
              }}
              className="rounded-full bg-[#D01418] px-5 py-1.5 text-sm font-medium text-white hover:bg-[#a80f13] transition-colors"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Subscribe modal */}
      <div
        className={`fixed inset-0 z-[60] flex items-center justify-center px-4 transition-opacity duration-300 ${
          subscribeOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!subscribeOpen}
      >
        {/* backdrop */}
        <div onClick={closeSubscribe} className="absolute inset-0 bg-black/50" />

        {/* dialog */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Subscribe to ${SITE_NAME}`}
          onKeyDown={(e) => e.key === "Escape" && closeSubscribe()}
          className={`relative w-full max-w-sm bg-white rounded-md shadow-2xl px-6 py-7 transition-all duration-300 ${
            subscribeOpen ? "translate-y-0 scale-100" : "translate-y-4 scale-95"
          }`}
        >
          <button
            type="button"
            onClick={closeSubscribe}
            aria-label="Close"
            className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full text-[#1A1A1A] hover:bg-[#F5EEDD] hover:text-[#D01418] transition-colors"
          >
            <CloseIcon />
          </button>

          <div className="h-[3px] w-10 bg-[#E8B23D] mb-4" />
          <h2 className="font-serif text-xl font-bold text-[#1A1A1A] mb-1">Subscribe to {SITE_NAME}</h2>

          {subscribed ? (
            <p className="font-sans text-sm text-[#1A1A1A] mt-4">
              Thanks — <span className="font-medium">{email}</span> is now subscribed.
              You&apos;ll hear from us soon.
            </p>
          ) : (
            <>
              <p className="font-sans text-sm text-[#8A8A8A] mb-5">Get top stories delivered straight to your inbox.</p>
              <form onSubmit={handleSubscribeSubmit} noValidate>
                <label htmlFor="subscribe-email" className="sr-only">Email address</label>
                <input
                  id="subscribe-email"
                  type="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-[#E5E5E5] rounded-sm px-4 py-2 font-sans text-sm text-[#1A1A1A] focus:outline-none focus:border-[#D01418]"
                />
                {subscribeError && (
                  <p className="mt-2 font-sans text-xs text-[#D01418]">{subscribeError}</p>
                )}
                <button type="submit" className="mt-4 w-full rounded-full bg-[#D01418] px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#a80f13] hover:shadow-md transition-all">
                  Subscribe
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </header>
  );
}