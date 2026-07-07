import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

type Father3TextboxProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  width?: number | string;
  minHeight?: number | string;
  padding?: number | string;
  fontSize?: number | string;
  lineHeight?: number | string;
};

const SLICE_BASE_PATH = "/themes/father3/textbox";
const DEFAULT_HEIGHT = 200;

export default function Father3Textbox({
  children,
  className = "",
  style,
  width = 50,
  minHeight = DEFAULT_HEIGHT,
  fontSize = "clamp(0.9rem, 2vw, 1.25rem)",
  lineHeight = 1.5,
}: Father3TextboxProps) {
  const numericMinHeight =
    typeof minHeight === "number"
      ? minHeight
      : typeof minHeight === "string"
        ? Number.parseFloat(minHeight)
        : Number.NaN;
  const resolvedHeight =
    Number.isFinite(numericMinHeight) && numericMinHeight > 0
      ? numericMinHeight
      : DEFAULT_HEIGHT;
  const sliceHeight = resolvedHeight / 3;

  const containerStyle: CSSProperties = {
    width,
    minHeight,
    height: style?.height ?? `${resolvedHeight}px`,
    ...style,
  };

  return (
    <div
      className={["relative", className].filter(Boolean).join(" ")}
      style={containerStyle}
    >
      <div
        className="pointer-events-none absolute inset-0 grid"
        style={{
          gridTemplateColumns: "240px 1fr 240px",
          gridTemplateRows: "96px 1fr 96px",
          width: "100%",
          height: "100%",
        }}
      >
        <Image
          src={`${SLICE_BASE_PATH}/top_left.png`}
          alt=""
          width={240}
          height={96}
          className="block h-full w-full"
        />
        <Image
          src={`${SLICE_BASE_PATH}/top.png`}
          alt=""
          width={240}
          height={sliceHeight}
          className="block h-full w-full"
        />
        <Image
          src={`${SLICE_BASE_PATH}/top_right.png`}
          alt=""
          width={240}
          height={96}
          className="block h-full w-full"
          style={{ transform: "translateY(0.35px)" }}
        />
        <Image
          src={`${SLICE_BASE_PATH}/middle_left.png`}
          alt=""
          width={240}
          height={sliceHeight}
          className="block h-full w-full"
        />
        <Image
          src={`${SLICE_BASE_PATH}/middle.png`}
          alt=""
          width={240}
          height={sliceHeight}
          className="block h-full w-full"
        />
        <Image
          src={`${SLICE_BASE_PATH}/middle_right.png`}
          alt=""
          width={240}
          height={sliceHeight}
          className="block h-full w-full"
          style={{ transform: "translateY(0.35px)" }}
        />
        <Image
          src={`${SLICE_BASE_PATH}/bottom_left.png`}
          alt=""
          width={240}
          height={96}
          className="block h-full w-full"
        />
        <Image
          src={`${SLICE_BASE_PATH}/bottom.png`}
          alt=""
          width={240}
          height={96}
          className="block h-full w-full"
        />
        <Image
          src={`${SLICE_BASE_PATH}/bottom_right.png`}
          alt=""
          width={240}
          height={96}
          className="block h-full w-full"
          style={{ transform: "translateY(0.35px)" }}
        />
      </div>

      <div className="relative z-10 flex h-full w-full items-start justify-start">
        <div
          className="w-full text-white"
          style={{
            fontSize,
            lineHeight:
              typeof lineHeight === "number" ? `${lineHeight}` : lineHeight,
            wordBreak: "break-word",
            display: "block",
            padding: "2rem 2.5rem",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
