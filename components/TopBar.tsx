"use client";

import { Avatar } from "./Avatar";
import { Clock } from "./Clock";
import { DownloadIcon, GithubIcon, InstagramIcon, LinkedInIcon, MessageIcon } from "./Icons";
import { profile } from "@/lib/profile";

const socialIcons: Record<string, (props: { className?: string }) => JSX.Element> = {
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  github: GithubIcon,
  email: MessageIcon,
};

/**
 * The status bar carries identity and where to follow me, nothing else. Every
 * section of the site lives in the tile row rather than up here.
 */
export function TopBar() {
  return (
    <header className="flex items-center gap-2 px-1 py-4 sm:gap-4">
      <div className="flex min-w-0 items-center gap-3 px-1 py-1">
        <Avatar />
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold leading-tight">
            {profile.onlineId}
          </span>
          <span className="block truncate text-xs leading-tight text-ink-muted">
            {profile.statusLine}
          </span>
        </span>
      </div>

      <div className="flex-1" />

      <nav aria-label="Follow me" className="flex items-center gap-0.5">
        <span className="mr-1 hidden text-[11px] uppercase tracking-[0.18em] text-ink-muted lg:inline">
          Follow
        </span>
        {profile.socials.map((social) => {
          const Icon = socialIcons[social.id] ?? MessageIcon;
          return (
            <a
              key={social.id}
              href={social.href}
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer noopener"
              title={`${social.name} · ${social.handle}`}
              aria-label={`${social.name}, ${social.handle}`}
              className="group relative rounded-md p-2 text-ink-muted transition-colors duration-200 hover:text-ink focus-visible:shadow-focus"
            >
              <Icon className="h-[22px] w-[22px]" />
              <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded bg-base-deep/95 px-2 py-1 text-[11px] font-medium text-ink-soft opacity-0 shadow-lg ring-1 ring-white/15 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
                {social.handle}
              </span>
            </a>
          );
        })}

        {profile.resumeHref && (
          <a
            href={profile.resumeHref}
            download
            title="Download resume"
            aria-label="Download resume"
            className="group relative rounded-md p-2 text-ink-muted transition-colors duration-200 hover:text-ink focus-visible:shadow-focus"
          >
            <DownloadIcon className="h-[22px] w-[22px]" />
            <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded bg-base-deep/95 px-2 py-1 text-[11px] font-medium text-ink-soft opacity-0 shadow-lg ring-1 ring-white/15 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
              Resume
            </span>
          </a>
        )}
      </nav>

      <div className="shrink-0 border-l border-white/15 pl-3 sm:ml-1 sm:pl-4">
        <Clock />
      </div>
    </header>
  );
}
