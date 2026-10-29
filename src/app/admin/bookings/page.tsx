"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminBookingsPage() {
  const [admin, setAdmin] = useState<{ email: string } | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
    fetch("/api/admin/bookings")
      .then((r) => r.json())
      .then((data) => {
        setBookings(data.bookings || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [admin]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-ivory items-center justify-center">
        <div className="text-sage-600">Loading…</div>
      </div>
    );
  }

  if (!admin) {
    return null;
  }

  const handleRefund = async (bookingId: string, reference: string) => {
    if (
      !window.confirm(`Refund booking ${reference}? This cannot be undone.`)
    ) {
      return;
    }
    const res = await fetch("/api/admin/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId, action: "refund" }),
    });
    if (res.ok) {
      window.location.reload();
    } else {
      alert("Refund failed. Please try again.");
    }
  };

  const handleCancel = async (bookingId: string, reference: string) => {
    if (!window.confirm(`Cancel booking ${reference}?`)) {
      return;
    }
    const res = await fetch("/api/admin/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId, action: "cancel" }),
    });
    if (res.ok) {
      window.location.reload();
    } else {
      alert("Cancellation failed. Please try again.");
    }
  };

  const exportToCSV = () => {
    const headers = [
      "Reference",
      "Experience",
      "Date",
      "Time",
      "Places",
      "Guardian",
      "Email",
      "Status",
      "Total (£)",
    ];
    const rows = bookings.map((b) => [
      b.reference,
      b.service?.name || "",
      new Date(b.slot?.startDateTime || 0).toLocaleDateString("en-GB"),
      new Date(b.slot?.startDateTime || 0).toLocaleTimeString("en-GB", {
        timeZone: "Europe/London",
      }),
      b.pairsCount,
      b.guardianName,
      b.guardianEmail,
      b.status,
      (b.totalPence / 100).toFixed(2),
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join(
      "\n",
    );
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ttl-bookings-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="flex flex-col min-h-screen bg-ivory">
      <header className="border-b border-sage-100 bg-white sticky top-0 z-20">
        <div className="px-4 md:px-8 py-4 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5 text-sage-600" />
            <span className="text-sm font-semibold text-sage-700">
              Back to dashboard
            </span>
          </Link>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm text-sage-600 hidden md:inline">
              {admin.email}
            </span>
            <form action="/api/auth/logout" method="POST">
              <button
                className="px-4 py-2 rounded-lg border border-sage-200 bg-white text-sm font-semibold text-sage-700 hover:bg-sage-50"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="flex-1 px-4 md:px-8 py-8 max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-sage-900">Manage bookings</h1>
          <button
            className="px-4 py-2 rounded-lg bg-sage-700 text-white text-sm font-semibold hover:bg-sage-600"
            onClick={exportToCSV}
          >
            📥 Export CSV
          </button>
        </div>

        <div className="rounded-xl border border-sage-100 bg-white overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-sage-100 bg-sage-50">
                <th className="px-6 py-3 text-xs font-semibold text-sage-500 uppercase">Reference</th>
                <th className="px-6 py-3 text-xs font-semibold text-sage-500 uppercase">Experience</th>
                <th className="px-6 py-3 text-xs font-semibold text-sage-500 uppercase">Date & time</th>
                <th className="px-6 py-3 text-xs font-semibold text-sage-500 uppercase">Places</th>
                <th className="px-6 py-3 text-xs font-semibold text-sage-500 uppercase">Guardian</th>
                <th className="px-6 py-3 text-xs font-semibold text-sage-500 uppercase">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-sage-500 uppercase">Total</th>
                <th className="px-6 py-3 text-xs font-semibold text-sage-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sage-100">
              {bookings.length > 0 ? (
                bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-sage-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-sage-800">
                      {b.reference}
                    </td>
                    <td className="px-6 py-4 text-sm text-sage-600">
                      {b.service?.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-sage-600">
                      {new Date(b.slot?.startDateTime || 0).toLocaleString(
                        "en-GB",
                        {
                          timeZone: "Europe/London",
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-sage-600">
                      {b.pairsCount} pair(s)
                    </td>
                    <td className="px-6 py-4 text-sm text-sage-600">
                      {b.guardianName}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "px-2 py-1 rounded text-xs font-semibold",
                          b.status === "CONFIRMED"
                            ? "bg-mint-100 text-mint-700"
                            : b.status === "PENDING"
                              ? "bg-amber-100 text-amber-700"
                              : b.status === "CANCELLED"
                                ? "bg-sage-100 text-sage-700"
                                : "bg-blush-100 text-blush-700",
                        )}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-sage-800">
                      £{(b.totalPence / 100).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {b.status === "CONFIRMED" && (
                        <button
                          onClick={() => handleRefund(b.id, b.reference)}
                          className="text-xs text-blush-600 hover:underline font-medium"
                        >
                          Refund
                        </button>
                      )}
                      {b.status === "PENDING" && (
                        <button
                          onClick={() => handleCancel(b.id, b.reference)}
                          className="text-xs text-sage-600 hover:underline font-medium"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-sage-500">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
