"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ArrowRight, AlertTriangle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    id: "little-explorers-sensory",
    name: "Little Explorers Sensory",
    pricePence: 1800,
    durationMin: 45,
    ageBand: "3–12 months",
    description: "Guided sensory discovery with age-appropriate textures, sounds, colours and calm exploration.",
  },
  {
    id: "touch-and-togetherness",
    name: "Touch & Togetherness",
    pricePence: 2500,
    durationMin: 45,
    ageBand: "6 weeks–12 months",
    description: "Parent-led baby massage, bonding and calming routines, facilitated by a qualified instructor.",
  },
  {
    id: "wonder-and-wiggle",
    name: "Wonder & Wiggle",
    pricePence: 2200,
    durationMin: 45,
    ageBand: "3–18 months",
    description: "Gentle movement, tummy-time style activity where appropriate and sensory exploration.",
  },
];

type Step = "service" | "date" | "slot" | "details" | "review";

interface Slot {
  id: string | null;
  startDateTime: string;
  endDateTime: string;
  capacity: number;
  availableSpaces: number;
  isBlocked: boolean;
  blockReason: string | null;
  isAvailable: boolean;
}

export default function BookingPage() {
  const [bookingsEnabled, setBookingsEnabled] = useState<boolean | null>(null);
  const [step, setStep] = useState<Step>("service");
  const [service, setService] = useState<typeof SERVICES[number] | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [pairsCount, setPairsCount] = useState(1);
  const [guardianName, setGuardianName] = useState("");
  const [guardianEmail, setGuardianEmail] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [babyAgeMonths, setBabyAgeMonths] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookingReference, setBookingReference] = useState("");
  const [checkoutUrl, setCheckoutUrl] = useState("");

  useEffect(() => {
    fetch("/api/admin/config")
      .then((r) => r.json())
      .then((data) => {
        setBookingsEnabled(!!data.config?.bookingsEnabled);
      })
      .catch(() => setBookingsEnabled(false));
  }, []);

  if (bookingsEnabled === false) {
    return (
      <div className="flex flex-col min-h-screen bg-ivory" id="main-content">
        <div className="px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sage-100 text-forest-green text-xs font-body font-semibold uppercase tracking-widest mb-6">
              <span className="relative -top-[1px] h-1 w-1 rounded-full bg-rose-pink"></span>
              Bookings opening soon
            </div>
            <Heart className="h-12 w-12 text-rose-pink mb-6" />
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-forest-green leading-tight mb-6">
              Bookings not yet open
            </h1>
            <p className="text-lg text-sage-600 mb-10 max-w-xl mx-auto leading-7">
              We&rsquo;re finalising the studio and all local approvals. Join
              the waitlist to be the first to hear when bookings launch.
            </p>
            <Button
              asChild
              variant="forest"
              size="lg"
              className="w-full md:w-auto"
            >
              <a href="/contact">
                <Heart size={18} className="mr-2" /> Join the waitlist
              </a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (bookingsEnabled === null) {
    return (
      <div className="flex flex-col min-h-screen bg-ivory" id="main-content">
        <div className="px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-md mx-auto text-center">
            <p className="text-sage-600">Loading&hellip;</p>
          </div>
        </div>
      </div>
    );
  }

  const minDate = useCallback(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, []);

  const loadSlots = useCallback(async (dateStr: string) => {
    setError("");
    try {
      const res = await fetch(
        `/api/booking/slots?serviceId=${service!.id}&date=${encodeURIComponent(dateStr)}`,
        { cache: "no-store" },
      );
      if (!res.ok) throw new Error("Failed to load slots");
      const data = await res.json();
      setSlots(data.slots || []);
    } catch (err) {
      setError("Unable to load available times. Please try again.");
      console.error(err);
    }
  }, [service?.id]);

  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service || !selectedSlot) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: service.id,
          slotId: selectedSlot.id!,
          pairsCount,
          guardianName,
          guardianEmail,
          guardianPhone: guardianPhone || undefined,
          babyAgeMonths: babyAgeMonths ? parseInt(babyAgeMonths) : undefined,
          marketingConsent,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Booking failed. Please try again.");
        setLoading(false);
        return;
      }

      setBookingReference(data.bookingReference);
      setCheckoutUrl(data.checkoutUrl);
      setStep("review");
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
      console.error(err);
    }
  };

  const proceedToCheckout = () => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  };

  const totalPrice = service && selectedSlot
    ? (service.pricePence * pairsCount) / 100
    : 0;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (iso: string) => {
    return new Date(iso).toLocaleTimeString("en-GB", {
      timeZone: "Europe/London",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-ivory">
      <div className="border-b border-sage-100 bg-white">
        <div className="px-4 md:px-8 py-3 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-medium text-sage-500 uppercase tracking-wider">
            {["service", "date", "slot", "details", "review"].map((s, i) => {
              const active = step === s;
              const completed =
                ["service", "date", "slot", "details"].indexOf(step) >
                ["service", "date", "slot", "details"].indexOf(s);
              return (
                <div key={s} className="flex items-center gap-2">
                  {i > 0 && <span className="text-sage-200">/</span>}
                  <span
                    className={cn(
                      "px-2 py-1 rounded-md font-semibold",
                      active
                        ? "bg-sage-700 text-white"
                        : "text-sage-500",
                      completed ? "text-sage-700" : "",
                    )}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 md:px-8 max-w-5xl mx-auto py-8">
        {step === "service" && (
          <ServiceSelectionStep onSelect={setService} />
        )}
        {step === "date" && service && (
          <DateSelectionStep
            service={service}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            minDate={minDate()}
            onBack={() => setStep("service")}
            onNext={() => setStep("slot")}
          />
        )}
        {step === "slot" && service && selectedDate && (
          <SlotSelectionStep
            service={service}
            date={selectedDate}
            slots={slots}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
            onLoadSlots={loadSlots}
            onBack={() => setStep("date")}
            onSelectSlot={(slot: Slot) => {
              setSelectedSlot(slot);
              setStep("details");
            }}
            formatTime={formatTime}
            error={error}
          />
        )}
        {step === "details" && service && selectedSlot && (
          <DetailsStep
            service={service}
            slot={selectedSlot}
            date={selectedDate}
            pairsCount={pairsCount}
            setPairsCount={setPairsCount}
            guardianName={guardianName}
            setGuardianName={setGuardianName}
            guardianEmail={guardianEmail}
            setGuardianEmail={setGuardianEmail}
            guardianPhone={guardianPhone}
            setGuardianPhone={setGuardianPhone}
            babyAgeMonths={babyAgeMonths}
            setBabyAgeMonths={setBabyAgeMonths}
            marketingConsent={marketingConsent}
            setMarketingConsent={setMarketingConsent}
            onBack={() => setStep("slot")}
            onNext={handleCreateBooking}
            loading={loading}
            error={error}
            formatTime={formatTime}
          />
        )}
        {step === "review" && (
          <ReviewStep
            service={service!}
            slot={selectedSlot!}
            date={selectedDate}
            pairsCount={pairsCount}
            guardianName={guardianName}
            totalPrice={totalPrice}
            bookingReference={bookingReference}
            onBack={() => setStep("details")}
            onProceed={proceedToCheckout}
            formatTime={formatTime}
          />
        )}
      </div>
    </div>
  );
}

function ServiceSelectionStep({ onSelect }: { onSelect: (s: typeof SERVICES[number]) => void }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-sage-900 mb-2">Choose an experience</h2>
        <p className="text-sage-600">Select the session you'd like to book for you and your baby.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {SERVICES.map((svc) => (
          <button
            key={svc.id}
            onClick={() => onSelect(svc)}
            className="flex flex-col items-center justify-between rounded-xl border-2 border-sage-200 bg-white p-6 text-center hover:border-sage-700 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-sage-50 flex items-center justify-center text-sage-700 mb-3">
              <span className="text-2xl">
                {svc.id === "little-explorers-sensory" ? "🌈"
                : svc.id === "touch-and-togetherness" ? "💕"
                : "🤸"}
              </span>
            </div>
            <h3 className="font-bold text-sage-800 text-lg mb-2">{svc.name}</h3>
            <p className="text-sm text-sage-600 mb-4 flex-1 leading-relaxed">{svc.description}</p>
            <div className="space-y-1">
              <span className="text-xl font-bold text-sage-900">£{(svc.pricePence / 100).toFixed(2)}</span>
              <span className="text-xs text-sage-500 uppercase tracking-wider">per parent-and-baby pair</span>
              <span className="text-xs text-sage-500">{svc.durationMin} minutes</span>
              <span className="text-xs text-sage-500">{svc.ageBand}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="p-4 rounded-lg bg-blush-50 border border-blush-100 text-sm text-blush-700">
        <span className="font-bold">⚠️ Draft pricing:</span> Prices shown are illustrative samples. Final pricing and availability will be confirmed before bookings open.
      </div>
    </div>
  );
}

function DateSelectionStep({
  service,
  selectedDate,
  setSelectedDate,
  minDate,
  onBack,
  onNext,
}: {
  service: typeof SERVICES[number];
  selectedDate: string;
  setSelectedDate: (d: string) => void;
  minDate: string;
  onBack: () => void;
  onNext: () => void;
}) {
  const [dateError, setDateError] = useState("");

  const handleNext = () => {
    if (!selectedDate) {
      setDateError("Please select a date");
      return;
    }
    const selected = new Date(selectedDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected <= today) {
      setDateError("Please select a date starting from tomorrow");
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-sage-900 mb-2">Choose a date</h2>
        <p className="text-sage-600">When would you like to attend {service.name}?</p>
      </div>

      <div className="flex flex-col gap-4">
        <label className="text-sm font-semibold text-sage-700">Date</label>
        <input
          type="date"
          min={minDate}
          value={selectedDate}
          onChange={(e) => {
            setDateError("");
            setSelectedDate(e.target.value);
          }}
          className="px-4 py-3 rounded-lg border border-sage-200 bg-white text-sage-900 focus:ring-2 focus:ring-sage-500 focus:border-sage-500 outline-none"
        />
        {dateError && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" /> {dateError}
          </p>
        )}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <Button onClick={handleNext}>
          Continue <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

function SlotSelectionStep({
  service,
  date,
  slots,
  selectedSlot,
  setSelectedSlot,
  onLoadSlots,
  onBack,
  onSelectSlot,
  formatTime,
  error,
}: {
  service: typeof SERVICES[number];
  date: string;
  slots: Slot[];
  selectedSlot: Slot | null;
  setSelectedSlot: (s: Slot | null) => void;
  onLoadSlots: (d: string) => void;
  onBack: () => void;
  onSelectSlot: (slot: Slot) => void;
  formatTime: (iso: string) => string;
  error: string;
}) {
  useEffect(() => {
    onLoadSlots(date);
  }, [date, onLoadSlots]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-sage-900 mb-2">Choose a time</h2>
        <p className="text-sage-600">Select an available timeslot for {service.name} on {formatDateStr(date)}.</p>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-100 text-sm text-red-700 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" /> {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-3">
        {slots.length === 0 ? (
          <div className="col-span-2 text-center py-10">
            <p className="text-sage-600">Loading available timeslots…</p>
          </div>
        ) : (
          slots.map((slot) => {
            const isSelected =
              selectedSlot?.id === slot.id ||
              (selectedSlot?.startDateTime === slot.startDateTime && !slot.id);
            return (
              <button
                key={slot.startDateTime}
                onClick={() => onSelectSlot(slot)}
                disabled={!slot.isAvailable}
                className={cn(
                  "flex flex-col items-start justify-between rounded-xl border p-4 text-left transition-all",
                  !slot.isAvailable
                    ? "border-sage-100 bg-sage-50 text-sage-400 cursor-not-allowed"
                    : isSelected
                      ? "border-sage-700 bg-sage-50 text-sage-900 shadow-sm ring-1 ring-sage-700"
                      : "border-sage-200 bg-white text-sage-700 hover:border-sage-300 hover:bg-sage-50",
                )}
              >
                <div>
                  <span className="text-sm font-semibold text-sage-800">
                    {formatTime(slot.startDateTime)}
                  </span>
                  <br />
                  <span className="text-xs text-sage-500">
                    {formatTime(slot.endDateTime)}
                  </span>
                </div>
                <div className="flex items-end gap-1 mt-2">
                  <span className="text-xs font-semibold {slot.isAvailable ? 'text-sage-700' : 'text-sage-400'}">
                    {slot.availableSpaces} of {slot.capacity} spaces
                  </span>
                  {!slot.isAvailable && (
                    <span className="text-xs text-sage-400">Full</span>
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="h-4 w-4 mr-2" /> Back
        </Button>
      </div>
    </div>
  );
}

function formatDateStr(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function DetailsStep({
  service,
  slot,
  date,
  pairsCount,
  setPairsCount,
  guardianName,
  setGuardianName,
  guardianEmail,
  setGuardianEmail,
  guardianPhone,
  setGuardianPhone,
  babyAgeMonths,
  setBabyAgeMonths,
  marketingConsent,
  setMarketingConsent,
  onBack,
  onNext,
  loading,
  error,
  formatTime,
}: {
  service: typeof SERVICES[number];
  slot: Slot;
  date: string;
  pairsCount: number;
  setPairsCount: (n: number) => void;
  guardianName: string;
  setGuardianName: (v: string) => void;
  guardianEmail: string;
  setGuardianEmail: (v: string) => void;
  guardianPhone: string;
  setGuardianPhone: (v: string) => void;
  babyAgeMonths: string;
  setBabyAgeMonths: (v: string) => void;
  marketingConsent: boolean;
  setMarketingConsent: (v: boolean) => void;
  onBack: () => void;
  onNext: (e: React.FormEvent) => void;
  loading: boolean;
  error: string;
  formatTime: (iso: string) => string;
}) {
  const totalPrice = (service.pricePence * pairsCount) / 100;

  return (
    <form onSubmit={onNext} className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-sage-900 mb-2">Your details</h2>
        <p className="text-sage-600">Please enter your contact information so we can confirm your booking.</p>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-100 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-sage-700">Guardian full name *</label>
          <input
            type="text"
            value={guardianName}
            onChange={(e) => setGuardianName(e.target.value)}
            placeholder="e.g. Sarah Johnson"
            className="px-4 py-3 rounded-lg border border-sage-200 bg-white text-sage-900 focus:ring-2 focus:ring-sage-500 focus:border-sage-500 outline-none"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-sage-700">Email address *</label>
          <input
            type="email"
            value={guardianEmail}
            onChange={(e) => setGuardianEmail(e.target.value)}
            placeholder="e.g. sarah@example.com"
            className="px-4 py-3 rounded-lg border border-sage-200 bg-white text-sage-900 focus:ring-2 focus:ring-sage-500 focus:border-sage-500 outline-none"
            required
          />
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-semibold text-sage-700">Phone number (optional)</label>
          <input
            type="tel"
            value={guardianPhone}
            onChange={(e) => setGuardianPhone(e.target.value)}
            placeholder="e.g. 07700 900000"
            className="px-4 py-3 rounded-lg border border-sage-200 bg-white text-sage-900 focus:ring-2 focus:ring-sage-500 focus:border-sage-500 outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-start gap-3">
          <input
            type="number"
            min="1"
            max="4"
            value={pairsCount}
            onChange={(e) => {
              const v = parseInt(e.target.value) || 1;
              setPairsCount(Math.min(Math.max(v, 1), 4));
            }}
            className="w-12 px-4 py-3 rounded-lg border border-sage-200 bg-white text-sage-900 focus:ring-2 focus:ring-sage-500 outline-none"
          />
          <label className="text-sm font-semibold text-sage-700 self-center">
            Parent-and-baby pair(s) (max 4 per booking)
          </label>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <input
          id="marketing-consent"
          type="checkbox"
          checked={marketingConsent}
          onChange={(e) => setMarketingConsent(e.target.checked)}
          className="w-4 h-4 rounded border-sage-300 text-sage-700 focus:ring-sage-500"
        />
        <label htmlFor="marketing-consent" className="text-sm text-sage-600 leading-relaxed">
          I'd like to receive updates about new classes and events (optional)
        </label>
      </div>

      <div className="p-4 rounded-lg bg-sage-50 border border-sage-100">
        <h4 className="text-sm font-semibold text-sage-800 mb-2">Booking summary</h4>
        <div className="space-y-1 text-sm text-sage-600">
          <div className="flex justify-between">
            <span>{service.name}</span>
            <span>£{(service.pricePence / 100).toFixed(2)} each</span>
          </div>
          <div className="flex justify-between">
            <span>{formatDateStr(date)}</span>
            <span>{formatTime(slot.startDateTime)} – {formatTime(slot.endDateTime)}</span>
          </div>
          <div className="flex justify-between">
            <span>{pairsCount} parent-and-baby pair(s)</span>
            <span>(Europe/London timezone)</span>
          </div>
          <div className="flex justify-between font-bold text-sage-900 pt-2 border-t border-sage-200">
            <span>Total</span>
            <span>£{totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-sage-100 flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          <ChevronLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <Button type="submit" loading={loading} disabled={loading}>
          Continue to payment <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </form>
  );
}

function ReviewStep({
  service,
  slot,
  date,
  pairsCount,
  guardianName,
  totalPrice,
  bookingReference,
  onBack,
  onProceed,
  formatTime,
}: {
  service: typeof SERVICES[number];
  slot: Slot;
  date: string;
  pairsCount: number;
  guardianName: string;
  totalPrice: number;
  bookingReference: string;
  onBack: () => void;
  onProceed: () => void;
  formatTime: (iso: string) => string;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-sage-900 mb-2">Review & pay</h2>
        <p className="text-sage-600">
          Your booking reference is{" "}
          <span className="font-bold text-sage-700">{bookingReference}</span>. Payment is processed securely by Stripe in test mode.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-sage-100 bg-white p-5">
          <h3 className="text-sm font-semibold text-sage-800 mb-2">Experience</h3>
          <p className="text-sm text-sage-600 font-medium">{service.name}</p>
          <p className="text-xs text-sage-500">
            {service.durationMin} minutes • {service.ageBand}
          </p>
        </div>
        <div className="rounded-xl border border-sage-100 bg-white p-5">
          <h3 className="text-sm font-semibold text-sage-800 mb-2">Date & time</h3>
          <p className="text-sm text-sage-600 font-medium">
            {formatDateStr(date)}
          </p>
          <p className="text-xs text-sage-500">
            {formatTime(slot.startDateTime)} – {formatTime(slot.endDateTime)} (Europe/London)
          </p>
        </div>
        <div className="rounded-xl border border-sage-100 bg-white p-5">
          <h3 className="text-sm font-semibold text-sage-800 mb-2">Places</h3>
          <p className="text-sm text-sage-600 font-medium">
            {pairsCount} parent-and-baby pair(s)
          </p>
          <p className="text-xs text-sage-500">Max 4 pairs per session</p>
        </div>
      </div>

      <div className="rounded-xl border border-sage-100 bg-white p-6">
        <h3 className="text-sm font-semibold text-sage-800 mb-4">Total</h3>
        <div className="flex items-baseline justify-between mb-6">
          <span className="text-lg text-sage-600">Total payable</span>
          <span className="text-3xl font-bold text-sage-900">
            £{totalPrice.toFixed(2)}
          </span>
        </div>
        <p className="text-xs text-sage-500 mb-4">
          Payment is processed securely by Stripe. Your reservation is held for 25 minutes while you complete checkout.
        </p>

        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 rounded-lg border border-sage-100 bg-ivory">
            <div className="w-8 h-8 rounded-lg bg-mint-100 flex items-center justify-center text-mint-700">
              <span className="text-sm">✓</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-sage-800">Secure payment by Stripe</p>
              <p className="text-xs text-sage-500">Test mode — no real money is taken</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-lg border border-sage-100 bg-ivory">
            <div className="w-8 h-8 rounded-lg bg-mint-100 flex items-center justify-center text-mint-700">
              <span className="text-sm">✓</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-sage-800">Confirmation email</p>
              <p className="text-xs text-sage-500">Sent once your payment is verified</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          <ChevronLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <Button type="button" onClick={onProceed} className="w-full md:w-auto">
          Pay securely with Stripe <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
