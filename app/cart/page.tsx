"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Building,
  QrCode,
  Truck,
  CheckCircle2,
  Tag,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { PaymentMethod } from "@/types";

export default function CartAndCheckoutPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCartStore();

  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Maharashtra",
    postalCode: "",
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const subtotal = isMounted ? getTotalPrice() : 0;
  const tax = subtotal > 0 ? Math.round(subtotal * 0.03) : 0; // 3% GST on jewellery
  const shipping = 0; // Free luxury insured delivery
  const total = Math.max(0, subtotal + tax - appliedDiscount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "LUXORA10") {
      const discount = Math.round(subtotal * 0.1);
      setAppliedDiscount(discount);
      setPromoMessage("LUXORA10 applied: 10% Royal Privilege Discount");
    } else if (promoCode.trim().toUpperCase() === "GOLDEN") {
      setAppliedDiscount(15000);
      setPromoMessage("GOLDEN applied: ₹15,000 Atelier Credit");
    } else {
      setPromoMessage("Invalid privilege voucher code");
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsOrdering(true);
    setTimeout(() => {
      setIsOrdering(false);
      setOrderId("LX-" + Math.floor(100000 + Math.random() * 900000));
      setOrderComplete(true);
      clearCart();
    }, 1500);
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-gold-400">
        <span className="font-serif">Loading your cart...</span>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4 py-20 text-white">
        <div className="max-w-md w-full bg-card border border-gold-500/40 p-8 text-center space-y-6 shadow-gold-md">
          <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-widest text-gold-400 font-mono">
              Order Confirmed &bull; {orderId}
            </p>
            <h1 className="text-3xl font-serif">Thank You for Your Patronage</h1>
            <p className="text-xs text-luxury-muted font-light leading-relaxed">
              Your bespoke creation is being secured for insured armored delivery. A personal concierge has been assigned to your order.
            </p>
          </div>

          <div className="p-4 bg-black/40 border border-white/5 text-left text-xs space-y-2 font-mono">
            <div className="flex justify-between text-luxury-muted">
              <span>Payment Mode:</span>
              <span className="text-white uppercase">{paymentMethod}</span>
            </div>
            <div className="flex justify-between text-luxury-muted">
              <span>Transit Insurance:</span>
              <span className="text-gold-400">Active (100% Value)</span>
            </div>
          </div>

          <Link href="/shop" className="block">
            <Button size="lg" className="w-full">
              Continue Exploring Jewels
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4 py-20 text-white">
        <div className="max-w-md text-center space-y-6">
          <p className="text-[11px] uppercase tracking-widest text-gold-400 font-mono">
            Your Jewellery Trunk
          </p>
          <h1 className="text-3xl sm:text-4xl font-serif">Your Bag is Empty</h1>
          <p className="text-xs text-luxury-muted font-light leading-relaxed">
            You have not selected any jewels yet. Explore our handcrafted diamond rings, 22K gold necklaces, and heritage bridal sets.
          </p>
          <Link href="/shop" className="inline-block">
            <Button size="lg">
              <span>Discover Collections</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-white pb-24">
      {/* Header Banner */}
      <section className="bg-[#0E0E0E] border-b border-luxury-border py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center md:text-left space-y-1">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold-400 font-mono">
            Checkout & Atelier Order
          </p>
          <h1 className="text-3xl sm:text-4xl font-serif text-white">
            Your Shopping Bag & Checkout
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT: Items List & Shipping Address (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Items List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h2 className="text-sm uppercase tracking-widest text-gold-300 font-semibold">
                  Bag Items ({items.length})
                </h2>
                <button
                  onClick={clearCart}
                  className="text-[11px] text-luxury-muted hover:text-red-400 transition-colors uppercase tracking-wider"
                >
                  Clear Bag
                </button>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="p-4 bg-card border border-luxury-border flex gap-4 items-center justify-between"
                  >
                    <div className="relative w-20 h-20 bg-luxury-charcoal shrink-0 border border-white/5">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <Link
                        href={`/product/${item.product.id}`}
                        className="font-serif text-sm text-white hover:text-gold-300 transition-colors line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-[11px] text-luxury-muted font-mono">
                        {item.product.metal} &bull; Size: {item.selectedSize || "Standard"}
                      </p>
                      <p className="text-xs text-gold-400 font-semibold">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-luxury-border bg-black/40">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 text-luxury-muted hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 text-luxury-muted hover:text-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-2 text-luxury-muted hover:text-red-400 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Shipping Address Form */}
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-6 pt-6 border-t border-white/10">
              <h2 className="text-sm uppercase tracking-widest text-gold-300 font-semibold">
                White-Glove Delivery Address
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-luxury-muted mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Lady / Sir Full Name"
                    className="w-full bg-card border border-luxury-border p-2.5 text-xs text-white placeholder-luxury-subtle focus:outline-none focus:border-gold-500/60"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-luxury-muted mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="concierge@luxora.com"
                    className="w-full bg-card border border-luxury-border p-2.5 text-xs text-white placeholder-luxury-subtle focus:outline-none focus:border-gold-500/60"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-luxury-muted mb-1.5">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98000 12345"
                    className="w-full bg-card border border-luxury-border p-2.5 text-xs text-white placeholder-luxury-subtle focus:outline-none focus:border-gold-500/60"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-luxury-muted mb-1.5">
                    Postal PIN Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    placeholder="400026"
                    className="w-full bg-card border border-luxury-border p-2.5 text-xs text-white placeholder-luxury-subtle focus:outline-none focus:border-gold-500/60"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] uppercase tracking-wider text-luxury-muted mb-1.5">
                    Street Address / Residence / Estate *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Bungalow 4, Malabar Hill"
                    className="w-full bg-card border border-luxury-border p-2.5 text-xs text-white placeholder-luxury-subtle focus:outline-none focus:border-gold-500/60"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-luxury-muted mb-1.5">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Mumbai"
                    className="w-full bg-card border border-luxury-border p-2.5 text-xs text-white placeholder-luxury-subtle focus:outline-none focus:border-gold-500/60"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-luxury-muted mb-1.5">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="Maharashtra"
                    className="w-full bg-card border border-luxury-border p-2.5 text-xs text-white placeholder-luxury-subtle focus:outline-none focus:border-gold-500/60"
                  />
                </div>
              </div>

              {/* 3. Payment Method Selection */}
              <div className="pt-6 space-y-4">
                <h2 className="text-sm uppercase tracking-widest text-gold-300 font-semibold">
                  Select Secure Payment Method
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`p-3.5 border flex items-center gap-3 cursor-pointer transition-all ${
                      paymentMethod === "upi"
                        ? "border-gold-400 bg-gold-500/10 text-white"
                        : "border-luxury-border bg-card text-gray-300 hover:border-gold-500/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                      className="accent-gold-500"
                    />
                    <QrCode className="w-4 h-4 text-gold-400" />
                    <div>
                      <p className="text-xs font-semibold">Instant UPI / QR</p>
                      <p className="text-[10px] text-luxury-muted">GPay, PhonePe, Paytm</p>
                    </div>
                  </label>

                  <label
                    className={`p-3.5 border flex items-center gap-3 cursor-pointer transition-all ${
                      paymentMethod === "card"
                        ? "border-gold-400 bg-gold-500/10 text-white"
                        : "border-luxury-border bg-card text-gray-300 hover:border-gold-500/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="accent-gold-500"
                    />
                    <CreditCard className="w-4 h-4 text-gold-400" />
                    <div>
                      <p className="text-xs font-semibold">Credit / Debit Card</p>
                      <p className="text-[10px] text-luxury-muted">Amex, Visa, Mastercard</p>
                    </div>
                  </label>

                  <label
                    className={`p-3.5 border flex items-center gap-3 cursor-pointer transition-all ${
                      paymentMethod === "netbanking"
                        ? "border-gold-400 bg-gold-500/10 text-white"
                        : "border-luxury-border bg-card text-gray-300 hover:border-gold-500/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "netbanking"}
                      onChange={() => setPaymentMethod("netbanking")}
                      className="accent-gold-500"
                    />
                    <Building className="w-4 h-4 text-gold-400" />
                    <div>
                      <p className="text-xs font-semibold">Net Banking</p>
                      <p className="text-[10px] text-luxury-muted">HDFC, ICICI, SBI, Axis</p>
                    </div>
                  </label>

                  <label
                    className={`p-3.5 border flex items-center gap-3 cursor-pointer transition-all ${
                      paymentMethod === "cod"
                        ? "border-gold-400 bg-gold-500/10 text-white"
                        : "border-luxury-border bg-card text-gray-300 hover:border-gold-500/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="accent-gold-500"
                    />
                    <Truck className="w-4 h-4 text-gold-400" />
                    <div>
                      <p className="text-xs font-semibold">Concierge Handover</p>
                      <p className="text-[10px] text-luxury-muted">Pay on Armored Delivery</p>
                    </div>
                  </label>
                </div>
              </div>
            </form>
          </div>

          {/* RIGHT: Order Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-card border border-luxury-border space-y-6 shadow-dark-card sticky top-24">
              <h2 className="text-sm uppercase tracking-widest text-gold-300 font-semibold pb-3 border-b border-white/10">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-gray-300">
                  <span>Jewellery GST (3%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>

                <div className="flex justify-between text-gray-300">
                  <span>Armored Insured Delivery</span>
                  <span className="text-gold-400 uppercase font-semibold">Complimentary</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-green-400 font-medium">
                    <span>Privilege Voucher</span>
                    <span>-{formatPrice(appliedDiscount)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-white/10 flex justify-between items-baseline text-base font-serif">
                  <span className="text-white">Total Amount</span>
                  <span className="text-2xl font-bold text-gold-300">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-2 pt-2">
                <label className="text-[11px] uppercase tracking-wider text-luxury-muted flex items-center gap-1.5">
                  <Tag className="w-3 h-3 text-gold-400" />
                  <span>Privilege Voucher Code</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Try 'LUXORA10' or 'GOLDEN'"
                    className="flex-1 bg-black/50 border border-luxury-border px-3 py-2 text-xs uppercase text-white placeholder-luxury-subtle focus:outline-none focus:border-gold-500/60"
                  />
                  <Button type="submit" variant="secondary" size="sm">
                    Apply
                  </Button>
                </div>
                {promoMessage && (
                  <p
                    className={`text-[11px] ${
                      appliedDiscount > 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {promoMessage}
                  </p>
                )}
              </form>

              {/* Checkout Submit CTA */}
              <div className="pt-4 space-y-3">
                <Button
                  type="submit"
                  form="checkout-form"
                  size="lg"
                  isLoading={isOrdering}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <span>Complete Secure Order</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>

                <p className="text-[10px] text-center text-luxury-muted flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                  <span>256-bit Encrypted Luxury Payment Gateway</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
