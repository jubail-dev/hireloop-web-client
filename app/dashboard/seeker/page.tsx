
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  BriefcaseBusiness,
  Bookmark,
  FileText,
  CalendarDays,
  UserRound,
  Sparkles,
  Target,
  Clock3,
  CheckCircle2,
  CircleDot,
  TrendingUp,
  Rocket,
  GraduationCap,
  MapPin,
  Settings,
  ChevronRight,
  Zap,
  Compass,
} from "lucide-react";

const overviewItems = [
  {
    title: "Saved Jobs",
    description: "Jobs you bookmarked for later",
    icon: Bookmark,
    color: "bg-amber-50 text-amber-600",
    href: "/saved-jobs",
  },
  {
    title: "Applications",
    description: "Track your submitted applications",
    icon: FileText,
    color: "bg-indigo-50 text-indigo-600",
    href: "/applications",
  },
  {
    title: "Interviews",
    description: "Your upcoming interview schedule",
    icon: CalendarDays,
    color: "bg-emerald-50 text-emerald-600",
    href: "/applications",
  },
  {
    title: "Profile Views",
    description: "Employers discovering your profile",
    icon: UserRound,
    color: "bg-violet-50 text-violet-600",
    href: "/settings",
  },
];

const quickActions = [
  {
    title: "Explore Jobs",
    description: "Discover opportunities that match your skills.",
    icon: Search,
    href: "/jobs",
    color: "bg-indigo-50 text-indigo-600",
    featured: true,
  },
  {
    title: "Saved Jobs",
    description: "Revisit the jobs you are interested in.",
    icon: Bookmark,
    href: "/saved-jobs",
    color: "bg-amber-50 text-amber-600",
  },
  {
    title: "My Applications",
    description: "Keep track of your career opportunities.",
    icon: FileText,
    href: "/applications",
    color: "bg-emerald-50 text-emerald-600",
  },
];

const careerSteps = [
  {
    number: "01",
    title: "Discover opportunities",
    description: "Explore jobs that align with your skills and career goals.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Apply with confidence",
    description: "Submit applications and showcase your strengths.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Land your dream job",
    description: "Connect with employers and take your next career step.",
    icon: Rocket,
  },
];

