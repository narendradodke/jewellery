"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Sparkles, Gem, ShieldCheck, Clock, Award } from "lucide-react";
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
      <section className="relative min-h-[90vh] lg:min-h-[92vh] flex items-center justify-start overflow-hidden">
        {/* Background Images Crossfade Slideshow */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {heroImages.map((src, index) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
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
          ))}

          {/* Dark gradient overlay on top of all images for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/40 z-10" />
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
                  ? "w-8 bg-gold-400"
                  : "w-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="max-w-2xl space-y-6"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-gold-500/30 backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-[11px] uppercase tracking-widest text-gold-300 font-medium">
                High Jewellery 2026 Collection
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal text-white leading-[1.15] tracking-wide"
            >
              More Than Just Jewellery, <br />
              <span className="italic font-light text-gold-300">It&apos;s a Feeling</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-sm sm:text-base text-gray-300 font-light max-w-xl leading-relaxed"
            >
              Immerse yourself in our haute joaillerie collections, meticulously sculpted with certified natural diamonds, 22K pure gold, and royal gemstones.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <Link href="/shop">
                <Button size="lg" className="w-full sm:w-auto">
                  <span>Explore Collections</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/shop?category=bridal">
                <Button variant="goldOutline" size="lg" className="w-full sm:w-auto">
                  <span>The Bridal Atelier</span>
                </Button>
              </Link>
            </motion.div>

            {/* Quick Metrics */}
            <motion.div
              variants={fadeUp}
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
          </motion.div>
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
          <p className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold font-mono">
            Handcrafted Masterpieces
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-wide">
            Our Signature Collections
          </h2>
          <div className="w-16 h-[1px] bg-gold-500/60 mx-auto" />
          <p className="text-xs sm:text-sm text-luxury-muted font-light leading-relaxed">
            From modern solitaire brilliance to ancient royal heritage, discover high jewellery tailored to define your legacy.
          </p>
        </motion.div>

        {/* 5 Collections Grid with Stagger */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
        >
          {COLLECTIONS.map((col) => (
            <motion.div key={col.id} variants={fadeUp}>
              <Link
                href={`/shop?category=${col.category}`}
                className="group relative h-96 overflow-hidden border border-luxury-border hover:border-gold-500/60 transition-all duration-500 bg-card block"
              >
                <Image
                  src={col.image}
                  alt={col.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  loading="lazy"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300" />

                <div className="absolute inset-0 p-5 flex flex-col justify-end text-center items-center">
                  <span className="text-[10px] uppercase tracking-widest text-gold-400 mb-1">
                    {col.itemCount} Designs
                  </span>
                  <h3 className="font-serif text-xl text-white tracking-wider group-hover:text-gold-300 transition-colors">
                    {col.title}
                  </h3>
                  <p className="text-[11px] text-gray-300 font-light mt-1 line-clamp-2 max-w-[200px] opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {col.description}
                  </p>
                  <div className="mt-3 inline-flex items-center text-[10px] uppercase tracking-widest font-semibold text-gold-400 gap-1 border-b border-gold-500/40 pb-0.5">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* EDITORIAL: SHOP THE LOOK */}
      <ShopTheLook />

      {/* 3. NEW ARRIVALS SECTION */}
      <section className="py-20 bg-[#0E0E0E] border-y border-luxury-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold font-mono">
                The New Season
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-wide mt-1">
                New Arrivals
              </h2>
            </div>
            <Link href="/shop">
              <Button variant="goldOutline" size="sm">
                <span>View Full Catalogue</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {newArrivalProducts.map((product) => (
              <motion.div key={product.id} variants={fadeUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. "CRAFTED BY HANDS" CRAFTSMANSHIP BANNER */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative py-28 overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={IMAGE_ASSETS.craftedByHands.url}
            alt={IMAGE_ASSETS.craftedByHands.alt}
            fill
            sizes="100vw"
            loading="lazy"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/85 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex p-3 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 mb-2">
            <Gem className="w-6 h-6 animate-pulse-slow" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-wide leading-tight">
            Crafted by Hands, <br />
            <span className="italic text-gold-300 font-light">Perfected by Tradition</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
            Every LUXORA jewel undergoes more than 120 hours of precision hand-carving by hereditary master artisans. Using age-old Nakshi, Jadau, and micro-pavé methods, we marry timeless lineage with contemporary haute aesthetics.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link href="/shop">
              <Button size="lg">Explore Craftsmanship</Button>
            </Link>
            <Link href="/cart">
              <Button variant="outline" size="lg">Consult Master Jeweller</Button>
            </Link>
          </div>

          <div className="pt-8 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-xl mx-auto text-left border-t border-white/10 mt-8">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gold-400 shrink-0" />
              <div>
                <p className="text-xs uppercase text-white font-medium">120+ Hours</p>
                <p className="text-[10px] text-luxury-muted">Per Bespoke Creation</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-gold-400 shrink-0" />
              <div>
                <p className="text-xs uppercase text-white font-medium">Hallmark Purity</p>
                <p className="text-[10px] text-luxury-muted">22K / 18K Certified Gold</p>
              </div>
            </div>
            <div className="flex items-center gap-3 col-span-2 md:col-span-1">
              <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0" />
              <div>
                <p className="text-xs uppercase text-white font-medium">Laser Inscribed</p>
                <p className="text-[10px] text-luxury-muted">GIA Micro-Registry</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
