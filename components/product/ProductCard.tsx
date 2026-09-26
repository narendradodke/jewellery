"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Star, ShoppingBag, Eye } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const { toggleWishlist, isInWishlist, addItem } = useCartStore();
  const isWishlisted = isInWishlist(product.id);
  const [isAdding, setIsAdding] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addItem(product, 1);
    setTimeout(() => setIsAdding(false), 700);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 0 30px rgba(212, 175, 55, 0.22)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative flex flex-col bg-card/60 backdrop-blur-sm border border-luxury-border rounded-none overflow-hidden transition-colors duration-300 hover:border-gold-500/50"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.discountPercentage && (
          <span className="px-2 py-0.5 text-[10px] uppercase font-semibold tracking-wider bg-gold-500 text-black shadow-sm">
            {product.discountPercentage}% Off
          </span>
        )}
        {product.isNewArrival && (
          <span className="px-2 py-0.5 text-[10px] uppercase font-semibold tracking-wider bg-white/10 backdrop-blur-md text-white border border-white/20">
            New
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        type="button"
        onClick={handleWishlistToggle}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/80 transition-all duration-300 hover:text-gold-400 hover:border-gold-500/40 hover:scale-110 active:scale-95"
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            isWishlisted ? "fill-gold-500 text-gold-500" : "text-white/80"
          }`}
        />
      </button>

      {/* Image Container */}
      <Link href={`/product/${product.id}`} className="relative aspect-[4/5] overflow-hidden bg-luxury-charcoal block">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          className={`object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-90"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick Action Overlay (Desktop) */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleAddToCart}
            className="flex-1 py-2 px-3 bg-gold-gradient text-black text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md hover:brightness-110 transition-all active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isAdding ? "Added" : "Add to Cart"}</span>
          </button>
          <div className="p-2 bg-black/70 backdrop-blur-md border border-white/10 text-white hover:text-gold-300 transition-colors">
            <Eye className="w-3.5 h-3.5" />
          </div>
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3 bg-gradient-to-b from-card/40 to-card">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-gold-400/90 uppercase tracking-widest font-mono">
            <span>{product.metal}</span>
            <div className="flex items-center gap-1 text-gold-400">
              <Star className="w-3 h-3 fill-gold-400 text-gold-400" />
              <span className="text-white text-[11px] font-sans font-medium">{product.rating.toFixed(1)}</span>
              <span className="text-luxury-muted text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          <Link href={`/product/${product.id}`} className="block group-hover:text-gold-300 transition-colors">
            <h3 className="font-serif text-base text-white line-clamp-1 tracking-wide font-normal">
              {product.name}
            </h3>
          </Link>
          {product.subtitle && (
            <p className="text-xs text-luxury-muted line-clamp-1 font-light">
              {product.subtitle}
            </p>
          )}
        </div>

        {/* Price & Action */}
        <div className="pt-2 border-t border-white/5 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold text-gold-300 tracking-tight">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-luxury-muted line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Mobile Quick Add */}
          <button
            onClick={handleAddToCart}
            className="md:hidden p-2 text-gold-400 hover:text-gold-300 active:scale-95"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
