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

            {/* Newsletter */}
            <div className="pt-2">
              <h5 className="text-xs uppercase tracking-widest text-gold-300 font-semibold mb-2">
                The LUXORA Circle
              </h5>
              <p className="text-[11px] text-luxury-muted mb-3">
                Receive private invitations to preview high-jewellery private salons.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex max-w-sm">
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
            </div>
          </div>

          {/* Col: Fine Jewellery */}
          <div className="space-y-3">
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
          <div className="space-y-3">
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
          <div className="space-y-3">
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

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-luxury-subtle gap-4">
          <p suppressHydrationWarning>&copy; {currentYear} LUXORA Haute Joaillerie Ltd. All Rights Reserved.</p>
          <div className="flex items-center space-x-6 text-[11px]">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Conflict-Free Diamonds</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
