import type { Metadata, Viewport } from "next";
import { BackgroundWave } from "@/components/BackgroundWave";
import { profile } from "@/lib/profile";
import "./globals.css";

export const metadata: Metadata = {
  title: `${profile.name}: ${profile.headline}`,
  description: profile.headline,
  openGraph: {
    title: `${profile.name}, Portfolio`,
    description: profile.headline,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05121f",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh">
        <BackgroundWave />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-base-deep"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
