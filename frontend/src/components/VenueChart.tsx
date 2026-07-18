"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { venueCounts } from "@/lib/data/research";

/**
 * Accepted-paper counts per target venue. Single series — identity lives in
 * the row label, magnitude in bar length, and every value is direct-labeled.
 * Bars render at full width by default; the grow-in animation only runs
 * after hydration.
 */
export default function VenueChart() {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const anim = ready && !reduce;
  const max = Math.max(...venueCounts.map((v) => v.count));

  return (
    <figure className="card p-6 sm:p-8">
      <figcaption className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-display font-semibold">
          Accepted papers by target venue
        </span>
        <span className="font-mono text-xs tracking-widest text-mist/70">
          2021 – 2026 · TOTAL {venueCounts.reduce((s, v) => s + v.count, 0)}
        </span>
      </figcaption>
      <ul className="space-y-3">
        {venueCounts.map((v) => (
          <li
            key={v.venue}
            className="group grid grid-cols-[5.5rem_1fr_2rem] items-center gap-3"
          >
            <span className="text-right">
              <span className="font-mono text-sm text-ink/90">{v.venue}</span>
              <span className="ml-1.5 font-mono text-[0.6rem] uppercase tracking-wider text-mist/70">
                {v.kind === "Journal" ? "Jrnl" : "Conf"}
              </span>
            </span>
            <span className="relative h-3.5 rounded-r-[4px] bg-neon/8">
              <motion.span
                key={String(anim)}
                className="absolute inset-y-0 left-0 rounded-r-[4px] bg-bar group-hover:bg-orchid transition-colors"
                initial={anim ? { width: 0 } : { width: `${(v.count / max) * 100}%` }}
                whileInView={{ width: `${(v.count / max) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* hover tooltip */}
              <span
                role="tooltip"
                className="pointer-events-none absolute -top-9 left-0 z-10 whitespace-nowrap rounded-md border border-neon/30 bg-deep px-2.5 py-1 font-mono text-xs text-ink opacity-0 transition-opacity group-hover:opacity-100"
              >
                {v.venue} · {v.count} accepted · {v.kind}
              </span>
            </span>
            <span className="font-mono text-sm tabular-nums text-ink/90">
              {v.count}
            </span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
