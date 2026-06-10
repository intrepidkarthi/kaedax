import type { DemoConfig } from "./types";

/** harbor — warehouse ops console. Material story: the hi-vis floor —
    poured-concrete grey, charcoal, safety yellow, stencil-sharp. */
export const harbor: DemoConfig = {
  slug: "harbor",
  name: "harbor",
  tag: "internal tools · logistics ops",
  verticalSlug: "internal-tools-development",
  url: "ops.harbor.internal/queue",
  tagline: "The ops console that replaced eleven spreadsheets.",
  scenario: "Dispatch Wave 1 to the 3PL, then try dispatching PO #8841 — the stock-mismatch guardrail holds it at bin B-14.",
  persona: { name: "Joseph Mwangi", role: "Warehouse shift lead" },
  theme: {
    bg: "#e9e8e4", surface: "#f7f6f2", raised: "#26282a", line: "#cfcdc6",
    ink: "#26282a", inkMut: "#52555a", inkFaint: "#8e9095",
    accent: "#f2c200", accentInk: "#1d1903",
    good: "#3e7d4e", warn: "#b07c1f", bad: "#a8442f", onDark: "#f2f1ec",
    font: "sans", radius: "0px", scheme: "light",
  },
  nav: ["Queue", "Scan", "Stock", "3PL", "Returns", "Reports"],
  kpis: [
    { label: "Orders to dispatch", value: "147", delta: "−32 vs yesterday", tone: "good" },
    { label: "Pick accuracy", value: "99.6%", delta: "scan-verified", tone: "good" },
    { label: "3PL webhooks", value: "live", delta: "delhivery + 2", tone: "flat" },
    { label: "Audit log", value: "100%", delta: "every touch", tone: "flat" },
  ],
  queueTitle: "Dispatch queue · this shift",
  primary: { label: "Dispatch", kind: "good" },
  secondary: { label: "Hold wave", kind: "neutral" },
  items: [
    {
      id: "h1",
      title: "Wave 1 · Delhivery pickup",
      sub: "62 orders · staged · pickup 09:00",
      badge: "staged",
      meta: [
        { k: "Orders", v: "62 · all scan-verified" },
        { k: "3PL", v: "Delhivery · 09:00 slot" },
        { k: "Manifest", v: "Generated · 62/62" },
        { k: "Dock", v: "Bay 2" },
      ],
      ai: {
        label: "Wave check",
        text: "All 62 cartons scanned against pick lists; weights within tolerance on every package. Manifest matches the 3PL booking. Clear to dispatch.",
      },
    },
    {
      id: "h2",
      title: "PO #8841 · restock putaway",
      sub: "Inbound · 480 units · bin B-14",
      badge: "flagged",
      meta: [
        { k: "Inbound", v: "480 units declared" },
        { k: "Scanned", v: "462 units" },
        { k: "Variance", v: "−18 · bin B-14" },
        { k: "Supplier", v: "Vertex Components" },
      ],
      ai: {
        label: "Stock check",
        text: "Scan count is 18 units short of the supplier's declared quantity, isolated to one carton at bin B-14. Confirming putaway now would poison stock accuracy for everything downstream.",
      },
      guard: {
        action: "primary",
        outcome: "held · recount",
        text: "Stock guardrail: variance above 2% blocks putaway confirmation. Bin B-14 queued for recount (photo of carton seal attached), supplier discrepancy note drafted automatically. ERP stays untouched until counts reconcile.",
      },
    },
    {
      id: "h3",
      title: "Wave 2 · Bluedart express",
      sub: "31 orders · staged · pickup 11:30",
      badge: "staged",
      meta: [
        { k: "Orders", v: "31 · all scan-verified" },
        { k: "3PL", v: "Bluedart · express" },
        { k: "Cold-chain", v: "None this wave" },
        { k: "Dock", v: "Bay 1" },
      ],
      ai: {
        label: "Wave check",
        text: "All express SLAs achievable at the 11:30 pickup; two orders upgraded from standard automatically after customer-service promises. Clear to dispatch.",
      },
    },
    {
      id: "h4",
      title: "Returns batch · 23 units",
      sub: "Inspection complete · disposition ready",
      badge: "graded",
      meta: [
        { k: "Units", v: "23 inspected" },
        { k: "Restock", v: "17 · grade A" },
        { k: "Refurb", v: "4 · grade B" },
        { k: "Write-off", v: "2 · damage photos filed" },
      ],
      ai: {
        label: "Disposition check",
        text: "Gradings match photo evidence; refund triggers already fired at receipt per policy. Confirming moves 17 units back to sellable stock immediately.",
      },
    },
  ],
  activitySeed: [
    { t: "5 min", text: "Wave 0 (priority) handed to Delhivery · 18 orders · POD webhooks armed", tone: "good" },
    { t: "39 min", text: "Bin C-02 cycle count complete · variance 0 · 14 bins remaining this week", tone: "neutral" },
    { t: "1 hr", text: "Priya's old spreadsheet 'FINAL_v7' viewed 0 times in 30 days — retirement candidate 🎉", tone: "good" },
  ],
  statusLine: "erp sync ✓ · 3pl webhooks live · audit log 100% · priya freed",
};
