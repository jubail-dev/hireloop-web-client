
"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  BriefcaseBusiness,
  Sparkles,
  ShieldCheck,
  Search,
  Users,
  Building2,
  CheckCircle2,
} from "lucide-react"
import { signIn } from "@/lib/auth-client"

const SignInPage = () => {

  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") ?? "/"

  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  const formData = new FormData(e.currentTarget)

  const email = String(formData.get("email") ?? "")
  const password = String(formData.get("password") ?? "")

  setIsLoading(true)

  try {
    const { data, error } = await signIn.email({
      email,
      password,
    })

    if (error) {
      toast.error(error.message || "Invalid email or password.")
      return
    }

    if (data) {
      toast.success("Sign in successful!")

      router.push(redirectTo)
      router.refresh()
    }
  } catch (error) {
    console.error("Sign In Error:", error)
    toast.error("Something went wrong. Please try again.")
  } finally {
    setIsLoading(false)
  }
}

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8F9FC] text-[#171725]">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-violet-100/60 blur-[120px]" />

      <div className="pointer-events-none absolute -bottom-40 right-0 h-[450px] w-[450px] rounded-full bg-indigo-100/60 blur-[120px]" />

      {/* Back Home */}
      <Link
        href="/"
        className="absolute left-6 top-6 z-30 flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-violet-600 sm:left-10 sm:top-8"
      >
        <ArrowLeft size={16} />
        Back to Home
      </Link>

      {/* Main Layout */}
      <div className="relative mx-auto grid min-h-screen w-full max-w-[1440px] items-center gap-10 px-5 py-24 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16 lg:py-16">

        {/* LEFT SIDE */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto w-full max-w-[570px]"
        >

          {/* Logo */}
          <motion.div variants={itemVariants}>
            <Link href="/" className="mb-16 inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-200">
                <BriefcaseBusiness size={22} />
              </div>

              <span className="text-[25px] font-bold tracking-[-1.2px]">
                Hire<span className="text-violet-600">Loop</span>
              </span>
            </Link>
          </motion.div>

          {/* Heading */}
          <motion.div variants={itemVariants}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 shadow-sm">
              <Sparkles size={14} className="text-violet-600" />
              <span className="text-[10px] font-bold tracking-[1.5px] text-violet-700">
                YOUR FUTURE STARTS HERE
              </span>
            </div>

            <h1 className="max-w-[540px] text-[43px] font-bold leading-[1.13] tracking-[-2px] text-[#171725] sm:text-[55px] lg:text-[62px]">
              Your next career move starts{" "}
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                here.
              </span>
            </h1>

            <p className="mt-6 max-w-[430px] text-[14px] leading-7 text-slate-500 sm:text-base">
              Discover meaningful opportunities, connect with
              forward-thinking companies, and build a career
              that moves you forward.
            </p>
          </motion.div>

          {/* Illustration Card */}
          <motion.div
            variants={itemVariants}
            className="relative mt-12 overflow-hidden rounded-[28px] border border-violet-100 bg-gradient-to-br from-[#EEEAFE] via-[#F3F0FF] to-[#E8EDFF] p-6 sm:p-8"
          >
            {/* Decorative circles */}
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border border-violet-300/40" />
            <div className="pointer-events-none absolute -right-8 -top-12 h-40 w-40 rounded-full border border-indigo-300/40" />

            <div className="relative z-10">

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-violet-700">
                    CAREER DISCOVERY
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-slate-800">
                    Find your perfect fit.
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-violet-600 shadow-sm">
                  <Search size={22} />
                </div>
              </div>

              {/* Floating Job Card */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mt-7 rounded-2xl border border-white bg-white/90 p-4 shadow-[0_15px_40px_rgba(100,80,180,0.08)]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                    <Building2 size={21} />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">
                      Product Designer
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Creative Studio · Full Time
                    </p>
                  </div>

                  <CheckCircle2 size={19} className="text-emerald-500" />
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-[11px] text-slate-400">
                    Your next opportunity awaits.
                  </span>

                  <span className="rounded-full bg-violet-50 px-3 py-1.5 text-[10px] font-semibold text-violet-700">
                    Explore jobs
                  </span>
                </div>
              </motion.div>

              {/* Bottom Stats */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/70 p-3">
                  <Users size={18} className="text-violet-600" />
                  <p className="mt-2 text-xs font-bold text-slate-800">
                    Better Connections
                  </p>
                  <p className="mt-1 text-[10px] text-slate-400">
                    Meet great people
                  </p>
                </div>

                <div className="rounded-xl bg-white/70 p-3">
                  <BriefcaseBusiness size={18} className="text-indigo-600" />
                  <p className="mt-2 text-xs font-bold text-slate-800">
                    Better Opportunities
                  </p>
                  <p className="mt-1 text-[10px] text-slate-400">
                    Grow your career
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Left Footer */}
          <motion.p
            variants={itemVariants}
            className="mt-7 text-[11px] text-slate-400"
          >
            © 2026 HireLoop. Built for your next chapter.
          </motion.p>
        </motion.section>

        {/* RIGHT SIDE */}
        <motion.section
          initial={{ opacity: 0, x: 35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.85,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto w-full max-w-[460px]"
        >

          {/* Form Card */}
          <div className="rounded-[28px] border border-slate-200/80 bg-white p-7 shadow-[0_25px_80px_rgba(30,30,70,0.07)] sm:p-10">

            {/* Form Heading */}
            <div className="mb-9">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                <LockKeyhole size={22} />
              </div>

              <h2 className="text-[30px] font-bold tracking-[-1px] text-[#171725]">
                Welcome back!
              </h2>

              <p className="mt-2 text-[13px] leading-6 text-slate-500">
                Sign in to continue your journey with HireLoop.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>
                <label className="mb-2.5 block text-[12px] font-semibold text-slate-700">
                  Email Address
                </label>

                <div className="group relative">
                  <Mail
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-violet-600"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    className="h-[52px] w-full rounded-xl border border-slate-200 bg-[#FAFAFC] pl-11 pr-4 text-[13px] text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2.5 flex items-center justify-between">
                  <label className="text-[12px] font-semibold text-slate-700">
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-[11px] font-semibold text-violet-600 transition-colors hover:text-violet-800"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="group relative">
                  <LockKeyhole
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-violet-600"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    required
                    className="h-[52px] w-full rounded-xl border border-slate-200 bg-[#FAFAFC] pl-11 pr-12 text-[13px] text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-violet-600"
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex cursor-pointer items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 cursor-pointer accent-violet-600"
                  />

                  <span className="text-[11px] text-slate-500">
                    Remember me
                  </span>
                </label>

                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  Secure login
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="group relative flex h-[52px] w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-[13px] font-semibold text-white shadow-[0_8px_20px_rgba(109,40,217,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(109,40,217,0.28)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <span className="relative">
                  {isLoading ? "Signing In..." : "Sign In to Your Account"}
                </span>

                {!isLoading && (
                  <ArrowRight
                    size={17}
                    className="relative transition-transform group-hover:translate-x-1"
                  />
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 py-1">
                <div className="h-px flex-1 bg-slate-200" />

                <span className="text-[9px] font-bold tracking-[1.5px] text-slate-400">
                  OR CONTINUE WITH
                </span>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* Google */}
              <button
                type="button"
                className="flex h-[50px] w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-[12px] font-semibold text-slate-700 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 48 48"
                  aria-label="Google"
                  role="img"
                >
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.26 5.63c4.24-3.91 7.51-9.67 7.51-17.28Z" />
                  <path fill="#FBBC05" d="M10.54 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a24 24 0 0 0 0 21.56l7.98-6.19Z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.79l-7.26-5.63c-2.02 1.35-4.61 2.15-8.65 2.15-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
                </svg>

                Continue with Google
              </button>
            </form>

            {/* Sign Up */}
            <div className="mt-8 border-t border-slate-100 pt-6 text-center">
              <p className="text-[12px] text-slate-500">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-bold text-violet-600 transition-colors hover:text-violet-800"
                >
                  Create an account
                  <ArrowRight size={12} className="ml-1 inline" />
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-[10px] text-slate-400">
            By continuing, you agree to HireLoop&apos;s Terms of Service and Privacy Policy.
          </p>
        </motion.section>
      </div>
    </main>
  )
}

export default SignInPage