const SeekerDashboardPage = () => {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900">
      <div className="mx-auto max-w-[1440px] space-y-8 px-4 py-7 sm:px-6 lg:px-10 lg:py-10">

        {/* Welcome Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[28px] bg-[#111827] px-6 py-9 text-white sm:px-10 sm:py-12 lg:px-14"
        >
          <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-indigo-500/20 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-40 right-1/3 h-72 w-72 rounded-full bg-blue-500/20 blur-[90px]" />

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.4fr_0.6fr]">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-xs font-medium text-indigo-200">
                <Sparkles size={14} />
                YOUR CAREER WORKSPACE
              </div>

              <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[46px]">
                Your next chapter
                <span className="mt-2 block bg-gradient-to-r from-indigo-300 to-blue-300 bg-clip-text text-transparent">
                  starts with one opportunity.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Welcome to HireLoop. Discover exciting opportunities,
                connect with great companies and take the next step
                towards your dream career.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/jobs"
                  className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 shadow-lg transition-all hover:-translate-y-1 hover:bg-indigo-50"
                >
                  <Search size={18} />
                  Explore Jobs
                  <ArrowUpRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>

                <Link
                  href="/saved-jobs"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
                >
                  <Bookmark size={17} />
                  Saved Jobs
                </Link>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative mx-auto hidden w-full max-w-[340px] lg:block">
              <div className="relative rounded-[28px] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">
                      CAREER PROGRESS
                    </p>
                    <h3 className="mt-1 text-lg font-semibold">
                      Your journey starts here
                    </h3>
                  </div>

                  <div className="rounded-xl bg-indigo-500/20 p-3 text-indigo-300">
                    <GraduationCap size={23} />
                  </div>
                </div>

                <div className="mt-7 space-y-5">
                  {[
                    "Build your profile",
                    "Find matching jobs",
                    "Submit applications",
                  ].map((item, index) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-indigo-200">
                        0{index + 1}
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-200">
                          {item}
                        </p>
                        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
                          <div className="h-full w-0 rounded-full bg-indigo-400" />
                        </div>
                      </div>

                      <CircleDot size={17} className="text-slate-500" />
                    </div>
                  ))}
                </div>

                <div className="mt-7 rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-4">
                  <div className="flex items-center gap-2 text-indigo-200">
                    <Zap size={16} />
                    <span className="text-xs font-semibold">
                      YOUR NEXT OPPORTUNITY
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Every great career begins with a single step.
                  </p>
                </div>
              </div>

              <div className="absolute -right-5 top-12 flex items-center gap-2 rounded-xl border border-white/10 bg-[#202b40] px-4 py-3 shadow-xl">
                <div className="rounded-lg bg-emerald-400/15 p-2 text-emerald-300">
                  <Target size={17} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">
                    Career Growth
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Your journey matters
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Career Overview */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[2px] text-indigo-600">
                Your career at a glance
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                Career Overview
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Keep track of your job search activities.
              </p>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-500">
              <Clock3 size={14} />
              Live data coming soon
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {overviewItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.08 }}
                >
                  <Link
                    href={item.href}
                    className="group block rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/40"
                  >
                    <div className="flex items-start justify-between">
                      <div className={`rounded-xl p-3 ${item.color}`}>
                        <Icon size={21} />
                      </div>

                      <span className="text-2xl font-bold text-slate-300">
                        —
                      </span>
                    </div>

                    <h3 className="mt-5 text-base font-bold">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {item.description}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Quick Actions */}
        <section>
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[2px] text-indigo-600">
              Explore your opportunities
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">
              Quick Actions
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Your career tools, just one click away.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;

              return (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Link
                    href={action.href}
                    className={`group flex h-full items-center gap-4 rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                      action.featured
                        ? "border-indigo-200 bg-indigo-50/60 hover:shadow-indigo-100"
                        : "border-slate-200 bg-white hover:border-indigo-200 hover:shadow-slate-200/60"
                    }`}
                  >
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${action.color}`}
                    >
                      <Icon size={25} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold">{action.title}</h3>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {action.description}
                      </p>
                    </div>

                    <ChevronRight
                      size={20}
                      className="shrink-0 text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-indigo-600"
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Bottom Sections */}
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">

          {/* Career Journey */}
          <section className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-indigo-600">
                  <TrendingUp size={17} />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Your roadmap
                  </span>
                </div>

                <h2 className="mt-3 text-xl font-bold">
                  Your Career Journey
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Three steps closer to your dream career.
                </p>
              </div>

              <div className="hidden rounded-xl bg-indigo-50 p-3 text-indigo-600 sm:block">
                <Rocket size={23} />
              </div>
            </div>

            <div className="mt-8 space-y-6">
              {careerSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div key={step.number} className="group flex gap-4">
                    <div className="relative">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                        <Icon size={21} />
                      </div>

                      {index !== careerSteps.length - 1 && (
                        <div className="absolute left-1/2 top-14 h-8 w-px -translate-x-1/2 border-l border-dashed border-slate-300" />
                      )}
                    </div>

                    <div className="flex-1 pb-2">
                      <span className="text-[10px] font-bold tracking-widest text-indigo-500">
                        STEP {step.number}
                      </span>

                      <h3 className="mt-1 text-sm font-bold">
                        {step.title}
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Right Side */}
          <div className="space-y-6">

            {/* Recent Activity */}
            <section className="rounded-[24px] border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold">
                    Recent Activity
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Your latest career updates.
                  </p>
                </div>

                <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
                  <Zap size={20} />
                </div>
              </div>

              <div className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-5 py-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm">
                  <Search size={21} />
                </div>

                <h3 className="mt-4 text-sm font-semibold">
                  Your journey starts here
                </h3>

                <p className="mt-2 max-w-[230px] text-xs leading-5 text-slate-500">
                  Your saved jobs and application updates will appear here.
                </p>
              </div>
            </section>

            {/* Career Tips */}
            <section className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-indigo-600 to-blue-700 p-6 text-white">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border-[20px] border-white/10" />

              <div className="relative">
                <div className="inline-flex rounded-xl bg-white/15 p-3">
                  <GraduationCap size={22} />
                </div>

                <h2 className="mt-5 text-xl font-bold">
                  Your dream job awaits.
                </h2>

                <p className="mt-2 text-sm leading-6 text-indigo-100">
                  Keep your profile updated, explore new opportunities
                  and never stop growing.
                </p>

                <Link
                  href="/settings"
                  className="group mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-700 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  Improve Your Profile
                  <ArrowUpRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6">
          <p className="text-xs text-slate-500">
            Your next opportunity starts with HireLoop.
          </p>

          <Link
            href="/settings"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition-colors hover:text-indigo-600"
          >
            <Settings size={15} />
            Account Settings
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SeekerDashboardPage;
