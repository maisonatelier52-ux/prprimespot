"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE_NAME, SITE_SOCIAL_LINKS } from "@/lib/site";

const SECTIONS = [
  { label: "Business", href: "/business" },
  { label: "Finance", href: "/finance" },
  { label: "World", href: "/world" },
  { label: "U.S.", href: "/us" },
  { label: "Politics", href: "/politics" },
  { label: "Sports", href: "/sports" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
  { label: "Contact", href: "/contact" },
  { label: "Legal", href: "/legal" },
  { label: "Ownership and Funding", href: "/ownership-and-funding" },
  { label: "Source Methodology", href: "/source-methodology" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Advertising Policy", href: "/advertising-policy" },
  { label: "Editorial Policy", href: "/editorial-policy" },
  { label: "Corrections Policy", href: "/corrections-policy" },
  { label: "Right of Reply Policy", href: "/right-of-reply-policy" },
];

function SubstackIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 3h16v3.2H4V3zm0 5.4h16V12H4V8.4zm0 5.4h16v1.9L12 21l-8-5.3v-1.9z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4a4.1 4.1 0 0 1-1.9.1 4.1 4.1 0 0 0 3.8 2.9A8.2 8.2 0 0 1 2 18.4a11.6 11.6 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function MediumIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="6.2" cy="12" r="4.2" />
      <ellipse cx="14.5" cy="12" rx="2.6" ry="4.2" />
      <ellipse cx="20.2" cy="12" rx="1.1" ry="4" />
    </svg>
  );
}

function RedditIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="14.1" r="7.4" />
      <circle cx="7.2" cy="14.3" r="1.35" fill="#fff" />
      <circle cx="16.8" cy="14.3" r="1.35" fill="#fff" />
      <path d="M8.3 16.9c1 .8 2.3 1.2 3.7 1.2s2.7-.4 3.7-1.2" stroke="#fff" strokeWidth="1" fill="none" strokeLinecap="round" />
      <circle cx="18.2" cy="8.3" r="1.6" />
      <path d="M12 9.2l.9-4.4 3.1.6" stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SocialIcon({ label, href = "#", children }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D8D8D8] text-[#1A1A1A] hover:border-[#D01418] hover:text-[#D01418] transition-colors"
    >
      {children}
    </a>
  );
}

function FooterColumn({ title, children }) {
  return (
    <div>
      <h3 className="font-sans text-[12px] font-semibold uppercase tracking-[0.15em] text-[#8A8A8A] mb-4">{title}</h3>
      {children}
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <footer className="w-full max-w-[100vw] overflow-x-hidden bg-white text-[#1A1A1A]">
      {/* top gold rule */}
      <div className="h-[3px] w-full bg-[#E8B23D]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* masthead */}
        <div className="flex flex-col items-center text-center pt-10 pb-8 border-b border-[#E5E5E5]">
          <Link href="/" aria-label={`${SITE_NAME} — home`} className="inline-flex flex-col items-center">
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#D01418]">PR PRIMESPOT</span>
            <span className="mt-2 text-[10px] tracking-[0.18em] text-[#8A8A8A] font-sans">U.S. BREAKING NEWS, POLITICS &amp; BUSINESS</span>
          </Link>
        </div>

        {/* link grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-10 lg:grid-cols-4 lg:gap-x-10">
          <FooterColumn title="Sections">
            <ul className="space-y-2.5 font-sans text-sm text-[#595959]">
              {SECTIONS.map((section) => (
                <li key={section.href}>
                  <Link href={section.href} className="hover:text-[#D01418] transition-colors">{section.label}</Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Company">
            <ul className="space-y-2.5 font-sans text-sm text-[#595959]">
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-[#D01418] transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <div className="col-span-2 lg:col-span-1 text-center lg:text-left">
            <FooterColumn title="Follow Us">
              <div className="flex items-center justify-center gap-3 lg:justify-start">
                <SocialIcon label="Instagram" href={SITE_SOCIAL_LINKS.instagram}><InstagramIcon /></SocialIcon>
                <SocialIcon label="Twitter" href={SITE_SOCIAL_LINKS.twitter}><TwitterIcon /></SocialIcon>
                <SocialIcon label="Substack" href={SITE_SOCIAL_LINKS.substack}><SubstackIcon /></SocialIcon>
                <SocialIcon label="Medium" href={SITE_SOCIAL_LINKS.medium}><MediumIcon /></SocialIcon>
                <SocialIcon label="Reddit" href={SITE_SOCIAL_LINKS.reddit}><RedditIcon /></SocialIcon>
              </div>
            </FooterColumn>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <FooterColumn title="Newsletter">
              <p className="font-sans text-sm text-[#595959] mb-4">New posts and useful context, delivered to your inbox.</p>
              {submitted ? (
                <p className="font-sans text-sm text-[#B8860B]">You&apos;re subscribed. Thanks!</p>
              ) : (
                <form onSubmit={handleSubmit} className="flex">
                  <label htmlFor="footer-email" className="sr-only">Email address</label>
                  <input
                    id="footer-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="min-w-0 flex-1 rounded-l-sm border border-[#D8D8D8] bg-white px-3 py-2 font-sans text-sm text-[#1A1A1A] placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#D01418]"
                  />
                  <button type="submit" className="shrink-0 rounded-r-sm bg-[#D01418] px-4 py-2 font-sans text-sm font-medium text-white hover:bg-[#b01115] transition-colors">
                    Sign up
                  </button>
                </form>
              )}
            </FooterColumn>
          </div>
        </div>

        {/* bottom bar */}
        <div className="flex flex-col items-center text-center gap-4 border-t border-[#E5E5E5] py-6 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="w-full font-sans text-xs text-[#8A8A8A] order-2 sm:order-1 sm:w-auto">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>

          <nav className="flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-2 order-1 sm:order-2 sm:w-auto sm:justify-start">
            {LEGAL_LINKS.map(({ label, href }) => (
              <Link key={label} href={href} className="font-sans text-xs text-[#8A8A8A] hover:text-[#D01418] transition-colors">
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}