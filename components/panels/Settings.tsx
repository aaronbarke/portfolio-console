import { DownloadIcon } from "../Icons";
import { profile } from "@/lib/profile";

/** Resume download plus a short note on how this site was made. */
export function Settings() {
  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">Resume</h3>
        {profile.resumeHref ? (
          <a
            href={profile.resumeHref}
            download
            className="mt-3 inline-flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-base-deep transition-transform duration-200 ease-console hover:scale-[1.02] focus-visible:shadow-focus"
          >
            <DownloadIcon className="h-4 w-4" />
            Download resume (PDF)
          </a>
        ) : (
          <p className="mt-3 text-sm text-ink-muted">Available on request.</p>
        )}
      </section>

      <section>
        <h3 className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">About this site</h3>
        <div className="mt-3 max-w-prose space-y-3 text-sm leading-relaxed text-ink-soft">
          <p>
            An original interface inspired by the console home screens I grew up with — the
            layout language, the focus glow, the way a tile opens downward instead of navigating
            away. None of the artwork, iconography or naming is borrowed; the glyphs and cover art
            are drawn in code in this repository.
          </p>
          <p>
            Built with Next.js 14, TypeScript, Tailwind and Framer Motion. Every tile is a real
            button with a roving tab index, the whole surface is keyboard navigable, and all motion
            switches off under <code className="text-ink">prefers-reduced-motion</code>.
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">Controls</h3>
        <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          {[
            ["← →", "Move between tiles"],
            ["Enter / ↓", "Open the highlighted tile"],
            ["Esc / ↑", "Back out one level"],
            ["Tab", "Move through links and buttons"],
          ].map(([key, action]) => (
            <div key={key} className="flex items-center gap-3">
              <dt className="min-w-[76px] rounded border border-white/15 bg-white/[0.06] px-2 py-1 text-center text-xs font-medium">
                {key}
              </dt>
              <dd className="text-ink-soft">{action}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
