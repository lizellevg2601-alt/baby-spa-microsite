"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/experiences", label: "Experiences" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

export function ClientHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-pale-sage/50",
        isScrolled
          ? "bg-warm-ivory/95 backdrop-blur-md shadow-sm"
          : "bg-transparent",
      )}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between px-4 py-0.5 md:px-6 md:py-3">
          {/* Brand lockup — text-based with heart motif */}
          <Link
            href="/"
            className="flex items-center gap-1"
            aria-label="Twinkle Toe Love – Baby Wellness Spa home"
          >
            <div className="flex items-center justify-center">
              <Heart className="h-2.5 w-2.5 text-rose-pink" aria-hidden="true" />
            </div>
            <div>
              <span className="block font-serif font-semibold text-forest-green text-xs tracking-tight leading-none md:text-lg">
                Twinkle Toe Love
              </span>
              <span className="block text-[6px] font-body font-medium text-sage uppercase tracking-widest leading-none">
                Baby Wellness Spa
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium leading-none">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors",
                  pathname === link.href
                    ? "text-forest-green font-semibold"
                    : "text-charcoal-900 hover:text-forest-green",
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="flex items-center gap-1.5 rounded-full border border-forest-green/30 bg-forest-green/5 px-4 py-2 text-forest-green text-sm font-semibold hover:bg-forest-green hover:text-white transition-colors"
            >
              <Heart className="h-3 w-3" aria-hidden="true" />
              Join the opening list
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-forest-green"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-site-navigation"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-site-navigation"
          data-testid="mobile-site-navigation"
          className={cn(
            "md:hidden border-t border-pale-sage/50 bg-warm-ivory",
            // The closed menu must be removed from layout and keyboard navigation.
            // `max-height-0` was not a valid Tailwind utility and left a tall
            // invisible menu above the homepage hero on small screens.
            isOpen ? "block" : "hidden",
          )}
        >
          <div className="px-6 py-5 space-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2.5 rounded-xl text-charcoal-900 font-medium hover:bg-pale-sage hover:text-forest-green transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3">
              <Link
                href="/contact"
                className="block text-center py-2.5 rounded-xl border border-forest-green/30 bg-forest-green/5 text-forest-green font-semibold hover:bg-forest-green hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Heart className="h-3 w-3 inline mr-1.5" aria-hidden="true" />
                Join the opening list
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export function ClientFooter() {
  return (
    <footer className="mt-auto border-t border-pale-sage bg-warm-ivory">
      <div className="px-4 py-8 md:px-6 md:py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8 mb-10">
          {/* Brand column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center">
                <Heart className="h-4 w-4 text-rose-pink" aria-hidden="true" />
              </div>
              <div>
                <span className="block font-serif font-semibold text-forest-green text-lg tracking-tight leading-none">
                  Twinkle Toe Love
                </span>
                <span className="block text-[9px] font-body font-medium text-sage uppercase tracking-widest leading-none">
                  Baby Wellness Spa
                </span>
              </div>
            </div>
            <p className="text-sm text-sage leading-relaxed leading-7">
              A premium baby development and sensory studio coming soon to
              Nottingham / West Bridgford. Gentle sensory play, parent-child
              bonding and calm, nurturing experiences for little wonders.
            </p>
          </div>

          {/* Experiences */}
          <div>
            <h3 className="font-serif font-semibold text-forest-green text-xs mb-5 uppercase tracking-wider">
              Experiences
            </h3>
            <ul className="space-y-2.5 text-sm text-sage leading-6">
              <li>
                <Link href="/experiences" className="hover:text-forest-green transition-colors">
                  Little Explorers Sensory
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="hover:text-forest-green transition-colors">
                  Touch & Togetherness
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="hover:text-forest-green transition-colors">
                  Wonder & Wiggle
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-serif font-semibold text-forest-green text-xs mb-5 uppercase tracking-wider">
              Info
            </h3>
            <ul className="space-y-2.5 text-sm text-sage leading-6">
              <li>
                <Link href="/about" className="hover:text-forest-green transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-forest-green transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-forest-green transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact bar */}
        <div className="border-t border-pale-sage pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-sage">
            <Mail className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
            <span>bookings@baby.twinkletoelove.com</span>
          </div>

          <p className="text-xs text-sage">
            © 2026 Twinkle Toe Love. All rights reserved. Venue coming soon —
            not yet secured.
          </p>

          <div className="flex items-center gap-4 text-sage">
            <a
              href="https://www.instagram.com/twinkletoelove/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-forest-green transition-colors"
              aria-label="Instagram"
            >
              <Calendar className="h-3 w-3" aria-hidden="true" />
              <span className="sr-only">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Mail({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
      <rect x="2" y="4" width="20" height="16" rx="2" />
    </svg>
  );
}

function Calendar({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M8 2v3" />
      <path d="M16 2v3" />
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
    </svg>
  );
}
