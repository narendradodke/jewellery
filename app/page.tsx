"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Sparkles, Gem, ShieldCheck, Clock, Award, Star } from "lucide-react";
import { IMAGE_ASSETS } from "@/lib/imageAssets";
import { COLLECTIONS, PRODUCTS } from "@/lib/mockData";
import { ProductCard } from "@/components/product/ProductCard";
import { ShopTheLook } from "@/components/home/ShopTheLook";
import { Button } from "@/components/ui/Button";

const heroImages = [
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1920&q=80",
];

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function HomePage() {
  const newArrivalProducts = PRODUCTS.filter((p) => p.isNewArrival).slice(0, 4);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-background text-white overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] lg:min-h-[94vh] flex items-center justify-start overflow-hidden">
        {/* Background Images Crossfade + Ken Burns Slideshow */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {heroImages.map((src, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={src}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <div
                  className={`w-full h-full transform transition-transform duration-[8000ms] ease-out ${
                    isActive ? "scale-108" : "scale-100"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`LUXORA Fine Jewellery - Hero Slide ${index + 1}`}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            );
          })}

          {/* Dark gradient overlay on top of all images for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/40 z-10" />
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
          <span className="text-[9px] uppercase tracking-editorial text-gold-300/80 font-mono">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-gold-400 via-gold-400/60 to-transparent animate-pulse" />
        </div>

        {/* Slideshow Progress Indicators */}
        <div className="absolute bottom-8 right-6 sm:right-12 z-20 flex items-center gap-2">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1 transition-all duration-500 rounded-full ${
                idx === currentIndex
                  ? "w-8 bg-gold-400 shadow-gold-sm"
                  : "w-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-2xl space-y-6">
            {/* Label with editorial thin gold vertical line */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="inline-flex items-center gap-3"
            >
              <span className="w-[2px] h-5 bg-gold-400 inline-block" />
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 border border-gold-500/30 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span className="text-[11px] uppercase tracking-editorial text-gold-300 font-cinzel font-medium">
                  Timeless Elegance &bull; Haute Joaillerie 2026
                </span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-white leading-[1.12] tracking-wide"
            >
              More Than Just Jewellery, <br />
              <span className="italic font-normal text-gold-gradient">It&apos;s a Feeling</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
              className="text-sm sm:text-base text-gray-300 font-light max-w-xl leading-relaxed"
            >
              Immerse yourself in our haute joaillerie collections, meticulously sculpted with certified natural diamonds, 22K pure gold, and royal gemstones.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <Link href="/shop">
                <Button size="lg" className="w-full sm:w-auto tracking-luxe">
                  <span>Explore Collections</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/shop?category=bridal">
                <Button variant="goldOutline" size="lg" className="w-full sm:w-auto tracking-luxe">
                  <span>The Bridal Atelier</span>
                </Button>
              </Link>
            </motion.div>

            {/* Quick Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="pt-8 grid grid-cols-3 gap-6 border-t border-white/10 max-w-lg"
            >
              <div>
                <p className="font-serif text-2xl font-bold text-gold-400">100%</p>
                <p className="text-[11px] text-luxury-muted uppercase tracking-wider">Certified Conflict-Free</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-gold-400">38+</p>
                <p className="text-[11px] text-luxury-muted uppercase tracking-wider">Years of Mastery</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-gold-400">Lifetime</p>
                <p className="text-[11px] text-luxury-muted uppercase tracking-wider">Polish & Service</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. OUR COLLECTIONS SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-3"
        >
          <p className="text-xs uppercase tracking-editorial text-gold-400 font-semibold font-mono">
            Handcrafted Masterpieces
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-white tracking-wide">
            Our Signature Collections
          </h2>
          <div className="w-16 h-[1px] bg-gold-500/60 mx-auto" />
          <p className="text-xs sm:text-sm text-luxury-muted font-light leading-relaxed">
            From modern solitaire brilliance to ancient royal heritage, discover high jewellery tailored to define your legacy.
          </p>
        </motion.div>

        {/* Collections Grid with Asymmetric Feel & Hover Micro-Interactions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {COLLECTIONS.map((col, idx) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
            >
              <Link
                href={`/shop?category=${col.category}`}
                className="group relative h-[420px] overflow-hidden border border-luxury-border hover:border-gold-500 transition-all duration-500 bg-card block"
              >
                <Image
                  src={col.image}
                  alt={col.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  loading="lazy"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors duration-400" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent" />

                <div className="absolute inset-0 p-6 flex flex-col justify-end text-center items-center">
                  <span className="text-[10px] uppercase tracking-editorial text-gold-400 font-mono mb-1.5">
                    {col.itemCount} Curated Pieces
                  </span>
                  <h3 className="font-serif text-2xl text-white tracking-wide font-normal group-hover:text-gold-300 transition-colors">
                    {col.title}
                  </h3>
                  <p className="text-[11px] text-gray-300 font-light mt-2 line-clamp-2 max-w-[220px] opacity-0 group-hover:opacity-100 transition-all duration-300 leading-relaxed">
                    {col.description}
                  </p>
                  <div className="mt-4 inline-flex items-center text-[11px] uppercase tracking-luxe font-medium text-gold-400 gap-1.5 border-b border-gold-500/40 pb-0.5 group-hover:border-gold-400">
                    <span>Explore Suite</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EDITORIAL: SHOP THE LOOKBOOK WITH INTERACTIVE HOTSPOTS */}
      <ShopTheLook />

      {/* 3. NEW ARRIVALS SECTION WITH MOBILE SNAP CAROUSEL */}
      <section className="py-24 bg-[#0B0B0B] border-y border-luxury-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
          >
            <div>
              <p className="text-xs uppercase tracking-editorial text-gold-400 font-semibold font-mono">
                The New Season
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif font-light text-white tracking-wide mt-1">
                New Arrivals
              </h2>
            </div>
            <Link href="/shop">
              <Button variant="goldOutline" size="sm" className="tracking-luxe">
                <span>View Full Catalogue</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2" />
              </Button>
            </Link>
          </motion.div>

          {/* Responsive Grid with Mobile Snap Scrolling */}
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible">
            {newArrivalProducts.map((product, idx) => (
              <div key={product.id} className="min-w-[280px] sm:min-w-0 snap-start shrink-0 sm:shrink">
                <ProductCard product={product} index={idx} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. "CRAFTED BY HANDS" FULL-WIDTH PARALLAX CRAFTSMANSHIP SECTION */}
      <section className="relative py-32 overflow-hidden bg-fixed bg-center bg-cover border-y border-gold-500/20" style={{ backgroundImage: `url(${IMAGE_ASSETS.craftedByHands.url})` }}>
        {/* Dark Luxury Overlay */}
        <div className="absolute inset-0 bg-black/85 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6"
        >
          <div className="w-12 h-[1px] bg-gold-400 mx-auto" />
          <div className="inline-flex p-3 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 mb-2">
            <Gem className="w-6 h-6 animate-pulse-slow" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-light text-white tracking-wide leading-tight">
            Crafted by Hands, <br />
            <span className="italic text-gold-gradient font-normal">Perfected by Tradition</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
            Every LUXORA jewel undergoes more than 120 hours of precision hand-carving by hereditary master artisans. Using age-old Nakshi, Jadau, and micro-pavé methods, we marry timeless lineage with contemporary haute aesthetics.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link href="/shop">
              <Button size="lg" className="tracking-luxe">Explore Craftsmanship</Button>
            </Link>
            <Link href="/cart">
              <Button variant="goldOutline" size="lg" className="tracking-luxe">Consult Master Jeweller</Button>
            </Link>
          </div>

          <div className="pt-10 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-xl mx-auto text-left border-t border-white/10 mt-10">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gold-400 shrink-0" />
              <div>
                <p className="text-xs uppercase text-white font-medium font-mono">120+ Hours</p>
                <p className="text-[10px] text-luxury-muted">Per Bespoke Creation</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-gold-400 shrink-0" />
              <div>
                <p className="text-xs uppercase text-white font-medium font-mono">Hallmark Purity</p>
                <p className="text-[10px] text-luxury-muted">22K / 18K Certified Gold</p>
              </div>
            </div>
            <div className="flex items-center gap-3 col-span-2 md:col-span-1">
              <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0" />
              <div>
                <p className="text-xs uppercase text-white font-medium font-mono">Laser Inscribed</p>
                <p className="text-[10px] text-luxury-muted">GIA Micro-Registry</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 5. PATRON TESTIMONIALS SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-3"
        >
          <p className="text-xs uppercase tracking-editorial text-gold-400 font-semibold font-mono">
            Collector Accolades
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-white tracking-wide">
            Voices of Connoisseurs
          </h2>
          <div className="w-16 h-[1px] bg-gold-500/60 mx-auto" />
          <p className="text-xs sm:text-sm text-luxury-muted font-light leading-relaxed">
            Reflections from patrons who entrust their most cherished milestones to LUXORA Haute Joaillerie.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Devika Singhania",
              city: "Mumbai & London",
              role: "Patron & Collector",
              avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
              quote: "The Royal Bloom solitaire surpassed every expectation. The fire of the diamonds in natural daylight is breathtaking, and the bespoke vault packaging made unboxing feel like a royal ceremony.",
              piece: "Royal Bloom Solitaire Ring",
            },
            {
              name: "Maharaja Samarjit Singh",
              city: "Jaipur",
              role: "Heritage Connoisseur",
              avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
              quote: "Acquired the Kundan Choker for our family milestone. The Meenakari enamel on the reverse is true museum-grade lineage art. LUXORA is in an exquisite league of its own.",
              piece: "Heritage Kundan Choker Set",
            },
            {
              name: "Aanya Mehta Verma",
              city: "Dubai",
              role: "High Jewellery Patron",
              avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
              quote: "Ordering high jewellery online felt daunting until LUXORA's white-glove armored courier arrived with full gemological dossiers. Truly peerless craftsmanship and discreet elegance.",
              piece: "Diamond Tennis Bracelet",
            },
          ].map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="p-8 bg-card/60 backdrop-blur-sm border border-luxury-border hover:border-gold-500/50 transition-colors duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-gold-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center gap-3.5">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-gold-400/40 shrink-0">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif text-sm text-white font-normal">{t.name}</h4>
                  <p className="text-[10px] text-luxury-muted uppercase tracking-wider">
                    {t.city} &bull; <span className="text-gold-300/80">{t.piece}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
