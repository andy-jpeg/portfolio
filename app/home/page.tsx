"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Father3Textbox from "@components/father3/Father3Textbox";

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
      className="min-h-screen text-zinc-900"
      style={{
        backgroundImage: "url('/themes/father3/background.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "80px 80px",
        backgroundAttachment: "fixed",
        backgroundColor: "transparent",
        fontFamily: "Apple Kid, sans-serif",
      }}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-6 py-12 sm:px-8 lg:px-12">
        <h1 className="text-center text-6xl sm:text-7xl lg:text-8xl">
          Your Name, Please!
        </h1>

        <Father3Textbox width="40rem" minHeight={"auto"}>
          <div className="text-center text-xl leading-relaxed">
            <p>hi, im andy!</p>
            <p>student @ univ of fl</p>
          </div>
        </Father3Textbox>

        <div
          className="h-64 w-64 cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={currentSprite}
            alt="Andy's Sprite"
            width={256}
            height={256}
            className="h-full w-full object-contain"
            draggable={false}
            style={{ opacity: imagesReady ? 1 : 0.01 }}
          />
        </div>
      </div>
    </main>
  );
}
