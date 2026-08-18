/**
 * Animated background: a deep blue field with a bright ribbon sweeping across
 * it diagonally. The ribbon is an SVG path with a gradient fill, blurred hard
 * enough to read as light rather than as a shape, and drifting on a long loop.
 * All motion is CSS so it stays cheap, and it is switched off entirely under
 * prefers-reduced-motion (see globals.css).
 */
export function BackgroundWave() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(125%_105%_at_12%_-12%,#0f6cb4_0%,#0a4b85_26%,#062f57_50%,#041d36_72%,#030f1e_92%)]" />

      {/* Broad, soft body of the wave. */}
      <div className="wave-a absolute inset-x-[-15%] top-[-10%] h-[130%] origin-center">
        <svg
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
          className="h-full w-full blur-[60px]"
        >
          <defs>
            <linearGradient id="ribbon-body" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#0b3a63" stopOpacity="0" />
              <stop offset="28%" stopColor="#1e93de" stopOpacity="0.62" />
              <stop offset="55%" stopColor="#5cc4f5" stopOpacity="0.8" />
              <stop offset="82%" stopColor="#1176c9" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#04101c" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M-100 690 C 180 640, 300 430, 560 380 C 800 334, 950 220, 1300 90 L1300 330 C 980 430, 820 520, 600 580 C 380 640, 220 760, -100 830 Z"
            fill="url(#ribbon-body)"
          />
        </svg>
      </div>

      {/* Bright core running along the same path, kept thin so the wave has an edge. */}
      <div className="wave-b absolute inset-x-[-12%] top-[-6%] h-[120%] origin-center">
        <svg
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
          className="h-full w-full blur-[18px]"
        >
          <defs>
            <linearGradient id="ribbon-core" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#8fdcff" stopOpacity="0" />
              <stop offset="35%" stopColor="#cdf3ff" stopOpacity="0.62" />
              <stop offset="62%" stopColor="#a9e6ff" stopOpacity="0.82" />
              <stop offset="88%" stopColor="#6ec8ff" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#6ec8ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M-100 700 C 180 650, 300 440, 560 390 C 800 344, 950 230, 1300 100 L1300 168 C 950 300, 800 408, 566 452 C 320 500, 180 690, -100 748 Z"
            fill="url(#ribbon-core)"
          />
        </svg>
      </div>

      {/* Ambient bloom where the wave is brightest. */}
      <div className="wave-glow absolute left-[6%] top-[14%] h-[46vh] w-[52vw] rounded-full bg-[radial-gradient(closest-side,rgba(126,214,255,0.4),rgba(126,214,255,0))] blur-[50px]" />

      {/* Keep the status bar and hint bar legible over whatever is behind them. */}
      <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(3,10,18,0.72)_0%,rgba(3,10,18,0)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-52 bg-[linear-gradient(0deg,rgba(3,12,24,0.72)_0%,rgba(3,12,24,0)_100%)]" />

      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
