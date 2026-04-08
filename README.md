# Writty

A personal creative workbench built with Astro 6. Writty is a single-user tool for storing, writing, and managing creative work across a range of formats — screenplays, songs, poems, short stories, blog posts, and more.

It is not a CMS. It is not a public-facing blog. It is a structured writing environment where all content lives as MDX files in version-controlled content collections, with a web interface for reading, browsing, and (selectively) creating.

---

## Stack

- **Astro 6** — static-first framework with server endpoints for form APIs
- **MDX + Content Collections** — all creative content stored as structured MDX with Zod-validated frontmatter
- **Alpine.js** — lightweight interactivity (filters, toggles, visualizations)
- **Vanilla CSS** — no utility framework; dark, editorial aesthetic
- **Vanilla TypeScript** — utilities, plugins, and scripts
- **Netlify** — deployment adapter
- **pnpm** — package manager

---

## Project Structure

```
writty/
├── context/                    # AI prompting guides and reference docs
│   ├── beat-breakdown-guide.md
│   ├── plot-breakdown-gpt.md
│   └── plots.md
├── public/
│   └── fonts/                  # Atkinson Hyperlegible (regular + bold)
├── scripts/                    # One-off data enrichment scripts (run via pnpm)
│   ├── enrich-tmdb.ts          # Fetch TV show data from TMDB
│   ├── enrich-actors.ts        # Fetch actor data from TMDB
│   └── chords/
│       ├── generate_barre_chords.zsh
│       └── generate_open_chords.zsh
└── src/
    ├── collections.config.ts   # Card display config — source of truth for collection metadata
    ├── content.config.ts       # Zod schemas for all content collections
    ├── consts.ts               # Site-wide constants
    ├── components/             # Astro components
    │   ├── collection-cards/   # One card component per collection type
    │   ├── screenplay/         # Screenplay rendering components + CSS
    │   ├── songs/              # Song detail + chord components
    │   ├── chords/             # Chord analyser + creation form
    │   └── filters/            # Alpine.js-powered filter components
    ├── content/                # All MDX content, organised by collection
    │   ├── beats/              # Scene beat breakdowns (per project, per scene)
    │   ├── scenes/             # Screenplay scenes
    │   ├── episodes/           # Episode entries
    │   ├── characters/         # Character profiles
    │   ├── locations/          # Location entries
    │   ├── songs/              # Song entries with chord and structure data
    │   ├── chords/             # Individual chord voicings
    │   ├── albums/             # Album entries
    │   ├── poems/              # Poems
    │   ├── short-stories/      # Short stories
    │   ├── blog/               # Blog posts
    │   ├── plots/              # Plot-level story structures
    │   ├── actors/             # Actor profiles (TMDB-enriched)
    │   └── reviews/            # Reviews
    ├── pages/                  # Astro file-based routing
    ├── plugins/
    │   └── remark-screenplay.ts  # Custom remark plugin — parses shorthand prefixes into screenplay components
    └── utils/
        └── music/
            ├── musicTheory.ts  # Music theory constants and types
            └── musicTheory.md  # Human-readable reference for musicTheory.ts
```

---

## Content Collections

All content lives in `src/content/` as `.mdx` files. Schemas are defined in `src/content.config.ts` using Zod. Display metadata (card labels, icons, link patterns) is configured separately in `src/collections.config.ts`.

### Screenplay Collections

| Collection | Description |
|---|---|
| `scenes` | Individual screenplay scenes, written in MDX with shorthand prefix syntax |
| `beats` | Scene beat breakdowns — one MDX file per beat, nested by project and scene |
| `episodes` | Episode-level entries with metadata (title, number, logline, tension data) |
| `characters` | Character profiles with arc notes and casting references |
| `locations` | Location entries used across scenes |
| `plots` | High-level plot structures |

### Music Collections

| Collection | Description |
|---|---|
| `songs` | Song entries with key, tempo, time signature, structure, and chord voicing references |
| `chords` | Individual chord voicings with fret/fingering data and diagram support |
| `albums` | Album entries linked to songs |

### Writing Collections

| Collection | Description |
|---|---|
| `poems` | Poems |
| `short-stories` | Short stories |
| `blog` | Blog posts, optionally grouped into series |

### Reference Collections

| Collection | Description |
|---|---|
| `actors` | Actor profiles enriched from TMDB, linked to characters |
| `reviews` | Film/TV/book reviews |

---

## Screenplay Plugin

`src/plugins/remark-screenplay.ts` is a custom remark plugin that parses shorthand prefixes in MDX into typed screenplay components. This allows scenes to be written in a readable shorthand format without manually wrapping every line in JSX.

The plugin transforms lines at parse time — the rendered output uses the components in `src/components/screenplay/`.

---

## APIs

The site includes a small number of server-side API endpoints (Netlify functions via Astro's SSR adapter) for interactive content creation.

See `api.md` for full documentation. Key endpoints:

- `GET /api/chords/search` — live chord search, used by the interactive chord selector
- `POST /api/chords/create` — creates a new chord MDX file
- `POST /api/songs/create` — creates a new song MDX file

File writing is disabled by default. Set `ALLOW_CHORD_WRITE=true` in `.env` to enable it.

---

## Data Enrichment Scripts

Run from the project root with pnpm:

```sh
# Fetch TV/film data from TMDB
pnpm run enrich:tmdb

# Fetch actor data from TMDB
pnpm run enrich:actors

# Run both in sequence
pnpm run tmdb
```

Chord generation scripts are in `scripts/chords/` and run via zsh.

---

## Commands

```sh
pnpm install        # Install dependencies
pnpm dev            # Start dev server at localhost:4321
pnpm build          # Build for production
pnpm preview        # Preview production build locally
```

---

## Environment Variables

```sh
# .env
ALLOW_CHORD_WRITE=true    # Enable chord/song form file writing (default: false)
```

---

## Current Project: Her Majesty's Displeasure

The primary creative project in this workbench is *Her Majesty's Displeasure* — a six-part limited series screenplay. It is a dark political satire set in the late 1960s, following a fictional MI5 operation to surveil John Lennon.

All scenes, beats, characters, locations, and episodes for this project live under their respective collections. Beat breakdowns follow the rules defined in `context/beat-breakdown-guide.md`.

---

## Node Version

Requires Node >= 22.12.0 (see `package.json` `engines` field).