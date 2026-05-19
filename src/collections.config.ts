/**
 * collections.config.ts
 *
 * Single source of truth for:
 *   1. Which collections appear in navigation and where
 *   2. How each collection's entries are displayed on index cards
 *
 * To add a new collection to the nav or give its cards new fields,
 * this is the only file you need to touch.
 */

import type { CollectionEntry, CollectionKey } from "astro:content";

// ---------------------------------------------------------------------------
// Navigation config
// ---------------------------------------------------------------------------

/**
 * A single item in the top navigation bar.
 * Items without `href` are treated as labels only (not yet used,
 * but useful if you add dropdowns later).
 */
export interface NavItem {
  label: string;
  href: string;
}

/**
 * Top-level navigation links.
 * Order here controls order in the rendered nav.
 */
export const navItems: NavItem[] = [
  { label: "Blog",    href: "/blog" },
  { label: "wReady",  href: "/writty" },
  { label: "Site",    href: "/" },
];

/**
 * Sub-navigation for the Writings hub page.
 * Rendered as tiles on /writings rather than in the top nav.
 */
export const writingsNavItems: NavItem[] = [
  { label: "Songs",         href: "/songs" },
  { label: "Albums",        href: "/albums" },
  { label: "Poems",         href: "/poems" },
  { label: "Short Stories", href: "/short-stories" },
  { label: "Sets",          href: "/sets" },
];

// ---------------------------------------------------------------------------
// Card display config
// ---------------------------------------------------------------------------

/**
 * Normalised data shape passed to CollectionCard.
 * Every collection maps its entries to this shape.
 * All fields are optional except `title` and `href`.
 */
export interface CardData {
  /** Primary title — always shown */
  title: string;

  /** URL the card links to */
  href: string;

  /** Secondary line shown below the title */
  subtitle?: string;

  /** Small metadata line — year, key, type, etc. */
  meta?: string;

  /**
   * Status badge text. Will be colour-coded via CSS custom properties
   * mapped from the status value (see CollectionCard.astro).
   */
  badge?: string;

  /** Optional image URL — shown as card thumbnail if present */
  image?: string;

  /**
   * Optional extra detail line — used for things like
   * chord voicing labels or actor birthplace.
   */
  detail?: string;
}

/**
 * A function that maps a collection entry to CardData.
 * The generic makes it type-safe per collection.
 */
type CardMapper<T extends CollectionKey> = {
  bivarianceHack(entry: CollectionEntry<T>): CardData;
}["bivarianceHack"];

/**
 * Card display configuration for each collection.
 *
 * Add an entry here for any collection that needs an index page.
 * The `mapper` function extracts the fields CollectionCard will display.
 *
 * Typed as Record<string, CardMapper<any>> so it can be indexed dynamically
 * in CardGrid while still being authored with per-collection type safety.
 */
