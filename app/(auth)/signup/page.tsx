
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
  Building2,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { signUp } from "@/lib/auth-client";

const SignUpPage = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [role, setRole] = useState<"seeker" | "recruiter" | "admin">("seeker");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries());

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!", {
        description: "Please make sure both passwords are identical.",
      });
      return;
    }

    if (!agreeTerms) {
      toast.error("Please accept the Terms of Service.");
      return;
    }

    setIsLoading(true);

    try {
      const { data: resData, error } = await signUp.email({
        email: data.email as string,
        password: data.password as string,
        name: data.fullName as string,
        role,
      });

      if (error) {
        toast.error("Account creation failed!", {
          description: error.message || "Something went wrong. Please try again.",
        });
        return;
      }

      if (resData) {
        toast.success("Account created successfully!", {
          description: "Please sign in with your new account.",
        });

        router.push("/signin");
      }
    } catch (error) {
      console.error("Sign Up Error:", error);

      toast.error("Something went wrong!", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const roleCardClass = (selected: boolean) =>
    `relative rounded-2xl border p-4 text-left transition-all duration-300 ${
      selected
        ? "border-violet-500 bg-violet-50 shadow-[0_5px_20px_rgba(124,58,237,0.08)]"
        : "border-slate-200 bg-white hover:border-violet-200 hover:bg-slate-50"
    }`;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8F9FC] text-[#171725]">

      {/* Background */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-violet-100/60 blur-[120px]" />

      <div className="pointer-events-none absolute -bottom-40 right-0 h-[450px] w-[450px] rounded-full bg-indigo-100/60 blur-[120px]" />

      {/* Back Home */}
      <Link
        href="/"
        className="absolute left-5 top-6 z-30 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-violet-600 sm:left-10 sm:top-8"
      >
        <ArrowLeft size={16} />
        Back to Home
      </Link>

      {/* Main Layout */}
      <div className="relative mx-auto grid min-h-screen w-full max-w-[1440px] items-center gap-12 px-5 py-24 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16 lg:py-16">

        {/* LEFT SIDE */}
        <motion.section
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.12 }}
          className="mx-auto w-full max-w-[570px]"
        >
          {/* Logo */}
          <motion.div variants={itemVariants}>
            <Link href="/" className="mb-14 inline-flex items-center gap-3">
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
                START YOUR NEXT CHAPTER
              </span>
            </div>

            <h1 className="max-w-[550px] text-[43px] font-bold leading-[1.13] tracking-[-2px] text-[#171725] sm:text-[55px] lg:text-[62px]">
              Build your future.
              <span className="block bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Start today.
              </span>
            </h1>

            <p className="mt-6 max-w-[430px] text-sm leading-7 text-slate-500 sm:text-base">
              Join a growing professional community. Discover
              opportunities, connect with companies, and take
              control of your career journey.
            </p>
          </motion.div>

          {/* Illustration */}
          <motion.div
            variants={itemVariants}
            className="relative mt-12 overflow-hidden rounded-[28px] border border-violet-100 bg-gradient-to-br from-[#EEEAFE] via-[#F3F0FF] to-[#E8EDFF] p-6 sm:p-8"
          >
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border border-violet-300/40" />

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-violet-700">
                    THE NEXT STEP
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-slate-800">
                    Opportunities await.
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-violet-600 shadow-sm">
                  <Sparkles size={23} />
                </div>
              </div>

              {/* Animated Card */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mt-7 rounded-2xl border border-white bg-white/90 p-5 shadow-[0_15px_40px_rgba(100,80,180,0.08)]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                    <UserRound size={23} />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">
                      Your Career Journey
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      New opportunities start with you.
                    </p>
                  </div>

                  <CheckCircle2 size={20} className="text-emerald-500" />
                </div>

                <div className="mt-5 space-y-3">
                  <div className="h-2 w-full rounded-full bg-slate-100">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "75%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
                    />
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Your journey begins here</span>
                    <span>75%</span>
                  </div>
                </div>
              </motion.div>

              {/* Benefits */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/75 p-3">
                  <Building2 size={19} className="text-violet-600" />

                  <p className="mt-2 text-xs font-bold text-slate-800">
                    Top Companies
                  </p>

                  <p className="mt-1 text-[10px] text-slate-400">
                    Discover opportunities
                  </p>
                </div>

                <div className="rounded-xl bg-white/75 p-3">
                  <BriefcaseBusiness size={19} className="text-indigo-600" />

                  <p className="mt-2 text-xs font-bold text-slate-800">
                    Career Growth
                  </p>

                  <p className="mt-1 text-[10px] text-slate-400">
                    Make your next move
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
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
          className="mx-auto w-full max-w-[480px]"
        >
          {/* Signup Card */}
          <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_25px_80px_rgba(30,30,70,0.07)] sm:p-9">

            {/* Heading */}
            <div className="mb-7">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                <UserRound size={22} />
              </div>

              <h2 className="text-[30px] font-bold tracking-[-1px] text-[#171725]">
                Create account
              </h2>

              <p className="mt-2 text-[13px] leading-6 text-slate-500">
                Get started with HireLoop. It only takes a minute.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Full Name */}
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-700">
                  Full Name
                </label>

                <div className="group relative">
                  <UserRound
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-violet-600"
                  />

                  <input
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    required
                    autoComplete="name"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-[#FAFAFC] pl-11 pr-4 text-xs text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                  />
                </div>
              </div>

              {/* Account Type */}
              <div>
                <label className="mb-2.5 block text-xs font-semibold text-slate-700">
                  Choose your account type
                </label>

                <div className="grid grid-cols-2 gap-3">

                  {/* Job Seeker */}
                  <button
                    type="button"
                    onClick={() => setRole("seeker")}
                    aria-pressed={role === "seeker"}
                    className={roleCardClass(role === "seeker")}
                  >
                    {role === "seeker" && (
                      <CheckCircle2
                        size={17}
                        className="absolute right-3 top-3 text-violet-600"
                      />
                    )}

                    <UserRound
                      size={21}
                      className={
                        role === "seeker"
                          ? "text-violet-600"
                          : "text-slate-400"
                      }
                    />

                    <p className="mt-3 text-xs font-bold text-slate-800">
                      Job Seeker
                    </p>

                    <p className="mt-1 text-[10px] text-slate-400">
                      Find your dream job
                    </p>
                  </button>

                  {/* Recruiter */}
                  <button
                    type="button"
                    onClick={() => setRole("recruiter")}
                    aria-pressed={role === "recruiter"}
                    className={roleCardClass(role === "recruiter")}
                  >
                    {role === "recruiter" && (
                      <CheckCircle2
                        size={17}
                        className="absolute right-3 top-3 text-violet-600"
                      />
                    )}

                    <BriefcaseBusiness
                      size={21}
                      className={
                        role === "recruiter"
                          ? "text-violet-600"
                          : "text-slate-400"
                      }
                    />

                    <p className="mt-3 text-xs font-bold text-slate-800">
                      Recruiter
                    </p>

                    <p className="mt-1 text-[10px] text-slate-400">
                      Hire talented people
                    </p>
                  </button>

                  {/* Admin */}
                  <button
                    type="button"
                    onClick={() => setRole("admin")}
                    aria-pressed={role === "admin"}
                    className={roleCardClass(role === "admin")}
                  >
                    {role === "admin" && (
                      <CheckCircle2
                        size={17}
                        className="absolute right-3 top-3 text-violet-600"
                      />
                    )}

                    <BriefcaseBusiness
                      size={21}
                      className={
                        role === "admin"
                          ? "text-violet-600"
                          : "text-slate-400"
                      }
                    />

                    <p className="mt-3 text-xs font-bold text-slate-800">
                      Admin
                    </p>

                    <p className="mt-1 text-[10px] text-slate-400">
                      Hire talented people
                    </p>
                  </button>

                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-700">
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
                    autoComplete="email"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-[#FAFAFC] pl-11 pr-4 text-xs text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-700">
                  Password
                </label>

                <div className="group relative">
                  <LockKeyhole
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-violet-600"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-[#FAFAFC] pl-11 pr-12 text-xs text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-violet-600"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-700">
                  Confirm Password
                </label>

                <div className="group relative">
                  <LockKeyhole
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-violet-600"
                  />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-[#FAFAFC] pl-11 pr-12 text-xs text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-violet-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-violet-600"
                />

                <label
                  htmlFor="terms"
                  className="cursor-pointer text-[11px] leading-5 text-slate-500"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="font-semibold text-violet-600 hover:text-violet-800"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="font-semibold text-violet-600 hover:text-violet-800"
                  >
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading || !agreeTerms}
                className="group relative flex h-[50px] w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(109,40,217,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(109,40,217,0.28)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <span className="relative">
                  {isLoading ? "Creating Account..." : "Create Your Account"}
                </span>

                {!isLoading && (
                  <ArrowRight
                    size={16}
                    className="relative transition-transform group-hover:translate-x-1"
                  />
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 py-1">
                <div className="h-px flex-1 bg-slate-200" />

                <span className="text-[9px] font-bold tracking-[1.5px] text-slate-400">
                  OR SIGN UP WITH
                </span>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* Google */}
              <button
                type="button"
                className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50"
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

            {/* Sign In */}
            <div className="mt-7 border-t border-slate-100 pt-6 text-center">
              <p className="text-xs text-slate-500">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="font-bold text-violet-600 transition-colors hover:text-violet-800"
                >
                  Sign In
                  <ArrowRight size={12} className="ml-1 inline" />
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-slate-400">
            <ShieldCheck size={13} className="text-emerald-500" />
            Your information is protected and secure.
          </div>
        </motion.section>
      </div>
    </main>
  );
};

export default SignUpPage;
