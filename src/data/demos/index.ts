/** Demo registry — one interactive console per vertical, all driven by
    src/components/demos/ConsoleDemo.tsx. Gurukul (edtech) lives separately
    at /gurukul as a full product demo. */
import type { DemoConfig } from "./types";
import { underwrite } from "./underwrite";
import { caduceus } from "./caduceus";
import { anchor } from "./anchor";
import { bough } from "./bough";
import { pulse } from "./pulse";
import { tallow } from "./tallow";
import { harbor } from "./harbor";
import { meridian } from "./meridian";
import { atrium } from "./atrium";
import { counselworks } from "./counselworks";

export const demos: DemoConfig[] = [
  underwrite, caduceus, anchor, bough, pulse,
  tallow, harbor, meridian, atrium, counselworks,
];

export function demoBySlug(slug: string): DemoConfig | undefined {
  return demos.find((d) => d.slug === slug);
}
