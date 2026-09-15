"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";

import ScrollingText from "@/components/home/ScrollingText";
import { RepeatingDivider } from "@/components/home/RepeatingDivider";
import { SectionHeader } from "@/components/home/SectionHeader";

export default function Home() {
  // No duration/easing passed here on purpose: Lenis falls back to the
  // options configured on the root instance (see SmoothScroll.tsx), so
  // this uses the exact same easing curve as the page's smooth scrolling.
  const lenis = useLenis();
  const scrollToTop = () => lenis?.scrollTo(0);

  return (
    <main
      id="page-top"
      className="relative min-h-screen overflow-x-visible bg-white  px-5 sm:px-8 lg:px-16"
      aria-label="Home"
    >
      <div className="absolute inset-0 bg-white" aria-hidden="true" />
      <motion.div
        aria-hidden="true"
        className="absolute inset-[-20%]"
        style={{
          backgroundColor: "#ffffff",
          backgroundImage:
            "linear-gradient(to right, rgba(80, 80, 80, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(80, 80, 80, 0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          willChange: "transform",
          transform: "translate3d(0,0,0)",
        }}
        animate={{ x: [0, 40, 80, 120], y: [0, 40, 80, 120] }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      />

      <section className="relative z-10 min-h-screen overflow-visible">
        <div className="relative mx-auto flex min-h-screen w-full max-w-none">
          <div className="relative z-10 flex flex-col items-start gap-2 justify-center py-16">
            <p className="text-3xl tracking-tight text-black">hi, i&apos;m</p>
            <p className="-mt-3 mb-2 text-7xl tracking-tight text-black">
              andy!
            </p>
            <p
              className="text-3xl tracking-tight text-black"
              style={{ fontFamily: "Anonymous Pro" }}
            >
              an aspiring software engineer
              <br />
              pursuing interests in full-stack,
              <br />
              game design, cloud, & product{" "}
              <span style={{ fontFamily: "sans-serif" }}>☺</span>
            </p>
          </div>

          <div className="pointer-events-none absolute right-[-5rem] top-1/2 z-0 h-[420px] w-[100vw] -translate-y-1/2 md:h-[500px]">
            <Image
              src="/themes/home/hero.svg"
              alt="Andy hero illustration"
              fill
              className="object-contain object-right"
              priority
            />
          </div>
        </div>
      </section>

      <RepeatingDivider />

      <section className="relative z-10 mx-auto px-5 pr-[50%] w-full max-w-none py-16">
        <SectionHeader
          title="SKILLS"
          description="i’ve developed with multiple technologies through production-level projects & personal interests!"
        />
      </section>

      <div style={{ transform: "rotate(-14deg) translateY(-80px)" }}>
        <p
          className="text-left pl-5 sm:pl-8 lg:pl-16 text-5xl text-black mb-4"
          style={{ fontFamily: "Michroma" }}
        >
          LANGUAGES
        </p>
        <ScrollingText
          texts={[
            "Lua • Python • C++ • C# • HTML/CSS • JavaScript • TypeScript • SQL •",
          ]}
          velocity={20}
        />
      </div>

      <div style={{ transform: "rotate(-14deg) translateY(-25px)" }}>
        <p
          className="text-right pr-5 sm:pr-8 lg:pr-16 text-5xl text-black mb-4"
          style={{ fontFamily: "Michroma" }}
        >
          FRAMEWORKS
        </p>
        <ScrollingText
          texts={[
            "React • Next.js • Express • Tailwind • FastAPI • Node.js • Vite •",
          ]}
          velocity={20}
        />
      </div>

      <p className="relative z-10 text-right pr-5 sm:pr-8 lg:pr-16 text-2xl text-black my-4 max-w-2xl ml-auto">
        as you can tell, most of my technologies are primarily in{" "}
        <span className="font-bold">full-stack development!</span><br />i enjoy
        building end-to-end solutions that combine frontend elegance with strong
        reliability in the backend.
      </p>

      <div className="relative z-10 mb-24">
        <p
          className="text-left pl-5 sm:pl-8 lg:pl-16 text-5xl text-black mb-4"
          style={{ fontFamily: "Michroma" }}
        >
          TOOLS & PLATFORMS
        </p>
        <ScrollingText
          texts={[
            "Figma • Vercel • Render • PostgreSQL • MongoDB • Supabase • AWS • GitHub •",
          ]}
          velocity={20}
        />
      </div>

      <RepeatingDivider />

      <section className="relative z-10 mx-auto px-5 pr-[65%] w-full max-w-none py-16">
        <SectionHeader
          title="EXPERIENCE"
          description="i have completed an industry-level internship & multiple engineer roles across student orgs!"
        />
      </section>

      <RepeatingDivider />

      <section className="relative z-10 mx-auto px-5 pr-[65%] w-full max-w-none py-16">
        <SectionHeader
          title="PROJECTS"
          description="a lot of my projects have been made through Roblox Studio, Next.js, & Godot!"
        />
      </section>

      <footer className="relative z-10 flex flex-col gap-3 pb-0 pt-4 text-xl text-black sm:flex-row sm:items-center sm:justify-between">
        <p>made with ❤ by andy</p>
        <button
          type="button"
          className="w-fit underline underline-offset-4 transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          onClick={scrollToTop}
        >
          back to top
        </button>
      </footer>
    </main>
  );
}
