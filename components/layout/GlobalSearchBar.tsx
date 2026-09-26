"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { PRODUCTS } from "@/lib/mockData";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

interface GlobalSearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchBar: React.FC<GlobalSearchBarProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      const lower = query.toLowerCase().trim();
      const filtered = PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.description.toLowerCase().includes(lower) ||
          p.category.toLowerCase().includes(lower) ||
          p.metal.toLowerCase().includes(lower) ||
          p.stone.toLowerCase().includes(lower)
      );
      setResults(filtered);
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onClose();
    router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
  };

  const handleItemClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center pt-20 px-4">
      {/* Click outside to dismiss backdrop */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="w-full max-w-2xl bg-[#111111] border border-gold-500/50 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b border-luxury-border p-4 bg-[#141414]">
          <Search className="w-5 h-5 text-gold-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search diamond rings, 22K gold necklaces, bridal jewels..."
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-luxury-subtle focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 text-luxury-muted hover:text-white mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-2.5 py-1 text-[11px] uppercase tracking-wider text-luxury-muted hover:text-white border border-white/10"
          >
            ESC
          </button>
        </form>

        {/* Quick Suggestions / Popular Searches */}
        {!query && (
          <div className="p-6 space-y-4">
            <p className="text-[11px] uppercase tracking-widest text-gold-400 font-mono font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Trending Inquiries</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {["Diamond Solitaire", "Emerald Drop", "22K Gold", "Kundan Choker", "Bridal Set", "Hoop Earrings"].map(
                (term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-card hover:bg-card-hover border border-luxury-border text-xs text-gray-300 hover:text-gold-300 hover:border-gold-500/40 transition-colors"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Instant Search Results Dropdown */}
        {query && (
          <div className="max-h-96 overflow-y-auto p-4 space-y-2">
            {results.length === 0 ? (
              <div className="text-center py-8 text-luxury-muted text-xs">
                No fine jewellery found matching &ldquo;<span className="text-white">{query}</span>&rdquo;
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-[11px] text-luxury-muted pb-2 border-b border-white/5 px-2">
                  <span>Found {results.length} creations</span>
                  <button
                    onClick={handleSearchSubmit}
                    className="text-gold-400 hover:underline flex items-center gap-1"
                  >
                    <span>View all in Shop</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="divide-y divide-white/5">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      onClick={handleItemClick}
                      className="p-2.5 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-12 h-12 bg-luxury-charcoal shrink-0 border border-white/10 overflow-hidden">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-serif text-sm text-white group-hover:text-gold-300 transition-colors line-clamp-1">
                            {product.name}
                          </h4>
                          <p className="text-[10px] text-luxury-muted font-mono">
                            {product.metal} &bull; {product.stone}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="text-xs font-semibold text-gold-300">
                          {formatPrice(product.price)}
                        </p>
                        <span className="text-[10px] text-luxury-muted uppercase">
                          Inspect &rarr;
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
