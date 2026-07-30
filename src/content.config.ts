import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const findings = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/findings' }),
  schema: z.object({
    number: z.string(),
    title: z.string(),
    dek: z.string(),
    published: z.date(),
    status: z.enum(['unresolved', 'fixed', 'disputed', 'open']),
    statusNote: z.string(),
    affected: z.string(),
    vendor: z.string(),
    reports: z.array(z.string()).default([]),
    timeline: z.array(z.object({
      date: z.string(),
      event: z.string(),
      resolved: z.boolean().default(false),
    })).default([]),
  }),
});

export const collections = { findings };
