import type { DemoConfig } from "./types";

/** anchor — embedded insurance partner console. Material story: the
    maritime chart — deep navy, fog grey, signal amber, sharp corners. */
export const anchor: DemoConfig = {
  slug: "anchor",
  name: "anchor",
  tag: "insurance · embedded",
  verticalSlug: "insurance-software-development",
  url: "partners.anchor.dev/binds",
  tagline: "Quote to bind in seconds, evidence trail included.",
  scenario: "Bind the Northwind Freight cargo quote, then try binding Brightside Dental's cyber policy — the carrier sign-off guardrail catches it.",
  persona: { name: "Tomás Herrera", role: "Partner operations lead" },
  theme: {
    bg: "#0e1726", surface: "#15202f", raised: "#0a111d", line: "#263448",
    ink: "#dbe4ee", inkMut: "#9aa8ba", inkFaint: "#67748a",
    accent: "#e8b341", accentInk: "#1a1304",
    good: "#6fc28f", warn: "#e8b341", bad: "#d4685c", onDark: "#dbe4ee",
    font: "sans", radius: "2px", scheme: "dark",
  },
  nav: ["Binds", "Quotes", "Claims", "Carriers", "Rate tables", "Audit"],
  kpis: [
    { label: "Bound premium", value: "$48.2k", delta: "+12% dod", tone: "good" },
    { label: "Quote-to-bind", value: "1.4s", delta: "median e2e", tone: "good" },
    { label: "Carrier adapters", value: "4/4", delta: "all green", tone: "flat" },
    { label: "Rate table", value: "v23", delta: "active since Mon", tone: "flat" },
  ],
  queueTitle: "Quotes ready to bind",
  primary: { label: "Bind policy", kind: "good" },
  secondary: { label: "Refer to UW", kind: "neutral" },
  items: [
    {
      id: "a1",
      title: "Northwind Freight",
      sub: "Cargo liability · $12.4k premium",
      badge: "rated",
      meta: [
        { k: "Line", v: "Cargo liability" },
        { k: "Premium", v: "$12,400 / yr" },
        { k: "Carrier", v: "Atlantic Mutual" },
        { k: "Fleet", v: "34 vehicles" },
        { k: "Loss history", v: "1 claim / 3 yrs" },
        { k: "Rate path", v: "v23 · standard" },
      ],
      ai: {
        label: "Rating engine",
        text: "Risk profile inside carrier appetite; telematics data confirms declared routes. Rated at standard tier — bind authority is yours, evidence pack auto-attached.",
      },
    },
    {
      id: "a2",
      title: "Brightside Dental",
      sub: "Cyber · $3.6k premium",
      badge: "rated",
      meta: [
        { k: "Line", v: "Cyber" },
        { k: "Premium", v: "$3,600 / yr" },
        { k: "Carrier", v: "Meridian Specialty" },
        { k: "Records held", v: "~48,000 patient" },
        { k: "MFA posture", v: "Partial · admin only" },
      ],
      ai: {
        label: "Rating engine",
        text: "Healthcare data volume puts this in the carrier's referral band, and MFA coverage is partial. Rated with a 15% load — carrier sign-off required before bind.",
      },
      guard: {
        action: "primary",
        outcome: "carrier sign-off",
        text: "Binding guardrail: cyber policies covering health records above 25k lives require carrier sign-off under the Meridian Specialty agreement. Referred with the full rating evidence pack — carrier SLA 2 business hours.",
      },
    },
    {
      id: "a3",
      title: "Hartley Construction",
      sub: "General liability · $8.1k premium",
      badge: "rated",
      meta: [
        { k: "Line", v: "General liability" },
        { k: "Premium", v: "$8,100 / yr" },
        { k: "Carrier", v: "Atlantic Mutual" },
        { k: "Payroll band", v: "$2.4M declared" },
        { k: "OSHA events", v: "0 in 36 mo" },
      ],
      ai: {
        label: "Rating engine",
        text: "Clean safety record, payroll verified against filings. Standard tier, no endorsements flagged. Bind authority is yours.",
      },
    },
    {
      id: "a4",
      title: "Veloce Couriers",
      sub: "Gig fleet · per-shift cover · $2.2k/mo",
      badge: "rated",
      meta: [
        { k: "Line", v: "On-demand fleet" },
        { k: "Premium", v: "$2,200 / mo usage-based" },
        { k: "Carrier", v: "Halcyon Re" },
        { k: "Active riders", v: "212 avg/day" },
        { k: "Claims ratio", v: "0.61 · improving" },
      ],
      ai: {
        label: "Rating engine",
        text: "Usage-based policy; per-shift exposure feed verified for 90 days. Claims ratio trending down two quarters. Standard bind.",
      },
    },
  ],
  activitySeed: [
    { t: "1 min", text: "Quote → bind: Osprey Logistics cargo · 1.2s end-to-end · policy docs issued", tone: "good" },
    { t: "26 min", text: "Carrier adapter (Halcyon Re) schema change detected — contract tests green, no action", tone: "warn" },
    { t: "2 hr", text: "Rate table v23 promoted · 4-eyes approval · regulator export generated", tone: "neutral" },
  ],
  statusLine: "carrier adapters 4/4 green · rate table v23 active · last bind T−18s",
};
