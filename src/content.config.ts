import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tag: z.string().default("essay"),
    author: z.string().default("kaedax"),
    draft: z.boolean().default(false),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/work" }),
  schema: z.object({
    codename: z.string(),
    vertical: z.enum([
      "ecom",
      "fintech",
      "healthtech",
      "insurance",
      "b2c",
      "ai",
      "ops",
      "proptech",
      "marketplace",
      "legaltech",
    ]),
    verticalLabel: z.string(),
    region: z.string(),
    stage: z.string(),
    year: z.number(),
    cycle: z.string(),
    headline: z.string(),
    summary: z.string(),
    stack: z.array(z.string()),
    phases: z.array(
      z.object({
        days: z.string(),
        title: z.string(),
        body: z.string(),
        artifacts: z.array(z.string()).default([]),
      })
    ),
    agentHighlights: z.array(
      z.object({
        agent: z.string(),
        level: z.enum(["info", "ok", "warn", "act"]).default("act"),
        msg: z.string(),
      })
    ),
    outcomes: z.array(
      z.object({
        k: z.string(),
        v: z.string(),
      })
    ),
    pullquote: z.object({
      text: z.string(),
      attribution: z.string(),
    }).optional(),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, work };
