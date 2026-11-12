import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  marketingConsent: z.boolean().optional().default(false),
});

// Simple in-memory rate limit (per IP, per minute)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 1000 });
    return true;
  }
  if (record.count >= 5) return false;
  record.count += 1;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const parsed = waitlistSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    const { email, marketingConsent } = parsed.data;

    // Use Cloudflare D1 binding (available as env.DB in Pages Functions)
    const db = (process.env as { DB?: unknown })?.DB;
    if (db) {
      try {
        await db
          .prepare(
            `INSERT INTO WaitlistEntry (email, marketingConsent, createdAt, updatedAt)
             VALUES (?, ?, datetime('now'), datetime('now'))
             ON CONFLICT(email) DO UPDATE SET marketingConsent = excluded.marketingConsent, updatedAt = datetime('now')`
          )
          .bind(email, marketingConsent ? 1 : 0)
          .run();
      } catch (dbErr) {
        // D1 not configured yet — gracefully continue
        console.error("[D1 ERROR]", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "You've been added to the waitlist.",
    });
  } catch (error) {
    console.error("[WAITLIST ERROR]", error);
    return NextResponse.json(
      { error: "Failed to join waitlist. Please try again." },
      { status: 500 },
    );
  }
}
