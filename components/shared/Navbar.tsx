"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Menu, X, Sparkles } from "lucide-react"
import logo from "@/app/images/logo.png"

const navLinks = [
  { name: "Browse Jobs", href: "/jobs" },
  { name: "Company", href: "/company" },
  { name: "Pricing", href: "/pricing" },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#08080b]/85 px-4 py-4 backdrop-blur-2xl sm:px-6">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group relative flex shrink-0 items-center">
          <Image
            src={logo}
            alt="HireLoop Logo"
            width={150}
            height={45}
            priority
            className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group relative py-2 text-[13px] font-medium tracking-wide text-zinc-400 transition-colors duration-300 hover:text-white"
            >
              {link.name}

              <span className="absolute -bottom-1 left-0 h-[2px] w-0 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-5 lg:flex">
          <div className="h-5 w-px bg-white/10" />

          <Link
            href="/signin"
            className="text-[13px] font-semibold text-zinc-300 transition-colors duration-300 hover:text-white"
          >
            Sign In
          </Link>

          <Link href="/get-started">
            <Button className="group relative h-11 overflow-hidden rounded-xl border border-indigo-400/20 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 px-6 text-[13px] font-semibold text-white shadow-[0_4px_25px_rgba(99,102,241,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_35px_rgba(139,92,246,0.35)]">
              <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />

              <span className="relative flex items-center gap-2">
                Get Started
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-300 transition-all hover:border-indigo-400/30 hover:bg-white/[0.08] lg:hidden"
        >
          {isOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`grid transition-all duration-300 ease-in-out lg:hidden ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="mt-4 rounded-2xl border border-white/[0.08] bg-[#111116] p-5 shadow-2xl">
            {/* Mobile Brand Label */}
            <div className="mb-4 flex items-center gap-2 border-b border-white/[0.07] pb-4">
              <Sparkles size={15} className="text-violet-400" />
              <span className="text-[10px] font-semibold tracking-[0.2em] text-zinc-500 uppercase">
                Explore HireLoop
              </span>
            </div>

            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-zinc-300 transition-all hover:bg-white/[0.05] hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="my-4 h-px bg-white/[0.07]" />

            <div className="flex flex-col gap-3">
              <Link
                href="/signin"
                onClick={() => setIsOpen(false)}
                className="rounded-xl border border-white/[0.08] py-3 text-center text-sm font-semibold text-zinc-300 transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                Sign In
              </Link>

              <Link href="/get-started" onClick={() => setIsOpen(false)}>
                <Button className="h-12 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:from-indigo-500 hover:to-violet-500">
                  Get Started
                  <ArrowUpRight size={17} className="ml-2" />
                </Button>
              </Link>
            </div>

            <p className="mt-5 text-center text-[10px] tracking-wide text-zinc-600">
              Find opportunities. Build your future.
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
