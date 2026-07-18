"use client";

import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useReducedMotion } from "framer-motion";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  fullScreen: { enable: false },
  fpsLimit: 60,
  detectRetina: true,
  background: { color: "transparent" },
  particles: {
    number: { value: 90, density: { enable: true, width: 1200, height: 800 } },
    color: { value: ["#5a189a", "#7b2cbf", "#9d4edd", "#c77dff"] },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 3 } },
    opacity: {
      value: { min: 0.2, max: 0.7 },
      animation: { enable: true, speed: 0.6, sync: false },
    },
    links: {
      enable: true,
      distance: 130,
      color: "#7b2cbf",
      opacity: 0.22,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: "none",
      random: true,
      outModes: { default: "out" },
    },
  },
  interactivity: {
    events: { onHover: { enable: true, mode: "grab" } },
    modes: { grab: { distance: 160, links: { opacity: 0.45 } } },
  },
};

/**
 * Purple particle nebula behind the hero. Under reduced motion only the
 * static gradient glow renders.
 */
export default function HeroParticles() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {/* soft lavender glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 30% 35%, rgba(157,78,221,0.14), transparent 65%)," +
            "radial-gradient(ellipse 55% 45% at 75% 60%, rgba(123,44,191,0.10), transparent 60%)," +
            "radial-gradient(ellipse 45% 40% at 55% 20%, rgba(199,125,255,0.12), transparent 55%)",
        }}
      />
      {!reduce && (
        <ParticlesProvider init={async (engine) => loadSlim(engine)}>
          <Particles id="hero-particles" options={options} className="absolute inset-0" />
        </ParticlesProvider>
      )}
      {/* fade into page background */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-void" />
    </div>
  );
}
