import type { DemoConfig } from "./types";

/** atrium — two-sided marketplace ops. Material story: the scandi gallery —
    warm gallery white, charcoal, deep plum, generous radius. */
export const atrium: DemoConfig = {
  slug: "atrium",
  name: "atrium",
  tag: "marketplace · two-sided",
  verticalSlug: "marketplace-development",
  url: "ops.atrium.market/providers",
  tagline: "Supply quality is the marketplace. Everything else is UI.",
  scenario: "Approve Lindberg Cleaning's onboarding, then try approving NordFix — the ID-mismatch guardrail routes it to manual KYC review.",
  persona: { name: "Astrid Holm", role: "Marketplace operations" },
  theme: {
    bg: "#f7f5f1", surface: "#fffefb", raised: "#262025", line: "#e2ddd5",
    ink: "#262025", inkMut: "#564f55", inkFaint: "#948c91",
    accent: "#5b2a52", accentInk: "#f8f3f7",
    good: "#3a6b4f", warn: "#a8742e", bad: "#9c3a3a", onDark: "#f3eef1",
    font: "sans", radius: "10px", scheme: "light",
  },
  nav: ["Providers", "Disputes", "Liquidity", "Payouts", "Trust", "Reports"],
  kpis: [
    { label: "Fill rate", value: "91%", delta: "+4% this month", tone: "good" },
    { label: "Provider onboarding", value: "24", delta: "in review", tone: "flat" },
    { label: "Payout reconciliation", value: "clean", delta: "Stripe Connect", tone: "good" },
    { label: "Disputes open", value: "7", delta: "median 22h to close", tone: "flat" },
  ],
  queueTitle: "Provider onboarding · final review",
  primary: { label: "Approve provider", kind: "good" },
  secondary: { label: "Reject · with reason", kind: "bad" },
  items: [
    {
      id: "at1",
      title: "Lindberg Cleaning AB",
      sub: "Home cleaning · Söder · 4 staff",
      badge: "verified",
      meta: [
        { k: "KYC", v: "BankID verified · all staff" },
        { k: "Insurance", v: "Liability cert valid 2027" },
        { k: "References", v: "2 verified · both positive" },
        { k: "Service area", v: "Söder + 3 districts" },
        { k: "Demand gap", v: "Cleaning short 18% in Söder" },
      ],
      ai: {
        label: "Trust check",
        text: "Documents authentic, staff identities verified via BankID, insurance current. Söder has the platform's largest cleaning supply gap — this approval directly lifts fill rate. Recommend approve.",
      },
    },
    {
      id: "at2",
      title: "NordFix Handyman",
      sub: "Repairs · Vasastan · sole trader",
      badge: "review",
      meta: [
        { k: "KYC", v: "ID name ≠ bank account name" },
        { k: "Insurance", v: "Cert valid" },
        { k: "References", v: "1 of 2 unreachable" },
        { k: "Device signal", v: "Shared with banned account" },
      ],
      ai: {
        label: "Trust check",
        text: "Three independent signals: payout account name doesn't match the verified ID, one reference is unreachable, and the signup device overlaps with an account banned for fee circumvention in March. Do not approve on the happy path.",
      },
      guard: {
        action: "primary",
        outcome: "manual KYC",
        text: "Trust guardrail: identity/payout mismatch plus a banned-device overlap routes to manual KYC — video verification requested, payouts locked until cleared. False positives get a human within 24h; fraudsters get a dead end.",
      },
    },
    {
      id: "at3",
      title: "Berg & Daughters Plumbing",
      sub: "Plumbing · city-wide · 11 staff",
      badge: "verified",
      meta: [
        { k: "KYC", v: "Org + staff verified" },
        { k: "Certifications", v: "Säker Vatten · valid" },
        { k: "References", v: "3 verified" },
        { k: "Demand gap", v: "Plumbing short 31% city-wide" },
      ],
      ai: {
        label: "Trust check",
        text: "Licensed trade with the certification verified against the registry. Largest single supply gap on the platform. Approve and feature in the launch-week placement slot.",
      },
    },
    {
      id: "at4",
      title: "Dispute #D-2241 · deep clean",
      sub: "Customer claims incomplete · provider disputes",
      badge: "dispute",
      meta: [
        { k: "Order value", v: "1,840 kr · in escrow" },
        { k: "Evidence", v: "Before/after photos both sides" },
        { k: "Provider rating", v: "4.9 · 212 jobs" },
        { k: "Customer history", v: "2 disputes / 3 orders" },
      ],
      ai: {
        label: "Resolution read",
        text: "Photo timestamps support the provider's completion claim; customer's dispute rate is an outlier (66% vs 1.2% platform average). Recommend release escrow to provider, goodwill voucher to customer, dispute-pattern flag on the account.",
      },
    },
  ],
  activitySeed: [
    { t: "7 min", text: "Friday payout batch reconciled · 412 providers · 0 exceptions", tone: "good" },
    { t: "41 min", text: "Supply alert: gardening fill rate dipped under 80% in Bromma — acquisition campaign auto-drafted", tone: "warn" },
    { t: "3 hr", text: "Matching engine v8: time-to-first-offer median 4.2 min (−38%) · holding", tone: "good" },
  ],
  statusLine: "connect payouts ✓ · kyc queue 2 · supply alerts armed · recon clean",
};
