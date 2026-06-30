# Jon Krause — Portfolio & Creative Lab

Welcome to the source code for my personal portfolio, blog, glossary, and design system playground. I enjoy building tools and systems that help me write, teach, and create more efficiently.

## 🚀 Tech Stack

- **Framework**: [Astro](https://astro.build/)
- **Language**: TypeScript
- **Styling**: Vanilla CSS (Custom Design System with tokens and variants)
- **Content**: Markdown / MDX via Astro Content Collections
- **Testing**: Playwright & Vitest

## ✨ Features

- **Custom Design System**: A meticulously crafted, utility-free design system separated into tokens (primitives) and variants (semantic classes).
- **Smooth Page Transitions**: Leverages Astro's View Transitions API for app-like navigation and shared element transitions across pages.
- **Accessible Components**: Custom built UI primitives (like CheckboxGroups, Multiselects, and Dialogs) ensuring keyboard and screen-reader accessibility.
- **Optimized SEO**: Fully configured for discoverability with Open Graph tags, Schema.org JSON-LD, automated sitemaps, and strict canonical URLs.
- **Dynamic Content Architecture**: Separate content collections for Projects, Blog Posts, Design Documentation, and Glossary Terms.

## 🛠️ Local Development

All commands are run from the root of the project:

| Command | Action |
| :--- | :--- |
| `pnpm install` | Installs dependencies |
| `pnpm dev` | Starts local dev server at `localhost:4321` |
| `pnpm build` | Builds the production site to `./dist/` |
| `pnpm preview` | Previews your build locally |
| `pnpm test` | Runs Playwright tests |

## 📁 Project Structure

- `src/components/`: Reusable Astro components (UI primitives, portfolio sections).
- `src/content/`: MDX and Markdown files for blogs, projects, and design documentation.
- `src/layouts/`: Base page layouts containing global SEO metadata.
- `src/styles/`: The core design system architecture (tokens, variants, global styles).
- `src/pages/`: Astro routing pages.
- `public/`: Static assets like images and `robots.txt`.
