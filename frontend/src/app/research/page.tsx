import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import VenueChart from "@/components/VenueChart";
import HighlightGrid from "@/components/HighlightGrid";
import { coreTopics, projects } from "@/lib/data/research";

export const metadata: Metadata = {
  title: "Research",
  description: "Core topics, highlighted results, and ongoing projects at HAIV Lab.",
};

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-28 pb-8">
      {/* Core Topics */}
      <section className="py-8">
        <Reveal>
          <SectionHeading
            eyebrow="Core Topics"
            title="What we study"
            lede="Four threads run through everything the lab does. Most projects sit at the intersection of two or more."
          />
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {coreTopics.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.07}>
              <article className="card card-hover h-full p-6">
                <h3 className="font-display text-xl font-semibold">{t.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist/75">
                  {t.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {t.keywords.map((k) => (
                    <li
                      key={k}
                      className="rounded-full border border-neon/25 px-3 py-1 font-mono text-[0.65rem] tracking-wider text-mist/80"
                    >
                      {k}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8">
          <VenueChart />
        </Reveal>
      </section>

      <hr className="hairline my-12" />

      {/* Highlighted Research */}
      <section id="highlights" className="scroll-mt-24 py-8">
        <Reveal>
          <SectionHeading
            eyebrow="Highlighted Research"
            title="Representative results"
            lede="Click any card for the full story behind the paper."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <HighlightGrid />
        </Reveal>
      </section>

      <hr className="hairline my-12" />

      {/* Ongoing Projects */}
      <section className="py-8">
        <Reveal>
          <SectionHeading
            eyebrow="Ongoing Projects"
            title="Funded projects in progress"
          />
        </Reveal>
        <ul>
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <li className="flex flex-col gap-2 border-b border-neon/10 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                <div>
                  <span
                    className={`mr-3 inline-block rounded-full border px-2.5 py-0.5 font-mono text-[0.65rem] tracking-wider ${
                      p.kind === "국책과제"
                        ? "border-orchid/40 text-orchid"
                        : "border-mist/40 text-mist"
                    }`}
                  >
                    {p.kind}
                  </span>
                  <span className="font-medium leading-relaxed">{p.title}</span>
                  <p className="mt-1 text-sm text-mist/75">{p.sponsor}</p>
                </div>
                <span className="shrink-0 font-mono text-xs tracking-widest text-mist/70">
                  {p.period}
                </span>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>
    </div>
  );
}
