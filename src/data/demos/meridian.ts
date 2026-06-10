import type { DemoConfig } from "./types";

/** meridian — property management console. Material story: the blueprint —
    drafting-table blue, white linework, mint approvals. */
export const meridian: DemoConfig = {
  slug: "meridian",
  name: "meridian",
  tag: "proptech · property management",
  verticalSlug: "proptech-software-development",
  url: "app.meridian.estate/workorders",
  tagline: "1,100 units, one console, no phone tag.",
  scenario: "Approve the HVAC work order, then try approving the roof repair — the second-bid guardrail catches a quote 2.3× above median.",
  persona: { name: "Dana Whitfield", role: "Portfolio manager · 1,102 units" },
  theme: {
    bg: "#142e4d", surface: "#1b3a5e", raised: "#0e2238", line: "#2d4d72",
    ink: "#e6eef6", inkMut: "#a7bcd1", inkFaint: "#6f8aa6",
    accent: "#dfeaf4", accentInk: "#13293f",
    good: "#7fd6b1", warn: "#eec170", bad: "#e58a7a", onDark: "#e6eef6",
    font: "sans", radius: "2px", scheme: "dark",
  },
  nav: ["Work orders", "Units", "Leases", "Vendors", "Money", "Reports"],
  kpis: [
    { label: "Occupancy", value: "94.2%", delta: "+1.8% qoq", tone: "good" },
    { label: "Open work orders", value: "31", delta: "median age 1.4d", tone: "good" },
    { label: "June rent run", value: "98%", delta: "1,084/1,102 collected", tone: "good" },
    { label: "Yardi sync", value: "✓", delta: "MLS feed normalized", tone: "flat" },
  ],
  queueTitle: "Work orders · awaiting approval",
  primary: { label: "Approve & dispatch", kind: "good" },
  secondary: { label: "Defer · ask tenant", kind: "neutral" },
  items: [
    {
      id: "m1",
      title: "Unit 4B · HVAC not cooling",
      sub: "Marlowe Court · tenant: Hartman · urgent",
      badge: "urgent",
      meta: [
        { k: "Issue", v: "AC blowing warm · 34°C day" },
        { k: "Vendor", v: "CoolFlow HVAC · 4.8★" },
        { k: "Quote", v: "$240 call-out + parts" },
        { k: "History", v: "Same unit serviced 14 mo ago" },
        { k: "Tenant", v: "Hartman · lease renewed" },
      ],
      ai: {
        label: "Triage",
        text: "Heat-wave week and a renewing tenant — urgency justified. Quote sits at the median for this repair class; vendor has a same-day slot at 14:00. Recommend approve.",
      },
    },
    {
      id: "m2",
      title: "Bldg C · roof flashing repair",
      sub: "Marlowe Court · common area · 2 quotes in",
      badge: "review",
      meta: [
        { k: "Issue", v: "Flashing leak · stairwell stain" },
        { k: "Quote", v: "$8,400 · Apex Roofing" },
        { k: "Median (class)", v: "$3,650" },
        { k: "Variance", v: "2.3× above median" },
      ],
      ai: {
        label: "Triage",
        text: "Repair is genuine (photo evidence consistent with flashing failure) but the quote is 2.3× the portfolio median for this repair class, and Apex was also the inspecting vendor. Recommend a second bid before approval.",
      },
      guard: {
        action: "primary",
        outcome: "second bid",
        text: "Spend guardrail: quotes above 2× class median require a competing bid — two vendors auto-invited from the panel (photos and roof plan attached), responses due Thursday. The leak gets a $180 temporary patch today so the stairwell stays dry.",
      },
    },
    {
      id: "m3",
      title: "Unit 11A · move-out turnover",
      sub: "Beacon House · vacant Fri · re-list ready",
      badge: "turnover",
      meta: [
        { k: "Scope", v: "Paint · deep clean · re-key" },
        { k: "Bundle quote", v: "$1,140 · 3 vendors" },
        { k: "Vacancy cost", v: "$94/day" },
        { k: "Re-list", v: "Photos scheduled Mon" },
      ],
      ai: {
        label: "Triage",
        text: "Standard turnover bundle at standard pricing. Every day of delay costs more than the rush premium — recommend approve with the Monday photo slot held.",
      },
    },
    {
      id: "m4",
      title: "Unit 7C · dishwasher replacement",
      sub: "Beacon House · tenant: Osei · scheduled",
      badge: "parts",
      meta: [
        { k: "Issue", v: "Pump failed · 9 yrs old" },
        { k: "Decision", v: "Replace > repair (model EOL)" },
        { k: "Quote", v: "$520 installed" },
        { k: "Tenant slot", v: "Confirmed Sat 10–12" },
      ],
      ai: {
        label: "Triage",
        text: "Repair parts are end-of-life; replacement is the economic call. Tenant already confirmed the Saturday window in the app. Clean approval.",
      },
    },
  ],
  activitySeed: [
    { t: "9 min", text: "Lease renewal signed · Unit 4B Hartman · 12 mo @ $2,450 · countersigned digitally", tone: "good" },
    { t: "52 min", text: "Rent run: 3 soft reminders sent · 1 payment plan auto-offered per policy", tone: "neutral" },
    { t: "2 hr", text: "Vendor panel: GreenScape landscaping insurance cert expires in 14 days — renewal requested", tone: "warn" },
  ],
  statusLine: "mls feed normalized ✓ · yardi adapter green · vendor dispatch live",
};
