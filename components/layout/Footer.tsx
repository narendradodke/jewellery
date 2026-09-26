"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, Truck, RotateCcw, Award, Mail, ArrowRight } from "lucide-react";

export const Footer: React.FC = () => {
  const [currentYear, setCurrentYear] = useState<number | string>(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  return (
    <footer className="bg-[#080808] border-t border-luxury-border text-white/80 pb-16 md:pb-0">
      {/* Trust Badges Strip */}
      <div className="border-b border-white/5 py-10 bg-[#0C0C0C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider text-white font-medium">100% Certified</h4>
                <p className="text-[11px] text-luxury-muted">GIA & IGI Authenticated</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider text-white font-medium">Insured Delivery</h4>
                <p className="text-[11px] text-luxury-muted">White-Glove Armored Transit</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider text-white font-medium">Lifetime Care</h4>
                <p className="text-[11px] text-luxury-muted">Free Cleaning & Inspection</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider text-white font-medium">Complimentary Exchange</h4>
                <p className="text-[11px] text-luxury-muted">15-Day Bespoke Guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl tracking-[0.25em] text-gold-400 uppercase font-bold">
                LUXORA
              </span>
              <p className="text-[10px] uppercase tracking-[0.35em] text-luxury-muted -mt-1 font-mono">
                Haute Joaillerie Paris &bull; Mumbai
              </p>
            </Link>
            <p className="text-xs text-luxury-muted max-w-sm leading-relaxed font-light">
              Crafting extraordinary diamond and high-karat gold heirlooms since 1988. Each creation is an immortal ode to timeless beauty, artisanal mastery, and sustainable provenance.
            </p>

            {/* Newsletter & Socials */}
            <div className="pt-2">
              <h5 className="text-xs uppercase tracking-widest text-gold-300 font-semibold mb-2">
                The LUXORA Circle
              </h5>
              <p className="text-[11px] text-luxury-muted mb-3">
                Receive private invitations to preview high-jewellery private salons.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex max-w-sm mb-5">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-muted" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-[#141414] border border-luxury-border py-2.5 pl-10 pr-3 text-xs text-white placeholder-luxury-subtle focus:outline-none focus:border-gold-500/60"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 bg-gold-gradient text-black text-xs font-semibold uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Social Media Links */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] uppercase tracking-wider text-luxury-muted font-mono mr-1">Follow:</span>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LUXORA on Instagram"
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-gold-400 hover:border-gold-500/40 hover:scale-110 transition-all duration-300"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LUXORA on Facebook"
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-gold-400 hover:border-gold-500/40 hover:scale-110 transition-all duration-300"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LUXORA on Pinterest"
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-gold-400 hover:border-gold-500/40 hover:scale-110 transition-all duration-300"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.365-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Col: Fine Jewellery */}
          <div className="space-y-3 lg:border-l lg:border-white/5 lg:pl-8">
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-luxury-muted">
              <li>
                <Link href="/shop?category=diamond" className="hover:text-gold-300 transition-colors">
                  Natural Diamonds
                </Link>
              </li>
              <li>
                <Link href="/shop?category=gold" className="hover:text-gold-300 transition-colors">
                  22K Heritage Gold
                </Link>
              </li>
              <li>
                <Link href="/shop?category=bridal" className="hover:text-gold-300 transition-colors">
                  Bridal Suites
                </Link>
              </li>
              <li>
                <Link href="/shop?category=traditional" className="hover:text-gold-300 transition-colors">
                  Temple & Nakshi
                </Link>
              </li>
              <li>
                <Link href="/shop?category=silver" className="hover:text-gold-300 transition-colors">
                  925 Sterling Silver
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-gold-300 transition-colors">
                  Solitaire Engagement
                </Link>
              </li>
            </ul>
          </div>

          {/* Col: Client Concierge */}
          <div className="space-y-3 lg:border-l lg:border-white/5 lg:pl-8">
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold">
              Client Concierge
            </h4>
            <ul className="space-y-2 text-xs text-luxury-muted">
              <li>
                <Link href="/cart" className="hover:text-gold-300 transition-colors">
                  Private Appointments
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-gold-300 transition-colors">
                  Ring Size Consultation
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-gold-300 transition-colors">
                  Jewellery Care Guide
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-gold-300 transition-colors">
                  Track Insured Order
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-gold-300 transition-colors">
                  Certificate Authentication
                </Link>
              </li>
            </ul>
          </div>

          {/* Col: Boutiques */}
          <div className="space-y-3 lg:border-l lg:border-white/5 lg:pl-8">
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold">
              Boutiques
            </h4>
            <div className="space-y-2 text-xs text-luxury-muted">
              <p>
                <strong className="text-white font-normal">Flagship Salon:</strong>
                <br />
                Altamount Road, South Mumbai
              </p>
              <p>
                <strong className="text-white font-normal">Private Atelier:</strong>
                <br />
                DLF Emporio, New Delhi
              </p>
              <p className="pt-2 text-[11px] text-gold-400">
                Telephone: +91 (022) 8800-LUXORA
              </p>
            </div>
          </div>
        </div>

        {/* Payment Methods Bar */}
        <div className="pt-8 mt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[11px] uppercase tracking-widest text-luxury-muted font-mono">
            Secured Bespoke Checkout
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { label: "VISA", sub: "" },
              { label: "MASTERCARD", sub: "" },
              { label: "AMEX", sub: "" },
              { label: "UPI", sub: "" },
              { label: "PAYPAL", sub: "" },
              { label: "APPLE PAY", sub: "" },
            ].map((method) => (
              <div
                key={method.label}
                className="h-7 px-2.5 rounded border border-white/10 bg-white/[0.02] flex items-center justify-center text-[10px] tracking-wider text-white/50 font-mono font-medium hover:border-gold-500/40 hover:text-gold-300 hover:bg-gold-500/[0.03] transition-all"
              >
                {method.label}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 mt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-luxury-subtle gap-4">
          <p suppressHydrationWarning>&copy; {currentYear} LUXORA Haute Joaillerie Ltd. All Rights Reserved.</p>
          <p className="text-xs text-luxury-muted flex items-center gap-1.5">
            Crafted with <span className="text-gold-400">♥</span> in India &bull; Certified High Joaillerie
          </p>
          <div className="flex items-center space-x-6 text-[11px]">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Conflict-Free Diamonds</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
