/**
 * Vertical landing pages — single source of truth.
 *
 * Each entry generates a page at /{slug} via src/pages/[vertical].astro.
 * Content strategy (SEO + AEO):
 *  - `slug` matches a commercial-intent keyword ("fintech software development")
 *  - `answer` is a 40–60 word direct answer rendered in visible HTML at the
 *    top of the page — the passage answer engines extract and cite
 *  - `faqs` use real question phrasing (cost / timeline / compliance / process)
 *    and are rendered visibly + as FAQPage JSON-LD
 *  - `vertical` matches the work-collection enum for case-study pulls
 */

export type Kpi = { label: string; value: string; delta?: string; deltaTone?: "up" | "down" | "flat" };
export type MockupRow = { cells: string[]; chip?: { text: string; tone: "ok" | "warn" | "info" } };

/** Companion mobile-app screen rendered inside the phone frame of the device duo. */
export type MobileMockup = {
  app: string;          // brand name in the app header
  screen: string;       // current screen title
  time: string;         // status-bar clock — vary per vertical for realism
  hero: Kpi;            // primary metric card
  items: { title: string; sub: string; chip?: { text: string; tone: "ok" | "warn" | "info" } }[];
  action: string;       // primary CTA button
  tabs: string[];       // 4 bottom-tab labels, first is active
};

export type VerticalPage = {
  slug: string;
  vertical:
    | "ecom" | "fintech" | "healthtech" | "insurance" | "b2c"
    | "ai" | "ops" | "proptech" | "marketplace" | "legaltech" | "edtech";
  /** Optional live product demo — renders a "try the live demo" CTA (+ optional secondary link). */
  demo?: { href: string; label: string; secondary?: { href: string; label: string } };
  navLabel: string;
  tagLabel: string;          // mono chip, uppercase
  seoTitle: string;
  metaDescription: string;
  h1a: string;               // first line of H1
  h1b: string;               // italic second line
  answer: string;            // 40–60 word AEO answer box
  pains: { title: string; body: string }[];
  deliverables: { title: string; body: string }[];
  compliance: string[];      // posture chips
  faqs: { q: string; a: string }[];
  mockup: {
    app: string;
    url: string;
    sidebar: string[];
    kpis: Kpi[];
    tableCols: string[];
    rows: MockupRow[];
    statusLine: string;
    mobile: MobileMockup;
  };
};

