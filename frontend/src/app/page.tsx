import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import GradientThumb from "@/components/GradientThumb";
import { site } from "@/lib/data/site";
import { highlights } from "@/lib/data/research";
import { getEvents } from "@/lib/api";

const dateFmt = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export default async function HomePage() {
  const { news } = await getEvents();
  return (
    <>
      <Hero />

      <div id="home-content" className="home-content-start">
        {/* About Us */}
        <section className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <SectionHeading eyebrow="About Us" title="What we work toward" />
            <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-ink/85">
              {site.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
        </section>

        <hr className="hairline mx-auto max-w-6xl" />

        {/* Recent News */}
        <section className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Recent News"
              title="Fresh from the lab"
              lede="The latest results, awards, and arrivals — see the Events page for the full archive."
            />
          </Reveal>
          <ol>
            {news.slice(0, 4).map((n, i) => (
              <Reveal key={n.title} delay={i * 0.08}>
                <li className="group flex flex-col gap-1 border-b border-neon/10 py-5 sm:flex-row sm:items-baseline sm:gap-8">
                  <time
                    dateTime={n.date}
                    className="shrink-0 font-mono text-xs tracking-widest text-orchid/80"
                  >
                    {dateFmt.format(new Date(n.date))}
                  </time>
                  <div>
                    <h3 className="font-medium text-ink transition-colors group-hover:text-orchid">
                      {n.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-mist/70">
                      {n.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={0.2}>
            <Link
              href="/events"
              className="mt-8 inline-block font-mono text-sm tracking-widest text-orchid hover:text-royal"
            >
              ALL NEWS →
            </Link>
          </Reveal>
        </section>

        <hr className="hairline mx-auto max-w-6xl" />

        {/* Highlights */}
        <section className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Highlights"
              title="Research we're known for"
              lede="A few results that define the lab's direction — each links to the full story on the Research page."
            />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {highlights.slice(0, 4).map((h, i) => (
              <Reveal key={h.id} delay={i * 0.08}>
                <Link
                  href="/research#highlights"
                  className="card card-hover block h-full overflow-hidden"
                >
                  <GradientThumb colors={h.thumb} label={h.venue} className="h-36" />
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold leading-snug">
                      {h.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist/70">
                      {h.summary}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
