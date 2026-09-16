"use client";

import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type ExperienceEntry = {
  title: string;
  company: string;
  date: string;
};

// TODO: swap in more entries here as your history grows — order is
// most-recent-first.
const EXPERIENCE: ExperienceEntry[] = [
  {
    title: "Full-Stack Engineer",
    company: "The Agency | Student Org",
    date: "Aug 2026 – Present",
  },
  {
    title: "Software Engineering Intern",
    company: "Lowe’s Companies, Inc.",
    date: "May 2026 – Aug 2026",
  },
  {
    title: "Software Engineer",
    company: "Society of Asian Scientists and Engineers | Student Org",
    date: "Sep 2025 – May 2026",
  },
];

// Each entry fades/slides up as it scrolls into view, staggered by index
// (same easing language as the hero's title/description reveal).
const entryVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: index * 0.08,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function ExperienceTimeline() {
  return (
    // No gap here on purpose: the vertical connector line lives inside
    // each entry and stretches to match that entry's own height (via
    // flex align-items: stretch), so the spacing between entries has to
    // come from padding on the content column instead of a flex `gap` —
    // a `gap` leaves empty space the line can't reach into, which is why
    // it used to fall short of the next dot.
    <ol className="relative flex flex-col">
      {EXPERIENCE.map((entry, index) => {
        const isLast = index === EXPERIENCE.length - 1;

        return (
          <motion.li
            key={`${entry.company}-${entry.title}`}
            className="relative flex items-stretch gap-5"
            custom={index}
            variants={entryVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="relative flex w-3 flex-col items-center">
              <span
                className="mt-2 h-2.5 w-2.5 shrink-0 border border-black bg-white"
                aria-hidden="true"
              />
              {!isLast && (
                <Separator
                  orientation="vertical"
                  className="mt-2 flex-1 bg-black/35"
                />
              )}
            </div>

            <div className={isLast ? "flex-1 pb-2" : "flex-1 pb-10"}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-2xl tracking-tight text-black">
                  {entry.title}
                </h3>
                <Badge style={{ fontFamily: "Anonymous Pro" }} size="lg">
                  {entry.date}
                </Badge>
              </div>
              <p
                className="mt-1 text-lg text-black/70"
                style={{ fontFamily: "Anonymous Pro" }}
              >
                {entry.company}
              </p>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
