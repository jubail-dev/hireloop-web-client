
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Users,
} from "lucide-react";

const popularSearches = [
  "Frontend Developer",
  "UI/UX Designer",
  "Full Stack",
  "Product Manager",
];

const stats = [
  { value: "50K+", label: "Open Opportunities", icon: BriefcaseBusiness },
  { value: "8.5K+", label: "Trusted Companies", icon: Building2 },
  { value: "15K+", label: "Career Success Stories", icon: Users },
];

const Hero = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (query.trim()) params.set("search", query.trim());
    if (location.trim()) params.set("location", location.trim());

    window.location.href = `/jobs?${params.toString()}`;
  };

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#08090d] text-white">

      {/* Subtle Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-300px] h-[650px] w-[850px] -translate-x-1/2 rounded-full bg-indigo-500/[0.09] blur-[150px]" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#08090d_85%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-5 pb-16 pt-32 text-center sm:px-8 lg:pt-36">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-xs font-medium tracking-wide text-gray-300 backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            The future of finding work
            <ArrowUpRight size={13} className="text-gray-500" />
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1 }}
          className="max-w-5xl"
        >
          <h1 className="text-[48px] font-semibold leading-[1.08] tracking-[-0.065em] sm:text-7xl md:text-8xl lg:text-[104px]">
            Find your next
            <br />

            <span className="bg-gradient-to-r from-white via-[#c7c9ff] to-[#8985f5] bg-clip-text text-transparent">
              opportunity.
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-gray-400 sm:text-base sm:leading-8">
            Great careers begin with great opportunities.
            Explore meaningful jobs, discover exceptional companies,
            and make your next move.
          </p>
        </motion.div>

        {/* Search Interface */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-12 w-full max-w-4xl"
        >
          <form
            onSubmit={handleSearch}
            className="rounded-2xl border border-white/[0.12] bg-[#15161c]/90 p-2 shadow-[0_25px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-300 focus-within:border-indigo-400/40 sm:rounded-[22px] sm:p-3"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-center">

              {/* Search Input */}
              <div className="flex flex-1 items-center gap-3 rounded-xl px-4 py-4 text-left transition-colors hover:bg-white/[0.025]">
                <Search size={21} className="shrink-0 text-gray-400" />

                <div className="min-w-0 flex-1">
                  <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-500">
                    What are you looking for?
                  </label>

                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Job title, skills or keywords"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div className="hidden h-10 w-px bg-white/10 md:block" />

              {/* Location Input */}
              <div className="flex flex-1 items-center gap-3 rounded-xl px-4 py-4 text-left transition-colors hover:bg-white/[0.025]">
                <MapPin size={21} className="shrink-0 text-gray-400" />

                <div className="min-w-0 flex-1">
                  <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-500">
                    Location
                  </label>

                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, country or remote"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                  />
                </div>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-semibold text-black transition-all duration-300 hover:bg-indigo-100"
              >
                Explore Jobs
                <ArrowUpRight size={17} />
              </button>
            </div>
          </form>
        </motion.div>

        {/* Popular Searches */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-7 flex max-w-3xl flex-wrap items-center justify-center gap-2.5"
        >
          <span className="mr-1 text-xs text-gray-500">
            Popular searches
          </span>

          {popularSearches.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setQuery(tag)}
              className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3.5 py-2 text-xs text-gray-400 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.07] hover:text-white"
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-24 grid w-full max-w-4xl grid-cols-1 gap-8 border-t border-white/[0.09] pt-10 sm:grid-cols-3"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="flex items-center justify-center gap-3"
              >
                <Icon size={19} className="text-indigo-300/80" />

                <div className="text-left">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {stat.value}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Footer Caption */}
        <div className="mt-14 text-[10px] font-medium uppercase tracking-[0.3em] text-gray-600">
          Discover more. Achieve more.
        </div>

      </div>
    </section>
  );
};

export default Hero;
