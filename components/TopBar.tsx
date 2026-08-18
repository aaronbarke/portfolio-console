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

function BarLink({
  href,
  label,
  hint,
  children,
  download,
}: {
  href: string;
  label: string;
  hint: string;
  children: React.ReactNode;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      download={download}
      target={href.startsWith("mailto:") || download ? undefined : "_blank"}
      rel="noreferrer noopener"
      aria-label={label}
      className="group relative rounded p-1.5 text-white/70 transition-colors duration-200 hover:text-white focus-visible:shadow-focus"
    >
      {children}
      <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded bg-base-deep/95 px-2 py-1 text-[11px] font-medium text-ink-soft opacity-0 shadow-lg ring-1 ring-white/15 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
        {hint}
      </span>
    </a>
  );
}

/**
 * Laid out on the console's rhythm: a small cluster at each side, identity in
 * the middle, the clock alone at the far right. Icons are light and widely
 * spaced rather than crowded into a toolbar.
 */
export function TopBar() {
  const social = Object.fromEntries(profile.socials.map((s) => [s.id, s]));
  const left = ["instagram", "linkedin"].map((id) => social[id]).filter(Boolean);
  const right = ["github", "email"].map((id) => social[id]).filter(Boolean);

  return (
    <header className="flex items-center gap-4 px-5 py-5 sm:gap-8 sm:px-8 lg:px-12">
      <nav aria-label="Follow" className="flex shrink-0 items-center gap-3 sm:gap-5">
        {left.map((s) => {
          const Icon = socialIcons[s.id] ?? MessageIcon;
          return (
            <BarLink key={s.id} href={s.href} label={`${s.name}, ${s.handle}`} hint={s.handle}>
              <Icon className="h-[21px] w-[21px]" />
            </BarLink>
          );
        })}
      </nav>

      <div className="flex flex-1 items-center justify-center">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar size={30} />
          <span className="min-w-0">
            <span className="block truncate text-[15px] font-medium leading-tight text-white/95">
              {profile.onlineId}
            </span>
            <span className="hidden truncate text-[11px] leading-tight text-white/55 sm:block">
              {profile.statusLine}
            </span>
          </span>
        </div>
      </div>

      <nav aria-label="Links" className="flex shrink-0 items-center gap-3 sm:gap-5">
        {right.map((s) => {
          const Icon = socialIcons[s.id] ?? MessageIcon;
          return (
            <BarLink key={s.id} href={s.href} label={`${s.name}, ${s.handle}`} hint={s.handle}>
              <Icon className="h-[21px] w-[21px]" />
            </BarLink>
          );
        })}
        {profile.resumeHref && (
          <BarLink href={profile.resumeHref} label="Download resume" hint="Resume" download>
            <DownloadIcon className="h-[21px] w-[21px]" />
          </BarLink>
        )}
      </nav>

      <div className="shrink-0 pl-2 sm:pl-6">
        <Clock />
      </div>
    </header>
  );
}
