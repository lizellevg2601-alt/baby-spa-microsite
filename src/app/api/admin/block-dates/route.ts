import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSession, requireAdmin } from "@/lib/auth";
import { z } from "zod";

const blockDateSchema = z.object({
  date: z.string().refine((d) => !isNaN(Date.parse(d)), {
    message: "Invalid date",
  }),
  reason: z.string().optional(),
});

export async function GET() {
  const session = await getAdminSession();
  const auth = requireAdmin(session);
  if (auth.unauthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const blockDates = await prisma.blockDate.findMany({
      orderBy: { date: "asc" },
    });
    return NextResponse.json({ blockDates });
  } catch (error) {
    console.error("[ADMIN BLOCK DATES GET ERROR]", error);
    return NextResponse.json(
      { error: "Failed to load block dates" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  const auth = requireAdmin(session);
  if (auth.unauthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = blockDateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { date, reason } = parsed.data;
    const blockDate = await prisma.blockDate.create({
      data: {
        date: new Date(date),
        reason: reason || null,
      },
    });

    return NextResponse.json({ blockDate });
  } catch (error) {
    console.error("[ADMIN BLOCK DATES POST ERROR]", error);
    return NextResponse.json(
      { error: "Failed to block date" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getAdminSession();
  const auth = requireAdmin(session);
  if (auth.unauthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Block date ID required" }, { status: 400 });
    }

    await prisma.blockDate.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[ADMIN BLOCK DATES DELETE ERROR]", error);
    return NextResponse.json(
      { error: "Failed to unblock date" },
      { status: 500 },
    );
  }
}
