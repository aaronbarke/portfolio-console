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
  className?: string;
}

function Motif({ motif }: { motif: ArtMotif }) {
  const stroke = "rgba(255,255,255,0.30)";
  const fill = "rgba(255,255,255,0.16)";

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
    default:
      return null;
  }
}

export function TileArt({ motif, from, to, monogram, className }: TileArtProps) {
  return (
    <div className={className}>
      <svg viewBox="0 0 200 200" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`grad-${monogram}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
          <radialGradient id={`sheen-${monogram}`} cx="0.2" cy="0.05" r="0.9">
            <stop offset="0%" stopColor="rgba(255,255,255,0.28)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
        <rect width="200" height="200" fill={`url(#grad-${monogram})`} />
        <Motif motif={motif} />
        <rect width="200" height="200" fill={`url(#sheen-${monogram})`} />
        <text
          x="100"
          y="118"
          textAnchor="middle"
          fontSize="58"
          fontWeight={700}
          letterSpacing="2"
          fill="rgba(255,255,255,0.94)"
          style={{ fontFamily: "inherit" }}
        >
          {monogram}
        </text>
      </svg>
    </div>
  );
}
