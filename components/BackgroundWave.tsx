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
      <div className="absolute inset-0 bg-[linear-gradient(165deg,#1a6ecd_0%,#1059b0_24%,#0c478f_48%,#08356e_72%,#04244c_100%)]" />

      <div className="wave-a absolute inset-0 origin-center">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <defs>
            <linearGradient id="arc-body" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#7cc9ff" stopOpacity="0" />
              <stop offset="30%" stopColor="#8fd4ff" stopOpacity="0.32" />
              <stop offset="62%" stopColor="#c4eaff" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#c4eaff" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <path
            d="M -120 780 C 320 700, 720 470, 1010 250 C 1220 92, 1360 20, 1560 -70"
            fill="none"
            stroke="url(#arc-body)"
            strokeWidth="150"
            strokeLinecap="round"
            style={{ filter: "blur(46px)" }}
          />
        </svg>
      </div>

      <div className="wave-b absolute inset-0 origin-center">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <defs>
            <linearGradient id="arc-edge" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#cfefff" stopOpacity="0" />
              <stop offset="34%" stopColor="#e4f6ff" stopOpacity="0.5" />
              <stop offset="66%" stopColor="#ffffff" stopOpacity="0.62" />
              <stop offset="100%" stopColor="#e4f6ff" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            d="M -120 812 C 320 732, 720 500, 1010 280 C 1220 122, 1360 50, 1560 -40"
            fill="none"
            stroke="url(#arc-edge)"
            strokeWidth="16"
            strokeLinecap="round"
            style={{ filter: "blur(9px)" }}
          />
        </svg>
      </div>

      <div className="wave-glow absolute left-[16%] top-[32%] h-[52vh] w-[64vw] rounded-full bg-[radial-gradient(closest-side,rgba(150,220,255,0.2),rgba(150,220,255,0))] blur-[60px]" />

      {/* Keep the status bar and hint bar legible over whatever is behind them. */}
      <div className="absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,rgba(4,26,58,0.46)_0%,rgba(4,26,58,0)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-52 bg-[linear-gradient(0deg,rgba(4,24,54,0.54)_0%,rgba(4,24,54,0)_100%)]" />

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
