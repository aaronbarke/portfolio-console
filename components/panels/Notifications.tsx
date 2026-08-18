import { NotificationIcon, TrophyIcon, PlusRingIcon } from "../Icons";
import { notifications } from "@/lib/profile";

const kindIcon = {
  trophy: TrophyIcon,
  activity: PlusRingIcon,
  update: NotificationIcon,
} as const;

/** "What I'm working on now", in the shape of a notification feed. */
export function Notifications() {
  return (
    <ul className="space-y-3">
      {notifications.map((item) => {
        const Icon = kindIcon[item.kind];
        return (
          <li
            key={item.id}
            className="flex gap-4 rounded-md border border-white/10 bg-white/[0.04] p-4 transition-colors duration-200 hover:border-white/20"
          >
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-base-glow/12 text-base-glow ring-1 ring-base-glow/30">
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-sm font-medium">{item.title}</h3>
                <span className="text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                  {item.when}
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{item.body}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
