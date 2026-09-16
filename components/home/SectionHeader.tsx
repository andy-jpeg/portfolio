"use client";

import { motion } from "framer-motion";

type SectionHeaderProps = {
  title: string;
  description: string;
};

// Same reveal language as the hero's "andy!" title/description
// (app/page.tsx), just triggered by scroll instead of on mount — these
// section headers live below the fold.
const titleContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045, delayChildren: 0.1 },
  },
};

const letterVariants = {
  hidden: { y: "1.1em" },
  visible: {
    y: "0em",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const descriptionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <header>
      <motion.h2
        className="text-4xl uppercase tracking-tight text-black sm:text-5xl md:text-6xl"
        aria-label={title}
        variants={titleContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {title.split("").map((char, index) => (
          <span
            key={index}
            className="inline-block overflow-hidden align-bottom pb-[0.3em] -mb-[0.3em]"
            aria-hidden="true"
          >
            <motion.span className="inline-block" variants={letterVariants}>
              {char === " " ? " " : char}
            </motion.span>
          </span>
        ))}
      </motion.h2>
      <motion.p
        className="mt-2 text-base sm:text-lg md:text-xl"
        style={{ fontFamily: "Anonymous Pro" }}
        variants={descriptionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {description}
      </motion.p>
    </header>
  );
}
