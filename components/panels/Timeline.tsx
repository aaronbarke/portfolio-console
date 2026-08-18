import { experience, independentWork } from "@/lib/experience";
import type { ExperienceEntry } from "@/lib/types";

function Entry({ entry }: { entry: ExperienceEntry }) {
  return (
    <li className="relative pl-7">
      <span
        aria-hidden="true"
        className="absolute -left-[5px] top-[7px] h-2.5 w-2.5 rounded-full bg-base-glow ring-4 ring-base-glow/20"
      />
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="text-base font-semibold tracking-tight">{entry.role}</h3>
        <span className="text-sm text-base-glow">{entry.org}</span>
      </div>
      <p className="mt-0.5 text-xs uppercase tracking-[0.14em] text-ink-muted">
        {entry.period}
        {entry.location ? ` · ${entry.location}` : ""}
      </p>
      <ul className="mt-2.5 space-y-1.5">
        {entry.points.map((point) => (
          <li key={point} className="text-sm leading-relaxed text-ink-soft">
            {point}
          </li>
        ))}
      </ul>
    </li>
  );
}

/** Experience, laid out chronologically. */
export function Timeline() {
  return (
    <div className="space-y-9">
      <section>
        <h2 className="text-[11px] uppercase tracking-[0.2em] text-ink-muted">Building</h2>
        <ul className="mt-4 space-y-8 border-l border-white/12 pl-0">
          {independentWork.map((entry) => (
            <Entry key={entry.org} entry={entry} />
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-[11px] uppercase tracking-[0.2em] text-ink-muted">Experience</h2>
        <ul className="mt-4 space-y-8 border-l border-white/12 pl-0">
          {experience.map((entry) => (
            <Entry key={entry.org} entry={entry} />
          ))}
        </ul>
      </section>
    </div>
  );
}
