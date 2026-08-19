import { readdirSync } from "node:fs";
import path from "node:path";

/**
 * Resolves image keys to real files by reading the directory, so the extension
 * a file happens to have does not have to be guessed in the data. "fortnite"
 * finds fortnite.png, fortnite.jpg or fortnite.webp, whichever is actually
 * there, and preserves the filename's exact case.
 *
 * That last part matters: macOS filesystems are case-insensitive but Linux
 * hosts are not, so a hardcoded "/me.jpg" pointing at a file named "me.PNG"
 * works locally and 404s in production. Reading the real name avoids it.
 *
 * Server-side only. Called from the page, which runs at build time, so this is
 * free at runtime.
 */
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

export type CoverMap = Record<string, string>;

function scan(directory: string, urlPrefix: string, into: CoverMap): void {
  let entries: string[];
  try {
    entries = readdirSync(directory);
  } catch {
    return;
  }

  for (const name of entries) {
    const extension = path.extname(name);
    if (!IMAGE_EXTENSIONS.has(extension.toLowerCase())) continue;
    const key = path.basename(name, extension).toLowerCase();
    // First match wins, so covers/ takes precedence over the public root.
    if (!(key in into)) into[key] = `${urlPrefix}/${name}`;
  }
}

export function resolveCovers(): CoverMap {
  const covers: CoverMap = {};
  const root = path.join(process.cwd(), "public");
  scan(path.join(root, "covers"), "/covers", covers);
  scan(root, "", covers);
  return covers;
}

/**
 * Finds the resume PDF by looking for one, rather than by a hardcoded path, so
 * renaming the file cannot silently break the download. A name containing
 * "resume" wins if there is more than one PDF.
 */
export function resolveResume(): string | null {
  let entries: string[];
  try {
    entries = readdirSync(path.join(process.cwd(), "public"));
  } catch {
    return null;
  }

  const pdfs = entries.filter((name) => path.extname(name).toLowerCase() === ".pdf");
  if (pdfs.length === 0) return null;

  const preferred = pdfs.find((name) => name.toLowerCase().includes("resume")) ?? pdfs[0];
  return `/${preferred}`;
}
