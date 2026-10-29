"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Mail, Shield, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-ivory items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-10 w-10 rounded-xl bg-sage-100 flex items-center justify-center">
              <Lock className="h-5 w-5 text-sage-700" />
            </div>
            <span className="font-bold text-sage-800 text-xl">Admin</span>
          </div>
          <h2 className="text-2xl font-bold text-sage-900">Admin login</h2>
          <p className="text-sage-600 mt-2">
            Manage your Twinkle Toe Love baby studio bookings.
          </p>
        </div>

        <div className="rounded-xl border border-sage-200 bg-white p-8 shadow-sm">
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-sage-700 flex items-center gap-2">
                <Mail className="h-4 w-4" /> Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="px-4 py-3 rounded-lg border border-sage-200 bg-white text-sage-900 focus:ring-2 focus:ring-sage-500 focus:border-sage-500 outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-sage-700 flex items-center gap-2">
                <Lock className="h-4 w-4" /> Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="px-4 py-3 rounded-lg border border-sage-200 bg-white text-sage-900 focus:ring-2 focus:ring-sage-500 focus:border-sage-500 outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-sage-700 text-white font-semibold hover:bg-sage-600 transition-colors disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </form>
        </div>

        <p className="mt-6 text-sm text-sage-500 text-center">
          First time? Use the seeded admin credentials from your environment
          setup (ADMIN_SEED_EMAIL / ADMIN_SEED_PASSWORD).
        </p>
      </div>

      <div className="absolute bottom-4 left-4 text-xs text-sage-400">
        Twinkle Toe Love • Admin area • Test mode
      </div>
    </div>
  );
}
