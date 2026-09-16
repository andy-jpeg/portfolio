"use client";

import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type ProjectEntry = {
  title: string;
  description: string;
  // Leave this blank ("") to skip the "Project Link" box entirely for an
  // entry that doesn't have one yet.
  link?: string;
  stack: string;
};

// TODO: swap in more entries here as your history grows — order is
// most-recent-first.
const PROJECTS: ProjectEntry[] = [
  {
    title: "Libre3D",
    description: "visual 3d element builder for creators 🎨",
    link: "https://emilyapel.com/projects/1785288163186",
    stack: "React, TypeScript, AWS S3, Three.js, WebGL, Vite",
  },
  {
    title: "Studio Stack",
    description: "internal equipment checkout system for orgs 🖥️",
    link: "",
    stack: "React, TypeScript, Supabase, Tailwind, Vite",
  },
  {
    title: "Shello, World!",
    description: "upcoming 3d platformer about shells of code 🐚",
    link: "https://andyjpeg.itch.io/shello-world",
    stack: "Godot, Cloudflare R2, GitHub Actions",
  },
  {
    title: "Streaks Across the Canvas",
    description: "multiplayer drawing game on Roblox (100k+ visits!) 🖍️",
    link: "https://www.roblox.com/games/6460041062/become-a-crayon",
    stack: "Lua, Roblox Studio, MongoDB, HTTP/REST",
  },
  {
    title: "The World Beyond Us",
    description: "immersive puzzle game about a lost robot 🤖",
    link: "https://github.com/andy-jpeg/osc_minihack25/",
    stack: "Lua, Roblox Studio, HTTP/REST",
  },
];

// Pulled out so other components (the sh3lly caption on the homepage) can
// link to it without duplicating/hardcoding the URL.
export const SHELLO_WORLD_LINK =
  PROJECTS.find((project) => project.title === "Shello, World!")?.link ?? "";

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

export function ProjectsTimeline() {
  return (
    // No gap here on purpose — see the matching note in
    // ExperienceTimeline.tsx: the connector line stretches to match each
    // entry's own height, so spacing between entries comes from padding
    // on the content column instead of a flex `gap`.
    <ol className="relative flex flex-col">
      {PROJECTS.map((entry, index) => {
        const isLast = index === PROJECTS.length - 1;
        const hasLink = Boolean(entry.link && entry.link.trim() !== "");

        return (
          <motion.li
            key={`${entry.description}-${entry.title}`}
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
                {hasLink && (
                  <Badge
                    asChild
                    size="lg"
                    className="underline underline-offset-4"
                    style={{ fontFamily: "Anonymous Pro" }}
                  >
                    <a
                      href={entry.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Project Link
                    </a>
                  </Badge>
                )}
              </div>
              <p
                className="mt-1 text-lg text-black/70"
                style={{ fontFamily: "Anonymous Pro" }}
              >
                {entry.description}
              </p>
              <p
                className="mt-1 text-lg text-black/70 italic"
                style={{ fontFamily: "Anonymous Pro" }}
              >
                {entry.stack}
              </p>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
