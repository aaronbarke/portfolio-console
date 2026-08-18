"use client";

import { motion } from "framer-motion";
import { TileArt } from "./TileArt";
import { ExternalIcon, LockIcon } from "./Icons";
import type { Project } from "@/lib/types";

/**
 * The detail view expands downward in place rather than opening a modal or
 * routing away, so the home screen stays the anchor the whole time.
 */
export function ExpandPanel({ project }: { project: Project }) {
  const primary = project.links.find((link) => link.primary) ?? project.links[0];
  const secondary = project.links.filter((link) => link !== primary);

  return (
    <motion.section
      key={project.id}
      aria-label={`${project.title} details`}
      initial={{ opacity: 0, height: 0, y: -4 }}
      animate={{ opacity: 1, height: "auto", y: 0 }}
      exit={{ opacity: 0, height: 0, y: -4 }}
      transition={{
        height: { type: "spring", stiffness: 200, damping: 34 },
        opacity: { duration: 0.26, ease: "easeOut" },
      }}
      className="overflow-hidden"
    >
      <div className="mt-6 rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(8,30,52,0.78)_0%,rgba(5,18,31,0.72)_100%)] shadow-panel backdrop-blur-xl">
        <div className="grid gap-7 p-6 sm:p-8 lg:grid-cols-[220px_minmax(0,1fr)]">
          <div className="flex flex-col gap-4">
            <TileArt
              motif={project.art.motif}
              from={project.art.from}
              to={project.art.to}
              monogram={project.art.monogram}
              className="aspect-square w-full max-w-[220px] overflow-hidden rounded-md shadow-tile"
            />

            <div className="flex flex-col gap-2">
              {primary ? (
                <a
                  href={primary.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-base-deep transition-transform duration-200 ease-console hover:scale-[1.02] focus-visible:shadow-focus"
                >
                  {primary.label}
                  <ExternalIcon className="h-4 w-4" />
                </a>
              ) : (
                <span className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-ink-soft">
                  <LockIcon className="h-4 w-4" />
                  Private repository
                </span>
              )}

              {secondary.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 px-4 py-2.5 text-sm font-medium text-ink-soft transition-colors duration-200 hover:border-white/35 hover:text-ink focus-visible:shadow-focus"
                >
                  {link.label}
                  <ExternalIcon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="min-w-0">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{project.title}</h2>
            <p className="mt-1.5 text-sm text-base-glow sm:text-base">{project.tagline}</p>

            <p className="mt-5 max-w-prose text-sm leading-relaxed text-ink-soft">
              {project.summary}
            </p>

            {project.metrics && project.metrics.length > 0 && (
              <dl className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 sm:grid-cols-3">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="bg-base-deep/70 px-4 py-3">
                    <dt className="text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                      {metric.label}
                    </dt>
                    <dd className="mt-1 text-lg font-semibold tabular-nums">{metric.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="mt-6">
              <h3 className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">Built with</h3>
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {project.stack.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/12 bg-white/[0.06] px-2.5 py-1 text-xs text-ink-soft"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                What it does
              </h3>
              <ul className="mt-2.5 space-y-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                    <span
                      aria-hidden="true"
                      className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-base-glow"
                    />
                    <span className="min-w-0">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
