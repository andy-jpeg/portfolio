"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const dividerAspect = 1440 / 148;

type RepeatingDividerProps = {
  className?: string;
  duration?: number;
  src?: string;
  height?: string;
};

export function RepeatingDivider({
  className = "",
  duration = 16,
  src = "/themes/home/divider.svg",
  height = `calc(100vw * ${148 / 1440})`,
}: RepeatingDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tileWidth, setTileWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateTileWidth = () => {
      setTileWidth(el.clientHeight * dividerAspect);
    };

    updateTileWidth();

    const observer = new ResizeObserver(updateTileWidth);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={[
        "relative z-10 -mx-[max(1.25rem,calc(50vw-50%))] overflow-hidden",
        className,
      ].join(" ")}
      style={{ height }}
      aria-hidden="true"
    >
      {tileWidth > 0 && (
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${src})`,
            backgroundRepeat: "repeat-x",
            backgroundSize: `${tileWidth}px 100%`,
            backgroundPositionY: 0,
          }}
          animate={{ backgroundPositionX: [0, -tileWidth] }}
          transition={{
            duration,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      )}
    </div>
  );
}
