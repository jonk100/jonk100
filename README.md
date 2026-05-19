# Portfolio Site

A personal portfolio site built with Astro 6, showcasing creative work and development projects. The site features **wReady** — a custom-built creative workbench — alongside writings, blog posts, and screenplays.

This is not a traditional blog or CMS. It's a structured portfolio where all content lives as MDX files in version-controlled content collections, with a web interface designed for both presentation and personal workflow.

---

## About

I'm a writer and developer based in Youngstown, Ohio. My work lives at the intersection of narrative and craft — I write screenplays, play and record music, and build software tools to support both.

This site showcases:

- **wReady** — A personal creative workbench for managing screenplays, songs, poems, stories, and reviews
- **Her Majesty's Displeasure** — A six-part limited series screenplay (dark political satire, 1968)
- **Blog posts** — Technical writing about building wReady and other development topics
- **Creative writing** — Songs, poems, short stories, and reviews

---

## Stack

- **Astro 6** — Static-first framework with server endpoints for form APIs
- **MDX + Content Collections** — All content stored as structured MDX with Zod-validated frontmatter
- **Alpine.js** — Lightweight interactivity (filters, toggles, visualizations)
- **Vanilla CSS** — No utility framework; dark, editorial aesthetic
- **Vanilla TypeScript** — Utilities, plugins, and scripts
- **Netlify** — Deployment adapter
- **pnpm** — Package manager

---

## Project Structure

```
/
├── context/                    # AI prompting guides and reference docs
│   └── beat-breakdown-guide.md
├── public/
│   ├── fonts/                  # Atkinson Hyperlegible (regular + bold)
│   └── images/                 # TMDB actor/show images
├── scripts/                    # Data enrichment scripts (run via pnpm)
│   ├── enrich-tmdb.ts          # Fetch TV show data from TMDB
│   ├── enrich-actors.ts        # Fetch actor data from TMDB
│   └── chords/                 # Chord generation scripts
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
    │   ├── posts/              # Blog posts
    │   ├── post-series/        # Blog post series
    │   └── wready/             # wReady project content
    │       ├── beats/          # Scene beat breakdowns
    │       ├── scenes/         # Screenplay scenes
    │       ├── episodes/       # Episode entries
    │       ├── characters/     # Character profiles
    │       ├── locations/      # Location entries
    │       ├── songs/          # Song entries with chord data
    │       ├── chords/         # Individual chord voicings
    │       ├── albums/         # Album entries
    │       ├── poems/          # Poems
    │       ├── short-stories/  # Short stories
    │       ├── plots/          # Plot-level story structures
    │       ├── actors/         # Actor profiles (TMDB-enriched)
    │       ├── reviews/        # Film/TV/book reviews
    │       └── themes/         # Thematic elements
    ├── pages/                  # Astro file-based routing
    ├── plugins/
    │   └── remark-screenplay.ts  # Custom remark plugin for screenplay shorthand
    └── utils/
        └── music/
            ├── musicTheory.ts  # Music theory constants and types
            └── musicTheory.md  # Human-readable reference
```

---

## Content Collections

All content lives in `src/content/` as `.mdx` files. Schemas are defined in `src/content.config.ts` using Zod. Display metadata (card labels, icons, link patterns) is configured separately in `src/collections.config.ts`.

### Blog Collections

| Collection | Description |
|---|---|
| `posts` | Blog posts about development, creative process, and technical topics |
| `post-series` | Multi-part blog series with automatic post grouping |

### wReady Collections

The wReady project includes multiple content types for managing creative work:

#### Screenplay Collections

| Collection | Description |
|---|---|
| `scenes` | Individual screenplay scenes, written in MDX with shorthand prefix syntax |
| `beats` | Scene beat breakdowns — one MDX file per beat, nested by project and scene |
| `episodes` | Episode-level entries with metadata (title, number, logline, tension data) |
| `characters` | Character profiles with arc notes and casting references |
| `locations` | Location entries used across scenes |
| `plots` | High-level plot structures |

#### Music Collections

| Collection | Description |
|---|---|
| `songs` | Song entries with key, tempo, time signature, structure, and chord voicing references |
| `chords` | Individual chord voicings with fret/fingering data and diagram support |
| `albums` | Album entries linked to songs |

#### Writing Collections

| Collection | Description |
|---|---|
| `poems` | Poems |
| `short-stories` | Short stories |

#### Reference Collections

| Collection | Description |
|---|---|
| `actors` | Actor profiles enriched from TMDB, linked to characters |
| `reviews` | Film/TV/book reviews |
| `themes` | Thematic elements and story motifs |

---

## Screenplay Plugin

`src/plugins/remark-screenplay.ts` is a custom remark plugin that parses shorthand prefixes in MDX into typed screenplay components. This allows scenes to be written in a readable shorthand format without manually wrapping every line in JSX.

The plugin transforms lines at parse time — the rendered output uses the components in `src/components/screenplay/`.

---

## APIs

The site includes server-side API endpoints (Netlify functions via Astro's SSR adapter) for interactive content creation within the wReady workbench.

See `api.md` for full documentation. Key endpoints:

- `GET /api/chords/search` — Live chord search, used by the interactive chord selector
- `POST /api/chords/create` — Creates a new chord MDX file
- `POST /api/songs/create` — Creates a new song MDX file

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

## Featured Project: Her Majesty's Displeasure

The primary creative project showcased in the wReady workbench is *Her Majesty's Displeasure* — a six-part limited series screenplay. It is a dark political satire set in the late 1960s, following a fictional MI5 operation to surveil John Lennon.

All scenes, beats, characters, locations, and episodes for this project live under their respective collections in `src/content/wready/`. Beat breakdowns follow the rules defined in `context/beat-breakdown-guide.md`.

---

## Node Version

Requires Node >= 22.12.0 (see `package.json` `engines` field).

---

## License

This is a personal portfolio site. All creative content (screenplays, songs, stories, blog posts) is © jonk100. The code and technical implementation may be referenced for educational purposes.