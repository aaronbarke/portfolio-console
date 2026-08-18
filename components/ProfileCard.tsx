import { Avatar } from "./Avatar";
import { profile } from "@/lib/profile";

/** About: who this is, in the shape of a console profile page. */
export function ProfileCard() {
  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-center gap-5">
        <Avatar size={76} />
        <div className="min-w-0">
          <h3 className="text-2xl font-semibold tracking-tight">{profile.name}</h3>
          <p className="mt-0.5 text-sm text-ink-muted">
            {profile.onlineId} · {profile.location}
          </p>
          <p className="mt-2 inline-flex items-center gap-2 rounded-full border border-base-glow/35 bg-base-glow/10 px-3 py-1 text-xs font-medium text-base-glow">
            <span className="h-1.5 w-1.5 rounded-full bg-base-glow" aria-hidden="true" />
            {profile.statusLine}
          </p>
        </div>
      </div>

      <p className="max-w-prose text-base leading-relaxed text-ink">{profile.headline}</p>

      <div className="max-w-prose space-y-4">
        {profile.bio.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className="text-sm leading-relaxed text-ink-soft">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
