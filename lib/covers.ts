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
