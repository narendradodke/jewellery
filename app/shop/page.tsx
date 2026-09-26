"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Filter, SlidersHorizontal, X, RotateCcw, ChevronDown } from "lucide-react";
import { PRODUCTS } from "@/lib/mockData";
import { IMAGE_ASSETS } from "@/lib/imageAssets";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("search") || "";

  const maxProductPrice = useMemo(() => Math.max(...PRODUCTS.map((p) => p.price)), []);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedMetal, setSelectedMetal] = useState<string>("all");
  const [selectedStone, setSelectedStone] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(maxProductPrice);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Sync when search parameter changes
  useEffect(() => {
    const s = searchParams.get("search");
    if (s !== null) setSearchQuery(s);
    const c = searchParams.get("category");
    if (c !== null) setSelectedCategory(c);
  }, [searchParams]);

  const categories = [
    { label: "All Collections", value: "all" },
    { label: "Diamond", value: "diamond" },
    { label: "Gold", value: "gold" },
    { label: "Silver", value: "silver" },
    { label: "Traditional", value: "traditional" },
    { label: "Bridal", value: "bridal" },
  ];

  const metals = [
    { label: "All Metals", value: "all" },
    { label: "18K White Gold", value: "18K White Gold" },
    { label: "22K Yellow Gold", value: "22K Yellow Gold" },
    { label: "18K Yellow Gold", value: "18K Yellow Gold" },
    { label: "18K Rose Gold", value: "18K Rose Gold" },
    { label: "Platinum", value: "Platinum" },
  ];

  const stones = [
    { label: "All Gemstones", value: "all" },
    { label: "Solitaire Diamond", value: "Solitaire Diamond" },
    { label: "VVS Diamonds", value: "VVS Diamonds" },
    { label: "Emerald", value: "Emerald" },
    { label: "Ruby", value: "Ruby" },
    { label: "Pearl", value: "Pearl" },
    { label: "Kundan", value: "Kundan" },
  ];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (selectedCategory !== "all" && product.category !== selectedCategory) return false;
      if (selectedMetal !== "all" && product.metal !== selectedMetal) return false;
      if (selectedStone !== "all" && product.stone !== selectedStone) return false;
      if (product.price > maxPrice) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          product.name.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.metal.toLowerCase().includes(q) ||
          product.stone.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, selectedMetal, selectedStone, maxPrice, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedMetal("all");
    setSelectedStone("all");
    setMaxPrice(maxProductPrice);
    setSearchQuery("");
    setSortBy("featured");
  };

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (selectedMetal !== "all" ? 1 : 0) +
    (selectedStone !== "all" ? 1 : 0) +
    (maxPrice < maxProductPrice ? 1 : 0) +
    (searchQuery.trim() !== "" ? 1 : 0);

  return (
    <div className="min-h-screen bg-background text-white pb-20">
      {/* 1. SHOP BANNER */}
      <section className="relative bg-[#0E0E0E] border-b border-luxury-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold-400 font-mono font-medium">
              LUXORA Fine Jewelry
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-wide">
              The Fine Jewellery Collection
            </h1>
            <p className="text-xs sm:text-sm text-luxury-muted max-w-xl font-light">
              Explore timeless diamond solitaires, hallmarked 22K gold heirlooms, and handcrafted royal ornaments.
            </p>
          </div>

          {/* Top-Right Thumbnail from instruction */}
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 shrink-0 rounded-none border border-gold-500/30 overflow-hidden shadow-gold-sm hidden sm:block">
            <Image
              src={IMAGE_ASSETS.shopBanner.url}
              alt={IMAGE_ASSETS.shopBanner.alt}
              fill
              sizes="144px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* 2. MAIN SHOP CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Top Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/5">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2 bg-card border border-luxury-border text-xs uppercase tracking-wider text-white"
          >
            <Filter className="w-3.5 h-3.5 text-gold-400" />
            <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>

          <p className="text-xs text-luxury-muted">
            Showing <span className="text-white font-medium">{filteredProducts.length}</span> pieces
          </p>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs uppercase tracking-wider text-luxury-muted hidden sm:inline">
              Sort By:
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-card border border-luxury-border text-xs text-white uppercase tracking-wider py-2 pl-3 pr-8 focus:outline-none focus:border-gold-500/50 cursor-pointer"
              >
                <option value="featured">Featured Collection</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gold-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Active Filters Pill Strip */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-4 pb-2 border-b border-white/5">
            <span className="text-[11px] uppercase tracking-wider text-luxury-muted mr-1 font-mono">
              Active Filters ({activeFiltersCount}):
            </span>
            {selectedCategory !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs capitalize">
                <span>Category: {selectedCategory}</span>
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="hover:text-white"
                  aria-label="Remove category filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedMetal !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs">
                <span>Metal: {selectedMetal}</span>
                <button
                  onClick={() => setSelectedMetal("all")}
                  className="hover:text-white"
                  aria-label="Remove metal filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedStone !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs">
                <span>Stone: {selectedStone}</span>
                <button
                  onClick={() => setSelectedStone("all")}
                  className="hover:text-white"
                  aria-label="Remove stone filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {maxPrice < maxProductPrice && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs">
                <span>Under {formatPrice(maxPrice)}</span>
                <button
                  onClick={() => setMaxPrice(maxProductPrice)}
                  className="hover:text-white"
                  aria-label="Remove price filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {searchQuery.trim() !== "" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs">
                <span>Search: &ldquo;{searchQuery}&rdquo;</span>
                <button
                  onClick={() => setSearchQuery("")}
                  className="hover:text-white"
                  aria-label="Remove search filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={resetFilters}
              className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 bg-card hover:bg-card-hover border border-gold-500/40 text-gold-400 text-xs uppercase tracking-wider font-semibold transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear All Filters ({activeFiltersCount})</span>
            </button>
          </div>
        )}

        {/* Layout Grid: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-8">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-gold-400" />
                <h3 className="text-xs uppercase tracking-widest font-semibold text-white">
                  Refine Jewellery
                </h3>
              </div>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-gold-400 hover:text-gold-300 flex items-center gap-1 uppercase tracking-wider"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider text-gold-300/90 font-medium">
                Category
              </h4>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label
                    key={cat.value}
                    className="flex items-center gap-2 text-xs text-gray-300 hover:text-gold-300 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat.value}
                      onChange={() => setSelectedCategory(cat.value)}
                      className="accent-gold-500 cursor-pointer"
                    />
                    <span>{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Metal Filter */}
            <div className="space-y-3 pt-4 border-t border-white/5">
              <h4 className="text-xs uppercase tracking-wider text-gold-300/90 font-medium">
                Metal Type
              </h4>
              <div className="space-y-2">
                {metals.map((metal) => (
                  <label
                    key={metal.value}
                    className="flex items-center gap-2 text-xs text-gray-300 hover:text-gold-300 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="metal"
                      checked={selectedMetal === metal.value}
                      onChange={() => setSelectedMetal(metal.value)}
                      className="accent-gold-500 cursor-pointer"
                    />
                    <span>{metal.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Stone Filter */}
            <div className="space-y-3 pt-4 border-t border-white/5">
              <h4 className="text-xs uppercase tracking-wider text-gold-300/90 font-medium">
                Stone Type
              </h4>
              <div className="space-y-2">
                {stones.map((stone) => (
                  <label
                    key={stone.value}
                    className="flex items-center gap-2 text-xs text-gray-300 hover:text-gold-300 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="stone"
                      checked={selectedStone === stone.value}
                      onChange={() => setSelectedStone(stone.value)}
                      className="accent-gold-500 cursor-pointer"
                    />
                    <span>{stone.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-3 pt-4 border-t border-white/5">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-wider text-gold-300/90 font-medium">Max Price</span>
                <span className="text-gold-400 font-semibold">{formatPrice(maxPrice)}</span>
              </div>
              <input
                type="range"
                min={50000}
                max={maxProductPrice}
                step={25000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-gold-500 cursor-pointer bg-card"
              />
              <div className="flex justify-between text-[10px] text-luxury-muted">
                <span>{formatPrice(50000)}</span>
                <span>{formatPrice(maxProductPrice)}</span>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-card/40 border border-luxury-border p-8">
                <p className="font-serif text-xl text-white mb-2">No Jewellery Found</p>
                <p className="text-xs text-luxury-muted max-w-sm mx-auto mb-6">
                  No exquisite pieces match your current filter parameters. Try adjusting your metal or price settings.
                </p>
                <Button variant="goldOutline" size="sm" onClick={resetFilters}>
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, idx) => (
                  <ProductCard key={product.id} product={product} index={idx} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xs bg-[#111111] h-full p-6 overflow-y-auto space-y-6 border-l border-luxury-border">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="font-serif text-lg text-white">Refine Search</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-white hover:text-gold-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Category */}
            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-wider text-gold-300">Category</h4>
              {categories.map((c) => (
                <label key={c.value} className="flex items-center gap-2 text-xs text-gray-300 py-1">
                  <input
                    type="radio"
                    name="mobile-category"
                    checked={selectedCategory === c.value}
                    onChange={() => setSelectedCategory(c.value)}
                    className="accent-gold-500"
                  />
                  <span>{c.label}</span>
                </label>
              ))}
            </div>

            {/* Mobile Metal */}
            <div className="space-y-2 pt-3 border-t border-white/5">
              <h4 className="text-xs uppercase tracking-wider text-gold-300">Metal</h4>
              {metals.map((m) => (
                <label key={m.value} className="flex items-center gap-2 text-xs text-gray-300 py-1">
                  <input
                    type="radio"
                    name="mobile-metal"
                    checked={selectedMetal === m.value}
                    onChange={() => setSelectedMetal(m.value)}
                    className="accent-gold-500"
                  />
                  <span>{m.label}</span>
                </label>
              ))}
            </div>

            {/* Mobile Price */}
            <div className="space-y-2 pt-3 border-t border-white/5">
              <div className="flex justify-between text-xs text-gold-300">
                <span>Max Price</span>
                <span>{formatPrice(maxPrice)}</span>
              </div>
              <input
                type="range"
                min={50000}
                max={maxProductPrice}
                step={25000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-gold-500"
              />
            </div>

            <div className="pt-6 flex gap-3">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={resetFilters}
              >
                Reset
              </Button>
              <Button
                size="sm"
                className="flex-1"
                onClick={() => setMobileFilterOpen(false)}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-gold-400">Loading collection...</div>}>
      <ShopContent />
    </Suspense>
  );
}
