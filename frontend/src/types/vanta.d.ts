declare module "vanta/dist/vanta.fog.min" {
  import type * as THREE from "three";

  interface FogOptions {
    el: HTMLElement;
    THREE: typeof THREE;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    highlightColor?: number;
    midtoneColor?: number;
    lowlightColor?: number;
    baseColor?: number;
    blurFactor?: number;
    speed?: number;
    zoom?: number;
    scale?: number;
    scaleMobile?: number;
  }

  interface FogEffect {
    destroy: () => void;
    resize: () => void;
    setOptions: (options: Partial<FogOptions>) => void;
  }

  const createFog: (options: FogOptions) => FogEffect;
  export default createFog;
}
