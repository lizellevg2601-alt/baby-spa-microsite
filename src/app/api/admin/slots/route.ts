import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSession, requireAdmin } from "@/lib/auth";
import { createSlotSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  const auth = requireAdmin(session);
  if (auth.unauthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const serviceId = searchParams.get("serviceId");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const slots = await prisma.slot.findMany({
      where: {
        ...(serviceId ? { serviceId } : {}),
        ...(from && to ? { startDateTime: { gte: new Date(from), lte: new Date(to) } } : {}),
      },
      include: { service: true },
      orderBy: { startDateTime: "asc" },
      take: 200,
    });

    return NextResponse.json({ slots });
  } catch (error) {
    console.error("[ADMIN SLOTS GET ERROR]", error);
    return NextResponse.json(
      { error: "Failed to load slots" },
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
    const parsed = createSlotSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { serviceId, startDateTime, capacity } = parsed.data;

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const endDateTime = new Date(
      new Date(startDateTime).getTime() + service.durationMin * 60000,
    );

    const slot = await prisma.slot.create({
      data: {
        serviceId,
        startDateTime: new Date(startDateTime),
        endDateTime,
        capacity: capacity ?? service.capacityDefault,
        availableSpaces: capacity ?? service.capacityDefault,
      },
    });

    return NextResponse.json({ slot });
  } catch (error) {
    console.error("[ADMIN SLOTS POST ERROR]", error);
    return NextResponse.json(
      { error: "Failed to create slot" },
      { status: 500 },
    );
  }
}
