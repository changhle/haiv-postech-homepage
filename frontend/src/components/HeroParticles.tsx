"use client";

import { Geometry, Mesh, Program, Renderer, Vec2 } from "ogl";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import HeroVantaFog from "./HeroVantaFog";

interface HeroParticlesProps {
  scene: number;
}

const vertex = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;

  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uScene;
  uniform float uPreviousScene;
  uniform float uSceneMix;
  uniform vec2 uResolution;
  uniform vec2 uMouse;

  varying vec2 vUv;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    mat2 rotation = mat2(0.80, 0.60, -0.60, 0.80);

    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p = rotation * p * 2.03 + 11.7;
      amplitude *= 0.5;
    }

    return value;
  }

  float ring(float radius, float target, float width) {
    return 1.0 - smoothstep(width, width * 2.3, abs(radius - target));
  }

  vec3 renderScene(
    float scene,
    vec2 p,
    vec2 warped,
    float flow,
    vec2 mouse,
    float aspect,
    float t
  ) {
    vec3 paper = vec3(0.988, 0.978, 1.0);
    vec3 ink = vec3(0.29, 0.06, 0.46);
    vec3 violet = vec3(0.48, 0.16, 0.75);
    vec3 lilac = vec3(0.79, 0.52, 1.0);
    vec3 blue = vec3(0.39, 0.55, 0.95);
    vec3 rose = vec3(0.91, 0.42, 0.72);
    vec3 color = paper;
    float aura = mod(floor(scene + 0.01), 2.0);
    float concept = floor(scene * 0.5 + 0.01);

    if (concept < 0.5) {
      // 02 Dialogue — two signals continuously answer and reshape each other.
      float signalA = warped.y
        - sin(warped.x * 2.8 - t * 0.34) * 0.18
        - sin(warped.x * 6.1 + t * 0.16) * 0.035
        + (flow - 0.5) * 0.11;
      float signalB = warped.y
        + sin(warped.x * 2.35 + t * 0.3) * 0.18
        + sin(warped.x * 5.4 - t * 0.14) * 0.04
        - (flow - 0.5) * 0.1;
      float bandFalloff = mix(21.0, 3.8, aura);
      float coreFalloff = mix(70.0, 11.0, aura);
      float bandA = exp(-bandFalloff * abs(signalA));
      float bandB = exp(-bandFalloff * abs(signalB));
      float coreA = exp(-coreFalloff * abs(signalA));
      float coreB = exp(-coreFalloff * abs(signalB));
      float veilA = exp(-2.1 * abs(signalA));
      float veilB = exp(-2.1 * abs(signalB));

      color = mix(color, lilac, (veilA + veilB) * aura * 0.055);
      color = mix(color, blue, bandA * mix(0.28, 0.35, aura));
      color = mix(color, violet, bandB * mix(0.27, 0.34, aura));
      color = mix(color, vec3(1.0), (coreA + coreB) * 0.22);

      float pulseA = pow(0.5 + 0.5 * cos(warped.x * 13.0 - t * 1.2), 16.0) * coreA;
      float pulseB = pow(0.5 + 0.5 * cos(warped.x * 12.0 + t * 1.1), 16.0) * coreB;
      color = mix(color, lilac, pulseA * 0.58);
      color = mix(color, rose, pulseB * 0.48);

      float exchange = bandA * bandB;
      float exchangeGlow = exp(-mix(7.0, 3.5, aura) * length(warped - mouse * 0.05));
      color = mix(color, ink, exchange * 0.24);
      color = mix(color, lilac, exchange * exchangeGlow * 0.32);
    } else if (concept < 1.5) {
      // 03 Shared Focus — perception gathers around one refractive lens.
      float lensShift = smoothstep(0.72, 1.3, aspect);
      vec2 lensCenter = vec2(mix(0.17, 0.38, lensShift), -0.015);
      lensCenter += (mouse - lensCenter) * 0.028;
      vec2 lp = warped - lensCenter;
      lp.x *= 0.9;
      float radius = length(lp);
      float angle = atan(lp.y, lp.x);
      float breathing = sin(t * 0.19 + flow * 3.0) * 0.008;
      float ambientA = exp(-mix(3.8, 2.6, aura) * length(warped - vec2(-0.56, 0.31)));
      float ambientB = exp(-mix(3.2, 2.4, aura) * length(warped - vec2(0.52, -0.22)));
      color = mix(color, lilac, ambientA * mix(0.18, 0.24, aura));
      color = mix(color, violet, ambientB * mix(0.14, 0.2, aura));

      float lensMask = 1.0 - smoothstep(0.08, mix(0.5, 0.72, aura), radius);
      float interference = 0.5 + 0.5 * cos(
        radius * mix(38.0, 24.0, aura) - angle * 2.0 - t * 0.28 + flow * 5.0
      );
      color = mix(
        color,
        mix(violet, lilac, interference),
        lensMask * interference * mix(0.1, 0.16, aura)
      );

      float spectralR = ring(radius, 0.292 + breathing, mix(0.006, 0.052, aura));
      float spectralG = ring(radius, 0.301 + breathing, mix(0.005, 0.046, aura));
      float spectralB = ring(radius, 0.312 + breathing, mix(0.006, 0.058, aura));
      color = mix(color, rose, spectralR * 0.2);
      color = mix(color, blue, spectralG * 0.14);
      color = mix(color, violet, spectralB * 0.22);

      float orbitA = ring(
        radius,
        0.39 + sin(angle * 3.0 + t * 0.13) * 0.012,
        mix(0.0025, 0.036, aura)
      );
      float orbitB = ring(
        radius,
        0.455 + cos(angle * 2.0 - t * 0.1) * 0.016,
        mix(0.002, 0.032, aura)
      );
      float arcA = smoothstep(0.15, 0.9, sin(angle * 2.5 + t * 0.17) * 0.5 + 0.5);
      float arcB = smoothstep(0.38, 0.92, cos(angle * 3.0 - t * 0.12) * 0.5 + 0.5);
      color = mix(color, lilac, orbitA * arcA * 0.34);
      color = mix(color, violet, orbitB * arcB * 0.25);

      float caustic = pow(
        0.5 + 0.5 * cos(flow * 19.0 + warped.x * 2.0 - t * 0.16),
        mix(12.0, 2.8, aura)
      );
      caustic *= smoothstep(0.1, 0.75, flow) * (0.35 + lensMask * 0.65);
      color = mix(color, violet, caustic * 0.11);
    } else if (concept < 2.5) {
      // 04 Emergence — dispersed signals organize into a living structure.
      float cloudA = exp(-mix(3.1, 2.5, aura) * length(warped - vec2(-0.24, 0.02)));
      float cloudB = exp(-mix(3.6, 2.7, aura) * length(warped - vec2(0.34, -0.08)));
      color = mix(color, lilac, cloudA * mix(0.15, 0.23, aura));
      color = mix(color, blue, cloudB * mix(0.1, 0.17, aura));

      vec2 gridScale = vec2(54.0 * aspect, 54.0);
      vec2 grid = vUv * gridScale;
      vec2 cell = floor(grid);
      vec2 cellUv = fract(grid) - 0.5;
      vec2 offset = vec2(hash21(cell + 2.1), hash21(cell + 8.7)) - 0.5;
      offset += vec2(
        sin(t * 0.35 + hash21(cell) * 6.2831),
        cos(t * 0.31 + hash21(cell + 4.0) * 6.2831)
      ) * 0.08;
      float density = exp(-2.1 * length(warped * vec2(0.75, 1.0)));
      float threshold = mix(0.993, 0.935, density) - aura * 0.018;
      float exists = step(threshold, hash21(cell + 15.4));
      float point = 1.0 - smoothstep(
        mix(0.035, 0.02, aura),
        mix(0.095, 0.3, aura),
        length(cellUv - offset * 0.58)
      );
      float twinkle = 0.45 + 0.55 * sin(
        t * (0.7 + hash21(cell) * 0.6) + hash21(cell + 3.0) * 6.2831
      );
      color = mix(color, violet, point * exists * max(twinkle, 0.0) * 0.72);

      float radius = length(warped);
      float angle = atan(warped.y, warped.x);
      float spiral = pow(
        0.5 + 0.5 * cos(angle * 4.0 - radius * 27.0 + t * 0.34 + flow * 3.0),
        mix(18.0, 2.6, aura)
      );
      spiral *= exp(-2.2 * radius) * smoothstep(0.05, 0.32, radius);
      color = mix(color, lilac, spiral * 0.22);

      float halo = ring(
        radius,
        0.25 + sin(angle * 4.0 - t * 0.18) * 0.018,
        mix(0.003, 0.048, aura)
      );
      float core = exp(-mix(12.0, 3.2, aura) * radius)
        * (0.6 + 0.4 * sin(t * 0.5 + flow * 5.0));
      color = mix(color, blue, halo * 0.22);
      color = mix(color, ink, core * 0.18);
    } else if (concept < 3.5) {
      // 05 Continuum — cognition visualized as an uninterrupted terrain.
      float fieldA = exp(-2.9 * length(warped - vec2(-0.48, 0.24)));
      float fieldB = exp(-3.0 * length(warped - vec2(0.46, -0.26)));
      color = mix(color, blue, fieldA * 0.11);
      color = mix(color, lilac, fieldB * 0.16);

      float heightField = flow * 0.88
        + sin(warped.x * 2.0 + t * 0.09) * 0.08
        + warped.y * 0.16;
      float contourDistance = abs(fract(heightField * 11.0 - t * 0.018) - 0.5);
      float contours = 1.0 - smoothstep(
        mix(0.025, 0.012, aura),
        mix(0.075, 0.29, aura),
        contourDistance
      );
      float majorDistance = abs(fract(heightField * 3.65 - t * 0.006) - 0.5);
      float major = 1.0 - smoothstep(
        mix(0.018, 0.01, aura),
        mix(0.055, 0.26, aura),
        majorDistance
      );
      float contourFade = 0.55 + 0.45 * sin(warped.x * 1.6 - t * 0.12);
      color = mix(color, lilac, contours * contourFade * 0.19);
      color = mix(color, violet, major * 0.2);

      float streamY = warped.y
        + sin(warped.x * 2.1 + t * 0.15) * 0.13
        + (flow - 0.5) * 0.2;
      float stream = exp(-mix(22.0, 3.6, aura) * abs(streamY));
      float streamLight = exp(-mix(75.0, 10.0, aura) * abs(streamY + 0.008));
      color = mix(color, violet, stream * mix(0.21, 0.3, aura));
      color = mix(color, vec3(1.0), streamLight * 0.26);
    } else {
      // 09 Weave — contributions cross while retaining their own direction.
      float horizontalPhase = warped.y * 18.0
        + sin(warped.x * 4.0 - t * 0.2) * 1.25
        + flow * 1.4;
      float verticalPhase = warped.x * 18.0
        + sin(warped.y * 4.2 + t * 0.18) * 1.2
        - flow * 1.35;
      float horizontal = pow(
        0.5 + 0.5 * cos(horizontalPhase),
        mix(14.0, 1.55, aura)
      );
      float vertical = pow(
        0.5 + 0.5 * cos(verticalPhase),
        mix(14.0, 1.55, aura)
      );
      float broadHorizontal = pow(
        0.5 + 0.5 * cos(horizontalPhase * 0.5),
        mix(5.0, 1.05, aura)
      );
      float broadVertical = pow(
        0.5 + 0.5 * cos(verticalPhase * 0.5),
        mix(5.0, 1.05, aura)
      );

      color = mix(color, blue, broadHorizontal * mix(0.07, 0.13, aura));
      color = mix(color, rose, broadVertical * mix(0.065, 0.12, aura));
      float overUnder = step(0.0, sin(horizontalPhase * 0.5) * cos(verticalPhase * 0.5));
      color = mix(color, blue, horizontal * mix(0.12, 0.3, overUnder));
      color = mix(color, violet, vertical * mix(0.28, 0.1, overUnder));

      float crossing = horizontal * vertical;
      color = mix(color, vec3(1.0), crossing * 0.46);
      float fabricGlow = exp(-2.8 * length(warped));
      color = mix(color, lilac, fabricGlow * mix(0.08, 0.15, aura));
    }

    float pointerGlow = exp(-mix(7.5, 4.0, aura) * dot(p - mouse, p - mouse));
    color = mix(color, lilac, pointerGlow * 0.055);
    float edge = smoothstep(0.42, 1.0, length(p * vec2(0.7, 1.0)));
    return mix(color, paper, edge * 0.42);
  }

  void main() {
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    float t = uTime;
    vec2 p = vUv - 0.5;
    p.x *= aspect;

    vec2 mouse = uMouse - 0.5;
    mouse.x *= aspect;

    vec2 q = vec2(
      fbm(p * 1.18 + vec2(t * 0.025, -t * 0.018)),
      fbm(p * 1.12 + vec2(5.2, -3.7) + vec2(-t * 0.016, t * 0.023))
    );
    vec2 warped = p + (q - 0.5) * 0.27;
    vec2 toMouse = warped - mouse;
    float pointerField = exp(-5.5 * dot(toMouse, toMouse));
    warped += normalize(toMouse + vec2(0.001))
      * sin(length(toMouse) * 20.0 - t * 0.65)
      * pointerField
      * 0.022;
    float flow = fbm(warped * 2.35 + q * 1.65 + vec2(t * 0.022, -t * 0.014));

    vec3 color;
    if (uSceneMix > 0.999) {
      color = renderScene(uScene, p, warped, flow, mouse, aspect, t);
    } else {
      vec3 previous = renderScene(
        uPreviousScene,
        p,
        warped,
        flow,
        mouse,
        aspect,
        t
      );
      vec3 next = renderScene(uScene, p, warped, flow, mouse, aspect, t);
      float dissolve = noise(vUv * 3.2 + vec2(t * 0.04, -t * 0.03));
      float blend = smoothstep(
        0.0,
        1.0,
        uSceneMix + (dissolve - 0.5) * 0.06
      );
      color = mix(previous, next, blend);
    }

    float grain = hash21(gl_FragCoord.xy + fract(t) * 97.0) - 0.5;
    color += grain * 0.009;
    gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
  }
