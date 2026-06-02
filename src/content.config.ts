import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: "*.mdx", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    index: z.string(),
    tags: z.array(z.string()),
    imageSrc: z.string().optional(),
    delay: z.number().optional().default(0),
    githubUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
  })
});

const blog = defineCollection({
  loader: glob({ pattern: "*.mdx", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()).optional().default([]),
    imageSrc: z.string().optional(),
  })
});

const design = defineCollection({
  loader: glob({ pattern: "*.mdx", base: "./src/content/design" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['primitives', 'layouts', 'controls', 'overlays', 'feedback']),
    order: z.number().default(0),
    propsTable: z.array(z.object({
      name: z.string(),
      type: z.string(),
      defaultValue: z.string().optional(),
      description: z.string()
    })).optional(),
    icon: z.string().optional()
  })
});

const glossary = defineCollection({
  loader: glob({ pattern: "*.mdx", base: "./src/content/glossary" }),
  schema: z.object({
    title: z.string(),
    shortDefinition: z.string(),
    definition: z.string(),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
    related: z.array(z.string()).optional(),
    prerequisites: z.array(z.string()).optional(),
    readingTime: z.number().optional(),
    difficultyScore: z.number(),
    description: z.string(),
    keywords: z.array(z.string()).optional(),
    hasCode: z.boolean().optional(),
    hasDiagrams: z.boolean().optional(),
    interactive: z.boolean().optional(),
    imageSrc: z.string().optional(),
    icon: z.string().optional(),
    context: z.string().optional()
  })
});

export const collections = { projects, blog, design, glossary };
