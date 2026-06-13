import type { DemoConfig } from "./types";

/** underwrite — SMB credit console. Material story: the banker's ledger —
    deep forest green, cream paper text, brass accent, serif headings. */
export const underwrite: DemoConfig = {
  slug: "underwrite",
  name: "underwrite",
  tag: "fintech · SMB credit",
  verticalSlug: "fintech-software-development",
  url: "console.lattice.internal/queue",
  tagline: "Credit decisions in minutes, every one of them defensible.",
  scenario: "Approve Meridian Traders, then try approving Kopi Collective — watch the exposure-cap guardrail refer it to committee instead.",
  persona: { name: "Priya Raghunathan", role: "Senior credit officer" },
  theme: {
    bg: "#0f1b14", surface: "#15241b", raised: "#0b150f", line: "#27392e",
    ink: "#ece5d3", inkMut: "#b3ac99", inkFaint: "#7d7868",
    accent: "#c9a557", accentInk: "#161208",
    good: "#7fb88a", warn: "#d9a23e", bad: "#cf6f5f", onDark: "#ece5d3",
    font: "serif", radius: "0px", scheme: "dark",
  },
  layout: "queue",
  mainLabel: "Queue",
  nav: ["Queue", "Decisions", "Bureaus", "Models", "Audit log", "Settings"],
  kpis: [
    { label: "Pending reviews", value: "23", delta: "−8 today", tone: "good" },
    { label: "Median decision", value: "4.2 min", delta: "8.4× faster", tone: "good" },
    { label: "Auto-approved", value: "61%", delta: "+6% wow", tone: "good" },
    { label: "Audit coverage", value: "100%", delta: "signed", tone: "flat" },
  ],
  queueTitle: "Applications awaiting decision",
  primary: { label: "Approve", kind: "good" },
  secondary: { label: "Decline", kind: "bad" },
  items: [
    {
      id: "u1",
      title: "Meridian Traders Pte",
      sub: "Working capital · S$ 180k · 24 mo",
      badge: "score 742",
      meta: [
        { k: "Bureau score", v: "742 · EXP + CIBIL" },
        { k: "Exposure", v: "S$ 180,000" },
        { k: "Years trading", v: "9" },
        { k: "Bank txns analysed", v: "14,206" },
        { k: "DSCR", v: "2.1×" },
        { k: "Sector", v: "Electronics distribution" },
      ],
      ai: {
        label: "AI first pass",
        text: "Cash-flow seasonality matches sector norm; no related-party flows detected; director history clean across both bureaus. Recommend approve at standard pricing — confidence 0.93.",
      },
    },
    {
      id: "u2",
      title: "Kopi Collective",
      sub: "Equipment loan · S$ 45k · 36 mo",
      badge: "score 618",
      meta: [
        { k: "Bureau score", v: "618 · EXP only" },
        { k: "Exposure", v: "S$ 45,000" },
        { k: "Years trading", v: "2" },
        { k: "DSCR", v: "1.2×" },
        { k: "Existing facilities", v: "2 active" },
        { k: "Sector", v: "F&B · café chain" },
      ],
      ai: {
        label: "AI first pass",
        text: "Thin file: single bureau, 2 years trading, DSCR at policy floor. Repayment behaviour on existing facilities is clean. Below auto-approve threshold — human judgement required.",
      },
      guard: {
        action: "primary",
        outcome: "to committee",
        text: "Policy guardrail: sub-650 score with DSCR under 1.5× exceeds your personal approval authority. Referred to credit committee with your recommendation attached — decision SLA 4 hours.",
      },
    },
    {
      id: "u3",
      title: "Harbour Logistics",
      sub: "Invoice financing · S$ 320k · revolving",
      badge: "score 771",
      meta: [
        { k: "Bureau score", v: "771 · EXP + CIBIL" },
        { k: "Facility", v: "S$ 320,000 revolving" },
        { k: "Debtor quality", v: "8 anchors · avg 41 DPD" },
        { k: "Concentration", v: "Top debtor 22%" },
      ],
      ai: {
        label: "AI first pass",
        text: "Strong anchor debtors; concentration within policy. One anchor (TransOcean) slipped to 41 days-past-due last quarter — priced into the advance rate. Recommend approve at 82% advance.",
      },
    },
    {
      id: "u4",
      title: "Lumen Retail Group",
      sub: "Working capital · S$ 60k · 12 mo",
      badge: "score 584",
      meta: [
        { k: "Bureau score", v: "584 · CIBIL only" },
        { k: "Exposure", v: "S$ 60,000" },
        { k: "DSCR", v: "0.9×" },
        { k: "Bounced payments", v: "3 in 6 months" },
      ],
      ai: {
        label: "AI first pass",
        text: "DSCR below 1.0 with recent payment bounces — debt service is not covered by current cash flow. Recommend decline with a re-apply path at 6 months. Confidence 0.96.",
      },
    },
  ],
  activitySeed: [
    { t: "2 min", text: "Atlas Components — auto-approved at S$ 150k · model v23 · audit entry signed", tone: "good" },
    { t: "18 min", text: "Bureau adapter EXP latency spike (2.1s) — auto-retried, all calls recovered", tone: "warn" },
    { t: "1 hr", text: "Rate table v23 activated by R. Mehta · 4-eyes check complete", tone: "neutral" },
  ],
  statusLine: "audit-log ✓ signed · bureau adapters 6/6 healthy · last decision T−42s",
};
