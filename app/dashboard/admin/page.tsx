
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  Users,
  Building2,
  BriefcaseBusiness,
  CreditCard,
  Activity,
  Settings,
  UserRoundCog,
  ClipboardCheck,
  ChartNoAxesCombined,
  Clock3,
  ChevronRight,
  Zap,
  Globe,
  LockKeyhole,
  CheckCircle2,
  CircleDot,
  Database,
  LayoutGrid,
} from "lucide-react";

const overviewItems = [
  {
    title: "Total Users",
    description: "Registered platform members",
    icon: Users,
    color: "bg-blue-50 text-blue-600",
    href: "/admin/users",
  },
  {
    title: "Companies",
    description: "Companies on HireLoop",
    icon: Building2,
    color: "bg-violet-50 text-violet-600",
    href: "/admin/companies",
  },
  {
    title: "Total Jobs",
    description: "Job listings across the platform",
    icon: BriefcaseBusiness,
    color: "bg-emerald-50 text-emerald-600",
    href: "/admin/jobs",
  },
  {
    title: "Payments",
    description: "Platform payment management",
    icon: CreditCard,
    color: "bg-orange-50 text-orange-600",
    href: "/admin/payments",
  },
];

const quickActions = [
  {
    title: "Manage Users",
    description: "View and manage registered members.",
    icon: Users,
    href: "/admin/users",
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Manage Companies",
    description: "Monitor companies and their accounts.",
    icon: Building2,
    href: "/admin/companies",
    color: "bg-violet-50 text-violet-600",
  },
  {
    title: "Manage Jobs",
    description: "Review and manage job listings.",
    icon: BriefcaseBusiness,
    href: "/admin/jobs",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Manage Payments",
    description: "Monitor transactions and billing.",
    icon: CreditCard,
    href: "/admin/payments",
    color: "bg-orange-50 text-orange-600",
  },
];

const managementSteps = [
  {
    number: "01",
    title: "Manage platform users",
    description: "Keep user accounts organized and maintain platform access.",
    icon: Users,
  },
  {
    number: "02",
    title: "Monitor companies and jobs",
    description: "Oversee company activities and job listing quality.",
    icon: Building2,
  },
  {
    number: "03",
    title: "Maintain platform operations",
    description: "Monitor payments, security and overall platform activity.",
    icon: ShieldCheck,
  },
];

const AdminDashboardPage = () => {
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
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-300/20 bg-indigo-500/10 px-4 py-2 text-xs font-medium text-indigo-200">
                <ShieldCheck size={15} />
                ADMIN CONTROL CENTER
              </div>

              <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[46px]">
                Welcome to your
                <span className="mt-2 block bg-gradient-to-r from-indigo-300 to-blue-300 bg-clip-text text-transparent">
                  Platform Command Center.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Manage your HireLoop ecosystem from one place.
                Oversee users, companies, job listings and platform
                operations with confidence.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/admin/users"
                  className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 shadow-lg transition-all hover:-translate-y-1 hover:bg-indigo-50"
                >
                  <UserRoundCog size={18} />
                  Manage Platform
                  <ArrowUpRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>

                <Link
                  href="/admin/jobs"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
                >
                  Review Jobs
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>

            {/* Admin Hero Visual */}
            <div className="relative mx-auto hidden w-full max-w-[340px] lg:block">
              <div className="relative rounded-[28px] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">
                      PLATFORM MANAGEMENT
                    </p>
                    <h3 className="mt-1 text-lg font-semibold">
                      Admin Overview
                    </h3>
                  </div>

                  <div className="rounded-xl bg-indigo-500/20 p-3 text-indigo-300">
                    <LayoutGrid size={23} />
                  </div>
                </div>

                <div className="mt-7 grid grid-cols-2 gap-3">
                  {[
                    { label: "Users", icon: Users },
                    { label: "Companies", icon: Building2 },
                    { label: "Jobs", icon: BriefcaseBusiness },
                    { label: "Payments", icon: CreditCard },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4"
                      >
                        <Icon size={20} className="text-indigo-300" />
                        <p className="mt-3 text-sm font-semibold">
                          {item.label}
                        </p>
                        <p className="mt-1 text-[10px] text-slate-400">
                          Management
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                  <div className="rounded-xl bg-emerald-400/15 p-2 text-emerald-300">
                    <ShieldCheck size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Platform Control
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Everything in one place
                    </p>
                  </div>

                  <CheckCircle2
                    size={19}
                    className="ml-auto text-emerald-300"
                  />
                </div>
              </div>

              <div className="absolute -right-5 top-12 flex items-center gap-2 rounded-xl border border-white/10 bg-[#202b40] px-4 py-3 shadow-xl">
                <div className="rounded-lg bg-emerald-400/15 p-2 text-emerald-300">
                  <LockKeyhole size={17} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-white">
                    Admin Access
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Control & Security
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Platform Overview */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[2px] text-indigo-600">
                Platform insights
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                Platform Overview
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Monitor the key areas of your HireLoop platform.
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
              Platform operations
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Access your essential management tools.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
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
                    className="group flex h-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-slate-200/60"
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

          {/* Management Roadmap */}
          <section className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-indigo-600">
                  <ChartNoAxesCombined size={17} />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Administration
                  </span>
                </div>

                <h2 className="mt-3 text-xl font-bold">
                  Platform Management
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Keep every part of your platform under control.
                </p>
              </div>

              <div className="hidden rounded-xl bg-indigo-50 p-3 text-indigo-600 sm:block">
                <ShieldCheck size={23} />
              </div>
            </div>

            <div className="mt-8 space-y-6">
              {managementSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div key={step.number} className="group flex gap-4">
                    <div className="relative">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                        <Icon size={21} />
                      </div>

                      {index !== managementSteps.length - 1 && (
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

            {/* Platform Activity */}
            <section className="rounded-[24px] border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold">
                    Platform Activity
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Recent platform management updates.
                  </p>
                </div>

                <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
                  <Activity size={20} />
                </div>
              </div>

              <div className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-5 py-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm">
                  <Database size={21} />
                </div>

                <h3 className="mt-4 text-sm font-semibold">
                  No activity available
                </h3>

                <p className="mt-2 max-w-[230px] text-xs leading-5 text-slate-500">
                  Platform activities will appear here once activity
                  tracking is connected.
                </p>
              </div>
            </section>

            {/* Admin Security */}
            <section className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-indigo-600 to-blue-700 p-6 text-white">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border-[20px] border-white/10" />

              <div className="relative">
                <div className="inline-flex rounded-xl bg-white/15 p-3">
                  <ShieldCheck size={22} />
                </div>

                <h2 className="mt-5 text-xl font-bold">
                  Keep HireLoop secure.
                </h2>

                <p className="mt-2 text-sm leading-6 text-indigo-100">
                  Maintain platform settings and keep your administrative
                  controls organized.
                </p>

                <Link
                  href="/admin/settings"
                  className="group mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-700 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  Admin Settings
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
            HireLoop Administration · Manage smarter, grow better.
          </p>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Globe size={15} />
            Platform Control Center
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboardPage;
