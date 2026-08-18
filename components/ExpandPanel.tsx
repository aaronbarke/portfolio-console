"use client";

import { motion } from "framer-motion";
import { TileArt } from "./TileArt";
import { CardBodyView } from "./CardBodies";
import { DownloadIcon, ExternalIcon, LockIcon, MessageIcon } from "./Icons";
import { profile } from "@/lib/profile";
import type { Card } from "@/lib/types";

function PrimaryLink({
  href,
  label,
  icon,
  download,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      download={download}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer noopener"
      className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-base-deep transition-transform duration-200 ease-console hover:scale-[1.02] focus-visible:shadow-focus"
    >
      {label}
      {icon}
    </a>
  );
}

function SecondaryLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer noopener"
      className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 px-4 py-2.5 text-sm font-medium text-ink-soft transition-colors duration-200 hover:border-white/40 hover:text-ink focus-visible:shadow-focus"
    >
      {label}
      {icon}
    </a>
  );
}

/** The action column varies by what the card actually offers. */
function CardActions({ card }: { card: Card }) {
  if (card.body.type === "project") {
    const project = card.body.project;
    const primary = project.links.find((link) => link.primary) ?? project.links[0];
    const secondary = project.links.filter((link) => link !== primary);
    return (
      <>
        {primary ? (
          <PrimaryLink
            href={primary.href}
            label={primary.label}
            icon={<ExternalIcon className="h-4 w-4" />}
          />
        ) : (
          <span className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-ink-soft">
            <LockIcon className="h-4 w-4" />
            Private repository
          </span>
        )}
        {secondary.map((link) => (
          <SecondaryLink
            key={link.href}
            href={link.href}
            label={link.label}
            icon={<ExternalIcon className="h-4 w-4" />}
          />
        ))}
      </>
    );
  }

  if (card.body.type === "about") {
    return (
      <>
        {profile.resumeHref && (
          <PrimaryLink
            href={profile.resumeHref}
            label="Download resume"
            icon={<DownloadIcon className="h-4 w-4" />}
            download
          />
        )}
        <SecondaryLink
          href={`mailto:${profile.email}`}
          label="Get in touch"
          icon={<MessageIcon className="h-4 w-4" />}
        />
      </>
    );
  }

  if (card.body.type === "post" && card.body.post.href) {
    return (
      <PrimaryLink
        href={card.body.post.href}
        label="Read it"
        icon={<ExternalIcon className="h-4 w-4" />}
      />
    );
  }

  return null;
}

/**
 * The detail view expands downward in place rather than opening a modal or
 * routing away, so the home screen stays the anchor the whole time.
 */
export function ExpandPanel({ card }: { card: Card }) {
  return (
    <motion.section
      key={card.id}
      aria-label={`${card.title} details`}
      initial={{ opacity: 0, height: 0, y: -4 }}
      animate={{ opacity: 1, height: "auto", y: 0 }}
      exit={{ opacity: 0, height: 0, y: -4 }}
      transition={{
        height: { type: "spring", stiffness: 200, damping: 34 },
        opacity: { duration: 0.26, ease: "easeOut" },
      }}
      className="overflow-hidden px-4 sm:px-6 lg:px-10"
    >
      <div className="mt-6 rounded-lg border border-white/14 bg-[linear-gradient(180deg,rgba(9,28,86,0.82)_0%,rgba(4,17,60,0.78)_100%)] shadow-panel backdrop-blur-xl">
        <div className="grid gap-7 p-6 sm:p-8 lg:grid-cols-[220px_minmax(0,1fr)]">
          <div className="flex flex-col gap-4">
            <TileArt
              motif={card.art.motif}
              from={card.art.from}
              to={card.art.to}
              monogram={card.art.monogram}
          accent={card.art.accent}
          image={card.art.image}
          imageFit={card.art.imageFit}
          imageBackground={card.art.imageBackground}
          imagePosition={card.art.imagePosition}
              className="aspect-square w-full max-w-[220px] overflow-hidden rounded-md shadow-tile"
            />
            <div className="flex flex-col gap-2">
              <CardActions card={card} />
            </div>
          </div>

          <div className="min-w-0">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{card.title}</h2>
            <p className="mt-1.5 text-sm text-base-glow sm:text-base">{card.tagline}</p>
            <CardBodyView body={card.body} />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
