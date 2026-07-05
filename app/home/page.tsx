"use client";

import { useEffect, useState } from "react";

const walkingSprite = "/themes/father3/andy/walking.gif";
const poseSprite = "/themes/father3/andy/pose.png";

export default function HomePage() {
  const [isHovered, setIsHovered] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const preloadImage = (src: string) =>
      new Promise<void>((resolve) => {
        const img = new window.Image();
        img.src = src;
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });

    Promise.all([preloadImage(walkingSprite), preloadImage(poseSprite)]).then(
      () => {
        if (!isCancelled) {
          setImagesReady(true);
        }
      },
    );

    return () => {
      isCancelled = true;
    };
  }, []);

  const currentSprite = isHovered ? poseSprite : walkingSprite;

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
            backgroundImage: `url('${currentSprite}')`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundColor: "transparent",
            opacity: imagesReady ? 1 : 0.01,
          }}
        />
      </div>
    </main>
  );
}
