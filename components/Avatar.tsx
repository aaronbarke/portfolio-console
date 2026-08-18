import { profile } from "@/lib/profile";

/**
 * Generated avatar. Swap for a real photo by dropping one in /public and
 * replacing this component's body with an <Image>.
 */
export function Avatar({ size = 34 }: { size?: number }) {
  const initials = profile.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      className="inline-flex shrink-0 items-center justify-center rounded-full bg-[linear-gradient(140deg,#4fc3ff_0%,#1176c9_50%,#0a2b4a_100%)] font-semibold tracking-wide text-white ring-1 ring-white/25"
    >
      {initials}
    </span>
  );
}
