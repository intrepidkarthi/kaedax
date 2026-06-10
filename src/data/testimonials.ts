/**
 * Testimonials — single source of truth.
 *
 * ⚠ PLACEHOLDERS. Every entry with `placeholder: true` is scaffold copy —
 * names, photos, and quotes are illustrative, not real clients. Replace each
 * with a real, attributable quote (written consent + their photo) before
 * launch, then drop `placeholder`. Publishing fabricated testimonials as
 * real ones is an FTC/ASCI problem — don't ship these as-is.
 *
 * Avatars live in /public/avatars/ (128px, randomuser.me placeholder set).
 *
 * `vertical` matches the work-collection enum so vertical pages can pull a
 * relevant quote automatically.
 */

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;     // path under /public
  vertical:
    | "ecom" | "fintech" | "healthtech" | "insurance" | "b2c"
    | "ai" | "ops" | "proptech" | "marketplace" | "legaltech" | "edtech";
  placeholder?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: "lattice-cto",
    quote:
      "We expected a prototype. We got a production console with audit trails our compliance team was actually happy with. Three days early.",
    name: "Vanessa Goh",
    role: "Co-founder & CTO · SMB credit fintech, Singapore",
    avatar: "/avatars/vanessa-goh.jpg",
    vertical: "fintech",
    placeholder: true,
  },
  {
    id: "caduceus-ceo",
    quote:
      "Every agency we spoke to treated HIPAA as a change order. kaedax treated it as the spec. The eval harness on the scribe is the reason our clinicians trust it.",
    name: "Sarah Whitmore",
    role: "CEO · chronic-care healthtech, US",
    avatar: "/avatars/sarah-whitmore.jpg",
    vertical: "healthtech",
    placeholder: true,
  },
  {
    id: "bough-founder",
    quote:
      "Thirty days from a brief to a configurator our old agency said needed two quarters. Conversion went up 38% in the first month.",
    name: "Daniel Mercer",
    role: "Founder · DTC home goods brand",
    avatar: "/avatars/daniel-mercer.jpg",
    vertical: "ecom",
    placeholder: true,
  },
  {
    id: "anchor-cpo",
    quote:
      "The quote-to-bind API went live mid-cycle and the carrier integration just kept working. The runbook handoff was cleaner than our internal docs.",
    name: "Ethan Brandt",
    role: "CPO · embedded insurance platform",
    avatar: "/avatars/ethan-brandt.jpg",
    vertical: "insurance",
    placeholder: true,
  },
  {
    id: "tallow-founder",
    quote:
      "They shipped the agent product *and* the eval harness that proves it works. We demo the evals to enterprise buyers now — it closes deals.",
    name: "James Halloran",
    role: "Founder · agent-product startup",
    avatar: "/avatars/james-halloran.jpg",
    vertical: "ai",
    placeholder: true,
  },
  {
    id: "harbor-coo",
    quote:
      "Our ops team stopped living in spreadsheets in week three. I've paid more for decks than kaedax charged for working software.",
    name: "Omar Farouk",
    role: "COO · logistics company",
    avatar: "/avatars/omar-farouk.jpg",
    vertical: "ops",
    placeholder: true,
  },
  {
    id: "pulse-founder",
    quote:
      "We launched to 40k users in week one and the moderation queue just held. Trust & safety was built into v1 — that's why the app stores didn't bury us.",
    name: "Mia Castellano",
    role: "Founder · consumer community app, EU",
    avatar: "/avatars/mia-castellano.jpg",
    vertical: "b2c",
    placeholder: true,
  },
  {
    id: "meridian-cofounder",
    quote:
      "Three PMs, 1,100 units, and a Yardi integration everyone warned us about. kaedax shipped the console in one cycle and our ops calls dropped by half.",
    name: "Jake Morrison",
    role: "Co-founder · property management platform, US",
    avatar: "/avatars/jake-morrison.jpg",
    vertical: "proptech",
    placeholder: true,
  },
  {
    id: "atrium-founder",
    quote:
      "Escrow, KYC, payouts — the scary parts were done by week two. We spent the rest of the cycle on matching, which is the part that actually wins the market.",
    name: "Oskar Lindqvist",
    role: "Founder · home-services marketplace, Nordics",
    avatar: "/avatars/oskar-lindqvist.jpg",
    vertical: "marketplace",
    placeholder: true,
  },
  {
    id: "gurukul-director",
    quote:
      "Our students were already on ChatGPT; our teachers were a year behind. Gurukul gave us a real AI syllabus, guardrails, and a teacher dashboard — live across 14 schools in one term.",
    name: "Arun Nair",
    role: "Director · 14-school K-12 network, Kochi",
    avatar: "/avatars/arun-nair.jpg",
    vertical: "edtech",
    placeholder: true,
  },
  {
    id: "counselworks-ceo",
    quote:
      "Partners don't trust software that touches privilege. kaedax shipped review tooling with ethical walls and an audit trail our GC signed off on — first try.",
    name: "Connor Walsh",
    role: "Co-founder & CEO · legal-ops startup",
    avatar: "/avatars/connor-walsh.jpg",
    vertical: "legaltech",
    placeholder: true,
  },
];

export function testimonialFor(vertical: Testimonial["vertical"]): Testimonial | undefined {
  return testimonials.find((t) => t.vertical === vertical) ?? testimonials[0];
}
