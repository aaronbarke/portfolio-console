import { TrophyList } from "./TrophyList";
import { profile } from "@/lib/profile";
import type { CardBody, ExperienceEntry, Favorite, Post, Project } from "@/lib/types";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">{children}</h3>;
}

function Metrics({ items }: { items: { label: string; value: string }[] }) {
  return (
    <dl className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-white/12 bg-white/12 sm:grid-cols-3">
      {items.map((metric) => (
        <div key={metric.label} className="bg-base-deep/60 px-4 py-3">
          <dt className="text-[11px] uppercase tracking-[0.14em] text-ink-muted">{metric.label}</dt>
          <dd className="mt-1 text-lg font-semibold tabular-nums">{metric.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-2.5 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
          <span
            aria-hidden="true"
            className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-base-glow"
          />
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="mt-5 max-w-prose space-y-4">
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="text-sm leading-relaxed text-ink-soft">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function ProjectBody({ project }: { project: Project }) {
  return (
    <>
      <p className="mt-5 max-w-prose text-sm leading-relaxed text-ink-soft">{project.summary}</p>
      {project.metrics && project.metrics.length > 0 && <Metrics items={project.metrics} />}
      <div className="mt-6">
        <Eyebrow>Built with</Eyebrow>
        <ul className="mt-2.5 flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <li
              key={item}
              className="rounded-full border border-white/15 bg-white/[0.08] px-2.5 py-1 text-xs text-ink-soft"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <Eyebrow>What it does</Eyebrow>
        <Bullets items={project.features} />
      </div>
    </>
  );
}

function AboutBody() {
  return (
    <>
      <Prose paragraphs={profile.bio} />
      <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-[11px] uppercase tracking-[0.14em] text-ink-muted">Based in</dt>
          <dd className="mt-1 text-ink-soft">{profile.location}</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-[0.14em] text-ink-muted">Email</dt>
          <dd className="mt-1">
            <a
              href={`mailto:${profile.email}`}
              className="text-base-glow underline-offset-4 hover:underline focus-visible:shadow-focus"
            >
              {profile.email}
            </a>
          </dd>
        </div>
      </dl>
    </>
  );
}

function RoleBody({ entry, heading }: { entry: ExperienceEntry; heading: string }) {
  return (
    <>
      <p className="mt-2 text-xs uppercase tracking-[0.14em] text-ink-muted">
        {entry.period}
        {entry.location ? ` · ${entry.location}` : ""}
      </p>
      <div className="mt-5">
        <Eyebrow>{heading}</Eyebrow>
        <Bullets items={entry.points} />
      </div>
    </>
  );
}

function PostBody({ post }: { post: Post }) {
  return (
    <>
      <p className="mt-2 text-xs uppercase tracking-[0.14em] text-ink-muted">
        {post.outlet} · {post.date}
      </p>
      <Prose paragraphs={post.body} />
    </>
  );
}

function FavoriteBody({ favorite }: { favorite: Favorite }) {
  return (
    <>
      <p className="mt-2 text-xs uppercase tracking-[0.14em] text-ink-muted">{favorite.period}</p>
      <Prose paragraphs={favorite.note} />
      {favorite.stats && favorite.stats.length > 0 && <Metrics items={favorite.stats} />}
    </>
  );
}

/** Picks the renderer for a card. One branch per body variant. */
export function CardBodyView({ body }: { body: CardBody }) {
  switch (body.type) {
    case "project":
      return <ProjectBody project={body.project} />;
    case "about":
      return <AboutBody />;
    case "skills":
      return (
        <div className="mt-6">
          <TrophyList />
        </div>
      );
    case "role":
      return <RoleBody entry={body.entry} heading="What I did" />;
    case "education":
      return <RoleBody entry={body.entry} heading="Details" />;
    case "post":
      return <PostBody post={body.post} />;
    case "favorite":
      return <FavoriteBody favorite={body.favorite} />;
    default:
      return null;
  }
}
