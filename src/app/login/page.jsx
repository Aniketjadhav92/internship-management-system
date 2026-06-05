"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (role === "Admin") {
      if (email === "admin@internhub.com" && password === "admin123") {
        setError("");
        router.push("/dashboard");
      } else {
        setError("Invalid Admin Credentials");
      }
    }

    if (role === "Intern") {
      if (email === "intern@internhub.com" && password === "intern123") {
        setError("");
        router.push("/intern-dashboard");
      } else {
        setError("Invalid Intern Credentials");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <GraduationCap size={28} />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Internship Management System
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-slate-900"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-slate-900"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Role
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-slate-900"
            >
              <option value="Admin">Admin</option>
              <option value="Intern">Intern</option>
            </select>
          </div>

          {error && (
            <p className="text-center text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            onClick={handleLogin}
            className="w-full rounded-xl bg-slate-900 px-4 py-3 font-medium text-white hover:bg-slate-800"
          >
            Login
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Internship Management System
        </p>
      </div>
    </div>
  );
}