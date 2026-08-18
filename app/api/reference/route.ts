import { readdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);

/**
 * Lists whatever is in public/reference so the overlay picks up any file
 * dropped in there, whatever it is called. Development only: in production
 * this returns an empty list and the overlay is not rendered at all.
 */
export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ images: [] });
  }

  try {
    const directory = path.join(process.cwd(), "public", "reference");
    const entries = await readdir(directory);
    const images = entries
      .filter((name) => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()))
      .sort()
      .map((name) => `/reference/${name}`);
    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ images: [] });
  }
}