export const cardConfig: Record<string, CardMapper<any>> = {

  projects: (entry: CollectionEntry<"projects">): CardData => ({
    title: entry.data.title,
    href:  `/projects/${entry.id}`,
    subtitle: entry.data.logline,
    meta:  entry.data.type.replace(/-/g, " "),
    badge: entry.data.status,
  }),

  episodes: (entry: CollectionEntry<"episodes">): CardData => ({
    title:    `Ep ${entry.data.episodeNumber} — ${entry.data.title}`,
    href:     `/episodes/${entry.id}`,
    subtitle: entry.data.logline,
    badge:    entry.data.status,
  }),

  scenes: (entry: CollectionEntry<"scenes">): CardData => ({
    title:    `Sc ${entry.data.sceneNumber}`,
    href:     `/scenes/${entry.id}`,
    subtitle: entry.data.heading,
    meta:     entry.data.synopsis,
    badge:    entry.data.status,
  }),

  characters: (entry: CollectionEntry<"characters">): CardData => ({
    title:    entry.data.name,
    href:     `/characters/${entry.id}`,
    subtitle: entry.data.role,
    meta:     entry.data.arc,
  }),

  locations: (entry: CollectionEntry<"locations">): CardData => ({
    title:    entry.data.name,
    href:     `/locations/${entry.id}`,
    meta:     entry.data.intOrExt,
    subtitle: entry.data.realWorldRef,
  }),

  plots: (entry: CollectionEntry<"plots">): CardData => ({
    title:    entry.data.title,
    href:     `/plots/${entry.id}`,
    subtitle: entry.data.summary,
    badge:    entry.data.plotType,
  }),

  beats: (entry: CollectionEntry<"beats">): CardData => ({
    title:    `Beat ${entry.data.beatNumber}`,
    href:     `/beats/${entry.id}`,
    subtitle: entry.data.summary,
    badge:    entry.data.beatType,
    meta:     entry.data.tension ? `Tension: ${entry.data.tension}/10` : undefined,
  }),

  songs: (entry: CollectionEntry<"songs">): CardData => ({
    title:    entry.data.title,
    href:     `/songs/${entry.id}`,
    subtitle: entry.data.album?.id
      ? `Album: ${entry.data.album.id}`
      : "Standalone",
    meta:  `${entry.data.keyRoot} ${entry.data.keyMode} · ${entry.data.tempo ? `${entry.data.tempo} BPM` : ""}`.trim(),
    badge: entry.data.status,
  }),

  albums: (entry: CollectionEntry<"albums">): CardData => ({
    title:    entry.data.title,
    href:     `/albums/${entry.id}`,
    meta:     entry.data.year?.toString(),
    badge:    entry.data.status,
  }),

  poems: (entry: CollectionEntry<"poems">): CardData => ({
    title:    entry.data.title,
    href:     `/poems/${entry.id}`,
    meta:     entry.data.form,
    badge:    entry.data.status,
  }),

  "short-stories": (entry: CollectionEntry<"short-stories">): CardData => ({
    title:    entry.data.title,
    href:     `/short-stories/${entry.id}`,
    meta:     entry.data.wordCount ? `${entry.data.wordCount.toLocaleString()} words` : undefined,
    badge:    entry.data.status,
  }),

  sets: (entry: CollectionEntry<"sets">): CardData => ({
    title:    entry.data.title,
    href:     `/sets/${entry.id}`,
    meta:     entry.data.contentType,
    badge:    entry.data.status,
  }),

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
    href:     `/posts/${entry.id}`,
    subtitle: entry.data.description,
    meta:     `Sort: ${entry.data.sortBy}`,
  }),

  reviews: (entry: CollectionEntry<"reviews">): CardData => ({
    title:    entry.data.title,
    href:     `/reviews/${entry.id}`,
    subtitle: entry.data.subtitle,
    meta:     [entry.data.category, entry.data.year].filter(Boolean).join(" · "),
    badge:    entry.data.status,
    image:    entry.data.poster ?? undefined,
  }),

  actors: (entry: CollectionEntry<"actors">): CardData => ({
    title:    entry.data.name,
    href:     `/actors/${entry.id}`,
    detail:   entry.data.from ?? undefined,
  }),

  chords: (entry: CollectionEntry<"chords">): CardData => ({
    title:    entry.data.displayName,
    href:     `/chords/${entry.id}`,
    subtitle: entry.data.voicingLabel,
    detail:   entry.id,
  }),

  themes: (entry: CollectionEntry<"themes">): CardData => ({
    title:    entry.data.title,
    href:     `/themes/${entry.id}`,
    subtitle: entry.data.description,
  }),

  books: (entry: CollectionEntry<"books">): CardData => ({
    title:    entry.data.title,
    href:     `/books/${entry.id}`,
    meta:     entry.data.genres.join(", "),
    badge:    entry.data.status,
  }),

  chapters: (entry: CollectionEntry<"chapters">): CardData => ({
    title:    `Ch ${entry.data.chapterNumber}${entry.data.title ? ` — ${entry.data.title}` : ""}`,
    href:     `/chapters/${entry.id}`,
    subtitle: entry.data.synopsis,
    badge:    entry.data.status,
  }),
};

// ---------------------------------------------------------------------------
// Status badge colour mapping
// ---------------------------------------------------------------------------

/**
 * Maps a status string to the name of a CSS custom property defined
 * in global.css. CollectionCard uses this to colour-code badges.
 *
 * Add new statuses here as your collections evolve.
 */
export const statusColorMap: Record<string, string> = {
  // General
  draft:        "var(--status-draft)",
  published:    "var(--status-published)",
  complete:     "var(--status-complete)",
  revised:      "var(--status-progress)",

  // Screenplay / book
  outline:      "var(--status-draft)",
  "first-draft": "var(--status-progress)",
  locked:       "var(--status-locked)",

  // Project
  development:  "var(--status-draft)",
  "in-progress": "var(--status-progress)",

  // Music
  idea:         "var(--status-idea)",
  demo:         "var(--status-draft)",
  recording:    "var(--status-progress)",
  mixing:       "var(--status-progress)",
  mastered:     "var(--status-complete)",
  arranged:     "var(--status-progress)",
  recorded:     "var(--status-complete)",
  released:     "var(--status-complete)",

  // Plot type (reused as badge)
  main:         "var(--status-locked)",
  sub:          "var(--status-progress)",
};