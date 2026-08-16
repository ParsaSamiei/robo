// Protects /admin/* server-side, not just in the frontend
// (Docs/06_ADMIN_PANEL.md #4, #57-58: "Do not implement authentication only
// in the frontend" / "Server-Side Authorization").
//
// Docs/06_ADMIN_PANEL.md was written before Next.js 16 renamed the
// middleware.ts file convention to proxy.ts (same API, filename + exported
// function name changed to clarify this runs as a network boundary, not
// general-purpose Express-style middleware). See
// https://nextjs.org/docs/app/api-reference/file-conventions/proxy
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "iust_admin_session";

async function isValidSession(token: string | undefined) {
  if (!token) return false;
  const secret = process.env.AUTH_SECRET;
  if (!secret) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return true;
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicAdminApiRoutes = ["/api/admin/login", "/api/admin/logout"];
  const isAdminRoute = pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isAdminApi =
    pathname.startsWith("/api/admin") && !publicAdminApiRoutes.includes(pathname);

  if (!isAdminRoute && !isAdminApi) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const valid = await isValidSession(token);

  if (!valid) {
    if (isAdminApi) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
