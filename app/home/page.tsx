"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Textbox from "@/components/father3/Textbox";
import walkingSprite from "@themes/father3/andy/side-walking.gif";
import idleSprite from "@themes/father3/andy/walking.gif";
import poseSprite from "@themes/father3/andy/pose.png";

const entryDuration = 2500;

export default function HomePage() {
  const [isHovered, setIsHovered] = useState(false);
  const [isEntryComplete, setIsEntryComplete] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    window.setTimeout(() => {
      if (!isCancelled) {
        setHasMounted(true);
      }
    }, 0);

    const entryTimer = window.setTimeout(() => {
      if (!isCancelled) {
        setIsEntryComplete(true);
      }
    }, entryDuration);

    return () => {
      isCancelled = true;
      window.clearTimeout(entryTimer);
    };
  }, []);

  const currentSprite = isHovered
    ? poseSprite
    : isEntryComplete
      ? idleSprite
      : walkingSprite;

  const spriteOffset = isHovered
    ? "0px"
    : isEntryComplete
      ? "0px"
      : hasMounted
        ? "0px"
        : "35vw";

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
        className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center py-12"
        style={{ gap: "4rem" }}
      >
        <div className="flex flex-row">
          <div
            className="relative h-64 w-64 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className="absolute inset-y-0 transition-all ease-linear"
              style={{
                left: spriteOffset,
                transitionDuration:
                  hasMounted && !isEntryComplete ? `${entryDuration}ms` : "0ms",
                width: "100%",
                height: "100%",
              }}
            >
              <Image
                src={currentSprite}
                alt="Andy's Earthbound Sprite"
                width={255}
                height={255}
                className="relative w-full h-full object-contain"
                draggable={false}
              />
            </div>
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

        <Textbox minHeight={100} lineHeight={1.2} fontSize="4rem">
          <div>
            <p>
              second-year student @ univ of fl majoring in computer science &
              minoring in game design!
            </p>
          </div>
        </Textbox>
      </div>
    </main>
  );
}
