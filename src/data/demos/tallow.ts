import type { DemoConfig } from "./types";

/** tallow — agent-ops & eval console. Material story: the amber phosphor
    terminal — true black, amber glow, mono headings, zero radius. */
export const tallow: DemoConfig = {
  slug: "tallow",
  name: "tallow",
  tag: "ai products · agent ops",
  verticalSlug: "ai-agent-development",
  url: "ops.tallow.ai/evals",
  tagline: "Ship agents you can prove, not just demo.",
  scenario: "Promote the tool-call suite results, then try promoting release v13 — the long-horizon regression gate blocks it and pages a human.",
  persona: { name: "Dev Khanna", role: "Agent reliability engineer" },
  theme: {
    bg: "#0a0a08", surface: "#11110d", raised: "#060605", line: "#2a2a20",
    ink: "#e8e3d0", inkMut: "#a8a48e", inkFaint: "#6e6b59",
    accent: "#ffb224", accentInk: "#1a1102",
    good: "#9ade6e", warn: "#ffb224", bad: "#ff6b4a", onDark: "#e8e3d0",
    font: "mono", radius: "0px", scheme: "dark",
  },
  layout: "grid",
  mainLabel: "Evals",
  nav: ["Evals", "Traces", "Releases", "Incidents", "Tools", "Settings"],
  kpis: [
    { label: "Eval pass rate", value: "98.6%", delta: "412/418 green", tone: "good" },
    { label: "Agent runs today", value: "31,402", delta: "p95 11.2s", tone: "good" },
    { label: "Tool-call accuracy", value: "99.1%", delta: "240 cases", tone: "good" },
    { label: "Release gate", value: "v13", delta: "held · 6 red", tone: "warn" },
  ],
  queueTitle: "Eval runs · awaiting promotion",
  primary: { label: "Promote", kind: "good" },
  secondary: { label: "Hold · investigate", kind: "neutral" },
  items: [
    {
      id: "t1",
      title: "Tool-call accuracy suite · v13",
      sub: "240 cases · 238 pass · 2 known-flaky",
      badge: "green",
      pct: 99, tone: "good",
      meta: [
        { k: "Cases", v: "240 · 238 pass" },
        { k: "Failures", v: "2 · known-flaky quarantine" },
        { k: "Schema violations", v: "0" },
        { k: "vs v12", v: "+0.8% accuracy" },
      ],
      ai: {
        label: "Run analysis",
        text: "Both failures are the quarantined timezone cases that flake on CI runners — traces confirm correct tool selection with slow mock responses. Safe to promote this suite's verdict.",
      },
    },
    {
      id: "t2",
      title: "Release v13 · full gate",
      sub: "All suites · long-horizon regression RED",
      badge: "6 red",
      pct: 87, tone: "bad",
      meta: [
        { k: "Suites", v: "7 of 8 green" },
        { k: "Red", v: "Long-horizon #1182 · 6 cases" },
        { k: "Pattern", v: "Goal drift after step 40+" },
        { k: "Blast radius", v: "Multi-day agent runs" },
      ],
      body: "Six long-horizon cases show the agent abandoning the original objective after ~40 steps and optimising a sub-goal instead. v12 passes the same cases.",
      ai: {
        label: "Run analysis",
        text: "Regression is real, reproducible, and isolated to the new planner prompt. This is the exact failure class the long-horizon suite exists to catch — recommend hold, bisect the planner change, re-run.",
      },
      guard: {
        action: "primary",
        outcome: "gate blocked",
        text: "Release gate: long-horizon regression suites are non-overridable by policy — promotion blocked, on-call human paged, v12 stays serving. Agents that quietly drift off-goal on day 3 are how trust dies; the gate is the product.",
      },
    },
    {
      id: "t3",
      title: "Refusal layer · jailbreak set v9",
      sub: "180 adversarial cases · 180 pass",
      badge: "green",
      pct: 100, tone: "good",
      meta: [
        { k: "Cases", v: "180 · all pass" },
        { k: "New vectors", v: "12 added this week" },
        { k: "Bypass rate", v: "0.0%" },
        { k: "Over-refusal", v: "1.2% · within budget" },
      ],
      ai: {
        label: "Run analysis",
        text: "All 12 newly-harvested jailbreak vectors refused correctly; over-refusal held within the 2% budget on the benign mirror set. Promote.",
      },
    },
    {
      id: "t4",
      title: "Cost & latency suite · v13",
      sub: "p95 11.2s · $0.041/run · within SLO",
      badge: "green",
      pct: 100, tone: "good",
      meta: [
        { k: "Latency p95", v: "11.2s · SLO 15s" },
        { k: "Cost per run", v: "$0.041 · −18% vs v12" },
        { k: "Token budget", v: "No regressions" },
        { k: "Cache hit rate", v: "78%" },
      ],
      ai: {
        label: "Run analysis",
        text: "Prompt-cache restructure delivered the cost win without quality movement on paired cases. Promote.",
      },
    },
  ],
  activitySeed: [
    { t: "3 min", text: "trace #88,141 replayed for customer escalation — root cause: stale tool schema, fixed in v13", tone: "neutral" },
    { t: "28 min", text: "long-horizon #1182 bisect started · suspect: planner prompt diff 41 lines", tone: "warn" },
    { t: "2 hr", text: "nightly evals 412/418 · 6 red quarantined to #1182 · report posted to #agent-ops", tone: "good" },
  ],
  statusLine: "release v13 gated · long-horizon regression under review · human paged",
};
