"use client";

import type { ReactNode } from "react";
import { ReactLenis } from "lenis/react";

// Eases out quickly at first, then settles — the same curve used for the
// "back to top" button, so both feel identical.
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: easeOutExpo,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