`;

export default function HeroParticles({ scene }: HeroParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneValueRef = useRef(scene);
  const changeSceneRef = useRef<(nextScene: number) => void>(() => {});
  const reduce = useReducedMotion();

  useEffect(() => {
    sceneValueRef.current = scene;
    changeSceneRef.current(scene);
  }, [scene]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let renderer: Renderer;

    try {
      renderer = new Renderer({
        canvas,
        dpr: Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.1 : 1.3),
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: "high-performance",
      });
    } catch {
      canvas.hidden = true;
      return;
    }

    const gl = renderer.gl;
    const resolution = new Vec2(1, 1);
    const mouse = new Vec2(0.68, 0.52);
    const mouseTarget = new Vec2(0.68, 0.52);
    const geometry = new Geometry(gl, {
      position: {
        size: 2,
        data: new Float32Array([-1, -1, 3, -1, -1, 3]),
      },
      uv: {
        size: 2,
        data: new Float32Array([0, 0, 2, 0, 0, 2]),
      },
    });
    const initialScene = sceneValueRef.current;
    const program = new Program(gl, {
      vertex,
      fragment,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTime: { value: reduce ? 5.4 : 0 },
        uScene: { value: initialScene },
        uPreviousScene: { value: initialScene },
        uSceneMix: { value: 1 },
        uResolution: { value: resolution },
        uMouse: { value: mouse },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });

    let frame = 0;
    let running = false;
    let intersecting = true;
    let elapsed = reduce ? 5.4 : 0;
    let lastTime = performance.now();
    let activeScene = initialScene;
    let previousScene = initialScene;
    let sceneMix = 1;

    const draw = () => {
      program.uniforms.uTime.value = elapsed;
      program.uniforms.uScene.value = activeScene;
      program.uniforms.uPreviousScene.value = previousScene;
      program.uniforms.uSceneMix.value = sceneMix;
      renderer.render({ scene: mesh });
    };

    changeSceneRef.current = (nextScene) => {
      if (nextScene === activeScene) return;
      previousScene = sceneMix < 0.5 ? previousScene : activeScene;
      activeScene = nextScene;
      sceneMix = reduce ? 1 : 0;
      if (reduce) draw();
    };

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      renderer.setSize(Math.max(width, 1), Math.max(height, 1));
      resolution.set(gl.canvas.width, gl.canvas.height);
      if (reduce) draw();
    };

    const tick = (time: number) => {
      if (!running) return;

      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      elapsed += delta;
      sceneMix = Math.min(1, sceneMix + delta / 1.2);
      if (sceneMix >= 1) previousScene = activeScene;
      mouse.lerp(mouseTarget, 1.0 - Math.exp(-delta * 2.8));
      draw();
      frame = requestAnimationFrame(tick);
    };

    const syncPlayback = () => {
      const shouldRun = !reduce && intersecting && !document.hidden;
      if (shouldRun === running) return;

      running = shouldRun;
      if (running) {
        lastTime = performance.now();
        frame = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(frame);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      mouseTarget.set(
        event.clientX / Math.max(window.innerWidth, 1),
        1 - event.clientY / Math.max(window.innerHeight, 1),
      );
    };

    const onPointerLeave = () => mouseTarget.set(0.68, 0.52);
    const onVisibilityChange = () => syncPlayback();
    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        intersecting = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.01 },
    );

    resizeObserver.observe(container);
    intersectionObserver.observe(container);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);
    resize();

    if (reduce) draw();
    else syncPlayback();

    return () => {
      running = false;
      changeSceneRef.current = () => {};
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      geometry.remove();
      program.remove();
    };
  }, [reduce]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="hero-webgl-fallback absolute inset-0 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="hero-webgl-canvas absolute inset-0 h-full w-full"
      />
      <HeroVantaFog active={scene === 10} />
      <div
        className={`hero-webgl-veil pointer-events-none absolute inset-0 ${
          scene === 10 ? "hero-webgl-veil-vanta" : ""
        }`}
      />
    </div>
  );
}
