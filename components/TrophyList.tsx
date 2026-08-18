import { TrophyIcon } from "./Icons";
import { tierBlurbs, tierLabels, tierOrder, trophiesByTier } from "@/lib/trophies";
import type { TrophyTier } from "@/lib/types";
import { trophies } from "@/lib/trophies";

const tierAccent: Record<TrophyTier, string> = {
  platinum: "text-tier-platinum",
  gold: "text-tier-gold",
  silver: "text-tier-silver",
  bronze: "text-tier-bronze",
};

const tierRing: Record<TrophyTier, string> = {
  platinum: "ring-tier-platinum/45 bg-tier-platinum/10",
  gold: "ring-tier-gold/45 bg-tier-gold/10",
  silver: "ring-tier-silver/40 bg-tier-silver/10",
  bronze: "ring-tier-bronze/45 bg-tier-bronze/10",
};

/** Skills, grouped by how deep the experience actually goes. */
export function TrophyList() {
  return (
    <div className="space-y-8">
      <p className="max-w-prose text-sm leading-relaxed text-ink-soft">
        Tiers describe depth rather than preference — {trophies.length} entries, each tied to
        something on this site rather than listed for keyword coverage.
      </p>

      {tierOrder.map((tier) => {
        const items = trophiesByTier(tier);
        if (items.length === 0) return null;

        return (
          <section key={tier}>
            <header className="flex items-baseline gap-3">
              <h3
                className={`text-sm font-semibold uppercase tracking-[0.18em] ${tierAccent[tier]}`}
              >
                {tierLabels[tier]}
              </h3>
              <span className="text-xs text-ink-muted">{tierBlurbs[tier]}</span>
              <span className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-ink-muted tabular-nums">{items.length}</span>
            </header>

            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {items.map((trophy) => (
                <li
                  key={trophy.name}
                  className="flex items-start gap-3 rounded-md border border-white/10 bg-white/[0.04] px-3.5 py-3 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.07]"
                >
                  <span
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-1 ${tierRing[tier]} ${tierAccent[tier]}`}
                  >
                    <TrophyIcon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium">{trophy.name}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-ink-muted">
                      {trophy.detail}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
