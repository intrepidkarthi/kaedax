import type { DemoConfig } from "./types";

/** pulse — consumer community live-ops. Material story: the night studio —
    near-black plum, hot coral signal, soft rounded consumer UI. */
export const pulse: DemoConfig = {
  slug: "pulse",
  name: "pulse",
  tag: "consumer · community live-ops",
  verticalSlug: "consumer-app-development",
  url: "ops.pulse.app/moderation",
  tagline: "Live-ops for a community that never sleeps.",
  scenario: "Approve the listening-room recording, then action the flagged DM thread — the self-harm guardrail routes it to a trained human with resources, never auto-removal.",
  persona: { name: "Maya Okonjo", role: "Trust & safety lead" },
  theme: {
    bg: "#16121a", surface: "#1f1925", raised: "#120e16", line: "#332a3d",
    ink: "#f0e9f2", inkMut: "#b3a8bb", inkFaint: "#7d7287",
    accent: "#ff5d73", accentInk: "#230a0f",
    good: "#7dd6a0", warn: "#f0b65c", bad: "#ff5d73", onDark: "#f0e9f2",
    font: "sans", radius: "12px", scheme: "dark",
  },
  nav: ["Moderation", "Rooms", "Creators", "Flags", "Waves", "Policies"],
  kpis: [
    { label: "Live right now", value: "4,212", delta: "across 38 rooms", tone: "good" },
    { label: "Mod queue SLA", value: "3.1 min", delta: "p95 · green", tone: "good" },
    { label: "Auto-resolved", value: "87%", delta: "classifier + rules", tone: "good" },
    { label: "Appeals upheld", value: "2.1%", delta: "low · healthy", tone: "flat" },
  ],
  queueTitle: "Moderation queue · needs a human",
  primary: { label: "Approve · keep up", kind: "good" },
  secondary: { label: "Remove · notify", kind: "bad" },
  items: [
    {
      id: "p1",
      title: "Room recording · indie pop night",
      sub: "Reported ×3 · 'copyright' · 812 listeners",
      badge: "audio",
      meta: [
        { k: "Reports", v: "3 · copyright claim" },
        { k: "Host", v: "@lowtide · clean record" },
        { k: "Classifier", v: "Original performance 0.91" },
        { k: "Room size", v: "812 live listeners" },
      ],
      body: "Three reports claim the host is streaming a copyrighted album. Audio fingerprinting matched no released recordings; the classifier reads it as a live original performance with covers under 30 seconds.",
      ai: {
        label: "Classifier read",
        text: "Fingerprint: no match against the rights database. Speech segments confirm live performance ('this next one I wrote last week'). Reports likely brigading from a rival room — pattern matches 2 previous false-report clusters.",
      },
    },
    {
      id: "p2",
      title: "DM thread · @user_4471",
      sub: "Self-harm classifier · confidence 0.88",
      badge: "sensitive",
      meta: [
        { k: "Classifier", v: "Self-harm risk 0.88" },
        { k: "Account age", v: "14 months" },
        { k: "Recent signals", v: "Night-time usage spike" },
        { k: "Prior flags", v: "None" },
      ],
      body: "Classifier flagged language in a private thread consistent with self-harm ideation. Content is not policy-violating speech — this is a welfare case, not an enforcement case.",
      ai: {
        label: "Classifier read",
        text: "High-confidence welfare flag. Playbook: do NOT remove content or sanction the account — route to the trained response team, surface helpline resources in-app, and suppress engagement notifications on the thread.",
      },
      guard: {
        action: "secondary",
        outcome: "welfare protocol",
        text: "Safety guardrail: self-harm flags never resolve through removal. Routed to the trained response team (SLA 10 min), regional helpline resources shown to the user in-app, thread notifications quieted. Removal would isolate the user — the protocol exists for this exact moment.",
      },
    },
    {
      id: "p3",
      title: "Creator clip · #weekend-collab",
      sub: "Reported ×1 · 'harassment' · 2.4k views",
      badge: "video",
      meta: [
        { k: "Reports", v: "1 · harassment" },
        { k: "Creator", v: "@maya.builds · partner" },
        { k: "Classifier", v: "Banter 0.83 / harassment 0.12" },
        { k: "Context", v: "Reply chain · mutuals" },
      ],
      ai: {
        label: "Classifier read",
        text: "Exchange is between long-time mutuals with reciprocal tone; reporter is a third party. Reads as banter, not targeting. Recommend keep with a soft notice to the reporter explaining context review.",
      },
    },
    {
      id: "p4",
      title: "New room · 'midnight rant club'",
      sub: "Auto-held at creation · name screen",
      badge: "screen",
      meta: [
        { k: "Trigger", v: "Name screen · borderline" },
        { k: "Creator", v: "@vik.r · 3 weeks old" },
        { k: "Description", v: "Vent space · peer support" },
        { k: "Similar rooms", v: "4 healthy precedents" },
      ],
      ai: {
        label: "Classifier read",
        text: "Vent/peer-support rooms have healthy precedents when guidelines are pinned. Recommend approve with the standard peer-support template auto-pinned and the room added to the night-shift watch list.",
      },
    },
  ],
  activitySeed: [
    { t: "30 sec", text: "Wave 3 invite batch released · 2,000 codes · servers at 41% headroom", tone: "good" },
    { t: "12 min", text: "Spam ring (14 accounts) auto-actioned · device-graph cluster · appeal window open", tone: "neutral" },
    { t: "1 hr", text: "Night-shift handover: 2 sensitive cases pending, both inside SLA", tone: "warn" },
  ],
  statusLine: "flags 7 active · mod sla green · sentry quiet · next wave T−6h",
};
