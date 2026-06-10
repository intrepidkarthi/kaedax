/**
 * Vertical product demos — shared config contract.
 *
 * One interactive console engine (src/components/demos/ConsoleDemo.tsx)
 * renders all ten demos; each vertical supplies a DemoConfig: its own
 * theme (a distinct material story per product — never a shared palette),
 * work queue, actions, one guardrail moment, and activity log.
 */

export type DemoTheme = {
  /** page + surface colors */
  bg: string;
  surface: string;     // cards
  raised: string;      // card headers / table heads
  line: string;        // borders
  ink: string;         // primary text
  inkMut: string;      // secondary text
  inkFaint: string;    // tertiary / labels
  accent: string;      // the one brand color
  accentInk: string;   // text on accent
  good: string;
  warn: string;
  bad: string;
  onDark: string;      // accent-ish readable on raised/dark headers
  /** display personality */
  font: "sans" | "serif" | "mono";  // heading font
  radius: string;                    // e.g. "0px" sharp · "10px" soft
  scheme: "light" | "dark";
};

export type QueueItem = {
  id: string;
  title: string;
  sub: string;
  badge?: string;                                  // small chip on the row
  meta: { k: string; v: string }[];                // detail facts
  body?: string;                                   // narrative / document preview
  ai?: { label: string; text: string };            // AI-assist panel in detail
  /** intercepts one action with the vertical's guardrail moment */
  guard?: { action: "primary" | "secondary"; outcome: string; text: string };
};

export type DemoConfig = {
  slug: string;            // /demos/<slug>
  name: string;            // product wordmark
  tag: string;             // "fintech · underwriting" etc
  verticalSlug: string;    // back-link to /<vertical-page>
  url: string;             // fake prod url in the chrome
  tagline: string;
  scenario: string;        // "try this" banner — the demo script in one line
  persona: { name: string; role: string };
  theme: DemoTheme;
  nav: string[];           // sidebar labels, first is active
  kpis: { label: string; value: string; delta?: string; tone?: "good" | "warn" | "flat" }[];
  queueTitle: string;
  primary: { label: string; kind: "good" | "bad" | "neutral" };
  secondary: { label: string; kind: "good" | "bad" | "neutral" };
  items: QueueItem[];
  activitySeed: { t: string; text: string; tone: "good" | "warn" | "neutral" }[];
  statusLine: string;
};
