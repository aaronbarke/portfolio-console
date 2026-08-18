import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Console-blue palette. Semantic names only — no raw hex in components.
        base: {
          deep: "#05121f",
          mid: "#0a2b4a",
          bright: "#1176c9",
          glow: "#4fc3ff",
        },
        ink: {
          DEFAULT: "#ffffff",
          soft: "rgba(255,255,255,0.72)",
          muted: "rgba(255,255,255,0.48)",
          faint: "rgba(255,255,255,0.24)",
        },
        tier: {
          platinum: "#dbe7f5",
          gold: "#f2c65a",
          silver: "#c2cbd6",
          bronze: "#cd8b52",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "Segoe UI",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        focus: "0 0 0 3px rgba(255,255,255,0.92), 0 0 44px 6px rgba(79,195,255,0.55)",
        tile: "0 18px 40px -18px rgba(0,0,0,0.75)",
        panel: "0 30px 80px -30px rgba(0,0,0,0.85)",
      },
      transitionTimingFunction: {
        console: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
