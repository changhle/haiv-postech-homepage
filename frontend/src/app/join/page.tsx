import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Join Us",
  description: "Open positions, benefits, and how to find HAIV Lab.",
};

const positions = [
  {
    title: "Ph.D. / Integrated M.S.–Ph.D. Students",
    body: "We look for students who want to own a research direction end-to-end — from the first idea to a top-venue paper. A strong grounding in linear algebra, probability, and PyTorch helps; curiosity and persistence matter more.",
  },
  {
    title: "M.S. Students",
    body: "Master's students join an ongoing project from day one and are expected to publish before graduation. Prior research experience is not required.",
  },
  {
    title: "Undergraduate Interns",
    body: "Year-round internships for POSTECH undergraduates (external applicants welcome for summer/winter). Interns pair with a senior student on a scoped problem.",
  },
];

const applySteps = [
  "Email your CV and transcript to the address below.",
  "Tell us, in a few paragraphs, which of our papers or topics interests you and why.",
  "Shortlisted applicants have a casual interview with the PI and lab members.",
];

const benefits = [
  {
    title: "Stipend",
    body: "Full stipend for all graduate students, funded by national and industry projects — no teaching load required to secure it.",
  },
  {
    title: "Tuition Support",
    body: "Tuition covered for M.S. and Ph.D. students in good standing, plus POSTECH fellowship opportunities.",
  },
  {
    title: "Conference Travel",
    body: "The lab funds travel to every conference where you have a paper — international venues included.",
  },
  {
    title: "Hardware",
    body: "Dedicated workstation per student and a shared GPU cluster (A100/H100) for large-scale training.",
  },
];

export default function JoinPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-28 pb-8">
      {/* Openings */}
      <section className="py-8">
        <Reveal>
          <SectionHeading
            eyebrow="Join Us"
            title="We're recruiting, always"
            lede="HAIV Lab recruits on rolling basis. If our research resonates with you, we'd like to hear from you regardless of the admissions calendar."
          />
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {positions.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07}>
              <article className="card card-hover h-full p-6">
                <h3 className="font-display text-lg font-semibold leading-snug">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist/75">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="card mt-8 p-6 sm:p-8">
            <h3 className="eyebrow">How to apply</h3>
            <ol className="mt-4 space-y-3">
              {applySteps.map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="font-mono text-sm text-orchid">{i + 1}.</span>
                  <span className="leading-relaxed text-ink/85">{s}</span>
                </li>
              ))}
            </ol>
            <a
              href={`mailto:${site.email}?subject=[Join] Application`}
              className="mt-6 inline-block rounded-md bg-gradient-to-r from-royal to-neon px-5 py-2.5 font-medium text-white transition-opacity hover:opacity-90"
            >
              Apply by email
            </a>
          </div>
        </Reveal>
      </section>

      <hr className="hairline my-12" />

      {/* Benefits */}
      <section className="py-8">
        <Reveal>
          <SectionHeading
            eyebrow="Benefits"
            title="How the lab supports you"
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.06}>
              <div className="card h-full p-6">
                <h3 className="font-display font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist/75">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <hr className="hairline my-12" />

      {/* Directions & Contact */}
      <section className="py-8">
        <Reveal>
          <SectionHeading eyebrow="Visit" title="Directions & contact" />
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="card h-full p-6 sm:p-8">
              <h3 className="eyebrow">Address</h3>
              <p className="mt-4 leading-relaxed text-ink/85">
                {site.address.line1}
                <br />
                {site.address.line2}
              </p>
              <a
                href={site.address.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block w-fit font-mono text-xs tracking-widest text-orchid hover:text-royal"
              >
                OPEN IN MAPS ↗
              </a>
              <h3 className="eyebrow mt-8">Contact</h3>
              <p className="mt-4 leading-relaxed">
                <a href={`mailto:${site.email}`} className="text-orchid hover:text-royal">
                  {site.email}
                </a>
                <br />
                <span className="text-mist/75">{site.phone}</span>
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            {/* Stylized campus locator — replace with an embedded map when online keys are set up */}
            <div
              aria-label="Campus map placeholder"
              className="card relative h-full min-h-72 overflow-hidden"
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(157,78,221,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(157,78,221,0.4) 1px, transparent 1px)",
                  backgroundSize: "44px 44px",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 62% 45%, rgba(157,78,221,0.35), transparent 40%)",
                }}
              />
              <div className="absolute left-[58%] top-[40%] -translate-x-1/2">
                <span className="block h-3 w-3 animate-ping rounded-full bg-orchid/60" />
                <span className="absolute inset-0 m-auto block h-3 w-3 rounded-full bg-orchid" />
              </div>
              <p className="absolute bottom-5 left-6 font-mono text-xs tracking-[0.2em] text-mist/70">
                ENG BLDG 2 · ROOM 208
                <br />
                POSTECH CAMPUS
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
