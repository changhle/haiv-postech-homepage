"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import HeroParticles from "./HeroParticles";

const EASE = [0.22, 1, 0.36, 1] as const;
const subscribeToHydration = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const scenes = [
  {
    name: "Dialogue",
    meaning: "Signals answer, overlap, and reshape each other.",
  },
  {
    name: "Dialogue · Mystic",
    meaning: "The exchange expands into a soft, luminous veil.",
  },
  {
    name: "Shared Focus",
    meaning: "Perception gathers around a common lens.",
  },
  {
    name: "Shared Focus · Mystic",
    meaning: "The shared lens blooms into a deeper aura.",
  },
  {
    name: "Emergence",
    meaning: "Small signals assemble into collective meaning.",
  },
  {
    name: "Emergence · Mystic",
    meaning: "Signals gather into a bold, softly graded constellation.",
  },
  {
    name: "Continuum",
    meaning: "Human and machine remain in continuous flow.",
  },
  {
    name: "Continuum · Mystic",
    meaning: "The continuous field becomes wider and dreamlike.",
  },
  {
    name: "Weave",
    meaning: "Human and machine contributions remain interlaced.",
  },
  {
    name: "Weave · Mystic",
    meaning: "The interlaced structure expands into broad, fluid fabric.",
  },
  {
    name: "Vanta Fog",
    meaning: "POSTECH purple drifts through a deep, fluid fog field.",
  },
] as const;

const lineReveal = {
  hidden: { y: "112%", opacity: 0 },
  show: (delay: number) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 1.25, delay, ease: EASE },
  }),
};

export default function Hero() {
  const [scene, setScene] = useState(10);
  const reduce = useReducedMotion();
  const ready = useSyncExternalStore(
    subscribeToHydration,
    getClientSnapshot,
    getServerSnapshot,
  );
  const animate = ready && !reduce;

  const sectionRef = useRef<HTMLElement>(null);
  const snapLockRef = useRef(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -38]);
  const copyScale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.62, 1], [1, 0.9, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.86, 1], [1, 0.9, 0]);

  useEffect(() => {
    if (reduce) return;

    let previousY = window.scrollY;
    let unlockTimer = 0;

    const onScroll = () => {
      const y = window.scrollY;
      const movingDown = y > previousY + 1;
      const movingUp = y < previousY - 1;
      previousY = y;

      const content = document.getElementById("home-content");
      if (snapLockRef.current || !content) return;

      const downThreshold = Math.min(180, window.innerHeight * 0.18);
      const upThreshold = Math.min(220, window.innerHeight * 0.24);
      const target = content.offsetTop;

      const snapTo = (top: number) => {
        snapLockRef.current = true;
        window.scrollTo({ top, behavior: "smooth" });
        unlockTimer = window.setTimeout(() => {
          snapLockRef.current = false;
          previousY = window.scrollY;
        }, 900);
      };

      if (movingDown && y >= downThreshold && y < target - downThreshold) {
        snapTo(target);
      } else if (
        movingUp &&
        y > downThreshold &&
        y <= target - upThreshold
      ) {
        snapTo(0);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(unlockTimer);
      snapLockRef.current = false;
    };
  }, [reduce]);

  return (
    <section
      ref={sectionRef}
      className="home-hero relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 will-change-transform"
        style={animate ? { scale: sceneScale, opacity: sceneOpacity } : undefined}
      >
        <HeroParticles scene={scene} />
      </motion.div>

      <motion.div
        key={String(animate)}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 text-center will-change-transform"
        style={
          animate
            ? { y: copyY, scale: copyScale, opacity: copyOpacity }
            : undefined
        }
      >
        <motion.p
          initial={animate ? { opacity: 0, y: 12, letterSpacing: "0.7em" } : false}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.46em" }}
          transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
          className="hero-kicker font-mono text-[0.65rem] font-medium text-white sm:text-xs"
        >
          POSTECH
        </motion.p>

        <h1
          aria-label="Human-AI Interaction & Visualization"
          className="hero-title mx-auto mt-7 font-display text-[clamp(2.75rem,7.2vw,6.8rem)] font-semibold leading-[0.98] tracking-[-0.065em]"
        >
          <span aria-hidden className="block overflow-hidden pb-[0.1em]">
            <motion.span
              custom={0.28}
              variants={lineReveal}
              initial={animate ? "hidden" : false}
              animate="show"
              className="block"
            >
              Human-AI Interaction
            </motion.span>
          </span>
          <span aria-hidden className="block overflow-hidden pb-[0.12em]">
            <motion.span
              custom={0.4}
              variants={lineReveal}
              initial={animate ? "hidden" : false}
              animate="show"
              className="hero-title-spectrum block"
            >
              &amp; Visualization
            </motion.span>
          </span>
        </h1>
      </motion.div>

      <motion.div
        initial={animate ? { opacity: 0, y: 16 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
        className="hero-scene-picker absolute inset-x-4 bottom-5 z-20 mx-auto max-w-5xl"
      >
        <div className="mb-2.5 h-9 text-center sm:h-5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={scene}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.22 }}
              className="font-mono text-[0.58rem] leading-relaxed tracking-[0.14em] text-white/65 sm:text-[0.62rem]"
            >
              <span className="font-medium text-white">
                {scenes[scene].name.toUpperCase()}
              </span>
              <span> — {scenes[scene].meaning}</span>
            </motion.p>
          </AnimatePresence>
        </div>

        <div
          role="tablist"
          aria-label="Hero animation concepts"
          className="hero-scene-tabs mx-auto grid max-w-5xl grid-cols-6 gap-1 p-1 sm:grid-cols-11"
        >
          {scenes.map((candidate, index) => (
            <button
              key={candidate.name}
              type="button"
              role="tab"
              aria-selected={scene === index}
              aria-label={`${candidate.name}: ${candidate.meaning}`}
              onClick={() => setScene(index)}
              className={`hero-scene-tab relative isolate flex h-10 min-w-0 items-center justify-center gap-2 rounded-full px-2 font-mono text-[0.6rem] tracking-[0.08em] transition-colors sm:px-3 ${
                scene === index ? "text-white" : "text-white/55 hover:text-white"
              }`}
            >
              {scene === index && (
                <motion.span
                  layoutId="active-hero-scene"
                  className="absolute inset-0 -z-10 rounded-full bg-royal/35 shadow-[0_4px_20px_rgba(42,14,73,0.18)] ring-1 ring-inset ring-white/25"
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                />
              )}
              <span>{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
