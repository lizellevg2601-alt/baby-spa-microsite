"use client";

import { useState } from "react";
import { Heart, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WaitlistFormProps {
  className?: string;
}

export function WaitlistForm({ className }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, marketingConsent: true }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Failed to join waitlist. Please try again.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Failed to join waitlist. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className={cn("flex flex-col items-center gap-3 text-center", className)}>
        <div className="flex items-center justify-center rounded-full bg-mint-100 p-3 text-mint-700">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h4 className="font-serif font-semibold text-forest-green text-sm">You&rsquo;re on the waitlist</h4>
        <p className="text-xs text-sage-600 leading-5">
          We&rsquo;ll be in touch when bookings open.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-3", className)}>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-body font-semibold text-sage uppercase tracking-wider">
          Email address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="px-4 py-3 rounded-xl border border-pale-sage bg-white text-charcoal-900 focus:border-forest-green focus:ring-2 focus:ring-forest-green/10 outline-none transition-colors"
          required
          disabled={status === "submitting"}
        />
      </div>
      <Button
        type="submit"
        variant="forest"
        className="w-full"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Adding you…" : <><Heart className="h-4 w-4 mr-2" />Join the waitlist</>}
      </Button>
      {errorMessage && (
        <p className="text-xs text-rose-pink-dark leading-5">{errorMessage}</p>
      )}
    </form>
  );
}
