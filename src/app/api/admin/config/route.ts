import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSession, requireAdmin } from "@/lib/auth";
import { updateConfigSchema } from "@/lib/validations";

export async function GET() {
  const session = await getAdminSession();
  const auth = requireAdmin(session);
  if (auth.unauthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const config = await prisma.config.findUnique({ where: { id: "config" } });
    return NextResponse.json({ config });
  } catch (error) {
    console.error("[ADMIN CONFIG GET ERROR]", error);
    return NextResponse.json(
      { error: "Failed to load config" },
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
    const body = await request.json();
    const parsed = updateConfigSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const config = await prisma.config.update({
      where: { id: "config" },
      data: parsed.data,
    });

    return NextResponse.json({ config });
  } catch (error) {
    console.error("[ADMIN CONFIG PUT ERROR]", error);
    return NextResponse.json(
      { error: "Failed to update config" },
      { status: 500 },
    );
  }
}
