import type { DemoConfig } from "./types";

/** caduceus — clinical scribe console. Material story: the clinic —
    cool paper-white, graphite ink, deep scrubs green, soft corners. */
export const caduceus: DemoConfig = {
  slug: "caduceus",
  name: "caduceus",
  tag: "healthtech · clinical AI",
  verticalSlug: "healthtech-software-development",
  url: "app.caduceus.health/encounters",
  tagline: "The AI scribe your clinicians actually sign.",
  scenario: "Sign off R. Mehta's scribe draft, then try signing J. Park's — the low-confidence guardrail sends it back for clinician review instead.",
  persona: { name: "Dr. Sarah Lindqvist", role: "Attending physician · Internal medicine" },
  theme: {
    bg: "#f4f6f5", surface: "#ffffff", raised: "#1f2a26", line: "#d8ded9",
    ink: "#1f2a26", inkMut: "#4b574f", inkFaint: "#8b948c",
    accent: "#1f6f50", accentInk: "#ffffff",
    good: "#1f6f50", warn: "#a8632a", bad: "#a83a35", onDark: "#eef2ef",
    font: "sans", radius: "10px", scheme: "light",
  },
  nav: ["Encounters", "Drafts", "Patients", "Orders", "Evals", "Audit"],
  kpis: [
    { label: "Scribe drafts ready", value: "12", delta: "all eval-gated", tone: "good" },
    { label: "Scribe accuracy", value: "94.2%", delta: "clinician-graded", tone: "good" },
    { label: "Note time saved", value: "11 min", delta: "per encounter", tone: "good" },
    { label: "PHI boundary", value: "✓", delta: "inference ephemeral", tone: "flat" },
  ],
  queueTitle: "Drafts awaiting sign-off",
  primary: { label: "Sign note", kind: "good" },
  secondary: { label: "Return to clinician", kind: "neutral" },
  items: [
    {
      id: "c1",
      title: "R. Mehta · follow-up",
      sub: "Hypertension · 30 min · Room 2",
      badge: "ready",
      meta: [
        { k: "Encounter", v: "Follow-up · 30 min" },
        { k: "Scribe confidence", v: "0.97" },
        { k: "Meds reconciled", v: "4 of 4" },
        { k: "Coding suggestion", v: "I10 · primary" },
      ],
      body: "S: Reports improved adherence since switching to morning dosing; no dizziness, no chest pain. Home readings averaging 132/84. O: BP 128/82, HR 71, BMI stable. A: Essential hypertension, improving on current regimen. P: Continue amlodipine 5mg; recheck in 12 weeks; reinforced low-sodium guidance.",
      ai: {
        label: "Eval gate",
        text: "All 14 structured-note checks passed: med list matches reconciliation, no unsupported claims detected, vitals consistent with device feed. Safe to sign.",
      },
    },
    {
      id: "c2",
      title: "J. Park · new patient intake",
      sub: "General · 45 min · Room 4",
      badge: "review",
      meta: [
        { k: "Encounter", v: "New intake · 45 min" },
        { k: "Scribe confidence", v: "0.71" },
        { k: "Flagged sections", v: "Allergies · family hx" },
        { k: "Audio quality", v: "Degraded 09:12–09:15" },
      ],
      body: "Draft contains two sections transcribed during a period of degraded audio. The allergies list ('possible sulfa reaction, childhood') could not be cross-verified against intake forms.",
      ai: {
        label: "Eval gate",
        text: "Confidence below the 0.85 sign-off threshold on safety-critical sections (allergies). This draft cannot be signed as-is — clinician must verify the flagged sections verbally with the patient.",
      },
      guard: {
        action: "primary",
        outcome: "blocked · verify",
        text: "Safety guardrail: allergy section is below confidence threshold and unverified. Signing is blocked until the clinician confirms allergies with the patient — flagged sections highlighted in the draft, 30-second fix at next contact.",
      },
    },
    {
      id: "c3",
      title: "L. Okonkwo · care-plan review",
      sub: "Diabetes T2 · 20 min · telehealth",
      badge: "ready",
      meta: [
        { k: "Encounter", v: "Care plan · telehealth" },
        { k: "Scribe confidence", v: "0.95" },
        { k: "HbA1c trend", v: "7.9 → 7.1 over 6 mo" },
        { k: "Coding suggestion", v: "E11.9 · primary" },
      ],
      body: "A: T2DM, improving glycaemic control on current regimen. P: Continue metformin; dietitian follow-up scheduled; CGM data reviewed and attached to record.",
      ai: {
        label: "Eval gate",
        text: "All checks passed. CGM summary verified against device export; no unsupported claims. Safe to sign.",
      },
    },
    {
      id: "c4",
      title: "A. Fernandes · annual physical",
      sub: "Wellness · 40 min · Room 1",
      badge: "ready",
      meta: [
        { k: "Encounter", v: "Annual physical" },
        { k: "Scribe confidence", v: "0.96" },
        { k: "Screenings due", v: "Lipid panel · colonoscopy" },
        { k: "Coding suggestion", v: "Z00.00" },
      ],
      ai: {
        label: "Eval gate",
        text: "All checks passed. Two preventive screenings auto-suggested from age and history — included as plan items with patient-friendly explanations.",
      },
    },
  ],
  activitySeed: [
    { t: "4 min", text: "Dr. Osei signed M. Tan follow-up · eval gate 14/14 · note filed to EHR", tone: "good" },
    { t: "31 min", text: "Eval suite v9 nightly run: 412/412 green · zero PHI egress events", tone: "good" },
    { t: "1 hr", text: "Scribe model update staged — held for eval gate, not yet serving", tone: "warn" },
  ],
  statusLine: "phi boundary ✓ enforced · inference ephemeral · eval suite green 412/412",
};
