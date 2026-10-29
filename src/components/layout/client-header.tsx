"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Heart, Calendar, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/experiences", label: "Experiences" },
  { href: "/about", label: "Our Approach" },
  { href: "/faq", label: "FAQ" },
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
          ? "bg-warm-ivory/90 backdrop-blur-md shadow-sm"
          : "bg-transparent",
      )}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between px-4 py-4 md:px-6 md:py-5">
          {/* Brand lockup — text-based with heart motif */}
          <Link
            href="/"
            className="flex items-center gap-2.5"
            aria-label="Twinkle Toe Love – Baby Wellness Spa home"
          >
            <div className="flex items-center justify-center">
              <Heart className="h-5 w-5 text-rose-pink" aria-hidden="true" />
            </div>
            <div>
              <span className="block font-serif font-semibold text-forest-green text-lg tracking-tight leading-none">
                Twinkle Toe Love
              </span>
              <span className="block text-[10px] font-body font-medium text-sage uppercase tracking-widest leading-none">
                Baby Wellness Spa
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium leading-none">
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
              className="flex items-center gap-2 rounded-full border border-forest-green/30 bg-forest-green/5 px-5 py-2.5 text-forest-green text-sm font-semibold hover:bg-forest-green hover:text-white transition-colors"
            >
              <Heart className="h-3.5 w-3.5" aria-hidden="true" />
              Join the Waitlist
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-forest-green"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "md:hidden border-t border-pale-sage/50 bg-warm-ivory overflow-hidden",
            isOpen ? "max-height-2000 opacity-100" : "max-height-0 opacity-0 transition-all duration-300",
          )}
        >
          <div className="px-6 py-6 space-y-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 rounded-xl text-charcoal-900 font-medium hover:bg-pale-sage hover:text-forest-green transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <Link
                href="/contact"
                className="block text-center py-3.5 rounded-xl border border-forest-green/30 bg-forest-green/5 text-forest-green font-semibold hover:bg-forest-green hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Heart className="h-4 w-4 inline mr-2" aria-hidden="true" />
                Join the Waitlist
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
      <div className="px-4 py-10 md:px-6 md:py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center justify-center">
                <Heart className="h-5 w-5 text-rose-pink" aria-hidden="true" />
              </div>
              <div>
                <span className="block font-serif font-semibold text-forest-green text-lg tracking-tight leading-none">
                  Twinkle Toe Love
                </span>
                <span className="block text-[10px] font-body font-medium text-sage uppercase tracking-widest leading-none">
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
            <h3 className="font-serif font-semibold text-forest-green text-sm mb-6 uppercase tracking-wider">
              Experiences
            </h3>
            <ul className="space-y-3 text-sm text-sage leading-6">
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
            <h3 className="font-serif font-semibold text-forest-green text-sm mb-6 uppercase tracking-wider">
              Info
            </h3>
            <ul className="space-y-3 text-sm text-sage leading-6">
              <li>
                <Link href="/about" className="hover:text-forest-green transition-colors">
                  Our Approach
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

          {/* Legal */}
          <div>
            <h3 className="font-serif font-semibold text-forest-green text-sm mb-6 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-3 text-sm text-sage leading-6">
              <li>
                <Link href="/terms" className="hover:text-forest-green transition-colors">
                  Terms & conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-forest-green transition-colors">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="hover:text-forest-green transition-colors">
                  Cancellation policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact bar */}
        <div className="border-t border-pale-sage pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-xs text-sage">
            <Mail className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
            <span>bookings@baby.twinkletoelove.com</span>
          </div>

          <p className="text-xs text-sage">
            © 2026 Twinkle Toe Love. All rights reserved. Venue coming soon —
            not yet secured.
          </p>

          <div className="flex items-center gap-5 text-sage">
            <a
              href="https://www.instagram.com/twinkletoelove/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-forest-green transition-colors"
              aria-label="Instagram"
            >
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
