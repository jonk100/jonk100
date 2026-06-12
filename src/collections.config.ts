/**
 * collections.config.ts
 *
 * Portfolio navigation and card display configuration.
 * Only includes blog-related collections.
 * 
 * Writty content is managed in the Writty submodule.
 */

import type { CollectionEntry, CollectionKey } from "astro:content";

// ---------------------------------------------------------------------------
// Navigation config
// ---------------------------------------------------------------------------

export interface NavItem {
  label: string;
  href: string;
}

/**
 * Top-level navigation links.
 */
export const navItems: NavItem[] = [
  { label: "Home",    href: "/" },
  { label: "Blog",    href: "/blog" },
  { label: "wReady",  href: "/wready" },
  { label: "About",   href: "/about" },
];

// ---------------------------------------------------------------------------
// Card display config
// ---------------------------------------------------------------------------

export interface CardData {
  title: string;
  href: string;
  subtitle?: string;
  meta?: string;
  badge?: string;
  image?: string;
  detail?: string;
}

type CardMapper<T extends CollectionKey> = {
  bivarianceHack(entry: CollectionEntry<T>): CardData;
}["bivarianceHack"];

/**
 * Card display configuration for blog collections.
 */
export const cardConfig: Record<string, CardMapper<any>> = {

  posts: (entry: CollectionEntry<"posts">): CardData => ({
    title:    entry.data.title,
    href:     `/posts/${entry.id}`,
    subtitle: entry.data.excerpt,
    meta:     entry.data.publishedAt
      ? entry.data.publishedAt.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
      : undefined,
    badge:    entry.data.status,
  }),

  "post-series": (entry: CollectionEntry<"post-series">): CardData => ({
    title:    entry.data.title,
    href:     `/post-series/${entry.id}`,
    subtitle: entry.data.description,
    meta:     `Sort: ${entry.data.sortBy}`,
  }),
};

// ---------------------------------------------------------------------------
// Status badge colour mapping
// ---------------------------------------------------------------------------

export const statusColorMap: Record<string, string> = {
  draft:        "var(--status-draft)",
  published:    "var(--status-published)",
};

// Made with Bob
