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
            <linearGradient id="arc-body" x1="0.3" y1="1" x2="1" y2="0.2">
              <stop offset="0%" stopColor="#8ec8ff" stopOpacity="0" />
              <stop offset="26%" stopColor="#9ed6ff" stopOpacity="0.26" />
              <stop offset="60%" stopColor="#cbe9ff" stopOpacity="0.34" />
              <stop offset="100%" stopColor="#cbe9ff" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            d="M 640 1200 C 860 1090, 1030 960, 1200 900 C 1420 822, 1650 680, 1980 440"
            fill="none"
            stroke="url(#arc-body)"
            strokeWidth="150"
            strokeLinecap="round"
            style={{ filter: "blur(52px)" }}
          />
        </svg>
      </div>

      <div className="wave-b absolute inset-0 origin-center">
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <defs>
            <linearGradient id="arc-edge" x1="0.3" y1="1" x2="1" y2="0.2">
              <stop offset="0%" stopColor="#cfefff" stopOpacity="0" />
              <stop offset="30%" stopColor="#e4f6ff" stopOpacity="0.42" />
              <stop offset="62%" stopColor="#f2fbff" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#e4f6ff" stopOpacity="0.14" />
            </linearGradient>
          </defs>
          <path
            d="M 640 1200 C 860 1090, 1030 960, 1200 900 C 1420 822, 1650 680, 1980 440"
            fill="none"
            stroke="url(#arc-edge)"
            strokeWidth="20"
            strokeLinecap="round"
            style={{ filter: "blur(11px)" }}
          />
          <path
            d="M 700 1250 C 920 1140, 1090 1010, 1260 950 C 1480 872, 1710 730, 2040 490"
            fill="none"
            stroke="url(#arc-edge)"
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.5"
            style={{ filter: "blur(9px)" }}
          />
        </svg>
      </div>

      <div className="wave-glow absolute bottom-[-10%] left-[42%] h-[44vh] w-[52vw] rounded-full bg-[radial-gradient(closest-side,rgba(158,214,255,0.14),rgba(158,214,255,0))] blur-[70px]" />

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
