"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis } from "lenis/react";

// Eases out quickly at first, then settles — the same curve used for the
// "back to top" button, so both feel identical.
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

// Father2 sticks with native scrolling, so it's opted out by route here
// instead of wrapping every page individually.
const SMOOTH_SCROLL_DISABLED_ROUTES = ["/father2"];

export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDisabled = SMOOTH_SCROLL_DISABLED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isDisabled) {
    return <>{children}</>;
  }

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
