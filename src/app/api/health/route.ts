import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Docs/27_DEPLOYMENT.md §48-49: lightweight health endpoint, optionally
// verifying DB connectivity, response shape kept minimal (no infra details
// leaked -- no stack traces, connection strings, or version numbers).
export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "ok" });
  } catch {
    return NextResponse.json({ status: "error" }, { status: 503 });
  }
}
