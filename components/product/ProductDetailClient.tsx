"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  ShieldCheck,
  Award,
  Truck,
  RotateCcw,
  Heart,
  Share2,
  Minus,
  Plus,
  ShoppingBag,
  Check,
  ChevronRight,
} from "lucide-react";
import { PRODUCTS, MOCK_REVIEWS } from "@/lib/mockData";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";

interface ProductDetailClientProps {
  product: Product;
}

export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ product }) => {
  const router = useRouter();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes?.[0] || "Standard"
  );
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const { addItem, toggleWishlist, isInWishlist } = useCartStore();
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, quantity, selectedSize);
    router.push("/cart");
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <main className="min-h-screen bg-background text-white pb-24">
      {/* Breadcrumb Strip */}
      <div className="border-b border-white/5 bg-[#0C0C0C] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-xs text-luxury-muted">
            <Link href="/" className="hover:text-gold-300">Home</Link>
            <ChevronRight className="w-3 h-3 text-luxury-subtle" />
            <Link href="/shop" className="hover:text-gold-300">Jewellery</Link>
            <ChevronRight className="w-3 h-3 text-luxury-subtle" />
            <Link href={`/shop?category=${product.category}`} className="capitalize hover:text-gold-300">
              {product.category}
            </Link>
            <ChevronRight className="w-3 h-3 text-luxury-subtle" />
            <span className="text-white truncate max-w-xs">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT: Image Gallery (7 cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails list */}
            <div className="flex md:flex-col gap-3 shrink-0 overflow-x-auto md:overflow-visible">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-20 shrink-0 border transition-all duration-300 overflow-hidden bg-card ${
                    selectedImageIndex === idx
                      ? "border-gold-400 shadow-gold-sm"
                      : "border-luxury-border opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Featured Image */}
            <div className="relative flex-1 aspect-[4/5] bg-card border border-luxury-border overflow-hidden">
              <Image
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center transition-all duration-500"
              />

              {/* Badges on main view */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.discountPercentage && (
                  <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-gold-500 text-black">
                    {product.discountPercentage}% Off
                  </span>
                )}
                <span className="px-2.5 py-1 text-xs font-medium uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/10 text-white">
                  {product.purity || "Certified Fine"}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Details & Purchase Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-gold-400 uppercase tracking-widest font-mono">
                <span>SKU: {product.sku || "LUX-GEN-01"}</span>
                <div className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                  <span className="text-white font-medium">{product.rating.toFixed(1)}</span>
                  <span className="text-luxury-muted">({product.reviewCount} Reviews)</span>
                </div>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white tracking-wide">
                  {product.name}
                </h1>
                {product.subtitle && (
                  <p className="text-sm text-gold-300/80 font-light mt-1">
                    {product.subtitle}
                  </p>
                )}
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-4 py-2 border-y border-white/10">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-gold-300">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-luxury-muted line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-[11px] text-green-400 font-medium uppercase tracking-wider ml-auto">
                  Inclusive of all taxes
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                {product.description}
              </p>

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="uppercase tracking-wider text-gold-300/90 font-medium">Select Size / Fit</span>
                    <span className="text-luxury-muted text-[11px] cursor-pointer hover:text-gold-300 underline">
                      Sizing Guide
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 text-xs tracking-wider transition-all duration-300 border ${
                          selectedSize === size
                            ? "bg-gold-500 text-black font-semibold border-gold-400 shadow-sm"
                            : "bg-card text-gray-300 border-luxury-border hover:border-gold-500/50"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="space-y-2 pt-2">
                <span className="text-xs uppercase tracking-wider text-gold-300/90 font-medium block">Quantity</span>
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center border border-luxury-border bg-card">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2 text-luxury-muted hover:text-white transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center text-xs font-semibold text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-2 text-luxury-muted hover:text-white transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-[11px] text-gold-400 font-mono">
                    {product.stock > 0 ? `${product.stock} pieces remaining in atelier` : "Made to Order"}
                  </span>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Button
                    onClick={handleAddToCart}
                    size="lg"
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    {addedToCart ? (
                      <>
                        <Check className="w-4 h-4 text-black" />
                        <span>Added to Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </Button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="h-13 w-13 p-3.5 bg-card border border-luxury-border text-white hover:text-gold-400 hover:border-gold-500/50 transition-colors flex items-center justify-center"
                    aria-label="Save to Wishlist"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isWishlisted ? "fill-gold-500 text-gold-500" : "text-white"
                      }`}
                    />
                  </button>

                  <button
                    onClick={handleShare}
                    className="h-13 w-13 p-3.5 bg-card border border-luxury-border text-white hover:text-gold-400 hover:border-gold-500/50 transition-colors flex items-center justify-center relative"
                    aria-label="Share jewel"
                  >
                    <Share2 className="w-5 h-5" />
                    {copied && (
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gold-500 text-black text-[9px] font-bold">
                        Copied
                      </span>
                    )}
                  </button>
                </div>

                <Button
                  onClick={handleBuyNow}
                  variant="goldOutline"
                  size="lg"
                  className="w-full"
                >
                  Buy Now &bull; White-Glove Checkout
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2.5 text-xs text-luxury-muted">
                  <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Certified Natural Diamonds</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-luxury-muted">
                  <Award className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Lifetime Maintenance & Polish</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-luxury-muted">
                  <Truck className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Insured Armored Courier</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-luxury-muted">
                  <RotateCcw className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>15-Day Exchange Guarantee</span>
                </div>
              </div>
            </div>

            {/* Atelier Details */}
            {product.details && product.details.length > 0 && (
              <div className="pt-6 border-t border-white/5 space-y-2">
                <h4 className="text-xs uppercase tracking-widest text-gold-300 font-semibold">
                  Atelier Specifications
                </h4>
                <ul className="space-y-1.5 text-xs text-gray-300 font-light">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gold-400 mt-1">&bull;</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Client Reviews Section */}
        <section className="mt-24 pt-12 border-t border-luxury-border">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-serif text-white tracking-wide">
                Patron Impressions
              </h3>
              <p className="text-xs text-luxury-muted">
                Read authentic testimonials from collectors of LUXORA fine jewels.
              </p>
            </div>

            <div className="space-y-4">
              {MOCK_REVIEWS.map((rev) => (
                <div
                  key={rev.id}
                  className="p-6 bg-card border border-luxury-border space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm text-gold-300">{rev.userName}</span>
                    <span className="text-[11px] text-luxury-muted">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gold-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold-400" />
                    ))}
                  </div>
                  <h4 className="text-xs font-semibold text-white tracking-wide">{rev.title}</h4>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* You May Also Admire */}
        <section className="mt-24 pt-12 border-t border-luxury-border">
          <div className="text-center mb-10 space-y-2">
            <p className="text-[11px] uppercase tracking-widest text-gold-400 font-mono">
              Curated Recommendations
            </p>
            <h3 className="text-2xl sm:text-3xl font-serif text-white">
              You May Also Admire
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};
