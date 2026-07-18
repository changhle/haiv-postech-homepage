"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import HeroParticles from "./HeroParticles";
import { site } from "@/lib/data/site";

const rise = {
  hidden: { opacity: 0, y: 36 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  const reduce = useReducedMotion();
  // Text renders visible first; once hydrated, the wrapper remounts (via key)
  // and the entrance animation plays. Without JS the text simply stays visible.
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const anim = ready && !reduce;

  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden">
      <HeroParticles />
      <div key={String(anim)} className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-16">
        <motion.p
          custom={0}
          variants={rise}
          initial={anim ? "hidden" : false}
          animate="show"
          className="eyebrow"
        >
          {site.name} · {site.affiliation}
        </motion.p>
        <motion.h1
          custom={1}
          variants={rise}
          initial={anim ? "hidden" : false}
          animate="show"
          className="mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.12] tracking-tight sm:text-6xl"
        >
          Vision intelligence that{" "}
          <span className="bg-gradient-to-r from-royal via-orchid to-neon bg-clip-text text-transparent">
            understands people
          </span>
          , scenes, and stories.
        </motion.h1>
        <motion.p
          custom={2}
          variants={rise}
          initial={anim ? "hidden" : false}
          animate="show"
          className="mt-6 max-w-xl text-lg leading-relaxed text-mist/80"
        >
          From hour-long video to clinical imaging, we build models people can
          read, steer, and trust — and we publish the results at the field&apos;s
          top venues.
        </motion.p>
      </div>
      <motion.div
        aria-hidden
        initial={anim ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="h-10 w-px animate-pulse bg-gradient-to-b from-orchid to-transparent" />
      </motion.div>
    </section>
  );
}
