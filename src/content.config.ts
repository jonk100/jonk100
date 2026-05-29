import { defineCollection, z } from 'astro:content';
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
  })
});

export const collections = { projects, blog };
