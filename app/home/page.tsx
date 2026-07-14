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
  const [isPsiInfoOpen, setIsPsiInfoOpen] = useState(false);
  const [hoveredPsiMove, setHoveredPsiMove] = useState<string | null>(null);

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

    const text = "andy.jpeg";
    const typingInterval = window.setInterval(() => {
      setTypedLength((currentLength) => {
        if (currentLength >= text.length) {
          window.clearInterval(typingInterval);
          return currentLength;
        }

        return currentLength + 1;
      });
    }, 250);

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
      className="min-h-screen text-zinc-900"
      style={{
        fontFamily: "Apple Kid, sans-serif",
      }}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center py-12">
        <div className="flex flex-row">
          <div
            className={`relative h-64 w-64 ${
              isEntryComplete ? "cursor-pointer" : "cursor-default"
            }`}
            onMouseEnter={() => {
              if (isEntryComplete) {
                setIsHovered(true);
              }
            }}
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
              <p>What should this boy&apos;s name be?</p>
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
          className="mt-16"
        >
          <div className="relative flex h-full flex-col justify-between">
            <div className="grid grid-cols-[1fr_auto] gap-x-8 gap-y-8">
              <div className="justify-self-start">
                <p
                  className="absolute text-3xl -top-7 bg-[#101010]"
                  style={{ fontFamily: '"Earthbound Beginnings", sans-serif' }}
                >
                  Andy
                </p>
                <p>Level:&emsp;19/??</p>
                <div className="flex flex-row items-center">
                  <Image
                    src="/themes/father3/andy/status.png"
                    alt="Andy status icon"
                    width={50}
                    height={50}
                    className="object-contain mr-4"
                    unoptimized
                  />
                  <p>SWE & Game Developer</p>
                </div>
              </div>

              <div className="row-span-2 justify-self-end">
                <div className="flex gap-6">
                  <div className="text-right">
                    <p>Offense:</p>
                    <p>Defense:</p>
                    <p>Speed:</p>
                    <p>Guts:</p>
                    <p>Vitality:</p>
                    <p>IQ:</p>
                    <p>Luck:</p>
                  </div>

                  <div className="text-right">
                    <p>40</p>
                    <p>55</p>
                    <p>60</p>
                    <p>1</p>
                    <p>60</p>
                    <p>-1</p>
                    <p>80</p>
                  </div>
                </div>
              </div>

              {isPsiInfoOpen ? (
                <div className="absolute inset-0 z-20 flex items-start justify-center pt-16">
                  <button
                    type="button"
                    aria-label="Close PSI info"
                    className="absolute inset-0 cursor-default bg-black/0"
                    onClick={() => {
                      setIsPsiInfoOpen(false);
                      setHoveredPsiMove(null);
                    }}
                  />
                  <Textbox
                    showPointer={false}
                    minHeight={400}
                    className="relative z-10"
                  >
                    <div className="flex h-full flex-col justify-between text-6xl">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-4">
                          <p>PSI Gaming</p>
                          <button
                            type="button"
                            className="cursor-[url('/themes/father3/textbox/select.gif'),pointer]"
                            onMouseEnter={() => setHoveredPsiMove("PSI Gaming")}
                            onFocus={() => setHoveredPsiMove("PSI Gaming")}
                            onMouseLeave={() => setHoveredPsiMove(null)}
                            onBlur={() => setHoveredPsiMove(null)}
                          >
                            <span className="inline-flex items-center gap-2">
                              {hoveredPsiMove === "PSI Gaming" ? (
                                <Image
                                  src="/themes/father3/textbox/select.gif"
                                  alt=""
                                  width={24}
                                  height={24}
                                  className="h-6 w-6 object-contain"
                                  unoptimized
                                />
                              ) : null}
                              <span className="underline underline-offset-4">
                                Info
                              </span>
                            </span>
                          </button>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <p>PSI Cooking</p>
                          <button
                            type="button"
                            className="cursor-[url('/themes/father3/textbox/select.gif'),pointer]"
                            onMouseEnter={() =>
                              setHoveredPsiMove("PSI Cooking")
                            }
                            onFocus={() => setHoveredPsiMove("PSI Cooking")}
                            onMouseLeave={() => setHoveredPsiMove(null)}
                            onBlur={() => setHoveredPsiMove(null)}
                          >
                            <span className="inline-flex items-center gap-2">
                              {hoveredPsiMove === "PSI Cooking" ? (
                                <Image
                                  src="/themes/father3/textbox/select.gif"
                                  alt=""
                                  width={24}
                                  height={24}
                                  className="h-6 w-6 object-contain"
                                  unoptimized
                                />
                              ) : null}
                              <span className="underline underline-offset-4">
                                Info
                              </span>
                            </span>
                          </button>
                        </div>
                      </div>

                      <div className="pt-4 text-5xl">
                        {hoveredPsiMove === "PSI Gaming" ? (
                          <p>
                            Effective against Roblox horror games, Persona 3
                            Reload, and Octopath Traveler enemies. Ineffective
                            against Metaphor: ReFantazio, Final Fantasy XVI, and
                            Limbus Company enemies due to high difficulty.
                          </p>
                        ) : hoveredPsiMove === "PSI Cooking" ? (
                          <p>
                            Effective against all enemies. This move creates a
                            multitude of random food items, including Taiwanese
                            popcorn chicken, passionfruit jasmine tea, and
                            garlic & egg fried rice. Ingredients sold
                            separately, sorry!
                          </p>
                        ) : (
                          <p>
                            Hover over the info of a PSI move to see move
                            details.
                          </p>
                        )}
                      </div>
                    </div>
                  </Textbox>
                </div>
              ) : null}

              <div className="space-y-4">
                <div className="flex gap-6">
                  <div className="text-right">
                    <p>Hit Points:</p>
                    <p>Psychic Points:</p>
                    <p>Experience Points:</p>
                  </div>

                  <div className="text-right">
                    <p>129 / 129</p>
                    <p>74 / 74</p>
                    <p>{experiencePoints}</p>
                  </div>
                </div>

                <p className="text-center">
                  {daysUntilNextLevel} Exp. for next level.
                </p>
              </div>
            </div>

            <p className="text-center">
              Press the{" "}
              <button
                type="button"
                className="cursor-[url('/themes/father3/textbox/select.gif'),pointer] underline underline-offset-4"
                onClick={() => {
                  setHoveredPsiMove(null);
                  setIsPsiInfoOpen((current) => !current);
                }}
              >
                A
              </button>{" "}
              button for PSI info.
            </p>
          </div>
        </Textbox>

        <div className="flex w-full flex-col mt-[16] justify-center items-center gap-6">
          <div className="relative gap-12 flex flex-row">
            <Image
              src={"/themes/father3/andy/sleeping.gif"}
              alt="Andy sleeping sprite"
              width={200}
              height={200}
              className="relative mt-auto object-contain"
              draggable={false}
            />
            <Image
              src="/themes/father3/spacebup/space_buddy.gif"
              alt="Space buddy sprite"
              width={150}
              height={150}
              className="relative object-contain"
              unoptimized
            />
          </div>

          <Textbox width="100%" minHeight={550} lineHeight={1} fontSize="4rem">
            <div className="space-y-6">
              <p className="px-auto text-center">
                What have I been working on so far?
              </p>
              <p>
                This year, I am working on a game called &apos;spacebup!,&apos;
                a Earthbound-inspired JRPG about a little space buddy traveling
                across the galaxy to fight for moral justice and saving worlds
                who might not be able to save themselves. Above is a picture of
                that space buddy!
              </p>
            </div>
          </Textbox>

          <div className="flex gap-8">
            <Textbox
              width="41rem"
              minHeight={850}
              lineHeight={1}
              fontSize="4rem"
            >
              <div className="space-y-6">
                <p className="px-auto text-center">Top Albums So Far</p>
                <div className="text-left flex flex-col gap-8">
                  <p className="flex text-right items-center gap-8">
                    <Image
                      src="/covers/underscores.png"
                      alt="underscores 'U' album"
                      width={200}
                      height={200}
                      className="relative flex-grow-0 object-contain mr-auto"
                      unoptimized
                    />{" "}
                    &apos;U&apos; by underscores
                  </p>
                  <p className="flex text-right items-center gap-8">
                    <Image
                      src="/covers/ninajirachi.png"
                      alt="Ninajirachi 'I Love My Computer' album"
                      width={200}
                      height={200}
                      className="relative object-contain mr-auto"
                      unoptimized
                    />
                    &apos;I Love My Computer&apos; by Ninajirachi
                  </p>
                  <p className="flex text-right items-center gap-8">
                    <Image
                      src="/covers/pinkpantheress.png"
                      alt="PinkPantheress 'Fancy That' album"
                      width={200}
                      height={200}
                      className="relative object-contain mr-auto"
                      unoptimized
                    />
                    &apos;Fancy That&apos; by PinkPantheress
                  </p>
                </div>
              </div>
            </Textbox>

            <Image
              src={"/themes/father3/andy/jamming.gif"}
              alt="Andy listening to music sprite"
              width={200}
              height={200}
              className="relative object-contain"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
