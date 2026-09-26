"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  UploadCloud,
  CheckCircle2,
  Calendar,
  Gem,
  Award,
  Clock,
  ArrowRight,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function BespokePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jewelleryType: "Solitaire Engagement Ring",
    metal: "18K White Gold",
    budgetRange: "₹5,00,000 - ₹15,00,000",
    consultationMode: "Flagship Salon (Altamount Road, South Mumbai)",
    description: "",
  });

  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [docketNumber, setDocketNumber] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setDocketNumber("BESPOKE-" + Math.floor(10000 + Math.random() * 90000));
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-background text-white pb-24">
      {/* 1. HERO HEADER */}
      <section className="relative bg-[#0E0E0E] border-b border-luxury-border py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-[10px] uppercase tracking-widest font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Private Commissions Atelier</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif text-white tracking-wide font-light">
            Bespoke <span className="italic font-normal text-gold-gradient">Haute Joaillerie</span>
          </h1>

          <p className="text-xs sm:text-sm text-luxury-muted font-light max-w-xl mx-auto leading-relaxed">
            Turn your most intimate fantasies into immortal heirlooms. Collaborate directly with LUXORA’s Master Gemologists and hereditary goldsmiths.
          </p>
        </div>
      </section>

      {/* 2. THE BESPOKE JOURNEY STEPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 bg-card border border-luxury-border space-y-2">
            <span className="font-mono text-gold-400 text-xs font-bold">01 / CONCEPT</span>
            <h3 className="font-serif text-base text-white">Private Consultation</h3>
            <p className="text-xs text-luxury-muted font-light leading-relaxed">
              Explore rare solitaires and heritage motifs with a dedicated private concierge.
            </p>
          </div>

          <div className="p-6 bg-card border border-luxury-border space-y-2">
            <span className="font-mono text-gold-400 text-xs font-bold">02 / DESIGN</span>
            <h3 className="font-serif text-base text-white">3D CAD & Wax Prototype</h3>
            <p className="text-xs text-luxury-muted font-light leading-relaxed">
              View photo-realistic gouache renders and test the physical wax prototype for fit.
            </p>
          </div>

          <div className="p-6 bg-card border border-luxury-border space-y-2">
            <span className="font-mono text-gold-400 text-xs font-bold">03 / ATELIER</span>
            <h3 className="font-serif text-base text-white">Artisanal Crafting</h3>
            <p className="text-xs text-luxury-muted font-light leading-relaxed">
              120+ hours of micro-pavé setting, hand-engraving, and hallmarking in 18K/22K gold.
            </p>
          </div>

          <div className="p-6 bg-card border border-luxury-border space-y-2">
            <span className="font-mono text-gold-400 text-xs font-bold">04 / REVEAL</span>
            <h3 className="font-serif text-base text-white">Armored Handover</h3>
            <p className="text-xs text-luxury-muted font-light leading-relaxed">
              White-glove presentation inside a lacquered mahogany keepsake case with GIA dossiers.
            </p>
          </div>
        </div>
      </section>

      {/* 3. COMMISSION INQUIRY FORM */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card border border-gold-500/40 p-6 sm:p-10 shadow-dark-card">
          {isSuccess ? (
            <div className="text-center space-y-6 py-8">
              <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <p className="text-xs font-mono text-gold-400 uppercase tracking-widest">
                  Commission Docket: {docketNumber}
                </p>
                <h2 className="text-2xl sm:text-3xl font-serif text-white">
                  Commission Inquiry Received
                </h2>
                <p className="text-xs sm:text-sm text-luxury-muted font-light max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white font-medium">{formData.name}</strong>. A LUXORA Senior Gemological Concierge will reach out within 24 hours to schedule your private design rendezvous.
                </p>
              </div>

              <div className="p-4 bg-black/50 border border-white/5 text-left text-xs font-mono space-y-1.5 max-w-md mx-auto">
                <div className="flex justify-between text-luxury-muted">
                  <span>Creation Type:</span>
                  <span className="text-white">{formData.jewelleryType}</span>
                </div>
                <div className="flex justify-between text-luxury-muted">
                  <span>Budget Tier:</span>
                  <span className="text-gold-400">{formData.budgetRange}</span>
                </div>
                <div className="flex justify-between text-luxury-muted">
                  <span>Consultation:</span>
                  <span className="text-white truncate max-w-[200px]">{formData.consultationMode}</span>
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-4">
                <Button size="lg" onClick={() => setIsSuccess(false)}>
                  Submit Another Inquiry
                </Button>
                <Link href="/shop">
                  <Button variant="outline" size="lg">
                    Browse Ready Collections
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h2 className="text-xl sm:text-2xl font-serif text-white">
                  Commission Your Masterpiece
                </h2>
                <p className="text-xs text-luxury-muted mt-1 font-light">
                  Please provide details about your envisioned creation. All inquiries are held in strict discretion.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-luxury-muted mb-1.5 font-medium">
                    Patron Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Lady / Sir Full Name"
                    className="w-full bg-[#111111] border border-luxury-border p-2.5 text-xs text-white placeholder-luxury-subtle focus:outline-none focus:border-gold-500/60"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-luxury-muted mb-1.5 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="patron@domain.com"
                    className="w-full bg-[#111111] border border-luxury-border p-2.5 text-xs text-white placeholder-luxury-subtle focus:outline-none focus:border-gold-500/60"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-luxury-muted mb-1.5 font-medium">
                    Mobile / WhatsApp Contact *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98000 12345"
                    className="w-full bg-[#111111] border border-luxury-border p-2.5 text-xs text-white placeholder-luxury-subtle focus:outline-none focus:border-gold-500/60"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-luxury-muted mb-1.5 font-medium">
                    Creation Category *
                  </label>
                  <select
                    value={formData.jewelleryType}
                    onChange={(e) => setFormData({ ...formData, jewelleryType: e.target.value })}
                    className="w-full bg-[#111111] border border-luxury-border p-2.5 text-xs text-white focus:outline-none focus:border-gold-500/60 cursor-pointer"
                  >
                    <option value="Solitaire Engagement Ring">Solitaire Engagement Ring</option>
                    <option value="Bespoke Bridal Suite">Bespoke Bridal Suite / Choker</option>
                    <option value="Heritage Nakshi & Jadau Necklace">Heritage Nakshi & Jadau Necklace</option>
                    <option value="High-Karat Gold Cuff / Bangle">High-Karat Gold Cuff / Bangle</option>
                    <option value="Natural Colored Gemstone Jewel">Natural Emerald / Ruby / Sapphire Suite</option>
                    <option value="Family Heirloom Redesign">Family Heirloom Redesign / Reset</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-luxury-muted mb-1.5 font-medium">
                    Metal Choice *
                  </label>
                  <select
                    value={formData.metal}
                    onChange={(e) => setFormData({ ...formData, metal: e.target.value })}
                    className="w-full bg-[#111111] border border-luxury-border p-2.5 text-xs text-white focus:outline-none focus:border-gold-500/60 cursor-pointer"
                  >
                    <option value="18K White Gold">18K White Gold</option>
                    <option value="22K Yellow Gold">22K Yellow Gold (Heritage)</option>
                    <option value="18K Yellow Gold">18K Yellow Gold</option>
                    <option value="18K Rose Gold">18K Rose Gold</option>
                    <option value="Platinum 950">Platinum 950</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-luxury-muted mb-1.5 font-medium">
                    Budget Tier *
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full bg-[#111111] border border-luxury-border p-2.5 text-xs text-white focus:outline-none focus:border-gold-500/60 cursor-pointer"
                  >
                    <option value="₹2,00,000 - ₹5,00,000">₹2,00,000 - ₹5,00,000</option>
                    <option value="₹5,00,000 - ₹15,00,000">₹5,00,000 - ₹15,00,000</option>
                    <option value="₹15,00,000 - ₹30,00,000">₹15,00,000 - ₹30,00,000</option>
                    <option value="₹30,00,000+">₹30,00,000+ (Haute Joaillerie Commission)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] uppercase tracking-wider text-luxury-muted mb-1.5 font-medium">
                    Preferred Rendezvous Mode *
                  </label>
                  <select
                    value={formData.consultationMode}
                    onChange={(e) => setFormData({ ...formData, consultationMode: e.target.value })}
                    className="w-full bg-[#111111] border border-luxury-border p-2.5 text-xs text-white focus:outline-none focus:border-gold-500/60 cursor-pointer"
                  >
                    <option value="Flagship Salon (Altamount Road, South Mumbai)">
                      Flagship Salon (Altamount Road, South Mumbai)
                    </option>
                    <option value="Private Atelier (DLF Emporio, New Delhi)">
                      Private Atelier (DLF Emporio, New Delhi)
                    </option>
                    <option value="Confidential Virtual Video Salon">
                      Confidential Virtual Video Salon (Global)
                    </option>
                  </select>
                </div>

                {/* Inspiration Image Upload UI */}
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="block text-[11px] uppercase tracking-wider text-luxury-muted font-medium">
                    Inspiration / Reference Image (Optional)
                  </label>
                  <div className="relative border-2 border-dashed border-luxury-border hover:border-gold-500/50 p-6 text-center bg-[#111111] transition-colors cursor-pointer group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <UploadCloud className="w-8 h-8 text-gold-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-xs text-white">
                      {selectedFileName ? (
                        <span className="text-gold-300 font-semibold flex items-center justify-center gap-1">
                          <FileText className="w-4 h-4" />
                          {selectedFileName}
                        </span>
                      ) : (
                        "Drag & drop your jewelry sketch or click to select"
                      )}
                    </p>
                    <p className="text-[10px] text-luxury-muted mt-1">
                      Supports JPG, PNG, WEBP, or PDF up to 25MB
                    </p>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] uppercase tracking-wider text-luxury-muted mb-1.5 font-medium">
                    Vision, Gemstone Preferences & Timeline
                  </label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your design aspirations, milestone date, diamond cut (emerald, cushion, oval), or family motifs..."
                    className="w-full bg-[#111111] border border-luxury-border p-3 text-xs text-white placeholder-luxury-subtle focus:outline-none focus:border-gold-500/60 leading-relaxed"
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <span>Submit Bespoke Commission Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <p className="text-[10px] text-center text-luxury-muted mt-2">
                  Complimentary 1-on-1 consultation &bull; Strict client privacy guaranteed
                </p>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
