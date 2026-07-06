import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

type Father3TextboxProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  width?: number | string;
  minHeight?: number | string;
  padding?: number | string;
};

const SLICE_BASE_PATH = "/themes/father3/textbox";

export default function Father3Textbox({
  children,
  className = "",
  style,
  width = "min(90vw, 36rem)",
  minHeight = 180,
  padding = "",
}: Father3TextboxProps) {
  const containerStyle: CSSProperties = {
    width,
    minHeight,
    height: style?.height ?? "auto",
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
          gridTemplateColumns: "100px 1fr 100px",
          gridTemplateRows: "36px 1fr 36px",
          width: "100%",
          height: "100%",
        }}
      >
        <Image
          src={`${SLICE_BASE_PATH}/top_left.png`}
          alt=""
          width={80}
          height={80}
          className="block h-full w-full"
        />
        <Image
          src={`${SLICE_BASE_PATH}/top.png`}
          alt=""
          width={80}
          height={80}
          className="block h-full w-full"
        />
        <Image
          src={`${SLICE_BASE_PATH}/top_right.png`}
          alt=""
          width={80}
          height={80}
          className="block h-full w-full"
          style={{ transform: "translateY(0.35px)" }}
        />
        <Image
          src={`${SLICE_BASE_PATH}/middle_left.png`}
          alt=""
          width={80}
          height={80}
          className="block h-full w-full"
        />
        <Image
          src={`${SLICE_BASE_PATH}/middle.png`}
          alt=""
          width={80}
          height={80}
          className="block h-full w-full"
        />
        <Image
          src={`${SLICE_BASE_PATH}/middle_right.png`}
          alt=""
          width={80}
          height={80}
          className="block h-full w-full"
          style={{ transform: "translateY(0.35px)" }}
        />
        <Image
          src={`${SLICE_BASE_PATH}/bottom_left.png`}
          alt=""
          width={80}
          height={80}
          className="block h-full w-full"
        />
        <Image
          src={`${SLICE_BASE_PATH}/bottom.png`}
          alt=""
          width={80}
          height={80}
          className="block h-full w-full"
        />
        <Image
          src={`${SLICE_BASE_PATH}/bottom_right.png`}
          alt=""
          width={80}
          height={80}
          className="block h-full w-full"
          style={{ transform: "translateY(0.35px)" }}
        />
      </div>

      <div
        className="relative z-10 flex h-full w-full items-start justify-start overflow-auto"
        style={{ padding }}
      >
        <div className="w-full text-white">{children}</div>
      </div>
    </div>
  );
}
