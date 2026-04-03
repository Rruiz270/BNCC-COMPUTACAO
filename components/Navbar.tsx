"use client";

import { useState } from "react";
import { NAV_LINKS, HERO } from "@/lib/constants";

function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 280 60"
      className={className}
      aria-label="Instituto i10"
    >
      <defs>
        <linearGradient
          id="navGrad"
          x1="0"
          y1="30"
          x2="100"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#00B4D8" />
          <stop offset="100%" stopColor="#00E5A0" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="30" r="4" fill="#00B4D8" />
      <circle cx="34" cy="14" r="4" fill="#00E5A0" />
      <circle cx="56" cy="34" r="4" fill="#00B4D8" />
      <circle cx="78" cy="20" r="4" fill="#00B4D8" />
      <circle cx="100" cy="42" r="4" fill="#00E5A0" />
      <line x1="12" y1="30" x2="34" y2="14" stroke="url(#navGrad)" strokeWidth="2" />
      <line x1="34" y1="14" x2="56" y2="34" stroke="url(#navGrad)" strokeWidth="2" />
      <line x1="56" y1="34" x2="78" y2="20" stroke="url(#navGrad)" strokeWidth="2" />
      <line x1="78" y1="20" x2="100" y2="42" stroke="url(#navGrad)" strokeWidth="2" />
      <text x="116" y="34" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="28" letterSpacing="-0.5" fill="white">i</text>
      <text x="128" y="34" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="28" letterSpacing="-0.5" fill="#00E5A0">10</text>
      <text x="116" y="50" fontFamily="Inter, sans-serif" fontWeight="400" fontSize="10" letterSpacing="0.5" fill="rgba(255,255,255,0.5)">Instituto</text>
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-navy-dark/95 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center">
            <Logo className="h-10 w-auto" />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#inscricao"
              className="inline-flex items-center px-5 py-2.5 rounded-lg bg-green text-navy-dark font-semibold text-sm hover:brightness-110 transition-all"
            >
              {HERO.cta}
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Abrir menu"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-navy-dark">
          <div className="px-4 py-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-medium text-white/70 hover:text-white py-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#inscricao"
              onClick={() => setMobileOpen(false)}
              className="block text-center px-5 py-3 rounded-lg bg-green text-navy-dark font-semibold text-sm"
            >
              {HERO.cta}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
