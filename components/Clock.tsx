"use client";

import { useEffect, useState } from "react";

/**
 * Renders nothing until mounted — the server has no idea what time it is
 * where the visitor is, and a mismatch would hydrate badly.
 */
export function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(id);
  }, []);

  if (!now) return <span className="w-[54px]" aria-hidden="true" />;

  const time = now.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });

  return (
    <time
      dateTime={now.toISOString()}
      className="whitespace-nowrap text-sm font-medium tabular-nums text-ink-soft"
      suppressHydrationWarning
    >
      {time}
    </time>
  );
}
