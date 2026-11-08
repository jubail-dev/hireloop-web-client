
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  BriefcaseBusiness,
  Sparkles,
  UserRound,
} from "lucide-react";
import { signUp } from "@/lib/auth-client";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const {data:resData, error} = await signUp.email({
        email: data.email as string,
        password: data.password as string,
        name: data.fullName as string,
    })

    console.log("Sign Up Response:", resData, error);
  }



  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090b] px-4 py-12 text-white">

      {/* Background Stripes */}
      <div className="pointer-events-none absolute inset-0 flex justify-center opacity-80">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-full w-[4.5%] border-x border-white/[0.025]"
            style={{
              background:
                i % 2 === 0
                  ? "linear-gradient(to bottom, rgba(100,35,45,0.25), transparent)"
                  : "linear-gradient(to bottom, rgba(30,20,25,0.6), transparent)",
            }}
          />
        ))}
      </div>

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-purple-700/10 blur-[150px]" />

      <div className="pointer-events-none absolute bottom-[-250px] left-1/2 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-600/30 blur-[130px]" />

      {/* Back Home */}
      <Link
        href="/"
        className="absolute left-5 top-5 z-20 flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white sm:left-10 sm:top-8"
      >
        <ArrowLeft size={16} />
        Back to Home
      </Link>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[460px]">

        {/* Logo & Heading */}
        <div className="mb-7 flex flex-col items-center text-center">
          <Link href="/" className="mb-6 flex items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/20">
              <BriefcaseBusiness size={22} className="text-white" />
            </div>

            <span className="text-2xl font-bold tracking-tight">
              Hire<span className="text-violet-400">Loop</span>
            </span>
          </Link>

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/[0.08] px-4 py-2 text-[11px] font-medium tracking-wide text-purple-300">
            <Sparkles size={13} />
            START YOUR CAREER JOURNEY
          </div>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-[36px]">
            Create Your Account
          </h1>

          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Join HireLoop and discover opportunities
            <br className="hidden sm:block" /> that move your career forward.
          </p>
        </div>

        {/* Sign Up Card */}
        <div className="rounded-2xl border border-white/[0.09] bg-white/[0.045] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Full Name
              </label>

              <div className="relative">
                <UserRound
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  autoComplete="name"
                  className="h-12 w-full rounded-xl border border-white/10 bg-black/30 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500/70 focus:ring-2 focus:ring-violet-500/10"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className="h-12 w-full rounded-xl border border-white/10 bg-black/30 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500/70 focus:ring-2 focus:ring-violet-500/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="h-12 w-full rounded-xl border border-white/10 bg-black/30 pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500/70 focus:ring-2 focus:ring-violet-500/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-white"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Confirm Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="h-12 w-full rounded-xl border border-white/10 bg-black/30 pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500/70 focus:ring-2 focus:ring-violet-500/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-white"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 pt-1">
              <input
                id="terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required
                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-violet-500"
              />

              <label
                htmlFor="terms"
                className="cursor-pointer text-xs leading-5 text-zinc-400"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-violet-400 hover:text-violet-300"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-violet-400 hover:text-violet-300"
                >
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            {/* Create Account */}
            <button
              type="submit"
              disabled={!agreeTerms}
              className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:-translate-y-0.5 hover:shadow-violet-500/30 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Create Account
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 py-1">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[11px] text-zinc-500">
                OR SIGN UP WITH
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Google Sign Up */}
            <button
              type="button"
              className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] text-sm font-medium text-zinc-200 transition hover:border-white/20 hover:bg-white/[0.08]"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 48 48"
                aria-label="Google"
                role="img"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.26 5.63c4.24-3.91 7.51-9.67 7.51-17.28Z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.54 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a24 24 0 0 0 0 21.56l7.98-6.19Z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.91-5.79l-7.26-5.63c-2.02 1.35-4.61 2.15-8.65 2.15-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                />
              </svg>

              Continue with Google
            </button>
          </form>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-sm text-zinc-400">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-semibold text-violet-400 transition hover:text-violet-300"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-[11px] tracking-wide text-zinc-600">
          © 2026 HireLoop. All rights reserved.
        </p>
      </div>
    </main>
  );
};

export default SignUpPage;
