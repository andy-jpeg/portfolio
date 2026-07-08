"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Textbox from "@/components/father3/Textbox";
import walkingSprite from "@themes/father3/andy/side-walking.gif";
import idleSprite from "@themes/father3/andy/walking.gif";
import poseSprite from "@themes/father3/andy/pose.png";

const entryDuration = 2500;

function getDaysBetween(start: Date, end: Date) {
  const msPerDay = 1000 * 60 * 60 * 24;
  const startUtc = Date.UTC(
    start.getFullYear(),
    start.getMonth(),
    start.getDate(),
  );
  const endUtc = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());

  return Math.round((endUtc - startUtc) / msPerDay);
}

export default function HomePage() {
  const [isHovered, setIsHovered] = useState(false);
  const [isEntryComplete, setIsEntryComplete] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [typedLength, setTypedLength] = useState(0);

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

  useEffect(() => {
    if (!isEntryComplete) {
      return;
    }

    setTypedLength(0);

    const text = "andy.jpeg";
    const typingInterval = window.setInterval(() => {
      setTypedLength((currentLength) => {
        if (currentLength >= text.length) {
          window.clearInterval(typingInterval);
          return currentLength;
        }

        return currentLength + 1;
      });
    }, 140);

    return () => {
      window.clearInterval(typingInterval);
    };
  }, [isEntryComplete]);

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
        : "400px";
  const typedText = "andy.jpeg";
  const typedDisplay =
    typedText.slice(0, typedLength) +
    (typedLength < typedText.length ? "|" : "") +
    "_".repeat(Math.max(typedText.length - typedLength - 1, 0));
  const caretIndex = typedDisplay.indexOf("|");
  const today = new Date();
  const currentYear = today.getFullYear();
  const thisApril6 = new Date(currentYear, 3, 6);
  const previousApril6 =
    today >= thisApril6 ? thisApril6 : new Date(currentYear - 1, 3, 6);
  const nextApril6 =
    today < thisApril6 ? thisApril6 : new Date(currentYear + 1, 3, 6);
  const experiencePoints = getDaysBetween(previousApril6, today);
  const daysUntilNextLevel = getDaysBetween(today, nextApril6);

  return (
    <main
      className="min-h-screen text-zinc-900 bg-transparent"
      style={{
        backgroundImage: "url('/themes/father3/background.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "100px 100px",
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
              <p>
                {caretIndex === -1 ? (
                  typedDisplay
                ) : (
                  <>
                    {typedDisplay.slice(0, caretIndex)}
                    <span className="caret">|</span>
                    {typedDisplay.slice(caretIndex + 1)}
                  </>
                )}
              </p>
            </div>
          </Textbox>
        </div>

        <Textbox
          minHeight={600}
          lineHeight={1.05}
          showPointer={false}
          fontSize="4rem"
        >
          <div className="flex h-full flex-col justify-between">
            <div className="grid grid-cols-[1fr_auto] gap-x-8 gap-y-8">
              <p className="justify-self-start">Level: 19/??</p>

              <div className="row-span-2 justify-self-end text-right">
                <p>Offense: 40</p>
                <p>Defense: 55</p>
                <p>Speed: 60</p>
                <p>Guts: 1</p>
                <p>Vitality: 60</p>
                <p>IQ: -1</p>
                <p>Luck: 80</p>
              </div>

              <div className="space-y-2">
                <p>Experience Points: {experiencePoints}</p>
                <p>{daysUntilNextLevel} Exp. for next level.</p>
              </div>
            </div>

            <p className="text-center">Press the -A- button for PSI info.</p>
          </div>
        </Textbox>

        <div className="flex w-full flex-col justify-center items-center gap-6">
          <div className="relative h-64 w-64 shrink-0">
            <Image
              src="/themes/father3/spacebup/space_buddy.gif"
              alt="Space buddy sprite"
              width={256}
              height={256}
              className="h-full w-full object-contain"
              unoptimized
            />
          </div>

          <Textbox width="auto" minHeight={550} lineHeight={1} fontSize="4rem">
            <div className="space-y-6">
              <p className="px-auto text-center">
                What have I been working on so far?
              </p>
              <p>
                This year, I am working on a game called &apos;spacebup!,&apos;
                a Earthbound-inspired JRPG about a little space buddy traveling
                across the galaxy to fight for moral justice and saving worlds
                who can&apos;t save themselves. Here&apos;s a picture of my
                space buddy!!
              </p>
            </div>
          </Textbox>
        </div>
      </div>
    </main>
  );
}
