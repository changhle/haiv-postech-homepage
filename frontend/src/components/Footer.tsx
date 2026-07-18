import Link from "next/link";
import { site } from "@/lib/data/site";

export default function Footer() {
  return (
    <footer className="mt-24">
      <hr className="hairline" />
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold">
            HAIV<span className="text-orchid">.</span>
          </p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-mist/70">
            {site.name}, {site.affiliation}
          </p>
        </div>
        <div className="text-sm leading-relaxed text-mist/70">
          <p>{site.address.line1}</p>
          <p>{site.address.line2}</p>
        </div>
        <div className="text-sm leading-relaxed">
          <a
            href={`mailto:${site.email}`}
            className="text-orchid hover:text-royal"
          >
            {site.email}
          </a>
          <p className="text-mist/70">{site.phone}</p>
          <Link href="/join" className="mt-2 inline-block text-ink/80 hover:text-ink">
            Directions →
          </Link>
        </div>
      </div>
      <p className="pb-8 text-center font-mono text-xs tracking-widest text-mist/60">
        © {new Date().getFullYear()} {site.shortName} · {site.affiliation}
      </p>
    </footer>
  );
}
