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
  ChevronDown,
  Sparkles,
  Gem,
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
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [openAccordion, setOpenAccordion] = useState<string | null>("specifications");

  const { addItem, toggleWishlist, isInWishlist } = useCartStore();
  const isWishlisted = isInWishlist(product.id);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setZoomPos({ x, y });
  };

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

  const toggleAccordion = (id: string) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  const scrollToReviews = () => {
    const el = document.getElementById("reviews-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 6);

  const discountPercent =
    product.discountPercentage ||
    (product.originalPrice && product.price < product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null);

  return (
    <main className="min-h-screen bg-background text-white pb-28">
      {/* Breadcrumb Strip */}
      <div className="border-b border-white/5 bg-[#0C0C0C] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-xs text-luxury-muted">
            <Link href="/" className="hover:text-gold-300">Home</Link>
            <ChevronRight className="w-3 h-3 text-luxury-subtle" />
            <Link href="/shop" className="hover:text-gold-300">Collection</Link>
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: Image Gallery (7 cols, sticky on desktop) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 lg:sticky lg:top-28">
            {/* Thumbnails list */}
            <div className="flex md:flex-col gap-3 shrink-0 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-20 shrink-0 border transition-all duration-300 overflow-hidden bg-card ${
                    selectedImageIndex === idx
                      ? "border-gold-400 shadow-gold-sm ring-1 ring-gold-400"
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

            {/* Main Featured Image with Zoom on Hover */}
            <div
              className="relative flex-1 aspect-[4/5] bg-card border border-luxury-border overflow-hidden cursor-crosshair group select-none"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <Image
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                        transform: "scale(1.5)",
                      }
                    : undefined
                }
                className="object-cover object-center transition-transform duration-150"
              />

              {/* Badges on main view */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none z-10">
                {discountPercent && (
                  <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-gold-500 text-black shadow-sm">
                    {discountPercent}% Off
                  </span>
                )}
                <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-black/70 backdrop-blur-md border border-white/10 text-white">
                  {product.purity || "Certified Natural"}
                </span>
              </div>

              {/* 360° View Luxury Badge */}
              <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1 bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono uppercase tracking-wider rounded-full pointer-events-none">
                <RotateCcw className="w-3.5 h-3.5 text-gold-400" />
                <span>360° View</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Details & Purchase Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-gold-400 uppercase tracking-editorial font-mono">
                <span>{product.category} &bull; {product.metal}</span>
                <button
                  onClick={scrollToReviews}
                  className="flex items-center gap-1.5 hover:text-gold-300 transition-colors"
                >
                  <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                  <span className="text-white font-medium">{product.rating.toFixed(1)}</span>
                  <span className="text-luxury-muted underline">({product.reviewCount} Reviews)</span>
                </button>
              </div>

              {/* Product Name */}
              <div>
                <h1 className="text-3xl sm:text-4xl font-serif font-normal text-white tracking-wide leading-tight">
                  {product.name}
                </h1>
                {product.subtitle && (
                  <p className="text-sm text-gold-300/90 font-light mt-1.5">
                    {product.subtitle}
                  </p>
                )}
              </div>

              {/* Pricing with MRP & Strikethrough & Pill badge */}
              <div className="flex flex-wrap items-baseline gap-3 py-3 border-y border-white/10">
                <span className="text-3xl font-serif font-normal text-gold-300">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-luxury-muted line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {discountPercent && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider bg-gold-500/20 border border-gold-500/50 text-gold-300">
                    {discountPercent}% OFF
                  </span>
                )}
                <span className="text-[11px] text-green-400 font-medium uppercase tracking-wider ml-auto">
                  Inclusive of all taxes
                </span>
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                {product.description}
              </p>

              {/* Size Selector as Pill Buttons */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="uppercase tracking-wider text-gold-300/90 font-medium">Select Size / Fit</span>
                    <span className="text-luxury-muted text-[11px] cursor-pointer hover:text-gold-300 underline">
                      Size Guide
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-1.5 rounded-full text-xs tracking-wider transition-all duration-300 border ${
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
                    {product.stock > 0 ? `${product.stock} pieces remaining in atelier` : "Bespoke Made to Order"}
                  </span>
                </div>
              </div>

              {/* CTA Action Buttons: Side by Side, Full Width on Mobile */}
              <div className="pt-4 space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Button
                    onClick={handleAddToCart}
                    variant="goldOutline"
                    size="lg"
                    className="flex-1 flex items-center justify-center gap-2 tracking-luxe"
                  >
                    {addedToCart ? (
                      <>
                        <Check className="w-4 h-4 text-gold-400" />
                        <span>Added to Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={handleBuyNow}
                    variant="primary"
                    size="lg"
                    className="flex-1 tracking-luxe"
                  >
                    Buy Now
                  </Button>

                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="h-11 w-11 p-2.5 bg-card border border-luxury-border text-white hover:text-gold-400 hover:border-gold-500/50 transition-colors flex items-center justify-center"
                      aria-label="Save to Wishlist"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isWishlisted ? "fill-gold-500 text-gold-500 scale-110 animate-pulse" : "text-white"
                        }`}
                      />
                    </button>

                    <button
                      onClick={handleShare}
                      className="h-11 w-11 p-2.5 bg-card border border-luxury-border text-white hover:text-gold-400 hover:border-gold-500/50 transition-colors flex items-center justify-center relative"
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
                </div>
              </div>

              {/* Trust Badges Row (4 icons with small text) */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-card/40 border border-white/5 flex flex-col items-center gap-1.5">
                  <ShieldCheck className="w-5 h-5 text-gold-400" />
                  <span className="text-[10px] text-gray-300 font-medium">Certified Diamond</span>
                </div>
                <div className="p-3 bg-card/40 border border-white/5 flex flex-col items-center gap-1.5">
                  <Award className="w-5 h-5 text-gold-400" />
                  <span className="text-[10px] text-gray-300 font-medium">Lifetime Polish</span>
                </div>
                <div className="p-3 bg-card/40 border border-white/5 flex flex-col items-center gap-1.5">
                  <RotateCcw className="w-5 h-5 text-gold-400" />
                  <span className="text-[10px] text-gray-300 font-medium">15-Day Returns</span>
                </div>
                <div className="p-3 bg-card/40 border border-white/5 flex flex-col items-center gap-1.5">
                  <Truck className="w-5 h-5 text-gold-400" />
                  <span className="text-[10px] text-gray-300 font-medium">Insured Delivery</span>
                </div>
              </div>

              {/* Luxury Accordions */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                {/* Accordion 1: Description & Heritage */}
                <div className="border border-white/5 bg-card/30 overflow-hidden">
                  <button
                    onClick={() => toggleAccordion("description")}
                    className="w-full py-3.5 px-4 flex items-center justify-between text-xs uppercase tracking-wider text-gold-300 font-medium hover:bg-white/5 transition-colors"
                  >
                    <span>Description & Heritage</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gold-400 transition-transform duration-300 ${
                        openAccordion === "description" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openAccordion === "description" && (
                    <div className="px-4 pb-4 pt-1 text-xs text-gray-300 font-light leading-relaxed border-t border-white/5 animate-fadeIn">
                      {product.description}
                    </div>
                  )}
                </div>

                {/* Accordion 2: Specifications */}
                <div className="border border-white/5 bg-card/30 overflow-hidden">
                  <button
                    onClick={() => toggleAccordion("specifications")}
                    className="w-full py-3.5 px-4 flex items-center justify-between text-xs uppercase tracking-wider text-gold-300 font-medium hover:bg-white/5 transition-colors"
                  >
                    <span>Atelier Specifications</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gold-400 transition-transform duration-300 ${
                        openAccordion === "specifications" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openAccordion === "specifications" && (
                    <div className="px-4 pb-4 pt-2 text-xs space-y-2 border-t border-white/5 animate-fadeIn">
                      <div className="grid grid-cols-2 gap-2 text-gray-300">
                        <div><span className="text-luxury-muted">Precious Metal:</span> {product.metal}</div>
                        <div><span className="text-luxury-muted">Gemstone:</span> {product.stone}</div>
                        <div><span className="text-luxury-muted">Purity:</span> {product.purity || "Hallmarked 18K/22K"}</div>
                        <div><span className="text-luxury-muted">SKU:</span> {product.sku || product.id}</div>
                      </div>
                      {product.details && product.details.length > 0 && (
                        <ul className="pt-2 space-y-1 text-gray-300 font-light border-t border-white/5">
                          {product.details.map((d, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <span className="text-gold-400">&bull;</span>
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>

                {/* Accordion 3: Shipping & Returns */}
                <div className="border border-white/5 bg-card/30 overflow-hidden">
                  <button
                    onClick={() => toggleAccordion("shipping")}
                    className="w-full py-3.5 px-4 flex items-center justify-between text-xs uppercase tracking-wider text-gold-300 font-medium hover:bg-white/5 transition-colors"
                  >
                    <span>Shipping & Armored Delivery</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gold-400 transition-transform duration-300 ${
                        openAccordion === "shipping" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openAccordion === "shipping" && (
                    <div className="px-4 pb-4 pt-2 text-xs text-gray-300 font-light leading-relaxed border-t border-white/5 space-y-1.5 animate-fadeIn">
                      <p>&bull; Complimentary white-glove armored transit on all national orders.</p>
                      <p>&bull; Tamper-evident luxury packaging with sealed authenticity vault cards.</p>
                      <p>&bull; Real-time GPS tracked courier with signature verification upon delivery.</p>
                    </div>
                  )}
                </div>

                {/* Accordion 4: Care Instructions */}
                <div className="border border-white/5 bg-card/30 overflow-hidden">
                  <button
                    onClick={() => toggleAccordion("care")}
                    className="w-full py-3.5 px-4 flex items-center justify-between text-xs uppercase tracking-wider text-gold-300 font-medium hover:bg-white/5 transition-colors"
                  >
                    <span>Care & Maintenance</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gold-400 transition-transform duration-300 ${
                        openAccordion === "care" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openAccordion === "care" && (
                    <div className="px-4 pb-4 pt-2 text-xs text-gray-300 font-light leading-relaxed border-t border-white/5 space-y-1.5 animate-fadeIn">
                      <p>&bull; Store individually in your velvet-lined LUXORA presentation chest.</p>
                      <p>&bull; Avoid direct contact with fragrances, harsh chemicals, and thermal baths.</p>
                      <p>&bull; Complimentary ultrasonic cleaning and prong check available at our boutiques.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Reviews Section */}
        <section id="reviews-section" className="mt-24 pt-12 border-t border-luxury-border">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <p className="text-[11px] uppercase tracking-editorial text-gold-400 font-mono">
                Authentic Verification
              </p>
              <h3 className="text-2xl sm:text-3xl font-serif text-white tracking-wide">
                Patron Impressions
              </h3>
              <p className="text-xs text-luxury-muted">
                Read authentic appraisals from verified collectors of LUXORA high jewellery.
              </p>
            </div>

            <div className="space-y-4">
              {MOCK_REVIEWS.map((rev) => (
                <div
                  key={rev.id}
                  className="p-6 bg-card border border-luxury-border space-y-2.5 transition-colors hover:border-gold-500/40"
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

        {/* You May Also Admire - Horizontal Snap Carousel on Mobile */}
        <section className="mt-24 pt-12 border-t border-luxury-border">
          <div className="text-center mb-10 space-y-2">
            <p className="text-[11px] uppercase tracking-editorial text-gold-400 font-mono">
              Curated Recommendations
            </p>
            <h3 className="text-2xl sm:text-3xl font-serif text-white">
              You May Also Admire
            </h3>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:overflow-visible">
            {relatedProducts.map((p, idx) => (
              <div key={p.id} className="min-w-[280px] sm:min-w-0 snap-start shrink-0 sm:shrink">
                <ProductCard product={p} index={idx} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};
