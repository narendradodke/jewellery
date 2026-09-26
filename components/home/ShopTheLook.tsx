"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ShoppingBag, ArrowRight, X, Check } from "lucide-react";
import { PRODUCTS } from "@/lib/mockData";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/Button";

interface Hotspot {
  id: string;
  productId: string;
  x: number; // percentage from left
  y: number; // percentage from top
  label: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "spot-earrings",
    productId: "prod-3", // Pearl Drop Earrings
    x: 43,
    y: 28,
    label: "Pearl Drop Earrings",
  },
  {
    id: "spot-necklace",
    productId: "prod-7", // Emerald Drop Necklace
    x: 49,
    y: 46,
    label: "Emerald Drop Necklace",
  },
  {
    id: "spot-ring",
    productId: "prod-1", // Royal Bloom Diamond Ring
    x: 64,
    y: 68,
    label: "Royal Bloom Diamond Ring",
  },
];

export const ShopTheLook: React.FC = () => {
  const [activeHotspotId, setActiveHotspotId] = useState<string>("spot-necklace");
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addItem } = useCartStore();

  const activeHotspot = HOTSPOTS.find((h) => h.id === activeHotspotId);
  const activeProduct = PRODUCTS.find((p) => p.id === activeHotspot?.productId) || PRODUCTS[0];

  const handleAddPiece = (product: Product) => {
    addItem(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const handleAddAll = () => {
    HOTSPOTS.forEach((h) => {
      const p = PRODUCTS.find((prod) => prod.id === h.productId);
      if (p) addItem(p, 1);
    });
    setAddedId("all");
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background via-[#0D0D0D] to-background border-t border-luxury-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-[10px] uppercase tracking-widest font-mono">
            <Sparkles className="w-3 h-3" />
            <span>Editorial Feature</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-wide">
            The LUXORA Lookbook: Haute Soirée
          </h2>
          <div className="w-16 h-[1px] bg-gold-500/60 mx-auto" />
          <p className="text-xs sm:text-sm text-luxury-muted font-light leading-relaxed">
            Click the interactive gold pins on the portrait to explore the curated high jewellery suite and add each piece directly to your bag.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT: Interactive Editorial Canvas (7 cols) */}
          <div className="lg:col-span-7 relative aspect-[3/4] sm:aspect-[4/5] bg-card border border-luxury-border overflow-hidden group shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85"
              alt="Model wearing LUXORA high jewellery suite"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-top filter brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* Interactive Hotspots */}
            {HOTSPOTS.map((hotspot) => {
              const isActive = activeHotspotId === hotspot.id;
              return (
                <div
                  key={hotspot.id}
                  style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    onClick={() => setActiveHotspotId(isActive ? "" : hotspot.id)}
                    aria-label={`View ${hotspot.label}`}
                    className="relative group/pin p-2 focus:outline-none"
                  >
                    {/* Pulsing ring */}
                    <span
                      className={`absolute inset-0 rounded-full bg-gold-400 opacity-60 animate-ping ${
                        isActive ? "scale-125" : ""
                      }`}
                    />
                    {/* Center dot */}
                    <span
                      className={`relative flex items-center justify-center w-7 h-7 rounded-full border-2 transition-all duration-300 ${
                        isActive
                          ? "bg-gold-500 border-white text-black scale-110 shadow-gold-md"
                          : "bg-black/80 border-gold-400 text-gold-300 hover:scale-110 backdrop-blur-md"
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </span>
                  </button>
                </div>
              );
            })}

            {/* Floating Pop-up on Canvas (for Mobile/Desktop) */}
            <AnimatePresence>
              {activeHotspot && activeProduct && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:max-w-sm z-30 bg-[#121212]/95 backdrop-blur-md border border-gold-500/40 p-4 shadow-2xl"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="relative w-16 h-16 bg-luxury-charcoal shrink-0 border border-white/10">
                      <Image
                        src={activeProduct.images[0]}
                        alt={activeProduct.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <span className="text-[10px] uppercase tracking-widest text-gold-400 font-mono">
                        {activeProduct.metal}
                      </span>
                      <h4 className="font-serif text-sm text-white line-clamp-1">
                        {activeProduct.name}
                      </h4>
                      <p className="text-xs text-gold-300 font-semibold">
                        {formatPrice(activeProduct.price)}
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveHotspotId("")}
                      className="text-luxury-muted hover:text-white p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2">
                    <button
                      onClick={() => handleAddPiece(activeProduct)}
                      className="flex-1 py-2 px-3 bg-gold-gradient text-black text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:brightness-110 active:scale-95 transition-all"
                    >
                      {addedId === activeProduct.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added to Bag</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add Piece</span>
                        </>
                      )}
                    </button>
                    <Link
                      href={`/product/${activeProduct.id}`}
                      className="px-3 py-2 border border-luxury-border text-[11px] uppercase tracking-wider text-white hover:text-gold-300 hover:border-gold-500/50"
                    >
                      Inspect
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: Curated Pieces Showcase (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-widest text-gold-400 font-mono">
                Atelier Ensemble
              </span>
              <h3 className="font-serif text-2xl text-white">
                Styled In This Look
              </h3>
              <p className="text-xs text-luxury-muted font-light leading-relaxed">
                A harmonious synergy of radiant emeralds, certified solitaires, and South Sea cultured pearls. Acquire individual statements or the complete suite.
              </p>
            </div>

            {/* List of 3 items */}
            <div className="space-y-3">
              {HOTSPOTS.map((hotspot) => {
                const prod = PRODUCTS.find((p) => p.id === hotspot.productId);
                if (!prod) return null;
                const isSelected = activeHotspotId === hotspot.id;

                return (
                  <div
                    key={hotspot.id}
                    onClick={() => setActiveHotspotId(hotspot.id)}
                    className={`p-3.5 border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isSelected
                        ? "bg-card border-gold-400/80 shadow-gold-sm"
                        : "bg-card/40 border-luxury-border hover:border-white/20"
                    }`}
                  >
                    <div className="relative w-14 h-14 bg-luxury-charcoal shrink-0 border border-white/5">
                      <Image
                        src={prod.images[0]}
                        alt={prod.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-0.5">
                      <h4 className="font-serif text-xs text-white line-clamp-1">{prod.name}</h4>
                      <p className="text-[10px] text-luxury-muted font-mono">{prod.stone} &bull; {prod.metal}</p>
                      <p className="text-xs text-gold-300 font-medium">{formatPrice(prod.price)}</p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddPiece(prod);
                      }}
                      className="p-2 text-gold-400 hover:text-gold-300 active:scale-95"
                      aria-label="Add piece to bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Total Suite Action */}
            <div className="p-4 bg-card border border-gold-500/30 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-wider text-luxury-muted">Full Look Suite</span>
                <span className="font-serif text-sm font-bold text-gold-300">
                  {formatPrice(
                    HOTSPOTS.reduce((sum, h) => {
                      const p = PRODUCTS.find((prod) => prod.id === h.productId);
                      return sum + (p?.price || 0);
                    }, 0)
                  )}
                </span>
              </div>
              <Button
                onClick={handleAddAll}
                size="lg"
                className="w-full flex items-center justify-center gap-2"
              >
                {addedId === "all" ? (
                  <>
                    <Check className="w-4 h-4 text-black" />
                    <span>Entire Look Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add Entire Suite to Bag</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
