import type { DemoConfig } from "./types";

/** counselworks — AI-assisted legal review. Material story: the law
    library — parchment, walnut ink, oxblood leather, serif headings. */
export const counselworks: DemoConfig = {
  slug: "counselworks",
  name: "counselworks",
  tag: "legaltech · document review",
  verticalSlug: "legaltech-software-development",
  url: "app.counselworks.legal/review",
  tagline: "AI first pass. Privilege-aware throughout. Counsel decides.",
  scenario: "Approve the NDA batch, then try producing the Whitman email thread — the privilege guardrail withholds it and logs the call.",
  persona: { name: "Meera Krishnan", role: "Senior associate · Disputes" },
  theme: {
    bg: "#f3edde", surface: "#faf6ea", raised: "#2b2018", line: "#ddd2ba",
    ink: "#2b2018", inkMut: "#564a3a", inkFaint: "#8f8268",
    accent: "#6e1f24", accentInk: "#f6efe2",
    good: "#4a6741", warn: "#9a6b1f", bad: "#6e1f24", onDark: "#efe7d4",
    font: "serif", radius: "0px", scheme: "light",
  },
  nav: ["Review", "Matters", "Privilege", "Deadlines", "Conflicts", "Audit"],
  kpis: [
    { label: "First-pass review", value: "−68%", delta: "attorney time", tone: "good" },
    { label: "Docs this matter", value: "1,284", delta: "AI-flagged 37", tone: "flat" },
    { label: "Citation coverage", value: "100%", delta: "every claim", tone: "good" },
    { label: "Privilege violations", value: "0", delta: "walls enforced", tone: "good" },
  ],
  queueTitle: "Matter 24-118 · production review",
  primary: { label: "Approve · produce", kind: "good" },
  secondary: { label: "Withhold · log", kind: "neutral" },
  items: [
    {
      id: "cw1",
      title: "NDA batch · 14 documents",
      sub: "Acme ↔ counterparties · standard forms",
      badge: "clean",
      meta: [
        { k: "Documents", v: "14 NDAs" },
        { k: "AI first pass", v: "All match standard form" },
        { k: "Deviations", v: "0 material" },
        { k: "Privilege hits", v: "0" },
        { k: "Citations", v: "14/14 verified" },
      ],
      ai: {
        label: "AI first pass",
        text: "All fourteen documents match the approved template within immaterial variance (dates, party names). No privilege indicators, no redaction candidates. Safe to produce as a batch.",
      },
    },
    {
      id: "cw2",
      title: "Email thread · Whitman ↔ GC",
      sub: "Re: supply dispute strategy · 22 messages",
      badge: "flagged",
      meta: [
        { k: "Participants", v: "CEO · General Counsel" },
        { k: "AI privilege read", v: "Legal advice · 0.96" },
        { k: "Subject matter", v: "Litigation strategy" },
        { k: "Wall", v: "Team B excluded" },
      ],
      body: "Thread contains the GC's direct advice on dispute strategy and settlement posture. Classic attorney-client privilege territory — produced by mistake, this is the matter's worst-case error.",
      ai: {
        label: "AI first pass",
        text: "High-confidence privilege: legal advice from counsel to client on the matter in dispute. Recommend withhold and add to the privilege log with the standard description — never produce.",
      },
      guard: {
        action: "primary",
        outcome: "privilege hold",
        text: "Privilege guardrail: production blocked. Document moved to the privilege log with an auto-drafted log entry for counsel's sign-off, ethical wall confirmed (Team B has never had access), and the attempted action recorded in the audit trail. Clawback letters are careers — the wall is the product.",
      },
    },
    {
      id: "cw3",
      title: "Series A SPA · §7 analysis",
      sub: "Deal docs · AI confidence low on one clause",
      badge: "low conf",
      meta: [
        { k: "Document", v: "Share purchase agreement" },
        { k: "AI first pass", v: "61 citations verified" },
        { k: "Flag", v: "§7.3 — novel drafting" },
        { k: "Recommendation", v: "Human read on §7 only" },
      ],
      ai: {
        label: "AI first pass",
        text: "Sixty-one of sixty-two claims verified against the document. §7.3 uses drafting the model hasn't seen in this practice area — confidence below threshold, so it is presented for human reading rather than summarised. Honest uncertainty beats fluent guessing.",
      },
    },
    {
      id: "cw4",
      title: "Vendor DPA · redline round 3",
      sub: "Acme ↔ CloudVault · 3 clauses open",
      badge: "redline",
      meta: [
        { k: "Open clauses", v: "Liability cap · audit rights · SCCs" },
        { k: "AI position check", v: "2 of 3 within playbook" },
        { k: "Escalation", v: "Liability cap → partner" },
        { k: "Version", v: "v3 · full history kept" },
      ],
      ai: {
        label: "AI first pass",
        text: "Counterparty's audit-rights and SCC positions now sit inside the negotiation playbook — accept recommended. The liability cap remains outside delegated authority and routes to the supervising partner with both parties' redline history.",
      },
    },
  ],
  activitySeed: [
    { t: "11 min", text: "Privilege log entry #41 countersigned by R. Acharya (partner) · matter 24-118", tone: "good" },
    { t: "1 hr", text: "Conflict check · new matter intake · 0 hits across 11,402 entities", tone: "neutral" },
    { t: "3 hr", text: "Deposition summary (Chen) auto-drafted · 14 pp · awaiting associate review", tone: "neutral" },
  ],
  statusLine: "ethical walls enforced · conflict check ✓ · audit trail signed",
};
