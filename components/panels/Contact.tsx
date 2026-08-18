"use client";

import { useState } from "react";
import { ExternalIcon, MessageIcon } from "../Icons";
import { profile } from "@/lib/profile";

/**
 * Contact is a mailto composer rather than a form. There is no backend behind
 * this site, and a form that silently drops messages is worse than no form.
 */
export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent("Hello from your portfolio")}`;

  return (
    <div className="space-y-6">
      <p className="max-w-prose text-sm leading-relaxed text-ink-soft">
        Open to full-stack and backend roles, and happy to talk through anything on this page in
        more detail, including the parts that did not work.
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <a
          href={mailto}
          className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-base-deep transition-transform duration-200 ease-console hover:scale-[1.02] focus-visible:shadow-focus"
        >
          <MessageIcon className="h-4 w-4" />
          Send a message
        </a>

        <button
          type="button"
          onClick={copyEmail}
          className="inline-flex items-center gap-2 rounded-md border border-white/15 px-4 py-2.5 text-sm font-medium text-ink-soft transition-colors duration-200 hover:border-white/35 hover:text-ink focus-visible:shadow-focus"
        >
          {copied ? "Copied" : profile.email}
        </button>
      </div>

      <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
        <h3 className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">Elsewhere</h3>
        <ul className="mt-3 space-y-2">
          {profile.socials
            .filter((social) => !social.href.startsWith("mailto:"))
            .map((social) => (
              <li key={social.id}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink focus-visible:shadow-focus"
                >
                  <span className="font-medium">{social.name}</span>
                  <span className="text-ink-muted">{social.handle}</span>
                  <ExternalIcon className="h-3.5 w-3.5 opacity-60 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
