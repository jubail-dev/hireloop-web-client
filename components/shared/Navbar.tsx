
"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  ArrowUpRight,
  Menu,
  X,
  Sparkles,
  User,
  LayoutDashboard,
  LogOut,
  ChevronDown,
} from "lucide-react"
import logo from "@/app/images/logo.png"
import { useSession, signOut } from "@/lib/auth-client"



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const router = useRouter()
  const { data: session, isPending } = useSession()

  const handleSignOut = async () => {
    try {
      await signOut()
      setDropdownOpen(false)
      setIsOpen(false)
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Sign out failed:", error)
    }
  }

  const navLinks = [
  { name: "Browse Jobs", href: "/jobs" },
  { name: "Company", href: "/company" },
  { name: "Pricing", href: "/pricing" },
  { name: "Dashboard", href: `/dashboard/${session?.user?.role || "seeker"}` },
]

  const user = session?.user

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

          {!isPending && !user && (
            <>
              <Link
                href="/signin"
                className="text-[13px] font-semibold text-zinc-300 transition-colors hover:text-white"
              >
                Sign In
              </Link>

              <Link href="/signup">
                <Button className="group relative h-11 overflow-hidden rounded-xl border border-indigo-400/20 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 px-6 text-[13px] font-semibold text-white shadow-[0_4px_25px_rgba(99,102,241,0.22)] transition-all duration-300 hover:-translate-y-0.5">
                  <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
                  <span className="relative flex items-center gap-2">
                    Get Started
                    <ArrowUpRight size={16} />
                  </span>
                </Button>
              </Link>
            </>
          )}

          {/* Logged In User */}
          {!isPending && user && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 transition-all hover:border-indigo-400/30 hover:bg-white/[0.08]"
              >
                <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      width={36}
                      height={36}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    user.name?.charAt(0).toUpperCase() || "U"
                  )}
                </div>

                <div className="text-left">
                  <p className="max-w-[120px] truncate text-xs font-semibold text-white">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-zinc-500">My Account</p>
                </div>

                <ChevronDown
                  size={15}
                  className={`text-zinc-400 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setDropdownOpen(false)}
                  />

                  <div className="absolute right-0 top-14 z-50 w-60 overflow-hidden rounded-2xl border border-white/10 bg-[#141419] p-2 shadow-2xl shadow-black/40">
                    <div className="border-b border-white/[0.07] px-3 py-3">
                      <p className="truncate text-sm font-semibold text-white">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-zinc-500">
                        {user.email}
                      </p>
                    </div>

                    <div className="space-y-1 py-2">
                      <Link
                        href={`/dashboard/${session?.user?.role}`}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                      >
                        <LayoutDashboard size={17} />
                        Dashboard
                      </Link>

                      <Link
                        href="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                      >
                        <User size={17} />
                        My Profile
                      </Link>
                    </div>

                    <div className="border-t border-white/[0.07] pt-2">
                      <button
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10"
                      >
                        <LogOut size={17} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
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

            {/* Mobile Auth Actions */}
            {!isPending && !user && (
              <div className="flex flex-col gap-3">
                <Link
                  href="/signin"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border border-white/[0.08] py-3 text-center text-sm font-semibold text-zinc-300 transition-colors hover:bg-white/[0.05]"
                >
                  Sign In
                </Link>

                <Link href="/signup" onClick={() => setIsOpen(false)}>
                  <Button className="h-12 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-sm font-semibold text-white">
                    Get Started
                    <ArrowUpRight size={17} className="ml-2" />
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Logged In User */}
            {!isPending && user && (
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
                  <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 font-bold text-white">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || "User"}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      user.name?.charAt(0).toUpperCase() || "U"
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-zinc-500">
                      {user.email}
                    </p>
                  </div>
                </div>

                <Link
                  href={`dashboard/${session?.user?.role}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-zinc-300 hover:bg-white/[0.05] hover:text-white"
                >
                  <LayoutDashboard size={17} />
                  Dashboard
                </Link>

                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-zinc-300 hover:bg-white/[0.05] hover:text-white"
                >
                  <User size={17} />
                  My Profile
                </Link>

                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10"
                >
                  <LogOut size={17} />
                  Sign Out
                </button>
              </div>
            )}

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
