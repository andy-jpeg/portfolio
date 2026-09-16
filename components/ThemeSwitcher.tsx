"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, Palette } from "lucide-react";

type ThemedPage = {
  label: string;
  href: string;
};

const THEMED_PAGES: ThemedPage[] = [
  { label: "home", href: "/" },
  { label: "father 2", href: "/father2" },
];

export function ThemeSwitcher() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click / Escape so the menu behaves like a normal
  // lightweight popover instead of needing a full dropdown library.
  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="fixed top-4 right-4 z-50 sm:top-6 sm:right-6"
    >
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Switch theme"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-black shadow-[0_2px_6px_rgba(0,0,0,0.25)] transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        <Palette className="h-5 w-5 text-white" aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-label="Themed pages"
          className="absolute right-0 mt-2 w-44 overflow-hidden rounded-sm border border-black bg-white py-1"
        >
          {THEMED_PAGES.map((page) => {
            const isCurrent = pathname === page.href;

            if (isCurrent) {
              return (
                <div
                  key={page.href}
                  role="menuitem"
                  aria-current="page"
                  aria-disabled="true"
                  className="flex cursor-default items-center justify-between gap-2 bg-black/10 px-3 py-2 text-sm text-black/70"
                  style={{ fontFamily: "Anonymous Pro" }}
                >
                  <span>{page.label}</span>
                  <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                </div>
              );
            }

            return (
              <Link
                key={page.href}
                href={page.href}
                role="menuitem"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between gap-2 px-3 py-2 text-sm text-black transition-colors hover:bg-black/5"
                style={{ fontFamily: "Anonymous Pro" }}
              >
                <span>{page.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
