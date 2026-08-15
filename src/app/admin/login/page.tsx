"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: form.get("username"),
        password: form.get("password"),
      }),
    });

    setLoading(false);

    if (res.ok) {
      router.push(params.get("next") ?? "/admin");
      router.refresh();
    } else {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "Login failed");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0d1117] px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-lg border border-[#27323d] bg-[#111820] p-8"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-[#d7a84b]">
          IUST Robotics
        </p>
        <h1 className="mt-2 text-xl font-semibold text-white">Admin sign in</h1>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-[#b6c0ca]">Username</label>
            <input
              name="username"
              required
              autoFocus
              className="w-full rounded-md border border-[#27323d] bg-[#0d1117] px-3 py-2 text-sm text-white outline-none focus:border-[#d7a84b]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-[#b6c0ca]">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full rounded-md border border-[#27323d] bg-[#0d1117] px-3 py-2 text-sm text-white outline-none focus:border-[#d7a84b]"
            />
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-md bg-[#d7a84b] px-4 py-2 text-sm font-medium text-[#11161b] transition hover:brightness-110 disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
