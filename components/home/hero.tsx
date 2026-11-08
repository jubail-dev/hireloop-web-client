"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Briefcase, Search, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import globe from "@/app/images/globe.png"
import adobe from "@/app/images/logos/adobe.png"
import airbnb from "@/app/images/logos/airbnb.png"
import amazon from "@/app/images/logos/amazon.png"
import apple from "@/app/images/logos/apple.png"
import google from "@/app/images/logos/google.png"
import meta from "@/app/images/logos/meta.png"
import microsoft from "@/app/images/logos/microsoft.png"
import netflix from "@/app/images/logos/netflix.png"
import nvidia from "@/app/images/logos/nvidia.png"
import spotify from "@/app/images/logos/spotify.png"
import tesla from "@/app/images/logos/tesla.png"
import uber from "@/app/images/logos/uber.png"

const companyLogos = [
  { name: "Google", src: google },
  { name: "Apple", src: apple },
  { name: "Microsoft", src: microsoft },
  { name: "Meta", src: meta },
  { name: "Amazon", src: amazon },
  { name: "Netflix", src: netflix },
  { name: "Tesla", src: tesla },
  { name: "Uber", src: uber },
  { name: "Airbnb", src: airbnb },
  { name: "Spotify", src: spotify },
  { name: "Nvidia", src: nvidia },
  { name: "Adobe", src: adobe },
]

const stats = [
  { value: "12,400+", label: "Active Jobs" },
  { value: "2,300+", label: "Companies" },
  { value: "89,000+", label: "Job Seekers" },
  { value: "98%", label: "Satisfaction Rate" },
]

const fadeInUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
})

const Hero = () => {
  return (
    <section className="relative isolate overflow-hidden bg-[#08080b]">
      {/* Background: purple glow + starfield + planet horizon */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 top-0 z-0 flex justify-center"
      >
        <Image
          src={globe}
          alt=""
          priority
          className="h-auto w-full max-w-none min-w-[1200px] object-cover"
        />
        {/* Blend the planet's dark base into the page background */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#08080b] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 pt-36 pb-10 text-center sm:px-6 sm:pt-40">
        {/* Eyebrow badge */}
        <motion.div {...fadeInUp(0)}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-[13px] font-medium text-zinc-300 shadow-[0_0_25px_rgba(168,85,247,0.15)] backdrop-blur-md">
            <Sparkles size={14} className="text-fuchsia-400" />
            2,300+ companies are hiring right now
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeInUp(0.1)}
          className="mt-7 max-w-4xl text-5xl leading-[1.05] font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Find opportunities.
          <span className="mt-2 block bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text pb-2 text-transparent">
            Build your future.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          {...fadeInUp(0.2)}
          className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8"
        >
          HireLoop brings smart job search, salary insights, and one-click
          applications into a single platform — connecting ambitious talent with
          top companies around the world.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeInUp(0.3)}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            render={<Link href="/jobs" />}
            nativeButton={false}
            className="h-12 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 px-7 text-sm font-semibold text-white shadow-[0_4px_25px_rgba(99,102,241,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_35px_rgba(139,92,246,0.5)]"
          >
            <Search size={17} className="mr-2" />
            Search Jobs
          </Button>

          <Button
            render={<Link href="/dashboard/recruiter/jobs/new" />}
            nativeButton={false}
            className="h-12 rounded-xl border border-white/[0.1] bg-white/[0.04] px-7 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-fuchsia-400/30 hover:bg-white/[0.08] hover:shadow-[0_8px_30px_rgba(217,70,239,0.2)]"
          >
            <Briefcase size={17} className="mr-2" />
            Post a Job
          </Button>
        </motion.div>

        {/* Live stats */}
        <motion.dl
          {...fadeInUp(0.4)}
          className="mt-16 grid w-full max-w-4xl grid-cols-2 gap-x-6 gap-y-8 sm:mt-20 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1.5"
            >
              <dt className="order-2 text-[11px] font-semibold tracking-[0.18em] text-zinc-500 uppercase">
                {stat.label}
              </dt>
              <dd className="order-1 bg-gradient-to-b from-white to-indigo-300/80 bg-clip-text text-3xl font-bold text-transparent tabular-nums sm:text-4xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </motion.dl>

        {/* Featured companies marquee */}
        <motion.div
          {...fadeInUp(0.5)}
          className="mt-auto w-full max-w-5xl pt-16"
        >
          <p className="text-[10px] font-semibold tracking-[0.25em] text-zinc-600 uppercase">
            Featured companies hiring on HireLoop
          </p>

          <div className="mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <motion.div
              className="flex w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            >
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  aria-hidden={copy === 1}
                  className="flex min-w-full items-center justify-around"
                >
                  {companyLogos.map((logo) => (
                    <Image
                      key={`${copy}-${logo.name}`}
                      src={logo.src}
                      alt={copy === 1 ? "" : logo.name}
                      title={logo.name}
                      width={96}
                      height={30}
                      className="h-6 w-auto object-contain opacity-50 transition-opacity duration-300 hover:opacity-90 sm:h-7"
                    />
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
