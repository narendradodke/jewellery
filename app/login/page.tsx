"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Lock, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
      } else {
        router.push("/shop");
      }
    } catch {
      setError("An unexpected network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-20 text-white">
      <div className="max-w-md w-full bg-card border border-luxury-border p-8 sm:p-10 space-y-8 shadow-dark-card">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-[10px] uppercase tracking-widest font-mono">
            <Sparkles className="w-3 h-3" />
            <span>Private Patron Salon</span>
          </div>
          <h1 className="text-3xl font-serif tracking-wide text-white">
            Welcome to LUXORA
          </h1>
          <p className="text-xs text-luxury-muted font-light">
            Sign in to access your bespoke orders and saved heirlooms.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-950/40 border border-red-500/40 text-red-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-luxury-muted mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-luxury-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="patron@luxora.com"
                className="w-full bg-[#111111] border border-luxury-border py-2.5 pl-10 pr-3 text-xs text-white placeholder-luxury-subtle focus:outline-none focus:border-gold-500/60"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-luxury-muted mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-luxury-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#111111] border border-luxury-border py-2.5 pl-10 pr-3 text-xs text-white placeholder-luxury-subtle focus:outline-none focus:border-gold-500/60"
              />
            </div>
          </div>

          <Button type="submit" size="lg" isLoading={loading} className="w-full">
            <span>Enter Patron Salon</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>

        <div className="text-center pt-2 border-t border-white/5 text-xs text-luxury-muted">
          <span>New to LUXORA? </span>
          <Link href="/register" className="text-gold-400 hover:text-gold-300 underline">
            Request an Atelier Membership
          </Link>
        </div>
      </div>
    </main>
  );
}
