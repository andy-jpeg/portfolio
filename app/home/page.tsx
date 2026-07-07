"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Textbox from "@/components/father3/Textbox";

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
      className="min-h-screen text-zinc-900 bg-transparent"
      style={{
        backgroundImage: "url('/themes/father3/background.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "80px 80px",
        backgroundAttachment: "fixed",
        backgroundColor: "transparent",
        fontFamily: "Apple Kid, sans-serif",
      }}
    >
      <div
        className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center px-6 py-12 sm:px-8 lg:px-12"
        style={{ gap: "4rem" }}
      >
        <div className="flex flex-row gap-8">
          <div
            className="h-64 w-64 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Image
              src={currentSprite}
              alt="Andy's Earthbound Sprite"
              width={256}
              height={256}
              className="relative h-full w-full object-contain"
              draggable={false}
              style={{ opacity: imagesReady ? 1 : 0.01 }}
            />
          </div>

          <Textbox
            width="40rem"
            minHeight={100}
            lineHeight={1.2}
            fontSize="4rem"
          >
            <div>
              <p>What is this boy&apos;s name?</p>
              <p>Andy</p>
            </div>
          </Textbox>
        </div>

        <Textbox width="40rem" minHeight={300} lineHeight={1.2} fontSize="4rem">
          <div>
            <p>
              second-year student @ univ of fl majoring in computer science &
              minoring in game design!!!
            </p>
          </div>
        </Textbox>
      </div>
    </main>
  );
}
