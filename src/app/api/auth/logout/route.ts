import { NextResponse } from "next/server";
import { destroyAdminSession } from "@/lib/auth";

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
