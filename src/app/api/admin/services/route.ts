export const dynamic = "force-dynamic"
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSession, requireAdmin } from "@/lib/auth";
import { updateServiceSchema } from "@/lib/validations";

export async function GET() {
  const session = await getAdminSession();
  const auth = requireAdmin(session);
  if (auth.unauthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const services = await prisma.service.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        _count: { select: { bookings: true } },
      },
    });
    return NextResponse.json({ services });
  } catch (error) {
    console.error("[ADMIN SERVICES GET ERROR]", error);
    return NextResponse.json(
      { error: "Failed to load services" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  const session = await getAdminSession();
  const auth = requireAdmin(session);
  if (auth.unauthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Service ID required" }, { status: 400 });
    }

    const body = await request.json();
    const parsed = updateServiceSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const service = await prisma.service.update({
      where: { id },
      data: parsed.data,
    });

    return NextResponse.json({ service });
  } catch (error) {
    console.error("[ADMIN SERVICE PUT ERROR]", error);
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 },
    );
  }
}

export async function POST() {
  const session = await getAdminSession();
  const auth = requireAdmin(session);
  if (auth.unauthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = updateServiceSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const service = await prisma.service.create({
      data: parsed.data,
    });

    return NextResponse.json({ service });
  } catch (error) {
    console.error("[ADMIN SERVICE POST ERROR]", error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 },
    );
  }
}
