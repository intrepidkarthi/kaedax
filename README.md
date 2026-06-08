# kaedax

An AI-native software studio. Agent-first delivery on a thirty-day cycle.

This repository contains the source for [kaedax.com](https://kaedax.com) — the
public site, blog, and case-study collection.

## Stack

- **Astro 6** static site, Vite + Tailwind 4
- **MDX** content collections for blog posts and case studies
- **React 19** islands for interactive elements (hero counter, agent terminal)
- **Fontsource** — Bricolage Grotesque (display) · Fraunces (editorial serif) · JetBrains Mono (terminal)
- **Sharp** for OG image generation

## Layout

```
src/
├── components/        Astro + React UI components
│   ├── AgentTerminal.tsx     Live streaming terminal in the hero
│   ├── AgentFlow.astro       Animated SVG of the agent delivery loop
│   ├── CaseStudyHero.astro   One blueprint diagram per case study
│   └── ...
├── content/
│   ├── blog/          MDX field notes
│   └── work/          MDX case studies (anonymized)
├── data/socials.ts    Single source of truth for social links
├── layouts/Base.astro
├── pages/
│   ├── index.astro             Homepage
│   ├── process.astro           How an engagement works
│   ├── work/
│   │   ├── index.astro
│   │   └── [...slug].astro
│   └── blog/
└── styles/global.css           Design tokens + base layer

public/
├── og-default.png    Open Graph card (1200×630)
├── llms.txt          Machine-readable site index
├── robots.txt
└── favicon.svg

scripts/
└── generate-og.mjs   PNG generator for the OG card
```

## Commands

| Command          | What it does                          |
| ---------------- | ------------------------------------- |
| `npm install`    | Install dependencies                  |
| `npm run dev`    | Start dev server at `localhost:4321`  |
| `npm run build`  | Build static site to `./dist/`        |
| `npm run preview`| Preview the production build locally  |
| `npm run og`     | Regenerate `public/og-default.png`    |

## Editing content

Case studies and blog posts are MDX files under `src/content/`. The schema for
each is defined in `src/content.config.ts`. Updating an MDX file and saving will
hot-reload the dev server.

Social links live in `src/data/socials.ts`. Update that one file to change the
footer's "elsewhere" row everywhere.

## Design system

`src/styles/global.css` defines the Tailwind 4 theme tokens:

- **Ink** — page surfaces, deepest at `--color-ink-950: #07090a`
- **Bone** — text, off-white at `--color-bone-50: #fafaf7`
- **Volt** — chartreuse accent at `--color-volt-400: #c1ff3a`

The aesthetic is intentionally restrained: dark base, hairline borders, a single
chartreuse accent, one premium gradient moment per page. The italic counterpoint
moments use Fraunces serif via the `.editorial-italic` class.

## License

Site content © kaedax. The underlying engineering choices (component patterns,
animations, the SVG flow diagram) are free to learn from.
