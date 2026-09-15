"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const dividerAspect = 1440 / 148;

type RepeatingDividerProps = {
  className?: string;
  duration?: number;
  src?: string;
  width?: string;
};

export function RepeatingDivider({
  className = "",
  duration = 16,
  src = "/themes/home/divider.svg",
  width = "100vw",
}: RepeatingDividerProps) {
  return (
    <div
      className={[
        "relative z-10 -mx-[max(1.25rem,calc(50vw-50%))] overflow-hidden",
        className,
      ].join(" ")}
    >
      <motion.div
        className="flex w-max items-center"
        animate={{ x: [0, -1440] }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
        aria-hidden="true"
      >
        <div
          className="relative shrink-0 mr-[-1px]"
          style={{ width, aspectRatio: `${dividerAspect}` }}
        >
          <Image src={src} alt="" fill className="object-cover" priority />
        </div>
        <div
          className="relative shrink-0 ml-[-1px]"
          style={{ width, aspectRatio: `${dividerAspect}` }}
        >
          <Image src={src} alt="" fill className="object-cover" />
        </div>
      </motion.div>
    </div>
  );
}
