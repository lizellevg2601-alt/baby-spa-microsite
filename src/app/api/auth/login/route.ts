import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { adminLoginSchema } from "@/lib/validations";
import { hashPassword, verifyPassword, createAdminSession, destroyAdminSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = adminLoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid login data", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { email, password } = parsed.data;

    const admin = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (!admin || !admin.isActive) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    const valid = await verifyPassword(password, admin.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    await createAdminSession(admin.id);

    return NextResponse.json({
      success: true,
      admin: { id: admin.id, email: admin.email, role: admin.role },
    });
  } catch (error) {
    console.error("[LOGIN API ERROR]", error);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  try {
    await destroyAdminSession();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[LOGOUT API ERROR]", error);
    return NextResponse.json(
      { error: "Logout failed" },
      { status: 500 },
    );
  }
}
