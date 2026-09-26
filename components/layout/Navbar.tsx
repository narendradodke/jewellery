"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Menu,
  X,
  Sparkles,
  Home,
  Grid,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { GlobalSearchBar } from "@/components/layout/GlobalSearchBar";

const NavbarContent: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const cartCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const wishlistCount = useCartStore((state) => state.wishlist.length);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname, searchParams]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop All", href: "/shop" },
    { label: "Diamonds", href: "/shop?category=diamond" },
    { label: "Gold", href: "/shop?category=gold" },
    { label: "Traditional", href: "/shop?category=traditional" },
    { label: "Bridal", href: "/shop?category=bridal" },
    { label: "Bespoke", href: "/bespoke" },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#0F0D07] via-[#1A160A] to-[#0F0D07] border-b border-gold-500/20 py-1.5 px-4 text-center">
        <div className="flex items-center justify-center gap-2 text-[11px] tracking-widest text-gold-300 uppercase font-light">
          <Sparkles className="w-3 h-3 text-gold-400 animate-pulse-slow" />
          <span>Complimentary Insured White-Glove Shipping &bull; Certified Natural Diamonds</span>
          <Sparkles className="w-3 h-3 text-gold-400 animate-pulse-slow" />
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#0A0A0A]/95 backdrop-blur-md border-b border-luxury-border shadow-dark-card py-3"
            : "bg-[#0A0A0A]/80 backdrop-blur-sm border-b border-white/5 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-white/90 hover:text-gold-400 focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex-1 lg:flex-none text-center lg:text-left">
              <Link href="/" className="inline-block group">
                <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] text-gold-400 uppercase font-bold group-hover:text-gold-300 transition-colors">
                  LUXORA
                </span>
                <span className="hidden sm:block text-[9px] uppercase tracking-[0.4em] text-luxury-muted -mt-1 font-mono">
                  Haute Joaillerie
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = (() => {
                  if (link.href === "/") {
                    return pathname === "/";
                  }
                  if (link.href.includes("?")) {
                    const [path, query] = link.href.split("?");
                    const linkCategory = new URLSearchParams(query).get("category");
                    return pathname === path && currentCategory === linkCategory;
                  }
                  if (link.href === "/shop") {
                    return pathname === "/shop" && !currentCategory;
                  }
                  return pathname.startsWith(link.href);
                })();

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-xs uppercase tracking-widest font-medium transition-colors hover:text-gold-300 py-1 ${
                      isActive ? "text-gold-400" : "text-white/80"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold-400" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Utility Icons */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                className="p-2 text-white/80 hover:text-gold-400 transition-colors hidden sm:block"
                aria-label="Search Collection"
              >
                <Search className="w-4 h-4" />
              </button>

              <Link
                href="/shop"
                className="p-2 text-white/80 hover:text-gold-400 transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4" />
                {isMounted && wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 text-[9px] font-bold bg-gold-500 text-black rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                className="p-2 text-white/80 hover:text-gold-400 transition-colors relative"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4" />
                {isMounted && cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 text-[9px] font-bold bg-gold-500 text-black rounded-full flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                className="p-2 text-white/80 hover:text-gold-400 transition-colors hidden sm:block"
                aria-label="Account"
              >
                <User className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-background/98 border-b border-luxury-border px-6 py-6 transition-all duration-300">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isActive = (() => {
                  if (link.href === "/") {
                    return pathname === "/";
                  }
                  if (link.href.includes("?")) {
                    const [path, query] = link.href.split("?");
                    const linkCategory = new URLSearchParams(query).get("category");
                    return pathname === path && currentCategory === linkCategory;
                  }
                  if (link.href === "/shop") {
                    return pathname === "/shop" && !currentCategory;
                  }
                  return pathname.startsWith(link.href);
                })();

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm uppercase tracking-widest py-2 border-b border-white/5 transition-colors ${
                      isActive
                        ? "text-gold-400 font-semibold"
                        : "text-white/90 hover:text-gold-400"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-4 flex items-center justify-between text-xs text-luxury-muted">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setSearchModalOpen(true);
                  }}
                  className="hover:text-gold-300"
                >
                  Search Jewellery
                </button>
                <Link
                  href="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-gold-300"
                >
                  Client Concierge
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0F0F0F]/95 backdrop-blur-lg border-t border-luxury-border py-2 px-6 flex items-center justify-between shadow-2xl">
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 ${
            pathname === "/" ? "text-gold-400" : "text-white/60"
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px] tracking-wider uppercase font-medium">Home</span>
        </Link>

        <Link
          href="/shop"
          className={`flex flex-col items-center gap-1 ${
            pathname.startsWith("/shop") ? "text-gold-400" : "text-white/60"
          }`}
        >
          <Grid className="w-4 h-4" />
          <span className="text-[10px] tracking-wider uppercase font-medium">Shop</span>
        </Link>

        <Link
          href="/cart"
          className={`flex flex-col items-center gap-1 relative ${
            pathname === "/cart" ? "text-gold-400" : "text-white/60"
          }`}
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4" />
            {isMounted && cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 text-[8px] font-bold bg-gold-500 text-black rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-wider uppercase font-medium">Cart</span>
        </Link>

        <Link
          href="/cart"
          className={`flex flex-col items-center gap-1 ${
            pathname === "/account" ? "text-gold-400" : "text-white/60"
          }`}
        >
          <User className="w-4 h-4" />
          <span className="text-[10px] tracking-wider uppercase font-medium">Profile</span>
        </Link>
      </nav>

      {/* Global Instant Search Modal */}
      <GlobalSearchBar
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  );
};

export const Navbar: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <NavbarContent />
    </Suspense>
  );
};

