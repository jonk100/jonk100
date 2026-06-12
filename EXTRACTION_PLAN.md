# Writty Extraction Plan

## Current State
This repo (`wReady`) is a portfolio site that absorbed the entire Writty project. We need to extract Writty back into its own repo and add it as a submodule.

## Goal Architecture

```
portfolio repo (wReady)
├── src/
│   ├── pages/
│   │   ├── index.astro              ← Portfolio homepage
│   │   ├── about.astro
│   │   └── hmd-bible.astro          ← HMD project showcase
│   ├── components/
│   │   └── showcase/                ← Demo components (lifted from Writty)
│   │       ├── ChordAnalyserDemo.astro
│   │       ├── SongDemo.astro
│   │       └── ReviewDemo.astro
│   └── data/
│       └── demo.ts                  ← Fake but realistic demo data
└── writty/                          ← Git submodule pointing to Writty repo
    └── (full Writty codebase)

writty repo (new)
├── src/
│   ├── pages/
│   │   └── (all /writty/* pages)
│   ├── content/wready/              ← All actual content
│   ├── components/
│   │   ├── chords/
│   │   ├── songs/
│   │   ├── screenplay/
│   │   └── collection-cards/
│   └── utils/
└── (all Writty-specific code)
```

## What Belongs to Writty (Extract)

### Content Collections
- `src/content/wready/*` - ALL of it
  - actors/
  - albums/
  - beats/
  - characters/
  - episodes/
  - locations/
  - plots/
  - poems/
  - projects/
  - reviews/
  - scenes/
  - short-stories/
  - songs/
  - themes/

### Pages
- `src/pages/writty/*` - All Writty hub pages
- `src/pages/projects/*` - Project detail pages
- `src/pages/episodes/*`
- `src/pages/scenes/*`
- `src/pages/characters/*`
- `src/pages/locations/*`
- `src/pages/plots/*`
- `src/pages/beats/*`
- `src/pages/songs/*`
- `src/pages/albums/*`
- `src/pages/poems/*`
- `src/pages/chords/*`
- `src/pages/reviews/*`
- `src/pages/short-stories/*`
- `src/pages/api/*` - Chord/song creation APIs
- `src/pages/tension-demo.astro`
- `src/pages/test-screenplay.astro`

### Components
- `src/components/chords/*` - Chord analyser, forms
- `src/components/songs/*` - Song detail components
- `src/components/screenplay/*` - Screenplay rendering
- `src/components/collection-cards/*` - All card components
- `src/components/filters/*` - Scene/chord filters
- `src/components/EpisodeTensionGraph.astro`
- `src/components/TensionGraph.astro`
- `src/components/SortableTable.astro`
- `src/components/CardGrid.astro`
- `src/components/CollectionCard.astro`

### Utils & Controllers
- `src/utils/music/*` - Music theory utilities
- `src/utils/api/*` - API utilities
- `src/utils/form/*` - Form utilities
- `src/controllers/*` - Form controllers
- `src/plugins/remark-screenplay.ts` - Custom MDX plugin

### Config
- `src/collections.config.ts` - Collection display config
- `src/content.config.ts` - Zod schemas (Writty collections only)

### Scripts
- `scripts/enrich-tmdb.ts`
- `scripts/enrich-actors.ts`
- `scripts/chords/*`
- `scripts/utils/*`

### Context
- `context/*` - AI prompting guides

## What Stays in Portfolio (Keep)

### Content
- `src/content/posts/*` - Blog posts about building things
- `src/content/post-series/*` - Blog series

### Pages
- `src/pages/index.astro` - Portfolio homepage
- `src/pages/about.astro`
- `src/pages/blog/*` - Blog index and pages
- `src/pages/posts/*` - Post detail pages
- `src/pages/post-series/*` - Post series pages
- `src/pages/rss.xml.js`
- NEW: `src/pages/hmd-bible.astro` - HMD project showcase page

### Components
- `src/components/BaseHead.astro`
- `src/components/Header.astro`
- `src/components/Footer.astro`
- `src/components/Navigation.astro`
- `src/components/HeaderLink.astro`
- `src/components/Breadcrumb.astro`
- `src/components/FormattedDate.astro`
- `src/components/blog/*` - Blog-specific components
- `src/components/collection-cards/PostCard.astro` - For blog posts
- `src/components/collection-cards/PostSeriesCard.astro` - For post series
- NEW: `src/components/showcase/*` - Demo components

### Layouts
- `src/layouts/*` - All layouts (shared)

### Styles
- `src/styles/*` - Global styles (shared)

### Config
- `src/consts.ts` - Site constants
- `astro.config.mjs` - Will need modification
- `package.json` - Portfolio dependencies only

## Extraction Steps

### Phase 1: Prepare Writty Repo (jonk100/Writty already exists)
1. Clone Writty repo locally: `git clone https://github.com/jonk100/Writty`
2. Copy all Writty content/components/pages from portfolio to Writty
3. Set up Astro config for standalone operation
4. Test Writty runs independently
5. Commit and push to GitHub

### Phase 2: Add Writty as Submodule to Portfolio
1. In portfolio repo: `git submodule add https://github.com/jonk100/Writty writty`
2. Configure Astro to resolve imports from `writty/src`
3. Update `astro.config.mjs` with alias: `@writty -> ./writty/src`

### Phase 3: Create Showcase Components
1. Create `src/components/showcase/` directory
2. Lift key components from Writty submodule:
   - ChordAnalyserDemo.astro (interactive fretboard)
   - SongDemo.astro (sample song with chords)
   - ReviewDemo.astro (film review card)
3. Create `src/data/demo.ts` with fake but realistic data
4. Build HMD Bible page showcasing the screenplay project

### Phase 4: Clean Up Portfolio
1. Delete all Writty-specific content from `src/content/wready/`
2. Delete all Writty pages from `src/pages/`
3. Delete Writty components from `src/components/`
4. Update `src/content.config.ts` - keep only blog schemas
5. Update `src/collections.config.ts` - keep only blog nav
6. Update `package.json` - remove Writty-specific dependencies
7. Update README.md - describe new architecture

### Phase 5: Test & Deploy
1. Test portfolio builds without errors
2. Test Writty builds independently
3. Test showcase components work with demo data
4. Update portfolio to pull latest from Writty submodule
5. Document submodule update workflow

## Submodule Update Workflow

When you update a component in Writty and want portfolio to use it:

```bash
# In Writty repo
git add .
git commit -m "update chord analyser"
git push

# In portfolio repo
cd writty
git pull origin main
cd ..
git add writty
git commit -m "update writty submodule"
git push
```

Portfolio webhook fires → rebuilds with latest Writty components.

## Import Pattern in Portfolio

```astro
---
// Import from Writty submodule
import ChordAnalyser from '@writty/components/chords/ChordAnalyser.astro';
import { demoSong } from '../data/demo';
---

<ChordAnalyser song={demoSong} />
```

## Next Steps

1. Confirm this plan makes sense
2. Start with Phase 1: Create Writty repo structure
3. Move through phases sequentially
4. Test at each phase before proceeding