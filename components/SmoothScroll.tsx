"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis } from "lenis/react";

// Eases out quickly at first, then settles — the same curve used for the
// "back to top" button, so both feel identical.
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

// Father2 sticks with native scrolling, so it's opted out by route here
// instead of wrapping every page individually.
const SMOOTH_SCROLL_DISABLED_ROUTES = ["/father2"];

// Lenis's JS-driven scrolling is a mouse-wheel enhancement. On touch
// devices it fights the browser's own momentum/rubber-band scrolling —
// that's what was causing mobile to sometimes get stuck a bit short of
// the very top or very bottom of the page. Detect a touch-primary device
// and just fall back to native scrolling there.
const COARSE_POINTER_QUERY = "(pointer: coarse)";

function subscribeToPointerType(onChange: () => void) {
  const query = window.matchMedia(COARSE_POINTER_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getIsCoarsePointer() {
  return window.matchMedia(COARSE_POINTER_QUERY).matches;
}

function getIsCoarsePointerServerSnapshot() {
  return false;
}

function useIsCoarsePointer() {
  return useSyncExternalStore(
    subscribeToPointerType,
    getIsCoarsePointer,
    getIsCoarsePointerServerSnapshot,
  );
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isCoarsePointer = useIsCoarsePointer();
  const isRouteDisabled = SMOOTH_SCROLL_DISABLED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isRouteDisabled || isCoarsePointer) {
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
