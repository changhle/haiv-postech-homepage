"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GradientThumb from "./GradientThumb";
import { highlights, type Highlight } from "@/lib/data/research";

/** Thumbnail grid; clicking a card opens the research detail in a modal. */
export default function HighlightGrid() {
  const [active, setActive] = useState<Highlight | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        {highlights.map((h) => (
          <button
            key={h.id}
            type="button"
            onClick={() => setActive(h)}
            className="card card-hover overflow-hidden text-left"
          >
            <GradientThumb colors={h.thumb} label={h.venue} className="h-40" />
            <div className="p-5">
              <h3 className="font-display text-lg font-semibold leading-snug">
                {h.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist/70">
                {h.summary}
              </p>
              <span className="mt-3 inline-block font-mono text-xs tracking-widest text-orchid">
                READ MORE →
              </span>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-void/80 p-5 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={active.title}
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="card max-h-[85svh] w-full max-w-xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <GradientThumb colors={active.thumb} className="h-36" />
              <div className="p-6 sm:p-8">
                <p className="font-mono text-xs tracking-widest text-orchid">
                  {active.venue}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold leading-snug">
                  {active.title}
                </h3>
                <p className="mt-4 leading-relaxed text-ink/85">{active.detail}</p>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="mt-6 rounded-md border border-neon/30 px-4 py-2 font-mono text-xs tracking-widest text-mist transition-colors hover:border-orchid hover:text-orchid"
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
