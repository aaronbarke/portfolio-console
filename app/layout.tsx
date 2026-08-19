import type { Metadata, Viewport } from "next";
import { BackgroundWave } from "@/components/BackgroundWave";
import { profile } from "@/lib/profile";
import "./globals.css";

// Absolute URLs are required for social cards. Vercel provides the deployment
// host automatically; the localhost fallback keeps development quiet.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3005");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name}: ${profile.headline}`,
  description: profile.headline,
  openGraph: {
    title: `${profile.name}, Portfolio`,
    description: profile.headline,
    type: "website",
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name}, Portfolio`,
    description: profile.headline,
  },
};

export const viewport: Viewport = {
  themeColor: "#122f83",
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
