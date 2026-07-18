import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { getPublications } from "@/lib/api";
import type { Paper, Patent } from "@/lib/data/publications";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "International and domestic papers and patents from HAIV Lab, archived by year.",
};

function PaperItem({ paper }: { paper: Paper }) {
  return (
    <li className="border-b border-neon/10 py-4 last:border-b-0">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span
          className={`rounded-full border px-2.5 py-0.5 font-mono text-[0.62rem] tracking-wider ${
            paper.tag === "Journal"
              ? "border-orchid/45 text-orchid"
              : "border-mist/40 text-mist"
          }`}
        >
          {paper.tag}
        </span>
        <span className="font-mono text-xs tracking-wider text-mist/70">
          {paper.venue}
        </span>
      </div>
      <h4 className="mt-2 font-medium leading-snug text-ink">{paper.title}</h4>
      <p className="mt-1 text-sm text-mist/75">{paper.authors}</p>
      <div className="mt-2 flex gap-4">
        {paper.doi && (
          <a
            href={paper.doi}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs tracking-widest text-orchid hover:text-royal"
          >
            DOI ↗
          </a>
        )}
        {paper.pdf && (
          <a
            href={paper.pdf}
            className="font-mono text-xs tracking-widest text-orchid hover:text-royal"
          >
            PDF ↓
          </a>
        )}
      </div>
    </li>
  );
}

function PatentItem({ patent }: { patent: Patent }) {
  return (
    <li className="border-b border-neon/10 py-4 last:border-b-0">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span
          className={`rounded-full border px-2.5 py-0.5 font-mono text-[0.62rem] tracking-wider ${
            patent.status === "등록"
              ? "border-orchid/45 text-orchid"
              : "border-mist/40 text-mist"
          }`}
        >
          {patent.status}
        </span>
        <span className="font-mono text-xs tracking-wider text-mist/70">
          {patent.number} · {patent.date}
        </span>
      </div>
      <h4 className="mt-2 font-medium leading-snug text-ink">{patent.title}</h4>
      <p className="mt-1 text-sm text-mist/75">{patent.inventors}</p>
    </li>
  );
}

function Category({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-8 first:mt-0">
      <h3 className="eyebrow">{label}</h3>
      <ul className="mt-2">{children}</ul>
    </div>
  );
}

export default async function PublicationsPage() {
  const publications = await getPublications();
  return (
    <div className="mx-auto max-w-6xl px-5 pt-28 pb-8">
      <Reveal>
        <SectionHeading
          eyebrow="Publications"
          title="The archive, year by year"
          lede="International papers first, then domestic papers and patents — newest year at the top."
        />
      </Reveal>

      {publications.map((group) => (
        <section
          key={group.year}
          className="grid gap-4 border-t border-neon/15 py-10 md:grid-cols-[10rem_1fr] md:gap-12"
        >
          {/* sticky giant year — the archive's spine */}
          <div>
            <div className="md:sticky md:top-24">
              <span
                aria-hidden
                className="font-display text-6xl font-bold tracking-tight text-transparent md:text-7xl"
                style={{ WebkitTextStroke: "1.5px rgba(123,44,191,0.45)" }}
              >
                {group.year}
              </span>
              <span className="sr-only">{group.year}</span>
            </div>
          </div>

          <div>
            {group.international.length > 0 && (
              <Reveal>
                <Category label="International">
                  {group.international.map((p) => (
                    <PaperItem key={p.title} paper={p} />
                  ))}
                </Category>
              </Reveal>
            )}
            {group.domestic.length > 0 && (
              <Reveal delay={0.05}>
                <Category label="Domestic">
                  {group.domestic.map((p) => (
                    <PaperItem key={p.title} paper={p} />
                  ))}
                </Category>
              </Reveal>
            )}
            {group.patents.length > 0 && (
              <Reveal delay={0.1}>
                <Category label="Patents">
                  {group.patents.map((p) => (
                    <PatentItem key={p.number} patent={p} />
                  ))}
                </Category>
              </Reveal>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
