import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Console-blue palette. Semantic names only, no raw hex in components.
        base: {
          deep: "#022c8a",
          dark: "#122f83",
          mid: "#1b459c",
          bright: "#1651a8",
          glow: "#9ed6ff",
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
        focus: "0 0 0 3px rgba(255,255,255,0.95), 0 0 0 5px rgba(120,190,255,0.35), 0 0 34px 2px rgba(120,200,255,0.5), 0 0 70px 12px rgba(90,170,255,0.28)",
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
