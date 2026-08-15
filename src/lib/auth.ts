// Admin authentication (Docs/06_ADMIN_PANEL.md #3-4):
// - username/password only, no OAuth/public accounts
// - passwords hashed (bcrypt), never stored plaintext
// - secure, httpOnly session cookie (JWT signed with AUTH_SECRET)
// - every /admin/* route and admin API protected server-side (see proxy.ts,
//   Next 16's rename of the middleware.ts file convention)
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

const SESSION_COOKIE = "iust_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

function getSecretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error(
      "AUTH_SECRET is not set. Copy .env.example to .env.local and set a strong random value."
    );
  }
  return new TextEncoder().encode(secret);
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export type AdminSessionPayload = {
  sub: string; // admin id
  username: string;
  role: "SUPER_ADMIN" | "EDITOR";
};

export async function createSession(payload: AdminSessionPayload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    // impl: a fresh jti-less token per login is sufficient here; rotating the
    // cookie on every login (rather than reusing one) avoids session fixation.
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecretKey());

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSession(): Promise<AdminSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as unknown as AdminSessionPayload;
  } catch {
    return null;
  }
}

// impl: best-effort in-memory rate limit (06 §4 "Rate-limit login attempts
// where practical"). Fine for a single-instance VPS deployment (09's stated
// target); swap for a shared store (Redis) if the app runs multi-instance.
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

export function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(key);
  if (!entry || entry.resetAt < now) {
    loginAttempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_ATTEMPTS) return false;
  entry.count += 1;
  return true;
}

export function resetRateLimit(key: string) {
  loginAttempts.delete(key);
}
