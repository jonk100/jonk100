import { defineCollection, reference } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

/**
 * Portfolio content configuration
 * 
 * This portfolio site only manages blog content (posts and post-series).
 * All Writty-related content (songs, scenes, characters, etc.) lives in
 * the Writty submodule at ./writty/ and is managed separately.
 */

const postSeries = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/post-series" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    /**
     * Controls how posts in this series are sorted in listings.
     * - "date"     → chronological (reviews, essays)
     * - "position" → manual ordering (course modules, structured series)
     */
    sortBy: z.enum(["date", "position"]).default("date"),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    postSeries: reference("post-series"),
    heroImage: z.string().startsWith("/src/assets/").optional(),
    position: z.number().int().positive().optional(),
    excerpt: z.string().default(""),
    publishedAt: z.coerce.date().default(() => new Date()),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    status: z.enum(["draft", "published"]).default("draft"),
  }),
});

export const collections = {
  "post-series": postSeries,
  posts,
};

// Made with Bob
