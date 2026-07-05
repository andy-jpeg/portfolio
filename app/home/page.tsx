"use client";

import { useState } from "react";

export default function HomePage() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <main
      className="min-h-screen bg-white text-zinc-900"
      style={{
        backgroundImage: "url('/themes/father3/background.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "120px",
        fontFamily: "Apple Kid, sans-serif",
      }}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-8 px-6 py-12 sm:px-8 lg:px-12">
        <h1 className="text-center text-6xl sm:text-7xl lg:text-8xl">
          Hello This Is Ness From The Hit Game Earthbound
        </h1>

        <div
          className="h-64 w-64 cursor-pointer rounded-2xl border border-zinc-300/0 shadow-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            backgroundImage: `url('/themes/father3/andy/${isHovered ? "pose.png" : "walking.gif"}')`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundColor: "transparent",
          }}
        />
      </div>
    </main>
  );
}
