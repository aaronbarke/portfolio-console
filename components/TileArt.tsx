"use client";

import { useCallback, useState } from "react";
import { useCoverSrc } from "./CoverProvider";
import type { ArtMotif } from "@/lib/types";

/**
 * Cover art, generated rather than sourced: a two-stop gradient, a motif drawn
 * from the project's shape (a chart, an orbit, a grid) and the monogram.
 * Deterministic per project, so tiles stay recognisable between visits.
 */
interface TileArtProps {
  motif: ArtMotif;
  from: string;
  to: string;
  monogram: string;
  accent?: string;
  image?: string;
  imageFit?: "cover" | "contain";
  className?: string;
}

function Motif({ motif, accent }: { motif: ArtMotif; accent?: string }) {
  const stroke = accent ? `${accent}88` : "rgba(255,255,255,0.30)";
  const fill = accent ? `${accent}33` : "rgba(255,255,255,0.16)";

  switch (motif) {
    case "grid":
      return (
        <g stroke={stroke} strokeWidth="1">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line key={`v${i}`} x1={20 + i * 32} y1="14" x2={20 + i * 32} y2="186" />
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={`h${i}`} x1="14" y1={30 + i * 36} x2="186" y2={30 + i * 36} />
          ))}
        </g>
      );
    case "wave":
      return (
        <g stroke={stroke} strokeWidth="1.6" fill="none">
          {[0, 1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M-10 ${86 + i * 24} C 45 ${56 + i * 24}, 95 ${118 + i * 24}, 210 ${74 + i * 24}`}
              opacity={1 - i * 0.18}
            />
          ))}
        </g>
      );
    case "orbit":
      return (
        <g stroke={stroke} fill="none" strokeWidth="1.2">
          <ellipse cx="100" cy="100" rx="76" ry="30" />
          <ellipse cx="100" cy="100" rx="76" ry="30" transform="rotate(60 100 100)" />
          <ellipse cx="100" cy="100" rx="76" ry="30" transform="rotate(120 100 100)" />
          <circle cx="100" cy="100" r="9" fill={fill} />
        </g>
      );
    case "peaks":
      return (
        <g>
          <path
            d="M-10 168 L36 112 L70 140 L108 66 L146 116 L184 80 L210 108 L210 200 L-10 200 Z"
            fill={fill}
          />
          <path
            d="M-10 168 L36 112 L70 140 L108 66 L146 116 L184 80 L210 108"
            fill="none"
            stroke={stroke}
            strokeWidth="1.8"
          />
        </g>
      );
    case "scatter":
      return (
        <g fill={fill}>
          {[
            [34, 60], [70, 128], [112, 44], [148, 92], [56, 168], [128, 156],
            [92, 96], [168, 132], [24, 116], [160, 40],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 9 : 5.5} />
          ))}
        </g>
      );
    case "bars":
      return (
        <g fill={fill}>
          {[124, 78, 148, 54, 104, 166, 92].map((h, i) => (
            <rect key={i} x={16 + i * 26} y={190 - h} width="15" height={h} rx="2" />
          ))}
        </g>
      );
    case "blocks":
      return (
        <g>
          {[
            [20, 120], [64, 120], [108, 120], [152, 120],
            [42, 76], [86, 76], [130, 76],
            [64, 32], [108, 32],
          ].map(([x, y], i) => (
            <rect
              key={i}
              x={x}
              y={y}
              width="40"
              height="40"
              rx="2"
              fill={fill}
              stroke={stroke}
              strokeWidth="1"
            />
          ))}
        </g>
      );
    case "court":
      return (
        <g stroke={stroke} strokeWidth="1.4" fill="none">
          <rect x="16" y="16" width="168" height="168" rx="3" />
          <line x1="16" y1="100" x2="184" y2="100" />
          <circle cx="100" cy="100" r="30" />
          <path d="M16 54 h44 a40 40 0 0 1 0 92 H16" />
          <path d="M184 54 h-44 a40 40 0 0 0 0 92 H184" />
        </g>
      );
    case "boost":
      return (
        <g>
          <circle cx="100" cy="112" r="46" fill="none" stroke={stroke} strokeWidth="1.6" />
          <circle cx="100" cy="112" r="18" fill={fill} />
          <path
            d="M28 168 C 70 140, 130 88, 176 34"
            fill="none"
            stroke={stroke}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M44 182 C 84 156, 140 106, 184 56"
            fill="none"
            stroke={stroke}
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>
      );
    case "storm":
      return (
        <g fill="none" stroke={stroke}>
          <circle cx="100" cy="100" r="78" strokeWidth="1.2" />
          <circle cx="100" cy="100" r="54" strokeWidth="1.2" opacity="0.75" />
          <circle cx="100" cy="100" r="30" strokeWidth="1.2" opacity="0.5" />
          <path d="M108 44 L78 106 h26 l-12 50 44 -68 h-28 Z" fill={fill} stroke="none" />
        </g>
      );
    case "page":
      return (
        <g stroke={stroke} strokeWidth="1.3" fill="none">
          <rect x="44" y="24" width="112" height="152" rx="3" fill={fill} />
          {[54, 74, 94, 114, 134].map((y) => (
            <line key={y} x1="62" y1={y} x2={y === 134 ? 118 : 138} y2={y} />
          ))}
        </g>
      );
    case "cap":
      return (
        <g stroke={stroke} strokeWidth="1.6" fill="none">
          <path d="M20 84 L100 48 L180 84 L100 120 Z" fill={fill} />
          <path d="M52 100 v34 c0 12 96 12 96 0 v-34" />
          <path d="M172 88 v40" />
          <circle cx="172" cy="134" r="6" fill={fill} />
        </g>
      );
    default:
      return null;
  }
}

export function TileArt({
  motif,
  from,
  to,
  monogram,
  accent,
  image,
  imageFit = "cover",
  className,
}: TileArtProps) {
  // A missing file falls back to the drawn cover rather than a broken image.
  const [imageFailed, setImageFailed] = useState(false);
  const src = useCoverSrc(image);
  const showImage = Boolean(src) && !imageFailed;

  // If the request already failed before React attached the handler, the error
  // event is long gone, so check the element's own state when it mounts.
  const checkLoaded = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete && node.naturalWidth === 0) setImageFailed(true);
  }, []);

  // Gradient ids must be unique per colour pair, not per monogram, or two tiles
  // sharing a monogram would also share a fill.
  const uid = `${monogram}-${from}-${to}`.replace(/[^a-zA-Z0-9]/g, "");

  return (
    <div className={className}>
      <div className="relative h-full w-full">
        <svg viewBox="0 0 200 200" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id={`grad-${uid}`} x1="0" y1="0" x2="0.7" y2="1">
              <stop offset="0%" stopColor={from} />
              <stop offset="100%" stopColor={to} />
            </linearGradient>
            <linearGradient id={`sweep-${uid}`} x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="52%" stopColor="rgba(255,255,255,0.16)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            <radialGradient id={`vig-${uid}`} cx="0.5" cy="0.45" r="0.78">
              <stop offset="55%" stopColor="rgba(0,0,0,0)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.42)" />
            </radialGradient>
            <linearGradient id={`scrim-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(0,0,0,0)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.45)" />
            </linearGradient>
          </defs>

          <rect width="200" height="200" fill={`url(#grad-${uid})`} />

          {!showImage && (
            <>
              <g transform="translate(100 100) scale(1.18) translate(-100 -100)">
                <Motif motif={motif} accent={accent} />
              </g>
              <rect width="200" height="200" fill={`url(#sweep-${uid})`} />
              <rect width="200" height="200" fill={`url(#vig-${uid})`} />
              <rect y="120" width="200" height="80" fill={`url(#scrim-${uid})`} />
              <text
                x="100"
                y="120"
                textAnchor="middle"
                fontSize="62"
                fontWeight={800}
                letterSpacing="1"
                fill="#ffffff"
                style={{ fontFamily: "inherit", paintOrder: "stroke" }}
              >
                {monogram}
              </text>
            </>
          )}
        </svg>

        {showImage && src && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={checkLoaded}
            src={src}
            alt=""
            onError={() => setImageFailed(true)}
            className={[
              "absolute inset-0 h-full w-full",
              imageFit === "contain" ? "object-contain p-[14%]" : "object-cover object-top",
            ].join(" ")}
          />
        )}
      </div>
    </div>
  );
}
