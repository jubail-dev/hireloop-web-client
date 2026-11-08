"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  BriefcaseBusiness,
  Sparkles,
} from "lucide-react"
import { signIn } from "@/lib/auth-client"

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    const {data:resData,error} = await signIn.email({
      email: data.email as string,
      password: data.password as string
    })

    console.log(resData,error, "From After SignIn");
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
      <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-purple-700/10 blur-[150px]" />

      <div className="pointer-events-none absolute bottom-[-250px] left-1/2 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-600/30 blur-[130px]" />

      {/* Back Home */}
      <Link
        href="/"
        className="absolute top-5 left-5 z-20 flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white sm:top-8 sm:left-10"
      >
        <ArrowLeft size={16} />
        Back to Home
      </Link>

      {/* Sign In Container */}
      <div className="relative z-10 w-full max-w-[460px]">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center text-center">
          <Link href="/" className="mb-7 flex items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/20">
              <BriefcaseBusiness size={22} className="text-white" />
            </div>

            <span className="text-2xl font-bold tracking-tight">
              Hire<span className="text-violet-400">Loop</span>
            </span>
          </Link>

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/[0.08] px-4 py-2 text-[11px] font-medium tracking-wide text-purple-300">
            <Sparkles size={13} />
            YOUR NEXT CHAPTER STARTS HERE
          </div>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-[38px]">
            Welcome Back
          </h1>

          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Sign in to discover opportunities and take
            <br className="hidden sm:block" /> the next step in your career.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-white/[0.09] bg-white/[0.045] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:p-9">
          <form
           onSubmit={handleSubmit}
           className="space-y-5">
            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute top-1/2 left-4 -translate-y-1/2 text-zinc-500"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  className="h-12 w-full rounded-xl border border-white/10 bg-black/30 pr-4 pl-12 text-sm text-white transition outline-none placeholder:text-zinc-600 focus:border-violet-500/70 focus:ring-2 focus:ring-violet-500/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-300">
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs text-violet-400 transition hover:text-violet-300"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute top-1/2 left-4 -translate-y-1/2 text-zinc-500"
                />

                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  className="h-12 w-full rounded-xl border border-white/10 bg-black/30 pr-12 pl-12 text-sm text-white transition outline-none placeholder:text-zinc-600 focus:border-violet-500/70 focus:ring-2 focus:ring-violet-500/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-zinc-500 transition hover:text-white"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 cursor-pointer accent-violet-500"
              />

              <label
                htmlFor="remember"
                className="cursor-pointer text-xs text-zinc-400"
              >
                Remember me
              </label>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:-translate-y-0.5 hover:shadow-violet-500/30"
            >
              Sign In
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 py-1">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[11px] text-zinc-500">
                OR CONTINUE WITH
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Google Button */}
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

          {/* Sign Up */}
          <p className="mt-7 text-center text-sm text-zinc-400">
            Don&#39;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-violet-400 transition hover:text-violet-300"
            >
              Create Account
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-7 text-center text-[11px] tracking-wide text-zinc-600">
          © 2026 HireLoop. All rights reserved.
        </p>
      </div>
    </main>
  )
}

export default SignInPage
