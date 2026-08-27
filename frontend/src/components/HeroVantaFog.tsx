"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

interface HeroVantaFogProps {
  active: boolean;
}

interface VantaEffect {
  destroy: () => void;
  resize: () => void;
}

export default function HeroVantaFog({ active }: HeroVantaFogProps) {
  const fogRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<VantaEffect | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const fog = fogRef.current;
    if (!active || reduce || !fog) return;

    let cancelled = false;
    let resizeObserver: ResizeObserver | null = null;

    const initialize = async () => {
      const [{ default: createFog }, THREE] = await Promise.all([
        import("vanta/dist/vanta.fog.min"),
        import("three"),
      ]);

      if (cancelled) return;

      const effect = createFog({
        el: fog,
        THREE,
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        highlightColor: 0xb49bf2,
        midtoneColor: 0xd0c3fa,
        lowlightColor: 0x7959d5,
        baseColor: 0xe4dcff,
        blurFactor: 0.6,
        speed: 1.2,
        zoom: 1.0,
        scale: 1.5,
        scaleMobile: 2.5,
      });

      effectRef.current = effect;
      resizeObserver = new ResizeObserver(() => effect.resize());
      resizeObserver.observe(fog);
    };

    void initialize();

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      effectRef.current?.destroy();
      effectRef.current = null;
    };
  }, [active, reduce]);

  return (
    <div
      ref={fogRef}
      className={`hero-vanta-fog pointer-events-none absolute inset-0 ${
        active ? "hero-vanta-fog-active" : ""
      }`}
    />
  );
}