export const verticals: VerticalPage[] = [
  /* ─────────────────────────── FINTECH ─────────────────────────── */
  {
    slug: "fintech-software-development",
    demo: { href: "/demos/underwrite", label: "Try underwrite — live credit-console demo" },
    vertical: "fintech",
    navLabel: "Fintech",
    tagLabel: "Fintech",
    seoTitle: "Fintech Software Development in 30 Days | kaedax",
    metaDescription:
      "Agent-first fintech software development: KYC/AML flows, audit trails, and PCI-aware architecture shipped in a fixed 720-hour cycle. Compliance is the spec, not a change order.",
    h1a: "Fintech software,",
    h1b: "compliant from commit one.",
    answer:
      "kaedax builds production fintech software — underwriting consoles, payment flows, lending platforms — in a fixed 30-day (720-hour) cycle. KYC/AML flows, signed audit trails, scoped IAM, and PCI-aware architecture are built into the spec from day one, with every pull request reviewed by two senior human engineers.",
    pains: [
      {
        title: "Compliance is 25–40% of your budget — and most shops bolt it on last",
        body: "Industry estimates put compliance at a quarter to nearly half of fintech build cost. Agencies that treat KYC, AML, and audit trails as a final phase ship rework, not product. We write the audit-log schema into the spec before any feature code exists.",
      },
      {
        title: "A 'fintech MVP' is not a prototype",
        body: "It handles real money, real PII, and real regulatory obligations from the first user. The typical agency quotes 3–5 months because their process assumes humans type everything. Our agents handle the volume; the 30 days buys you a production system, not a demo.",
      },
      {
        title: "Integration hell: bureaus, banks, KYC vendors",
        body: "Credit bureaus return malformed data, banking APIs rate-limit at the worst moment, KYC vendors change schemas without notice. We build adapter layers with retries, idempotency, and replayable webhooks — the unglamorous plumbing that decides whether your product survives month two.",
      },
      {
        title: "Your regulator will ask for the paper trail",
        body: "Every decision your system makes needs to be explainable and reconstructable. Signed audit trails, decision-explainability UIs, and append-only event logs are defaults in our fintech builds — not premium add-ons.",
      },
    ],
    deliverables: [
      { title: "Lending & underwriting consoles", body: "Bureau integrations, scoring runners, analyst queues, appeal workflows, committee paper trails." },
      { title: "Payment & settlement flows", body: "Idempotent payment orchestration, reconciliation jobs, webhook delivery with replay, dispute surfaces." },
      { title: "KYC/AML onboarding", body: "Vendor-agnostic identity flows, risk scoring, case management for manual review, SAR-ready evidence trails." },
      { title: "Audit & compliance layer", body: "Signed append-only logs, scoped IAM, customer-managed keys, regulator-readable exports." },
    ],
    compliance: ["PCI-aware controls", "KYC / AML flows", "Signed audit trails", "Scoped IAM", "Customer-managed keys"],
    faqs: [
      {
        q: "How much does fintech software development cost?",
        a: "Market rates for a regulated fintech MVP start around $50,000–$80,000 and run past $300,000 for enterprise platforms, with compliance often 25–40% of the total. kaedax prices per fixed 720-hour cycle, shared on the scope call once we understand the build — the cycle is fixed, so the variable is how many cycles your product needs.",
      },
      {
        q: "How long does it take to build a fintech app?",
        a: "Typical agency timelines are 3–5 months for an MVP and 8–14 months for a platform. kaedax ships a focused fintech product — one underwriting console, one payment flow, one onboarding surface — in a single 30-day cycle, because agents run the delivery loop and humans review every PR.",
      },
      {
        q: "Can you build KYC, AML, and audit-trail features?",
        a: "Yes — they are defaults, not add-ons. Every kaedax fintech build includes scoped IAM, signed append-only audit logs, and KYC/AML flows designed with your compliance counsel. We are the engineering partner, not the auditor of record.",
      },
      {
        q: "Is 30 days realistic for a regulated fintech build?",
        a: "For one focused surface, yes — our LATTICE engagement shipped an underwriting console with six bureau integrations and a full audit log in one cycle. Multi-product platforms don't fit a single cycle, and we say so on the scope call.",
      },
      {
        q: "Who owns the code and the infrastructure?",
        a: "You do, entirely. Repo, CI, secrets, deploy keys, agents, prompts, and eval harnesses live in your accounts from day one. We have no continuing access once the post-launch on-call window ends.",
      },
    ],
    mockup: {
      app: "underwrite · console",
      url: "console.lattice.internal/queue",
      sidebar: ["Queue", "Decisions", "Bureaus", "Models", "Audit log", "Settings"],
      kpis: [
        { label: "Pending reviews", value: "23", delta: "−8 today", deltaTone: "up" },
        { label: "Median decision", value: "4.2 min", delta: "8.4× faster", deltaTone: "up" },
        { label: "Auto-approved", value: "61%", delta: "+6% wow", deltaTone: "up" },
        { label: "Audit coverage", value: "100%", delta: "signed", deltaTone: "flat" },
      ],
      tableCols: ["Applicant", "Score", "Bureau", "Exposure", "Status"],
      rows: [
        { cells: ["Meridian Traders Pte", "742", "EXP + CIBIL", "S$ 180k"], chip: { text: "approved", tone: "ok" } },
        { cells: ["Kopi Collective", "618", "EXP", "S$ 45k"], chip: { text: "committee", tone: "warn" } },
        { cells: ["Harbour Logistics", "771", "EXP + CIBIL", "S$ 320k"], chip: { text: "approved", tone: "ok" } },
        { cells: ["Lumen Retail Group", "584", "CIBIL", "S$ 60k"], chip: { text: "declined", tone: "info" } },
        { cells: ["Atlas Components", "705", "EXP + B-X", "S$ 150k"], chip: { text: "review", tone: "warn" } },
      ],
      statusLine: "audit-log ✓ signed · bureau adapters 6/6 healthy · last decision T−42s",
      mobile: {
        app: "underwrite",
        screen: "Approvals",
        time: "09:41",
        hero: { label: "Awaiting your decision", value: "3", delta: "SLA 4h · oldest 38 min", deltaTone: "flat" },
        items: [
          { title: "Kopi Collective", sub: "S$ 45k · score 618 · EXP", chip: { text: "committee", tone: "warn" } },
          { title: "Atlas Components", sub: "S$ 150k · score 705 · EXP + B-X", chip: { text: "review", tone: "warn" } },
          { title: "Meridian Traders Pte", sub: "S$ 180k · score 742 · 2 bureaus", chip: { text: "approved", tone: "ok" } },
        ],
        action: "Review next application",
        tabs: ["Queue", "Decisions", "Alerts", "Profile"],
      },
    },
  },

  /* ────────────────────────── HEALTHTECH ───────────────────────── */
  {
    slug: "healthtech-software-development",
    demo: { href: "/demos/caduceus", label: "Try caduceus — live clinical-AI demo" },
    vertical: "healthtech",
    navLabel: "Healthtech",
    tagLabel: "Healthtech",
    seoTitle: "HIPAA-Compliant Healthtech Software in 30 Days | kaedax",
    metaDescription:
      "HIPAA-aware healthtech software development on a fixed 720-hour cycle: clinician consoles, AI scribes, patient workflows — PHI handling and eval harnesses built in from the spec.",
    h1a: "Healthtech software,",
    h1b: "HIPAA-aware by design.",
    answer:
      "kaedax builds HIPAA-aware healthtech software — clinician consoles, AI scribes, patient-facing workflows — in a fixed 30-day (720-hour) cycle. PHI handling, encryption, access controls, and evaluation harnesses for any AI output are part of the spec from day one, built by a team with petabyte-scale healthcare ML experience.",
    pains: [
      {
        title: "Most agencies treat HIPAA as a change order",
        body: "PHI handling decided after the architecture is locked means re-architecture, not compliance. We design data boundaries, encryption, anonymization, and access controls into the first spec — our team has run HIPAA-compliant ML on a 2.5-petabyte clinical dataset.",
      },
      {
        title: "Clinicians abandon software that adds clicks",
        body: "Healthtech fails on workflow, not features. A console that adds forty seconds per patient encounter dies in pilot. We build with the clinician's loop as the unit of design and instrument it from day one.",
      },
      {
        title: "AI features without evals are a liability",
        body: "An AI scribe or triage assistant that's wrong 6% of the time needs to know *which* 6%. Every AI surface we ship comes with an evaluation harness — graded test sets, regression gates, and accuracy budgets your clinical lead signs off on.",
      },
      {
        title: "EHR integration is where timelines go to die",
        body: "HL7, FHIR, and vendor-specific quirks routinely add quarters to roadmaps. We scope integration depth honestly on the scope call and build adapter layers that isolate vendor chaos from your product.",
      },
    ],
    deliverables: [
      { title: "Clinician consoles", body: "Encounter workflows, patient timelines, order surfaces — designed around the clinical loop, not the org chart." },
      { title: "AI scribes & clinical AI features", body: "Ambient documentation, summarization, triage — every model output gated by an eval harness with clinician-approved accuracy budgets." },
      { title: "Patient-facing workflows", body: "Onboarding, scheduling, remote monitoring surfaces with consent and PHI boundaries enforced in the schema." },
      { title: "PHI-safe data layer", body: "Encryption at rest and in transit, ephemeral inference, anonymization pipelines, access audit logs." },
    ],
    compliance: ["PHI handling", "HIPAA-aware architecture", "Ephemeral inference", "Eval harness on AI outputs", "Access audit logs"],
    faqs: [
      {
        q: "Can you build HIPAA-compliant software in 30 days?",
        a: "Yes, for a focused surface: one clinician console, one AI scribe, one patient workflow. HIPAA awareness is architectural — PHI boundaries, encryption, access controls — and we design it into the spec on day one rather than retrofitting it. Our CADUCEUS engagement shipped a clinician console with an AI scribe at 94% gated accuracy in one cycle.",
      },
      {
        q: "How do you handle PHI and patient data?",
        a: "PHI lives in your cloud, under your accounts, encrypted at rest and in transit. AI inference runs ephemeral — no patient data retained by model providers. Access is scoped per role and every read is audit-logged. We partner with your compliance counsel; we don't replace them.",
      },
      {
        q: "How much does healthtech software development cost?",
        a: "Market quotes for HIPAA-compliant MVPs typically run $60,000–$250,000 over 3–6 months. kaedax prices per fixed 720-hour cycle, shared on the scope call. The fixed cycle removes the timeline-overrun risk that inflates most healthtech budgets.",
      },
      {
        q: "Do you build AI features like scribes and triage assistants?",
        a: "Yes — with the evaluation harness built first. Every AI output is gated by graded test sets and regression checks that your clinical lead approves. We've written publicly about why the eval harness comes before the agent.",
      },
      {
        q: "Can you integrate with EHRs?",
        a: "We scope EHR integration honestly: FHIR-first where the vendor supports it, adapter layers that isolate vendor quirks, and a clear call on the scope call about what fits in one cycle. Deep bidirectional EHR integration may need a second cycle — we tell you upfront, not at day 25.",
      },
    ],
    mockup: {
      app: "caduceus · clinical",
      url: "app.caduceus.health/encounters",
      sidebar: ["Encounters", "Patients", "Scribe", "Care plans", "Evals", "Audit"],
      kpis: [
        { label: "Scribe accuracy", value: "94.2%", delta: "eval-gated", deltaTone: "up" },
        { label: "Time per note", value: "−71%", delta: "vs manual", deltaTone: "up" },
        { label: "Active panels", value: "1,842", delta: "+12% mom", deltaTone: "up" },
        { label: "PHI audit", value: "100%", delta: "logged", deltaTone: "flat" },
      ],
      tableCols: ["Encounter", "Clinician", "Scribe draft", "Review", "Status"],
      rows: [
        { cells: ["Follow-up · T2D", "Dr. Rao", "ready · 9.1 conf", "2 edits"], chip: { text: "signed", tone: "ok" } },
        { cells: ["Intake · HTN", "Dr. Okafor", "ready · 8.7 conf", "pending"], chip: { text: "review", tone: "warn" } },
        { cells: ["Telehealth · CKD", "Dr. Chen", "drafting…", "—"], chip: { text: "live", tone: "info" } },
        { cells: ["Follow-up · CHF", "Dr. Rao", "ready · 9.4 conf", "0 edits"], chip: { text: "signed", tone: "ok" } },
        { cells: ["Intake · T2D", "NP Williams", "below threshold", "escalated"], chip: { text: "human", tone: "warn" } },
      ],
      statusLine: "phi boundary ✓ enforced · inference ephemeral · eval suite green 412/412",
      mobile: {
        app: "caduceus",
        screen: "Today's encounters",
        time: "07:58",
        hero: { label: "Scribe drafts ready", value: "12", delta: "all eval-gated", deltaTone: "up" },
        items: [
          { title: "R. Mehta · follow-up", sub: "Hypertension · 30 min", chip: { text: "draft ready", tone: "ok" } },
          { title: "J. Park · new intake", sub: "Room 4 · started 07:45", chip: { text: "in session", tone: "warn" } },
          { title: "L. Okonkwo · care plan", sub: "Quarterly review", chip: { text: "2:30 pm", tone: "info" } },
        ],
        action: "Sign off drafts",
        tabs: ["Schedule", "Drafts", "Messages", "Profile"],
      },
    },
  },

  /* ────────────────────────── INSURANCE ────────────────────────── */
  {
    slug: "insurance-software-development",
    demo: { href: "/demos/anchor", label: "Try anchor — live quote-to-bind demo" },
    vertical: "insurance",
    navLabel: "Insurance",
    tagLabel: "Insurance",
    seoTitle: "Insurance & Insurtech Software Development | kaedax",
    metaDescription:
      "Embedded insurance, quote-to-bind APIs, and claims workflows shipped in a fixed 720-hour cycle. Regulator-aware SLAs and evidence trails built into the spec.",
    h1a: "Insurance software,",
    h1b: "bind-ready in a cycle.",
    answer:
      "kaedax builds insurtech software — quote-to-bind APIs, partner consoles, claims workflows, embedded insurance surfaces — in a fixed 30-day (720-hour) cycle. Regulator-aware SLAs, evidence trails, and carrier integrations are designed into the spec, with sub-second quote paths treated as an engineering budget, not an aspiration.",
    pains: [
      {
        title: "Carrier integrations move at carrier speed",
        body: "Your roadmap is hostage to a carrier's SOAP API and a quarterly release calendar. We build adapter layers with contract tests, so carrier-side chaos surfaces in your CI — not in production binds.",
      },
      {
        title: "Quote latency is conversion",
        body: "Every second added to a quote path costs measurable bind rate. Our ANCHOR engagement held end-to-end quote-to-bind under 1.4 seconds. We treat latency as a budget enforced in CI, the way other shops treat test coverage.",
      },
      {
        title: "Evidence trails or regulatory pain — pick one early",
        body: "When a regulator or reinsurer asks why a quote was priced or a claim denied, 'the model did it' is not an answer. Append-only decision logs and explainability surfaces are defaults in our insurance builds.",
      },
      {
        title: "Embedded distribution needs partner-grade APIs",
        body: "Selling through partners means your API is the product: idempotent binds, sandbox environments, webhooks that replay, docs that don't lie. We ship the partner console and the API as one surface.",
      },
    ],
    deliverables: [
      { title: "Quote-to-bind APIs", body: "Sub-second rating paths, idempotent binds, sandbox + production environments, partner-grade docs." },
      { title: "Partner & broker consoles", body: "Book-of-business views, commission surfaces, bind funnels with drop-off instrumentation." },
      { title: "Claims workflows", body: "FNOL intake, adjuster queues, fraud-signal surfaces, evidence-trail exports for regulators." },
      { title: "Rating & underwriting engines", body: "Versioned rate tables, decision logs, explainability UI, A/B-safe rollout of rating changes." },
    ],
    compliance: ["Regulator-aware SLAs", "Evidence trails", "Versioned rating", "Idempotent binds", "Partner sandboxes"],
    faqs: [
      {
        q: "How long does it take to build an insurtech product?",
        a: "Traditional quotes run 4–9 months for a quote-to-bind platform. kaedax ships one focused insurance surface — a quote-to-bind API, a claims workflow, a partner console — in a single 30-day cycle. Our ANCHOR engagement delivered a gig-worker quote-to-bind API and partner console in one cycle at sub-1.4s latency.",
      },
      {
        q: "Can you integrate with carriers and reinsurers?",
        a: "Yes. We build adapter layers with contract tests around carrier APIs, so their changes break our CI instead of your production binds. Integration depth is scoped honestly on the scope call.",
      },
      {
        q: "How do you handle regulatory and evidence requirements?",
        a: "Append-only decision logs, versioned rate tables, and explainability surfaces are defaults. Every quote, bind, and claim decision is reconstructable. We work alongside your compliance counsel as the engineering partner.",
      },
      {
        q: "How much does insurance software development cost?",
        a: "Market rates for insurtech MVPs typically run $80,000–$300,000 depending on carrier integration depth. kaedax prices per fixed 720-hour cycle, shared on the scope call — fixed scope, fixed timeline, no overrun billing.",
      },
      {
        q: "Do you build embedded insurance for non-insurance products?",
        a: "Yes — embedding a quote-to-bind flow inside an existing product (gig platforms, ecommerce checkouts, SaaS billing) is one of the most cycle-friendly shapes we take. The API, the embed surface, and the partner console ship together.",
      },
    ],
    mockup: {
      app: "anchor · partners",
      url: "partners.anchor.dev/binds",
      sidebar: ["Binds", "Quotes", "Partners", "Claims", "Rating", "Evidence"],
      kpis: [
        { label: "Quote → bind", value: "1.38s", delta: "p95 e2e", deltaTone: "up" },
        { label: "Bind rate", value: "31%", delta: "+5% mom", deltaTone: "up" },
        { label: "Active partners", value: "14", delta: "3 in sandbox", deltaTone: "flat" },
        { label: "Evidence trail", value: "100%", delta: "append-only", deltaTone: "flat" },
      ],
      tableCols: ["Partner", "Product", "Binds (7d)", "p95 quote", "Status"],
      rows: [
        { cells: ["GigShield", "Occupational accident", "412", "0.9s"], chip: { text: "live", tone: "ok" } },
        { cells: ["FleetCover", "Commercial auto", "188", "1.2s"], chip: { text: "live", tone: "ok" } },
        { cells: ["RentSafe", "Renters embedded", "—", "1.1s"], chip: { text: "sandbox", tone: "info" } },
        { cells: ["CourierCare", "Parcel liability", "97", "1.4s"], chip: { text: "live", tone: "ok" } },
        { cells: ["NomadHealth", "Travel medical", "—", "2.1s"], chip: { text: "tuning", tone: "warn" } },
      ],
      statusLine: "carrier adapters 4/4 green · rate table v23 active · last bind T−18s",
      mobile: {
        app: "anchor",
        screen: "Binds today",
        time: "11:24",
        hero: { label: "Bound premium", value: "$48.2k", delta: "+12% day over day", deltaTone: "up" },
        items: [
          { title: "Northwind Freight", sub: "Cargo liability · $12.4k", chip: { text: "bound", tone: "ok" } },
          { title: "Hartley Construction", sub: "General liability · $8.1k", chip: { text: "quote sent", tone: "info" } },
          { title: "Brightside Dental", sub: "Cyber · $3.6k", chip: { text: "uw review", tone: "warn" } },
        ],
        action: "Start new quote",
        tabs: ["Quotes", "Binds", "Claims", "More"],
      },
    },
  },

  /* ────────────────────────── ECOMMERCE ────────────────────────── */
  {
    slug: "ecommerce-development",
    demo: { href: "/demos/bough", label: "Try bough — live made-to-order ops demo" },
    vertical: "ecom",
    navLabel: "Ecommerce",
    tagLabel: "Ecommerce",
    seoTitle: "Custom Ecommerce Development Beyond Shopify | kaedax",
    metaDescription:
      "Custom ecommerce builds for brands that outgrew their platform: configurators, headless storefronts, ERP-connected operations — shipped in a fixed 720-hour cycle.",
    h1a: "Ecommerce that outgrew",
    h1b: "the template.",
    answer:
      "kaedax builds custom ecommerce software — product configurators, headless storefronts, ERP-connected operations — in a fixed 30-day (720-hour) cycle. For brands that have outgrown Shopify templates but can't absorb a six-month replatform, we ship the differentiated surface and integrate it with the stack you already run.",
    pains: [
      {
        title: "You've outgrown the platform, but a replatform is a year of risk",
        body: "Full replatforms routinely blow past two quarters and stall revenue while they do. We ship the surface that actually differentiates you — the configurator, the subscription logic, the B2B portal — and integrate with the platform you already have.",
      },
      {
        title: "Configurator depth is where templates die",
        body: "Made-to-order, bundles, regional pricing, B2B tiers — the moment your catalog has real logic, template platforms fight you. Our BOUGH engagement replaced an outgrown Shopify flow with a custom configurator and lifted configurator-to-checkout conversion 38%.",
      },
      {
        title: "Your ops team lives in seven browser tabs",
        body: "Inventory in one tool, logistics in another, finance in a third. We've built full custom ERPs for retail brands before — unified inventory, logistics, finance, and customer service is a solved problem with the right data model.",
      },
      {
        title: "Site speed is a revenue line",
        body: "Conversion decays measurably with every 100ms of latency. Our builds carry a Lighthouse 99+ budget enforced in CI — performance is a gate, not a hope.",
      },
    ],
    deliverables: [
      { title: "Product configurators", body: "Made-to-order logic, live pricing, visual previews — the surface that converts considered purchases." },
      { title: "Headless storefronts", body: "Sub-second commerce on your existing backend, Lighthouse 99+ enforced in CI." },
      { title: "Ops & ERP integration", body: "Inventory, logistics, finance, and service unified — built by a team that has shipped a full custom retail ERP." },
      { title: "Subscription & B2B surfaces", body: "Tiered pricing, recurring logic, wholesale portals, quote workflows." },
    ],
    compliance: ["PCI-aware checkout", "DPDP / GDPR defaults", "Perf budget in CI", "Analytics from day one"],
    faqs: [
      {
        q: "Should we replatform off Shopify or build custom?",
        a: "Usually neither extreme. Full replatforms risk two-plus quarters of stalled revenue; staying put caps your differentiation. The cycle-friendly answer is building the custom surface that actually converts — a configurator, a B2B portal — and integrating it with the platform you already run. We tell you which on the scope call.",
      },
      {
        q: "How much does custom ecommerce development cost?",
        a: "Agency quotes for custom commerce builds typically run $40,000–$200,000 over 2–6 months. kaedax prices per fixed 720-hour cycle, shared on the scope call. One cycle covers a focused surface like a configurator with checkout integration.",
      },
      {
        q: "Can you integrate with our existing stack (Shopify, ERP, 3PL)?",
        a: "Yes — most of our ecommerce work is integration-heavy by design. We build adapter layers around your platform, ERP, and logistics providers so the custom surface drops into the operation you already run.",
      },
      {
        q: "How fast will the storefront be?",
        a: "Lighthouse 99+ is a budget enforced in CI on our builds, not a marketing claim. Performance regressions block merges the same way failing tests do.",
      },
      {
        q: "Do you handle payments and PCI compliance?",
        a: "We build PCI-aware: tokenized payments through Stripe or your processor, no raw card data touching your servers, DPDP and GDPR-respectful defaults on customer data.",
      },
    ],
    mockup: {
      app: "bough · studio",
      url: "shop.bough.co/configure/oak-shelf",
      sidebar: ["Configure", "Materials", "Dimensions", "Finish", "Review", "Checkout"],
      kpis: [
        { label: "Config → checkout", value: "38%", delta: "+38% vs old", deltaTone: "up" },
        { label: "Lighthouse", value: "99", delta: "CI-enforced", deltaTone: "flat" },
        { label: "AOV", value: "$412", delta: "+22% mom", deltaTone: "up" },
        { label: "Render p95", value: "0.4s", delta: "live preview", deltaTone: "up" },
      ],
      tableCols: ["Option", "Selection", "Lead time", "Price Δ", "Stock"],
      rows: [
        { cells: ["Material", "White oak · FSC", "+0 days", "$0"], chip: { text: "in stock", tone: "ok" } },
        { cells: ["Width", "2400 mm · custom", "+4 days", "+$180"], chip: { text: "made to order", tone: "info" } },
        { cells: ["Finish", "Matte natural", "+0 days", "$0"], chip: { text: "in stock", tone: "ok" } },
        { cells: ["Brackets", "Blackened steel", "+2 days", "+$64"], chip: { text: "low stock", tone: "warn" } },
        { cells: ["Assembly", "Flat-pack + guide", "+0 days", "−$40"], chip: { text: "default", tone: "ok" } },
      ],
      statusLine: "price recalc 38ms · erp sync ✓ · 3pl lead times live · cart preserved",
      mobile: {
        app: "bough",
        screen: "Oak shelf · 240 cm",
        time: "19:32",
        hero: { label: "Your configuration", value: "$1,840", delta: "ships in 3 weeks", deltaTone: "flat" },
        items: [
          { title: "Finish", sub: "Natural oak · matte seal", chip: { text: "in stock", tone: "ok" } },
          { title: "Brackets", sub: "Matte black steel · ×6", chip: { text: "in stock", tone: "ok" } },
          { title: "Mounting", sub: "Masonry kit added", chip: { text: "+$48", tone: "info" } },
        ],
        action: "Add to cart",
        tabs: ["Shop", "Configure", "Orders", "Cart"],
      },
    },
  },

  /* ───────────────────────────── B2C ───────────────────────────── */
  {
    slug: "consumer-app-development",
    demo: { href: "/demos/pulse", label: "Try pulse — live trust & safety demo" },
    vertical: "b2c",
    navLabel: "Consumer",
    tagLabel: "B2C · Consumer",
    seoTitle: "Consumer App Development with Live-Ops Built In | kaedax",
    metaDescription:
      "Consumer apps shipped launch-ready in a fixed 720-hour cycle: waitlist funnels, community surfaces, moderation and live-ops from day one — built by a team that scaled apps to millions of users.",
    h1a: "Consumer apps,",
    h1b: "launch-day ready.",
    answer:
      "kaedax builds consumer products — community platforms, creator tools, social apps — in a fixed 30-day (720-hour) cycle, with the live-ops layer included: moderation defaults, trust and safety, analytics, and incident response. Built by engineers who have scaled consumer apps to millions of users and 420k organic downloads in a month.",
    pains: [
      {
        title: "Launch day is an ops event, not a code event",
        body: "The waitlist converts, traffic spikes, and the product falls over where you didn't instrument. We ship the live-ops layer with the product: telemetry, rate limits, moderation queues, and a monitoring agent that pages a human only when it matters.",
      },
      {
        title: "Trust and safety bolted on later means rebuilding your data model",
        body: "Blocking, reporting, moderation queues, and content policy enforcement touch every table. Designing them on day one costs hours; retrofitting them costs a cycle. Moderation defaults are in every B2C spec we write.",
      },
      {
        title: "Your runway can't fund a six-month build to first user",
        body: "Consumer products live or die on iteration speed against real users. A 30-day cycle to a production launch — our PULSE engagement went live to a 4,000-person waitlist with zero ops headcount — keeps your runway for the iterations that matter.",
      },
      {
        title: "Retention is built in the data layer",
        body: "Notifications, streaks, feeds, and social graphs are schema decisions before they're features. We design the event model for the retention loops you'll want in month three, even when month one ships without them.",
      },
    ],
    deliverables: [
      { title: "Community & social platforms", body: "Feeds, profiles, social graphs, notifications — with moderation and reporting in the first schema." },
      { title: "Creator tools", body: "Publishing flows, monetization surfaces, audience analytics, payout-ready accounting events." },
      { title: "Waitlist → launch funnels", body: "Referral mechanics, staged rollouts, invite systems that survive a traffic spike." },
      { title: "Live-ops layer", body: "Telemetry, moderation queues, feature flags, incident runbooks — zero ops headcount required at launch." },
    ],
    compliance: ["Moderation defaults", "Trust & safety day one", "DPDP / GDPR-respectful", "App-store-ready"],
    faqs: [
      {
        q: "How much does it cost to build a consumer app?",
        a: "Market quotes run $30,000–$150,000 for a consumer MVP over 2–5 months. kaedax prices per fixed 720-hour cycle, shared on the scope call. One cycle ships a launch-ready product including the live-ops layer most quotes omit.",
      },
      {
        q: "Can you handle a launch spike?",
        a: "That's the point of shipping live-ops with the product. Rate limits, queue-backed writes, staged rollouts, and monitoring are in the build — our PULSE engagement launched to a 4,000-person waitlist with zero ops headcount.",
      },
      {
        q: "Do you build iOS and Android apps?",
        a: "Yes — our founding team shipped Android apps to millions of users at Perk and built a VR app to 420k organic downloads in its first month. We'll recommend native, React Native, or web-first based on your product, not our convenience.",
      },
      {
        q: "What about moderation and trust & safety?",
        a: "Blocking, reporting, moderation queues, and content policy enforcement are in the first schema we design — they're data-model decisions, not features you add later.",
      },
      {
        q: "Is 30 days enough to launch a consumer product?",
        a: "For a focused product with one core loop, yes — production launch, not a beta. Multi-sided platforms with several loops typically need two cycles, and we say so on the scope call.",
      },
    ],
    mockup: {
      app: "pulse · live-ops",
      url: "ops.pulse.app/launch",
      sidebar: ["Launch", "Cohorts", "Moderation", "Flags", "Telemetry", "Incidents"],
      kpis: [
        { label: "Waitlist converted", value: "72%", delta: "4k invited", deltaTone: "up" },
        { label: "D1 retention", value: "46%", delta: "+9 vs bench", deltaTone: "up" },
        { label: "Mod queue", value: "12", delta: "p50 4 min", deltaTone: "flat" },
        { label: "Error rate", value: "0.03%", delta: "p99 180ms", deltaTone: "up" },
      ],
      tableCols: ["Cohort", "Invited", "Activated", "Posting", "Status"],
      rows: [
        { cells: ["Founding creators", "250", "94%", "81%"], chip: { text: "healthy", tone: "ok" } },
        { cells: ["Waitlist wave 1", "1,500", "76%", "52%"], chip: { text: "healthy", tone: "ok" } },
        { cells: ["Waitlist wave 2", "2,250", "68%", "44%"], chip: { text: "rolling", tone: "info" } },
        { cells: ["Referral loop", "612", "82%", "63%"], chip: { text: "healthy", tone: "ok" } },
        { cells: ["Press spike", "—", "—", "—"], chip: { text: "armed", tone: "warn" } },
      ],
      statusLine: "flags 7 active · mod sla green · sentry quiet · next wave T−6h",
      mobile: {
        app: "pulse",
        screen: "Tonight's drop",
        time: "21:07",
        hero: { label: "Live right now", value: "4,212", delta: "across 38 rooms", deltaTone: "up" },
        items: [
          { title: "Indie pop listening room", sub: "Hosted by @lowtide · 812 in", chip: { text: "live", tone: "ok" } },
          { title: "Creator AMA · @maya.builds", sub: "Starts 9:30 pm", chip: { text: "reminder set", tone: "info" } },
          { title: "Weekend collab challenge", sub: "Closes Sunday midnight", chip: { text: "open", tone: "warn" } },
        ],
        action: "Join room",
        tabs: ["Home", "Rooms", "Create", "Inbox"],
      },
    },
  },

  /* ───────────────────────── AI / AGENTS ───────────────────────── */
  {
    slug: "ai-agent-development",
    demo: { href: "/demos/tallow", label: "Try tallow — live agent-evals demo" },
    vertical: "ai",
    navLabel: "AI & Agents",
    tagLabel: "AI · Agents",
    seoTitle: "AI Agent Development with Eval Harnesses | kaedax",
    metaDescription:
      "Production AI agents and AI features shipped in a fixed 720-hour cycle — eval harness first, MCP tool contracts, refusal layers. Built by a studio that runs on its own agent stack.",
    h1a: "AI agents that survive",
    h1b: "contact with production.",
    answer:
      "kaedax builds production AI agents and AI features — agent products, copilots, AI-powered workflows — in a fixed 30-day (720-hour) cycle. The evaluation harness ships before the agent: graded test sets, regression gates, refusal layers, and MCP tool contracts. We run our own delivery on agents, so we build what we operate.",
    pains: [
      {
        title: "The demo works; production doesn't",
        body: "Every AI demo looks magical against cherry-picked inputs. Production means adversarial users, malformed data, and edge cases at volume. We build the eval harness before the agent — graded test sets and regression gates that make 'it works' a measured claim.",
      },
      {
        title: "Nobody can tell you if the agent got worse",
        body: "Prompt tweaks and model upgrades silently regress behavior. Without evals in CI, you find out from your users. Our builds gate every agent change behind the same green-suite discipline as code.",
      },
      {
        title: "The refusal layer is the product",
        body: "An agent that confidently does the wrong thing destroys trust faster than one that asks. Scoping what the agent won't do — and proving it with tests — is where enterprise buyers decide. We've written publicly on this; it closes deals.",
      },
      {
        title: "Tool integrations are 80% of agent engineering",
        body: "Agents are only as good as their tools' contracts. We build MCP-based tool layers with typed contracts, sandboxed execution, and audit logs of every tool call — the plumbing that separates agent products from agent demos.",
      },
    ],
    deliverables: [
      { title: "Agent products end-to-end", body: "The agent, the tool layer, the eval harness, and the operator console — shipped as one product." },
      { title: "AI features in existing products", body: "Copilots, summarization, extraction — dropped into your codebase with evals gating every release." },
      { title: "Eval harnesses", body: "Graded test sets, regression gates, accuracy budgets — demonstrable to enterprise buyers and auditors." },
      { title: "MCP tool layers", body: "Typed tool contracts, sandboxed execution, per-call audit logs, rate and cost budgets." },
    ],
    compliance: ["Eval harness first", "Refusal-layer tests", "Tool-call audit logs", "Cost & rate budgets", "Model-swap safe"],
    faqs: [
      {
        q: "How do you make sure an AI agent actually works?",
        a: "We build the evaluation harness before the agent: graded test sets from the spec, regression gates in CI, and accuracy budgets the client signs off on. Every prompt or model change runs the full suite before merge — 'it works' becomes a measured claim, not a vibe.",
      },
      {
        q: "How much does it cost to build an AI agent?",
        a: "Market quotes for production agent builds range $50,000–$250,000+ depending on tool-integration depth. kaedax prices per fixed 720-hour cycle, shared on the scope call. One cycle ships an agent product with its eval harness and operator console.",
      },
      {
        q: "Which models and frameworks do you use?",
        a: "Defaults: Claude as the planner model, MCP for tool contracts, LangGraph only where explicit graph orchestration earns its complexity, pgvector for memory, Inngest or Temporal for long-running jobs. We have opinions, ship with them, and deviate only for real engineering reasons.",
      },
      {
        q: "Can you add AI features to our existing product?",
        a: "Yes — a contained AI feature in your existing codebase is the most cycle-friendly shape we take. Our AURORA engagement shipped exactly that: an AI feature inside an existing product, eval-gated, in one cycle.",
      },
      {
        q: "What happens when models change or get deprecated?",
        a: "Model-swap safety is built in: the eval harness is model-agnostic, so upgrading models means re-running the suite and comparing scores — not re-engineering the product. You own the harness, the prompts, and the agents outright.",
      },
    ],
    mockup: {
      app: "tallow · agent-ops",
      url: "ops.tallow.ai/evals",
      sidebar: ["Agents", "Evals", "Tool calls", "Refusals", "Costs", "Releases"],
      kpis: [
        { label: "Eval suite", value: "412/412", delta: "green", deltaTone: "up" },
        { label: "Task success", value: "96.8%", delta: "+1.2 vs v12", deltaTone: "up" },
        { label: "Refusal accuracy", value: "99.1%", delta: "0 false-do", deltaTone: "up" },
        { label: "Cost / task", value: "$0.041", delta: "−18% mom", deltaTone: "up" },
      ],
      tableCols: ["Eval set", "Cases", "Pass", "Δ vs prod", "Gate"],
      rows: [
        { cells: ["core-tasks.v13", "180", "98.3%", "+0.6"], chip: { text: "pass", tone: "ok" } },
        { cells: ["adversarial.v8", "96", "96.9%", "+2.1"], chip: { text: "pass", tone: "ok" } },
        { cells: ["refusals.v8", "72", "100%", "0.0"], chip: { text: "pass", tone: "ok" } },
        { cells: ["tool-contracts.v5", "44", "100%", "0.0"], chip: { text: "pass", tone: "ok" } },
        { cells: ["long-horizon.v2", "20", "85.0%", "−3.0"], chip: { text: "blocked", tone: "warn" } },
      ],
      statusLine: "release v13 gated · long-horizon regression under review · human paged",
      mobile: {
        app: "tallow",
        screen: "Release v13",
        time: "16:45",
        hero: { label: "Eval pass rate", value: "98.6%", delta: "412 / 418 green", deltaTone: "up" },
        items: [
          { title: "Long-horizon regression", sub: "Suite #1182 · 6 cases", chip: { text: "investigating", tone: "warn" } },
          { title: "Tool-call accuracy", sub: "240 cases · v13 candidate", chip: { text: "passed", tone: "ok" } },
          { title: "Refusal layer · jailbreaks", sub: "Adversarial set v9", chip: { text: "passed", tone: "ok" } },
        ],
        action: "Hold release",
        tabs: ["Evals", "Traces", "Incidents", "Settings"],
      },
    },
  },

  /* ────────────────────── INTERNAL TOOLS / OPS ─────────────────── */
  {
    slug: "internal-tools-development",
    demo: { href: "/demos/harbor", label: "Try harbor — live warehouse-ops demo" },
    vertical: "ops",
    navLabel: "Internal tools",
    tagLabel: "Internal ops",
    seoTitle: "Internal Tools & Ops Software Development | kaedax",
    metaDescription:
      "Replace the spreadsheet sprawl: custom internal tools, ops consoles, and workflow automation shipped in a fixed 720-hour cycle. Built around your operation, not a template.",
    h1a: "Internal tools your ops team",
    h1b: "stops fighting.",
    answer:
      "kaedax builds custom internal tools — ops consoles, approval workflows, data dashboards, back-office automation — in a fixed 30-day (720-hour) cycle. For teams running operations on spreadsheets and seven browser tabs, one cycle replaces the sprawl with software shaped around the actual workflow, owned outright with no per-seat tax.",
    pains: [
      {
        title: "The spreadsheet is now the system of record — and it's terrifying",
        body: "What started as a tracker now runs the business: no audit trail, no permissions, one bad sort from disaster. We replace spreadsheet operations with real software — schema, roles, history — without freezing the team mid-migration.",
      },
      {
        title: "Low-code hit its ceiling",
        body: "Retool and Airtable got you far, then the logic got real: multi-step approvals, SLA timers, integrations the platform doesn't bless, per-seat pricing scaling with headcount. Custom tools you own outright remove the ceiling and the tax.",
      },
      {
        title: "Every team has its own tab stack",
        body: "Ops in one tool, finance in another, support in a third — and the integrations are a person named Priya copying rows. We've built a full custom ERP unifying inventory, logistics, finance, and service for a retail brand; the pattern transfers.",
      },
      {
        title: "Internal tools are where engineering time goes to die",
        body: "Your engineers should ship product, not maintain the admin panel. A cycle of agent-built internal tooling — reviewed by senior humans — costs less than a quarter of your team's distraction.",
      },
    ],
    deliverables: [
      { title: "Ops consoles", body: "Queues, approvals, SLA timers, role-based views — shaped around how your team actually works." },
      { title: "Workflow automation", body: "Multi-step processes with human checkpoints, escalations, and full audit history." },
      { title: "Data dashboards", body: "Live operational metrics on your real data — not another BI tool nobody opens." },
      { title: "System unification", body: "Adapter layers around the tools you keep, replacements for the ones you've outgrown." },
    ],
    compliance: ["Role-based access", "Full audit history", "Your cloud, your data", "No per-seat pricing"],
    faqs: [
      {
        q: "Should we build custom internal tools or use Retool/Airtable?",
        a: "Low-code is right until the logic gets real: multi-step approvals, odd integrations, SLA enforcement, headcount-scaled pricing. If you're fighting the platform weekly, a custom build you own outright is cheaper within a year. We'll tell you honestly on the scope call if low-code still fits.",
      },
      {
        q: "How much does custom internal tool development cost?",
        a: "Agency quotes typically run $30,000–$120,000 for a serious ops console. kaedax prices per fixed 720-hour cycle, shared on the scope call. Unlike per-seat platforms, the cost doesn't scale with your headcount.",
      },
      {
        q: "Can you migrate us off spreadsheets without stopping the business?",
        a: "Yes — parallel-run is the default. The new system runs alongside the spreadsheet until the numbers match and the team trusts it. Our HARBOR engagement moved a logistics ops team off spreadsheets in week three of the cycle.",
      },
      {
        q: "Will it integrate with the tools we keep?",
        a: "Yes. We build adapter layers around your existing stack — accounting, CRM, support, logistics — so the console becomes the single pane without forcing a rip-and-replace.",
      },
      {
        q: "Who maintains it after handoff?",
        a: "You own everything — repo, infra, runbooks, agents. The handoff includes docs your team can operate from, plus 30–60 days of post-launch on-call from us. No retainer required, no kaedax dependency.",
      },
    ],
    mockup: {
      app: "harbor · ops",
      url: "ops.harbor.internal/queue",
      sidebar: ["Queue", "Approvals", "Shipments", "Exceptions", "Reports", "Audit"],
      kpis: [
        { label: "Open exceptions", value: "7", delta: "−64% wow", deltaTone: "up" },
        { label: "SLA compliance", value: "98.4%", delta: "+11 vs sheet", deltaTone: "up" },
        { label: "Approvals p50", value: "22 min", delta: "was 2 days", deltaTone: "up" },
        { label: "Spreadsheets", value: "0", delta: "retired 14", deltaTone: "up" },
      ],
      tableCols: ["Item", "Owner", "Stage", "SLA", "Status"],
      rows: [
        { cells: ["PO-8841 · refrigerated", "M. Iyer", "Carrier assign", "3h left"], chip: { text: "on track", tone: "ok" } },
        { cells: ["EX-302 · customs hold", "S. Nair", "Docs requested", "breached"], chip: { text: "escalated", tone: "warn" } },
        { cells: ["PO-8847 · standard", "auto", "In transit", "—"], chip: { text: "on track", tone: "ok" } },
        { cells: ["RT-118 · damaged", "K. Bose", "Refund approval", "6h left"], chip: { text: "pending", tone: "info" } },
        { cells: ["PO-8852 · priority", "M. Iyer", "Pick & pack", "1h left"], chip: { text: "on track", tone: "ok" } },
      ],
      statusLine: "erp sync ✓ · 3pl webhooks live · audit log 100% · priya freed",
      mobile: {
        app: "harbor",
        screen: "Morning queue",
        time: "06:12",
        hero: { label: "Orders to dispatch", value: "147", delta: "−32 vs yesterday", deltaTone: "up" },
        items: [
          { title: "Wave 1 · 3PL pickup", sub: "Delhivery · 09:00 slot", chip: { text: "staged", tone: "ok" } },
          { title: "PO #8841", sub: "Stock mismatch · bin B-14", chip: { text: "flagged", tone: "warn" } },
          { title: "Returns batch", sub: "23 units · inspection", chip: { text: "processing", tone: "info" } },
        ],
        action: "Scan to dispatch",
        tabs: ["Queue", "Scan", "Stock", "Alerts"],
      },
    },
  },

  /* ────────────────────────── PROPTECH ─────────────────────────── */
  {
    slug: "proptech-software-development",
    demo: { href: "/demos/meridian", label: "Try meridian — live property-ops demo" },
    vertical: "proptech",
    navLabel: "Proptech",
    tagLabel: "Proptech",
    seoTitle: "Proptech Software Development | kaedax",
    metaDescription:
      "Proptech platforms shipped in a fixed 720-hour cycle: property management consoles, listing engines, tenant portals, and underwriting tools — integration-first architecture.",
    h1a: "Proptech platforms,",
    h1b: "built on real workflows.",
    answer:
      "kaedax builds proptech software — property management consoles, listing and search engines, tenant portals, real-estate underwriting tools — in a fixed 30-day (720-hour) cycle. Property data is messy and the integrations are legion; we build the adapter layers and data models that make the workflow feel inevitable.",
    pains: [
      {
        title: "Property data is the messiest data",
        body: "Listings arrive in seventeen formats, square footage means different things per market, and the MLS feed lies. We build normalization layers with validation and provenance, so your product works on clean data while the chaos stays quarantined.",
      },
      {
        title: "The workflow spans owners, tenants, agents, and vendors",
        body: "Proptech products fail when they model one side well and starve the others. Multi-party workflows — maintenance requests, lease approvals, vendor dispatch — need state machines and notifications designed for all four seats from day one.",
      },
      {
        title: "Legacy integrations gate every deal",
        body: "Yardi, MRI, AppFolio, regional MLS feeds — your buyers ask 'does it integrate?' before they ask the price. We scope integration depth honestly and build contract-tested adapters that survive vendor quirks.",
      },
      {
        title: "Underwriting tools need audit-grade math",
        body: "Rent rolls, comps, cash-flow models — when capital decisions ride on the output, every number needs provenance. We build calculation engines with versioned assumptions and reconstructable results.",
      },
    ],
    deliverables: [
      { title: "Property management consoles", body: "Owner, tenant, and vendor seats; maintenance workflows; lease lifecycle with full history." },
      { title: "Listing & search engines", body: "Normalized ingestion from messy feeds, geo search, comp surfaces with data provenance." },
      { title: "Underwriting & deal tools", body: "Cash-flow models with versioned assumptions, rent-roll ingestion, audit-grade outputs." },
      { title: "Tenant & resident portals", body: "Payments, requests, documents — the surface that decides your renewal rates." },
    ],
    compliance: ["Data provenance", "Multi-party access roles", "Versioned models", "Integration contract tests"],
    faqs: [
      {
        q: "How long does it take to build a proptech platform?",
        a: "Typical agency quotes run 4–8 months. kaedax ships one focused proptech surface — a management console, a listing engine, an underwriting tool — in a single 30-day cycle. Our MERIDIAN engagement shipped a proptech platform surface in one cycle.",
      },
      {
        q: "Can you integrate with Yardi, MRI, AppFolio, or MLS feeds?",
        a: "We build contract-tested adapter layers around property management systems and listing feeds, scoped honestly on the scope call. Vendor quirks break our CI, not your product.",
      },
      {
        q: "How do you handle messy property data?",
        a: "Normalization layers with validation and provenance at ingestion. Your product logic runs on clean, typed data; the source chaos stays quarantined at the boundary with full traceability back to the feed.",
      },
      {
        q: "How much does proptech software development cost?",
        a: "Market rates for proptech MVPs run $50,000–$200,000 depending on integration depth. kaedax prices per fixed 720-hour cycle, shared on the scope call — fixed scope, fixed timeline.",
      },
      {
        q: "Can you build multi-sided products (owners, tenants, vendors)?",
        a: "Yes — multi-party workflow modeling is the core proptech engineering problem, and we design all seats into the first data model. One focused multi-party workflow fits a cycle; a full four-sided platform typically needs two.",
      },
    ],
    mockup: {
      app: "meridian · pm",
      url: "app.meridian.estate/portfolio",
      sidebar: ["Portfolio", "Leases", "Maintenance", "Vendors", "Owners", "Reports"],
      kpis: [
        { label: "Units managed", value: "1,247", delta: "+86 mom", deltaTone: "up" },
        { label: "Occupancy", value: "94.6%", delta: "+2.1 yoy", deltaTone: "up" },
        { label: "Maint. p50", value: "1.8 days", delta: "was 6 days", deltaTone: "up" },
        { label: "Rent collected", value: "98.2%", delta: "auto-recon", deltaTone: "flat" },
      ],
      tableCols: ["Property", "Units", "Occupancy", "Open reqs", "Status"],
      rows: [
        { cells: ["Indigo Heights", "240", "96%", "4"], chip: { text: "healthy", tone: "ok" } },
        { cells: ["Cascade Court", "118", "89%", "11"], chip: { text: "attention", tone: "warn" } },
        { cells: ["Fern & Vine", "86", "98%", "1"], chip: { text: "healthy", tone: "ok" } },
        { cells: ["Northgate Lofts", "164", "95%", "3"], chip: { text: "healthy", tone: "ok" } },
        { cells: ["Solace Park", "210", "93%", "6"], chip: { text: "lease renewals", tone: "info" } },
      ],
      statusLine: "mls feed normalized ✓ · yardi adapter green · vendor dispatch live",
      mobile: {
        app: "meridian",
        screen: "Portfolio",
        time: "08:30",
        hero: { label: "Occupancy", value: "94.2%", delta: "+1.8% quarter over quarter", deltaTone: "up" },
        items: [
          { title: "Unit 4B · HVAC ticket", sub: "Vendor ETA 11:00", chip: { text: "dispatched", tone: "ok" } },
          { title: "Lease renewal · Hartman", sub: "12 mo · $2,450", chip: { text: "signed", tone: "ok" } },
          { title: "June rent run", sub: "1,084 / 1,102 units", chip: { text: "98% collected", tone: "info" } },
        ],
        action: "Approve work order",
        tabs: ["Units", "Leases", "Money", "More"],
      },
    },
  },

  /* ───────────────────────── MARKETPLACE ───────────────────────── */
  {
    slug: "marketplace-development",
    demo: { href: "/demos/atrium", label: "Try atrium — live marketplace-ops demo" },
    vertical: "marketplace",
    navLabel: "Marketplaces",
    tagLabel: "Marketplace",
    seoTitle: "Marketplace Development: Two-Sided Platforms | kaedax",
    metaDescription:
      "Two-sided marketplace development in a fixed 720-hour cycle: supply onboarding, matching, payments with escrow and splits, and trust systems — liquidity-first architecture.",
    h1a: "Marketplaces engineered",
    h1b: "for liquidity.",
    answer:
      "kaedax builds two-sided marketplaces — services, goods, B2B procurement — in a fixed 30-day (720-hour) cycle. Marketplace engineering is liquidity engineering: supply onboarding that doesn't leak, matching that converts, payments with escrow and splits, and the trust systems that keep both sides from going around you.",
    pains: [
      {
        title: "The cold-start problem is an engineering problem too",
        body: "Chicken-and-egg is strategy, but supply onboarding friction, empty-state design, and single-player utility are engineering. We build the surfaces that make a thin marketplace useful at day one, so your supply acquisition spend isn't wasted on a leaky funnel.",
      },
      {
        title: "Marketplace payments are nothing like checkout",
        body: "Escrow, split payouts, refunds across two parties, KYC on sellers, marketplace-of-record liability — getting this wrong is existential. We build on Stripe Connect or equivalent rails with reconciliation jobs from day one.",
      },
      {
        title: "Disintermediation eats your take rate",
        body: "The moment both sides trust each other, they're motivated to go around you. The defense is engineered: in-platform value (escrow, insurance, dispute resolution, scheduling) that makes leaving costlier than your fee.",
      },
      {
        title: "Trust systems are the product",
        body: "Reviews that resist manipulation, verification flows, dispute resolution with evidence trails — the unsexy systems that decide whether transaction #10,000 happens. They're in our first spec, not your post-launch backlog.",
      },
    ],
    deliverables: [
      { title: "Two-sided platforms", body: "Buyer and seller surfaces, onboarding funnels for both sides, empty-state-aware UX." },
      { title: "Matching & discovery", body: "Search, filters, ranking, and recommendation surfaces tuned for conversion on thin supply." },
      { title: "Marketplace payments", body: "Escrow, split payouts, refunds, seller KYC — on Stripe Connect rails with reconciliation jobs." },
      { title: "Trust & dispute systems", body: "Reviews, verification, dispute workflows with evidence trails — the moat against disintermediation." },
    ],
    compliance: ["Seller KYC", "Escrow & splits", "Dispute evidence trails", "Review integrity"],
    faqs: [
      {
        q: "How much does it cost to build a marketplace?",
        a: "Market quotes for two-sided marketplace MVPs run $50,000–$250,000 over 3–6 months, with payments and trust systems driving the spread. kaedax prices per fixed 720-hour cycle, shared on the scope call. One cycle ships both sides plus payments.",
      },
      {
        q: "How do you handle marketplace payments, escrow, and payouts?",
        a: "Stripe Connect or equivalent rails: escrow, split payouts, two-party refunds, seller KYC, and reconciliation jobs from day one. Marketplace payments are a different discipline from checkout, and we treat them that way.",
      },
      {
        q: "Can you build for the cold-start phase?",
        a: "Yes — empty-state design, single-player utility, and low-friction supply onboarding are engineering choices we make deliberately. Our ATRIUM engagement shipped a marketplace built for thin-liquidity day one.",
      },
      {
        q: "How do you prevent users from going around the platform?",
        a: "Disintermediation defense is engineered: escrow, dispute resolution, scheduling, and insurance live in-platform so leaving costs more than your take rate. We design those hooks into the first transaction flow.",
      },
      {
        q: "Is 30 days enough for a two-sided platform?",
        a: "One cycle ships a focused marketplace: both sides, matching, payments, and core trust systems. Deep verticalized features (logistics, insurance, financing) typically land in a second cycle — we map this on the scope call.",
      },
    ],
    mockup: {
      app: "atrium · marketplace",
      url: "ops.atrium.market/liquidity",
      sidebar: ["Liquidity", "Supply", "Demand", "Matches", "Payments", "Disputes"],
      kpis: [
        { label: "Fill rate", value: "78%", delta: "+14 wow", deltaTone: "up" },
        { label: "Time to match", value: "3.1h", delta: "p50", deltaTone: "up" },
        { label: "Escrow held", value: "$214k", delta: "auto-recon", deltaTone: "flat" },
        { label: "Dispute rate", value: "0.8%", delta: "p50 36h close", deltaTone: "up" },
      ],
      tableCols: ["Request", "Buyer", "Matches", "Escrow", "Status"],
      rows: [
        { cells: ["CNC fabrication · 40 u", "Volta Labs", "4 quotes", "$12.4k"], chip: { text: "matched", tone: "ok" } },
        { cells: ["Industrial design", "Fern Goods", "2 quotes", "—"], chip: { text: "quoting", tone: "info" } },
        { cells: ["PCB assembly · 500 u", "Kestrel IoT", "6 quotes", "$28.0k"], chip: { text: "in escrow", tone: "ok" } },
        { cells: ["Injection mold", "Bough Co", "1 quote", "—"], chip: { text: "thin supply", tone: "warn" } },
        { cells: ["Packaging run", "Pulse Snacks", "5 quotes", "$6.2k"], chip: { text: "delivered", tone: "ok" } },
      ],
      statusLine: "connect payouts ✓ · kyc queue 2 · supply alerts armed · recon clean",
      mobile: {
        app: "atrium",
        screen: "Your week",
        time: "13:51",
        hero: { label: "Earnings this week", value: "$2,340", delta: "payout Friday", deltaTone: "up" },
        items: [
          { title: "Kitchen deep clean", sub: "Tomorrow 9:00 · Söder", chip: { text: "confirmed", tone: "ok" } },
          { title: "New request · 2.1 km", sub: "Move-out clean · 3 rooms", chip: { text: "respond", tone: "warn" } },
          { title: "ID verification", sub: "BankID · renewed", chip: { text: "verified", tone: "ok" } },
        ],
        action: "Accept request",
        tabs: ["Jobs", "Requests", "Earnings", "Profile"],
      },
    },
  },

  /* ────────────────────────── LEGALTECH ────────────────────────── */
  {
    slug: "legaltech-software-development",
    demo: { href: "/demos/counselworks", label: "Try counselworks — live legal-review demo" },
    vertical: "legaltech",
    navLabel: "Legaltech",
    tagLabel: "Legaltech",
    seoTitle: "Legaltech Software Development | kaedax",
    metaDescription:
      "Legaltech platforms shipped in a fixed 720-hour cycle: matter management, document automation, AI-assisted review with eval harnesses — privilege-aware architecture throughout.",
    h1a: "Legaltech software,",
    h1b: "privilege-aware throughout.",
    answer:
      "kaedax builds legaltech software — matter management, document automation, AI-assisted review, client intake — in a fixed 30-day (720-hour) cycle. Privilege-aware access controls, defensible audit trails, and evaluation harnesses on any AI output are designed into the spec, because in legal software, 'mostly correct' is a malpractice exposure.",
    pains: [
      {
        title: "AI in legal needs a defensibility story, not a demo",
        body: "An AI that summarizes contracts impressively but unverifiably is unusable in practice. Every AI surface we ship for legal work carries an eval harness — graded against attorney-reviewed answers — plus citations back to source text for every claim.",
      },
      {
        title: "Privilege boundaries are an architecture decision",
        body: "Matter-level access, ethical walls, conflict checks — retrofitting these into a flat data model means rebuilding. We design privilege boundaries into the schema on day one, enforced at the database layer, not just the UI.",
      },
      {
        title: "Lawyers bill hours; your software can't waste them",
        body: "Legal users have the lowest tolerance for friction of any professional vertical: every extra click is billable time lost. We design around the matter workflow as practiced, instrumented from day one to find where minutes leak.",
      },
      {
        title: "Document workflows are version-control problems in disguise",
        body: "Redlines, approvals, signature chains, precedent libraries — legal documents need diffing, history, and audit the way code does. We bring software-grade version discipline to document automation.",
      },
    ],
    deliverables: [
      { title: "Matter management", body: "Matters, parties, deadlines, conflicts — with privilege boundaries enforced in the schema." },
      { title: "Document automation", body: "Template engines, redline workflows, approval chains, signature integration with full history." },
      { title: "AI-assisted review", body: "Extraction, summarization, and first-pass review — eval-gated against attorney-reviewed answers, every claim cited to source." },
      { title: "Client intake & portals", body: "Conflict-checked intake, secure document exchange, status surfaces that cut 'any update?' emails." },
    ],
    compliance: ["Privilege-aware access", "Ethical walls in schema", "Defensible audit trails", "Eval-gated AI", "Source citations"],
    faqs: [
      {
        q: "Can AI legal tools actually be trusted?",
        a: "Only with a defensibility layer: evaluation harnesses graded against attorney-reviewed answers, citations from every AI claim back to source text, and confidence thresholds that route low-certainty work to humans. That layer is the difference between a legal AI product and a liability — and it's the first thing we build.",
      },
      {
        q: "How do you handle privilege and confidentiality?",
        a: "Privilege boundaries are enforced at the database layer — matter-level access, ethical walls, conflict-aware permissions — not just hidden in the UI. Mutual NDA precedes any scope conversation, and all data lives in your cloud.",
      },
      {
        q: "How much does legaltech software development cost?",
        a: "Market quotes for legaltech MVPs run $50,000–$200,000 over 3–6 months. kaedax prices per fixed 720-hour cycle, shared on the scope call — fixed scope, fixed timeline, no overrun billing.",
      },
      {
        q: "Can you build document automation with redlining?",
        a: "Yes — template engines, redline workflows, approval chains, and signature integrations with software-grade version history. Legal documents are version-control problems, and we treat them with that discipline.",
      },
      {
        q: "Do you work with law firms or legaltech startups?",
        a: "Both: legaltech founders building products, and firms or legal-ops teams building internal tooling. The privilege-aware architecture is the same; the scope call establishes which workflows fit a single cycle.",
      },
    ],
    mockup: {
      app: "counselworks · review",
      url: "app.counselworks.legal/review",
      sidebar: ["Matters", "Review", "Documents", "Deadlines", "Conflicts", "Audit"],
      kpis: [
        { label: "First-pass review", value: "−68%", delta: "attorney time", deltaTone: "up" },
        { label: "Citation coverage", value: "100%", delta: "every claim", deltaTone: "flat" },
        { label: "Eval accuracy", value: "97.4%", delta: "atty-graded", deltaTone: "up" },
        { label: "Privilege checks", value: "0", delta: "violations", deltaTone: "flat" },
      ],
      tableCols: ["Document", "Matter", "AI first pass", "Citations", "Status"],
      rows: [
        { cells: ["MSA · Acme ↔ Volta", "M-2241", "12 clauses flagged", "47 ✓"], chip: { text: "atty review", tone: "info" } },
        { cells: ["Lease amendment v3", "M-2198", "2 deviations", "18 ✓"], chip: { text: "approved", tone: "ok" } },
        { cells: ["NDA batch · 14 docs", "M-2250", "clean · standard", "14 ✓"], chip: { text: "auto-pass", tone: "ok" } },
        { cells: ["Series A SPA", "M-2244", "low confidence §7", "61 ✓"], chip: { text: "human", tone: "warn" } },
        { cells: ["Vendor DPA", "M-2251", "3 clauses flagged", "22 ✓"], chip: { text: "atty review", tone: "info" } },
      ],
      statusLine: "ethical walls enforced · conflict check ✓ · audit trail signed",
      mobile: {
        app: "counselworks",
        screen: "Matter 24-118",
        time: "17:20",
        hero: { label: "Docs reviewed", value: "1,284", delta: "AI-flagged 37 for counsel", deltaTone: "flat" },
        items: [
          { title: "Privilege review · batch 6", sub: "37 docs flagged", chip: { text: "needs counsel", tone: "warn" } },
          { title: "Deposition summary · Chen", sub: "Auto-drafted · 14 pp", chip: { text: "draft ready", tone: "ok" } },
          { title: "Conflict check · new matter", sub: "Ran 17:04 · 0 hits", chip: { text: "clear", tone: "ok" } },
        ],
        action: "Review flagged docs",
        tabs: ["Matters", "Review", "Tasks", "More"],
      },
    },
  },

  /* ─────────────────────────── EDTECH ─────────────────────────── */
  {
    slug: "edtech-software-development",
    vertical: "edtech",
    navLabel: "Education",
    tagLabel: "EdTech",
    seoTitle: "EdTech software development for schools & colleges | kaedax",
    metaDescription:
      "Production edtech in 30 days: AI-learning platforms, LMS and classroom tools, assessment engines — DPDP-compliant student-data handling, vernacular-ready, low-bandwidth first. See Gurukul, our live AI-classroom demo.",
    h1a: "Education software,",
    h1b: "built for how India learns.",
    answer:
      "kaedax builds production education software — AI-learning platforms, classroom and LMS tools, assessment engines — in a fixed 30-day (720-hour) cycle. Curricula align to CBSE's AI skill subject (codes 417/843) and NEP 2020; DPDP-compliant student-data handling, parental-consent flows, vernacular-ready UI, and low-bandwidth-first design are in the spec from day one.",
    demo: {
      href: "/gurukul",
      label: "Try Gurukul — our live AI-classroom demo",
      secondary: { href: "/gurukul/readiness", label: "2-min school AI-readiness check" },
    },
    pains: [
      {
        title: "Imported LMS platforms don't fit Indian classrooms.",
        body: "Tools built for US districts assume one device per child, fast wifi, and no board exams. CBSE/ICSE/state-board structures, shared devices, vernacular instruction, and parent visibility are bolt-ons at best — so adoption dies in the staff room.",
      },
      {
        title: "Students are already on AI. The curriculum isn't.",
        body: "Kids use ChatGPT daily while schools debate banning it. Institutions need structured AI literacy — real syllabus, guardrails, assessment — not a chatbot pasted onto a textbook. That's a pedagogy problem before it's a software problem.",
      },
      {
        title: "Child data is the highest-stakes data there is.",
        body: "DPDP treats children's data as a special category: verifiable parental consent, no tracking-based profiling, strict purpose limitation. Most edtech retrofits this after launch. Retrofitted consent is how edtech companies end up in the news.",
      },
      {
        title: "Connectivity is a feature decision, not a footnote.",
        body: "Tier-2/3 schools run on shared bandwidth and intermittent power. If the product isn't offline-tolerant with sync reconciliation, half the country can't use it — and the demo that worked in the boardroom fails in the classroom.",
      },
    ],
    deliverables: [
      {
        title: "AI-learning platforms",
        body: "Structured AI curriculum products like Gurukul: courses, lessons, quizzes with instant feedback, progress tracking, breakthrough feeds — with eval-gated AI tutors that stay on-syllabus and age-appropriate.",
      },
      {
        title: "Classroom & LMS builds",
        body: "Assignments, grading workflows, announcements, attendance, parent visibility — the Google Classroom shape, adapted to Indian board structures and teacher workflows, in English plus vernacular.",
      },
      {
        title: "Assessment engines",
        body: "Item banks, auto-graded quizzes, rubric-based subjective grading with AI first-pass and teacher sign-off, board-pattern mock tests, and integrity posture appropriate to the stakes.",
      },
      {
        title: "Institution ERP & admissions",
        body: "Admissions funnels, fee management, timetabling, and reporting consoles for school networks and colleges — integrated with whatever ERP the institution already runs.",
      },
    ],
    compliance: ["NEP 2020-ready", "CBSE AI 417/843", "DPDP · child data", "Parental consent", "Vernacular-ready", "Low-bandwidth first", "Teacher-in-the-loop AI"],
    faqs: [
      {
        q: "Is the AI curriculum aligned to CBSE and NEP 2020?",
        a: "Yes. CBSE offers AI as a skill subject — code 417 for Classes 9–10 and 843 for senior secondary — and NEP 2020 expects coding and AI exposure from Class 6. Gurukul's course structure maps to these frameworks, so AI classes slot into the timetable as a recognised subject rather than an extracurricular workshop.",
      },
      {
        q: "How much does edtech software development cost in India?",
        a: "Agency quotes for an LMS or learning platform MVP typically run ₹40 lakh–₹2 crore over 4–8 months. kaedax prices per fixed 720-hour cycle, shared on the scope call — fixed scope, fixed timeline, no overrun billing.",
      },
      {
        q: "Can you build AI tutors that are safe for school students?",
        a: "Yes — that's the core discipline. AI tutors ship behind eval harnesses that test for age-appropriateness, syllabus adherence, and refusal of off-topic or unsafe requests, with teacher-visible logs. Try Gurukul, our live demo: the AI features are guardrailed by design, not by policy document.",
      },
      {
        q: "How do you handle student data under DPDP?",
        a: "Children's data gets the strict reading: verifiable parental consent flows, no behavioural profiling, purpose-limited collection, and data residency in India. Consent state is modelled in the database from day one, not added before a compliance audit.",
      },
      {
        q: "Do you integrate with existing school ERPs and tools?",
        a: "Yes — admissions ERPs, fee systems, Google Workspace for Education, and board-specific reporting formats. Integration chaos is normal in institutions; adapters and sync reconciliation are scoped into the cycle, not discovered after it.",
      },
      {
        q: "Can a learning platform really ship in 30 days?",
        a: "A focused one, yes. Gurukul — the AI-classroom demo on this page, with courses, quizzes, progress tracking, and a teacher dashboard — represents a single-cycle build. Multi-tenant rollout across a school network is typically a second cycle.",
      },
    ],
    mockup: {
      app: "gurukul · faculty",
      url: "app.gurukul.school/classes/ai-foundations",
      sidebar: ["Classes", "Lessons", "Assignments", "Students", "Reports", "Settings"],
      kpis: [
        { label: "Active students", value: "1,284", delta: "+212 this term", deltaTone: "up" },
        { label: "Avg completion", value: "87%", delta: "+9% mom", deltaTone: "up" },
        { label: "Median quiz", value: "8.4/10", delta: "AI Foundations", deltaTone: "flat" },
        { label: "Need a nudge", value: "23", delta: "auto-flagged", deltaTone: "down" },
      ],
      tableCols: ["Student", "Class", "Progress", "Last quiz", "Status"],
      rows: [
        { cells: ["Aarav Sharma", "X-B", "92%", "9/10"], chip: { text: "on track", tone: "ok" } },
        { cells: ["Diya Krishnan", "X-B", "88%", "10/10"], chip: { text: "topper", tone: "ok" } },
        { cells: ["Mohammed Irfan", "X-A", "61%", "6/10"], chip: { text: "nudge", tone: "warn" } },
        { cells: ["Sneha Patil", "X-C", "84%", "8/10"], chip: { text: "on track", tone: "ok" } },
        { cells: ["Vikram Reddy", "X-A", "43%", "—"], chip: { text: "at risk", tone: "warn" } },
      ],
      statusLine: "dpdp consent ✓ logged · hindi + english live · offline sync 98.4% reconciled",
      mobile: {
        app: "gurukul",
        screen: "Aaj ka paath",
        time: "16:05",
        hero: { label: "AI Foundations · Module 3", value: "68%", delta: "12-day streak 🔥", deltaTone: "up" },
        items: [
          { title: "Neural networks: the intuition", sub: "Lesson · 15 min", chip: { text: "continue", tone: "ok" } },
          { title: "Quiz · How machines learn", sub: "10 questions", chip: { text: "due today", tone: "warn" } },
          { title: "Breakthrough: AlphaFold", sub: "Feed · 4 min read", chip: { text: "new", tone: "info" } },
        ],
        action: "Continue learning",
        tabs: ["Home", "Classes", "Quizzes", "Profile"],
      },
    },
  },
];

export function verticalBySlug(slug: string): VerticalPage | undefined {
  return verticals.find((v) => v.slug === slug);
}
