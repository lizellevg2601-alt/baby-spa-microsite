"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

type Booking = {
  id: string;
  reference: string;
  service?: { name: string };
  slot?: { startDateTime: string };
  pairsCount: number;
  guardianName: string;
  guardianEmail: string;
  status: string;
  totalPence: number;
};

export default function AdminDashboardPage() {
  const [admin, setAdmin] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState<{
    bookingsEnabled: boolean;
    paymentsMode: string;
  } | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    let mounted = true;
    fetch("/api/auth/session")
      .then((r) => r.json())
      .then((data) => {
        if (mounted && data.admin) {
          setAdmin(data.admin);
        } else if (mounted) {
          window.location.href = "/login";
        }
        setLoading(false);
      })
      .catch(() => {
        if (mounted) {
          window.location.href = "/login";
        }
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!admin) return;
    Promise.all([
      fetch("/api/admin/config").then((r) => r.json()),
      fetch("/api/admin/bookings").then((r) => r.json()),
    ])
      .then(([configRes, bookingsRes]) => {
        setConfig(configRes.config);
        setBookings(bookingsRes.bookings);
      })
      .catch(console.error);
  }, [admin]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-ivory items-center justify-center">
        <div className="text-sage-600">Loading…</div>
      </div>
    );
  }

  if (!admin) {
    return null; // redirect handled by useEffect
  }

  const confirmedCount = bookings.filter(
    (b) => b.status === "CONFIRMED"
  ).length;
  const pendingCount = bookings.filter((b) => b.status === "PENDING").length;
  const totalRevenue = bookings
    .filter((b) => b.status === "CONFIRMED")
    .reduce((sum, b) => sum + b.totalPence, 0);
  const isTestMode =
    !config?.bookingsEnabled || config.paymentsMode === "test";

  return (
    <div className="flex flex-col min-h-screen bg-ivory">
      <header className="border-b border-sage-100 bg-white sticky top-0 z-20">
        <div className="px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-sage-700 flex items-center justify-center text-white">
              <span className="font-bold">TTL</span>
            </div>
            <span className="font-bold text-sage-800 text-lg">
              Admin — Twinkle Toe Love
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-sage-600 hidden md:inline">
              {admin.email}
            </span>
            <form
              action="/api/auth/logout"
              method="POST"
            >
              <button
                className="px-4 py-2 rounded-lg border border-sage-200 bg-white text-sm font-semibold text-sage-700 hover:bg-sage-50"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="flex-1 px-4 md:px-8 py-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-sage-900 mb-2">Dashboard</h1>
          <p className="text-sage-600">
            Manage your baby studio bookings, services and timetable.
          </p>
        </div>

        {/* Status banner */}
        <div
          className={cn(
            "rounded-xl border p-6 mb-8",
            isTestMode
              ? "bg-amber-50 border-amber-100"
              : "bg-mint-50 border-mint-100",
          )}
        >
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "w-5 h-5 rounded-full flex items-center justify-center text-white text-xs mt-0.5",
                isTestMode ? "bg-amber-600" : "bg-mint-600",
              )}
            >
              {isTestMode ? "T" : "•"}
            </div>
            <div>
              <h3 className="font-semibold text-sage-800">
                {isTestMode
                  ? !config?.bookingsEnabled
                    ? "Bookings are currently disabled"
                    : "Test mode — no real payments"
                  : "Live mode — active"}
              </h3>
              <p className="text-sm text-sage-600 mt-1">
                {!config?.bookingsEnabled
                  ? "Enable bookings from the admin settings to start accepting reservations."
                  : config.paymentsMode === "test"
                    ? "Stripe is in test mode. No real money is taken."
                    : "Live payments are enabled."}
              </p>
            </div>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total bookings"
            value={bookings.length}
            icon="📋"
            color="sage"
          />
          <StatCard
            title="Confirmed"
            value={confirmedCount}
            icon="✅"
            color="mint"
          />
          <StatCard
            title="Pending payment"
            value={pendingCount}
            icon="⏳"
            color="blush"
          />
        </div>

        {/* Recent bookings */}
        <div className="rounded-xl border border-sage-100 bg-white overflow-hidden">
          <div className="px-6 py-4 border-b border-sage-100 flex items-center justify-between">
            <h3 className="font-semibold text-sage-800">Recent bookings</h3>
            <Link
              href="/admin/bookings"
              className="text-sm font-semibold text-sage-700 hover:text-sage-900"
            >
              View all →
            </Link>
          </div>
          <div className="divide-y divide-sage-100">
            {bookings.slice(0, 10).map((b) => (
              <div key={b.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sage-800">{b.reference}</p>
                  <p className="text-sm text-sage-600">
                    {b.service?.name} • {b.pairsCount} pair(s)
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "px-2 py-1 rounded text-xs font-semibold",
                      b.status === "CONFIRMED"
                        ? "bg-mint-100 text-mint-700"
                        : b.status === "PENDING"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-sage-100 text-sage-700",
                    )}
                  >
                    {b.status}
                  </span>
                  <span className="text-sm font-bold text-sage-800">
                    £{(b.totalPence / 100).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
            {bookings.length === 0 && (
              <div className="px-6 py-8 text-center text-sage-500">
                No recent bookings.
              </div>
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <AdminActionCard
            title="Manage bookings"
            description="View, cancel and refund bookings"
            href="/admin/bookings"
            icon="📅"
          />
          <AdminActionCard
            title="Services & prices"
            description="Edit experiences, prices and capacity"
            href="/admin/services"
            icon="💰"
          />
          <AdminActionCard
            title="Timetable & slots"
            description="Add and manage session timeslots"
            href="/admin/slots"
            icon="🕒"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: string;
  color: "sage" | "mint" | "blush";
}) {
  const bg =
    color === "sage"
      ? "bg-sage-50"
      : color === "mint"
        ? "bg-mint-50"
        : "bg-blush-50";
  const text =
    color === "sage"
      ? "text-sage-700"
      : color === "mint"
        ? "text-mint-700"
        : "text-blush-700";

  return (
    <div className={`rounded-xl p-6 border border-sage-100 ${bg}`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-lg">{icon}</span>
        <span className={cn("text-sm font-semibold", text)}>{title}</span>
      </div>
      <div className="text-2xl font-bold text-sage-900">{value}</div>
    </div>
  );
}

function AdminActionCard({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: string;
}) {
  return (
    <a
      href={href}
      className="rounded-xl border border-sage-200 bg-white p-6 hover:border-sage-700 hover:shadow-md transition-all group"
    >
      <div className="text-2xl mb-3">{icon}</div>
      <h3 className="font-bold text-sage-800 mb-1">{title}</h3>
      <p className="text-sm text-sage-600">{description}</p>
    </a>
  );
}
