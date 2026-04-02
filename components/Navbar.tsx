"use client";

import { useState } from "react";
import { NAV_LINKS, HERO } from "@/lib/constants";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center">
              <span className="text-white font-bold text-sm">i10</span>
            </div>
            <span className="font-bold text-navy text-lg hidden sm:inline">
              Instituto i10
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-text-gray hover:text-navy transition-colors"
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

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-bg-gray transition-colors"
            aria-label="Abrir menu"
          >
            <svg
              className="w-6 h-6 text-navy"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="px-4 py-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-medium text-text-gray hover:text-navy py-2"
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
