# Portfolio Site

A personal portfolio site built with Astro 6, showcasing creative work, development projects, and technical writing.

---

## Architecture

This portfolio uses **Writty as a git submodule** to demonstrate its features without duplicating code:

```
portfolio/ (this repo)
├── src/
│   ├── content/
│   │   ├── posts/              ← Blog posts
│   │   └── post-series/        ← Blog series
│   ├── components/
│   │   ├── showcase/           ← Demo components importing from Writty
│   │   └── SortableTable.astro ← Shared component for blog posts
│   ├── data/
│   │   └── demo.ts             ← Demo data for showcase
│   └── pages/
│       ├── index.astro         ← Portfolio homepage
│       ├── about.astro
│       ├── blog/               ← Blog pages
│       └── showcase-test.astro ← Test page for Writty components
└── writty/                     ← Git submodule (jonk100/Writty)
    └── (full Writty codebase)
```

### Two Repos, Two Deployments

- **Portfolio repo** (this one): Homepage, about page, blog
- **Writty repo** (submodule): Full creative workbench with songs, scenes, characters, etc.

Both deploy independently:
- Portfolio → `jonk100.dev` (or your domain)
- Writty → `writty.jonk100.dev`

---

## Stack

- **Astro 6** — Static-first framework with SSR adapter
- **MDX + Content Collections** — Blog content with Zod validation
- **Alpine.js** — Lightweight interactivity
- **Vanilla CSS** — Dark, editorial aesthetic
- **Netlify** — Deployment adapter
- **pnpm** — Package manager

---

## Project Structure

### Content Collections

This portfolio manages only blog-related content:

| Collection | Description |
|---|---|
| `posts` | Blog posts about development and creative process |
| `post-series` | Multi-part blog series with automatic post grouping |

All Writty content (songs, scenes, characters, etc.) lives in the `writty/` submodule.

### Showcase Components

Components in `src/components/showcase/` import from the Writty submodule to demonstrate features:

```astro
---
// Import from Writty submodule via @writty alias
import ChordAnalyser from '@writty/components/chords/ChordAnalyser.astro';
import { demoSong } from '../data/demo';
---

<ChordAnalyser song={demoSong} />
```

The `@writty` alias is configured in `astro.config.mjs`:

```js
vite: {
  resolve: {
    alias: {
      '@writty': path.resolve('./writty/src'),
    }
  }
}
```

---

## Commands

```sh
pnpm install        # Install dependencies
pnpm dev            # Start dev server at localhost:4321
pnpm build          # Build for production
pnpm preview        # Preview production build locally
```

---

## Working with the Writty Submodule

### Initial Setup

The submodule is already added. To clone this repo with the submodule:

```sh
git clone --recurse-submodules https://github.com/jonk100/portfolio
```

Or if you already cloned without submodules:

```sh
git submodule update --init --recursive
```

### Updating Writty Components

When you update a component in the Writty repo and want the portfolio to use it:

```sh
# In portfolio repo
cd writty
git pull origin main
cd ..
git add writty
git commit -m "update writty submodule"
git push
```

The portfolio webhook fires → rebuilds with latest Writty components.

### Development Workflow

1. **Develop in Writty repo** — Make changes to Writty components/content
2. **Push to Writty** — Writty deploys independently to `writty.jonk100.dev`
3. **Update submodule in portfolio** — Pull latest Writty, commit submodule update
4. **Push portfolio** — Portfolio rebuilds with updated showcase components

---

## Deployment

### VPS Setup (Two Sites, One Server)

Both sites deploy to the same VPS with separate Caddy server blocks:

```
jonk100.dev {
    root * /var/www/portfolio/dist
    file_server
}

writty.jonk100.dev {
    root * /var/www/writty/dist
    file_server
}
```

Each has its own webhook listener and deploy script. Pushing to either repo triggers only that site's rebuild.

---

## Environment Variables

```sh
# .env (if needed)
# Currently no environment variables required for portfolio
# Writty has its own .env for API features
```

---

## Node Version

Requires Node >= 22.12.0 (see `package.json` `engines` field).

---

## License

This is a personal portfolio site. All creative content (blog posts, writings) is © jonk100. The code and technical implementation may be referenced for educational purposes.