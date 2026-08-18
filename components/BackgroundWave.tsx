/**
 * Animated background: a saturated blue field with a single bright arc sweeping
 * across it. The arc is a stroked path drawn twice, once wide and soft for the
 * body and once thin and bright for its leading edge, drifting on a long,
 * shallow loop. Motion is CSS so it stays cheap, and it switches off entirely
 * under prefers-reduced-motion (see globals.css).
 */
export function BackgroundWave() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(165deg,#1651a8_0%,#1b459c_28%,#122f83_58%,#022c8a_82%,#02226b_100%)]" />

      <div className="wave-a absolute inset-0 origin-center">
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <defs>
            <linearGradient id="band-deep" x1="0.1" y1="1" x2="1" y2="0.1">
              <stop offset="0%" stopColor="#1a4fa8" stopOpacity="0" />
              <stop offset="35%" stopColor="#2160c4" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#2a6cd6" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id="band-mid" x1="0.1" y1="1" x2="1" y2="0.1">
              <stop offset="0%" stopColor="#3a7fd8" stopOpacity="0" />
              <stop offset="40%" stopColor="#4a90e2" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#5fa3ee" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Broad darker band, furthest back. */}
          <path
            d="M -200 1180 C 260 1090, 700 930, 1010 730 C 1300 545, 1520 380, 1900 150
               L 2100 420 C 1700 640, 1420 810, 1130 985 C 880 1135, 560 1260, -200 1400 Z"
            fill="url(#band-deep)"
            style={{ filter: "blur(18px)" }}
          />

          {/* Narrower lighter band riding on top of it. */}
          <path
            d="M -200 1250 C 300 1150, 720 990, 1040 785 C 1330 600, 1560 430, 1940 195
               L 2040 320 C 1660 560, 1420 720, 1130 900 C 870 1060, 540 1190, -200 1330 Z"
            fill="url(#band-mid)"
            style={{ filter: "blur(10px)" }}
          />
        </svg>
      </div>

      <div className="wave-b absolute inset-0 origin-center">
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <defs>
            <linearGradient id="band-edge" x1="0.2" y1="1" x2="1" y2="0.1">
              <stop offset="0%" stopColor="#cfeaff" stopOpacity="0" />
              <stop offset="38%" stopColor="#dff2ff" stopOpacity="0.34" />
              <stop offset="72%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#dff2ff" stopOpacity="0.12" />
            </linearGradient>
          </defs>

          {/* The bright leading edge that catches the eye. */}
          <path
            d="M -200 1258 C 300 1158, 720 998, 1040 793 C 1330 608, 1560 438, 1940 203
               L 1968 244 C 1586 482, 1356 652, 1066 838 C 806 1004, 486 1132, -200 1300 Z"
            fill="url(#band-edge)"
            style={{ filter: "blur(6px)" }}
          />
        </svg>
      </div>

      <div className="wave-glow absolute bottom-[-14%] left-[38%] h-[42vh] w-[54vw] rounded-full bg-[radial-gradient(closest-side,rgba(120,190,255,0.14),rgba(120,190,255,0))] blur-[70px]" />

      {/* Keep the status bar and hint bar legible over whatever is behind them. */}
      <div className="absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,rgba(2,24,70,0.4)_0%,rgba(2,24,70,0)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-52 bg-[linear-gradient(0deg,rgba(2,22,64,0.5)_0%,rgba(2,22,64,0)_100%)]" />

      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
