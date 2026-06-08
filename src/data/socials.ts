/**
 * kaedax social presence — single source of truth.
 * Update href values when actual handles are confirmed.
 *
 * `external: true` opens in a new tab with rel="noopener noreferrer".
 * `tagline` is used in the footer's hover state to give context.
 */

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  external: boolean;
  tagline?: string;
};

export const socials: SocialLink[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/kaedax",
    external: true,
    tagline: "Founders' notes & cycle openings",
  },
  {
    id: "twitter",
    label: "X · Twitter",
    href: "https://x.com/kaedax",
    external: true,
    tagline: "Live cycle log, in the open",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/kaedax",
    external: true,
    tagline: "Public agents & eval harnesses",
  },
  {
    id: "substack",
    label: "Substack",
    href: "https://kaedax.substack.com",
    external: true,
    tagline: "Long-form field notes",
  },
  {
    id: "email",
    label: "hello@kaedax.com",
    href: "mailto:hello@kaedax.com",
    external: false,
    tagline: "Briefs land in a human's inbox",
  },
];
