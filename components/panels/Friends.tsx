import { ExternalIcon } from "../Icons";
import { profile } from "@/lib/profile";

/** Social links, presented as a friends list with presence dots. */
export function Friends() {
  return (
    <ul className="space-y-2">
      {profile.socials.map((social) => (
        <li key={social.id}>
          <a
            href={social.href}
            target={social.href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noreferrer noopener"
            className="group flex items-center gap-4 rounded-md border border-white/10 bg-white/[0.04] px-4 py-3.5 transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.08] focus-visible:shadow-focus"
          >
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-sm font-semibold ring-1 ring-white/15">
              {social.name[0]}
              <span
                aria-hidden="true"
                className={[
                  "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ring-2 ring-base-deep",
                  social.status === "online" ? "bg-base-glow" : "bg-ink-faint",
                ].join(" ")}
              />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium">{social.name}</span>
              <span className="block truncate text-xs text-ink-muted">{social.handle}</span>
            </span>
            <ExternalIcon className="h-4 w-4 shrink-0 text-ink-muted transition-colors group-hover:text-ink" />
          </a>
        </li>
      ))}
    </ul>
  );
}
