import type { DemoConfig } from "./types";

/** bough — made-to-order furniture ops. Material story: the workshop —
    warm linen, walnut ink, sawdust tones, serif headings, soft edges. */
export const bough: DemoConfig = {
  slug: "bough",
  name: "bough",
  tag: "ecommerce · made-to-order",
  verticalSlug: "ecommerce-development",
  url: "shop.bough.co/workshop/orders",
  tagline: "Configurator orders, flowing to the workshop floor.",
  scenario: "Release the oak shelf order to production, then try releasing the Khan order — the oversize-freight guardrail holds it for a shipping quote.",
  persona: { name: "Elena Marsh", role: "Workshop operations" },
  theme: {
    bg: "#f4efe6", surface: "#fdfaf3", raised: "#3a2e23", line: "#ddd3c2",
    ink: "#33291f", inkMut: "#5f5546", inkFaint: "#968b78",
    accent: "#7a4f2a", accentInk: "#f9f4ea",
    good: "#5d7a4d", warn: "#b07c2e", bad: "#a44d3a", onDark: "#f0e9da",
    font: "serif", radius: "6px", scheme: "light",
  },
  nav: ["Orders", "Configurator", "Materials", "3PL", "Returns", "Reports"],
  kpis: [
    { label: "Config conversion", value: "+38%", delta: "vs old PDP", tone: "good" },
    { label: "Orders this week", value: "147", delta: "−32 backlog", tone: "good" },
    { label: "Price recalc", value: "38ms", delta: "live BOM", tone: "flat" },
    { label: "ERP sync", value: "✓", delta: "3PL lead times live", tone: "flat" },
  ],
  queueTitle: "Configured orders · ready for production",
  primary: { label: "Release to production", kind: "good" },
  secondary: { label: "Hold · query customer", kind: "neutral" },
  items: [
    {
      id: "b1",
      title: "Oak shelf · 240cm · A. Verhoeven",
      sub: "#8847 · $1,840 · ships in 3 wks",
      badge: "paid",
      meta: [
        { k: "Configuration", v: "Natural oak · matte seal" },
        { k: "Brackets", v: "Matte black steel ×6" },
        { k: "Mounting", v: "Masonry kit" },
        { k: "BOM cost", v: "$612 · margin 64%" },
        { k: "Material stock", v: "All reserved" },
        { k: "Slot", v: "Workshop B · Thu" },
      ],
      ai: {
        label: "Production check",
        text: "Cut list generated and validated against panel stock; grain-match across the 240cm span confirmed possible from board lot #1142. No conflicts in the Thursday slot.",
      },
    },
    {
      id: "b2",
      title: "Wardrobe · 280×260cm · F. Khan",
      sub: "#8851 · $6,210 · custom corner unit",
      badge: "paid",
      meta: [
        { k: "Configuration", v: "Walnut veneer · brass rails" },
        { k: "Dimensions", v: "280 × 260 × 68 cm" },
        { k: "BOM cost", v: "$2,304 · margin 58%" },
        { k: "Delivery floor", v: "4th · no lift" },
      ],
      ai: {
        label: "Production check",
        text: "Build is straightforward, but assembled sections exceed standard freight dimensions and the delivery address has no lift. Shipping cost is unconfirmed — releasing now risks a margin-eating surprise at dispatch.",
      },
      guard: {
        action: "primary",
        outcome: "freight quote",
        text: "Shipping guardrail: oversize order to a no-lift 4th floor — held for a two-man-team freight quote before production starts. Customer notified with an honest timeline; quote SLA tomorrow 10:00.",
      },
    },
    {
      id: "b3",
      title: "Dining table · 200cm · M. Eriksen",
      sub: "#8849 · $3,420 · ash, oil finish",
      badge: "paid",
      meta: [
        { k: "Configuration", v: "Ash · oil finish · X-frame" },
        { k: "BOM cost", v: "$1,108 · margin 67%" },
        { k: "Material stock", v: "Ash boards reserved" },
        { k: "Slot", v: "Workshop A · Mon" },
      ],
      ai: {
        label: "Production check",
        text: "Standard build, all materials reserved, customer confirmed finish sample by email. Clean release.",
      },
    },
    {
      id: "b4",
      title: "Bookcase pair · 180cm · T. Okafor",
      sub: "#8852 · $2,140 · painted finish",
      badge: "paid",
      meta: [
        { k: "Configuration", v: "Birch ply · 'Deep Hague' paint" },
        { k: "BOM cost", v: "$701 · margin 67%" },
        { k: "Paint stock", v: "2 tins · reorder point" },
        { k: "Slot", v: "Workshop B · Fri" },
      ],
      ai: {
        label: "Production check",
        text: "Paint stock will hit the reorder point after this job — purchase order drafted automatically for sign-off in Materials. Release is safe.",
      },
    },
  ],
  activitySeed: [
    { t: "6 min", text: "#8846 sideboard dispatched · 3PL tracking pushed to customer · NPS prompt queued", tone: "good" },
    { t: "44 min", text: "Walnut veneer supplier lead time slipped 4 days — 2 open quotes repriced automatically", tone: "warn" },
    { t: "2 hr", text: "Configurator A/B: grain-match preview variant +6% add-to-cart · promoted to 100%", tone: "good" },
  ],
  statusLine: "price recalc 38ms · erp sync ✓ · 3pl lead times live · cart preserved",
};
