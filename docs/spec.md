# Design System & Technical Specification

Welcome to the Technical Specification and Design System documentation for the Portfolio website. This document serves as the absolute blueprint for styles, layouts, visual semantics, and UI development conventions.

---

## 🛠️ Tech Stack & Foundations
1. **Core Framework:** Astro v6.x (Standard Static Site Generation, zero-JS client bundle by default).
2. **Styling:** Vanilla CSS (CSS Variables / Custom Properties). 
   - No Tailwind CSS (unless explicitly configured).
   - Component styles are strictly scoped via Astro's native `<style>` scoped compiler except for global variant utilities.
3. **Type Safety:** TypeScript (TS 5.x+) for strict component props and helper logic.
4. **Package Manager:** `pnpm`.

---

## 🎨 Design System & Tokens

Our design tokens are declared at the root level and located inside `src/styles/tokens/`. They define the visual DNA of the application.

### 1. Color Tokens (`colors.css`)
We support both a sleek default **Dark Mode** and an elegant, high-contrast **Light Mode** toggled via the `html.light` class.

| CSS Variable | Dark Mode Value (Default) | Light Mode Value (`html.light`) | Semantic Purpose |
| :--- | :--- | :--- | :--- |
| `--primary` | `rgb(15, 255, 195)` (Mint) | `rgb(15, 255, 195)` | Primary interactive highlights |
| `--secondary` | `rgb(255, 243, 116)` (Gold) | `rgb(255, 243, 116)` | Secondary interactive highlights |
| `--accent` | `rgb(155, 15, 245)` (Purple) | `rgb(155, 15, 245)` | Accent highlights, focus rings, selections |
| `--bg` | `var(--neutral-darkest)` | `rgb(var(--neutral-light-05))` | Page background |
| `--bg-surface` | `var(--neutral-darker)` | `rgb(var(--neutral-light-04))` | Card, panel, and element backgrounds |
| `--bg-elevated`| `var(--neutral-dark)` | `rgb(var(--neutral-light-03))` | Hover states and popup containers |
| `--text` | `var(--neutral-light)` | `rgb(var(--neutral-inv))` | Primary readable body text |
| `--text-muted` | `rgb(80, 101, 100)` | `rgba(var(--neutral-dark-01), 0.55)` | Helper and caption text |
| `--border` | `rgba(220, 204, 238, 0.175)` | `rgba(var(--neutral-dark-01), 0.15)` | Subtle borders and dividers |
| `--border-strong` | `rgba(196, 148, 251, 0.375)` | `rgba(var(--neutral-dark-01), 0.30)`| Highlight borders and focus states |

---

### 2. Spacing & Grid Scale (`spacing.css`)
Our spacing values are rem-based, aligning with an 8px grid system for layout consistency.

* **Layout Constraints:**
  - Max Page Width: `--max-width: 1100px;`
  - Horizontal Padding: `--gutter: var(--space-8);` (32px)
* **Spacing Scale:**
  - `--space-1` (4px), `--space-2` (8px), `--space-3` (12px), `--space-4` (16px), `--space-5` (20px), `--space-6` (24px), `--space-8` (32px), `--space-10` (40px), `--space-12` (48px), `--space-16` (64px), `--space-20` (80px), `--space-24` (96px), `--space-32` (128px)
* **Borders & Radii:**
  - `--rad-xs` (2px), `--rad-sm` (4px), `--rad-md` (8px), `--rad-lg` (16px), `--rad-xl` (24px), `--rad-full` (9999px)

---

### 3. Fluid Typography (`typography.css`)
Font sizing is fully fluid and responsive, utilizing CSS `clamp()` to scale perfectly from mobile viewports to desktop wide-screens without media queries.

* **Families:**
  - Serif Display (Headings): `--display: 'Cormorant Garamond', Georgia, serif;`
  - Serif Body (Paragraphs): `--body: 'Lora', Georgia, serif;`
  - Monospace (Code/Metrics): `--mono: 'IBM Plex Mono', 'Fira Code', monospace;`
* **Scale:**
  - `--text-xs` (10.4px → 12px)
  - `--text-sm` (12.5px → 14px)
  - `--text-base` (15.2px → 17px)
  - `--text-lg` (16.8px → 20px)
  - `--text-xl` (19px → 24px)
  - `--text-2xl` (23px → 32px)
  - `--text-3xl` (29px → 44px)
  - `--text-4xl` (38px → 64px)
  - `--text-5xl` (48px → 96px)
  - `--text-6xl` (64px → 128px)
* **Fluid Line Heights:**
  - `--leading-tight` (1.05 → 1.15) — Headings
  - `--leading-snug` (1.20 → 1.35) — Subheadings/cards
  - `--leading-normal` (1.45 → 1.65) — Body text
  - `--leading-relaxed` (1.60 → 1.90) — Long-form articles

---

### 4. Motion & Durations (`motion.css`)
Visual feedback should feel smooth and premium. 

* **Easing Presets:**
  - Standard ease-out: `--ease-out: cubic-bezier(0.16, 1, 0.3, 1);`
  - Interactive bounce/spring: `--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);`
  - Elastic / squish behaviors and transition timings are pre-coded.
* **Duration scale:**
  - `--xxfast` (50ms) to `--xxxslow` (500ms). Default transition duration is `--base` (160ms).

---

## 🧱 CSS Architecture & Component Guidelines

To maintain visual unity and avoid CSS bloat, our style system relies on two main pillars:

### 1. Shared Global Variants (`variants.css`)
Visual states (background colors, hover states, border highlights) that apply identically across interactive components are stored in `src/styles/variants.css`.
* Available Variants: `primary`, `ghost`, `secondary`, `outline`, `default`.
* These are loaded **globally** inside `global.css`.
* Interactive components dynamically map these via class names: `class={["btn", \`variant--\${variant}\`].join(" ")}`.
* **Rules:**
  - ❌ Never write `@apply` (standard CSS compilation will fail).
  - ❌ Never manually duplicate color states, background variables, hover fills, or active borders inside a component's scoped `<style>` block.

### 2. Global Structural Utilities (`utilities.css`)
To ensure mathematical precision across the entire interface, **all components** share a unified spacing and layout scale (`.p-[size]`, `.m-[size]`, `.control-[size]`).
* We do NOT scope arbitrary padding or margin scales inside individual components like `Paper.astro` or `Button.astro`.
* We utilize a global `SpacingScale` (ranging from `3xs` to `3xl`) and fluid container queries (`.p-fluid`, `.m-fluid-y`) that dynamically scale based on the parent's width or height (`@container`).
* Components dynamically map their `padding` or `size` props directly to these global utility classes to guarantee perfect alignment with the rest of the design system.

### 3. Component Scoped Encapsulation
While colors (`variants.css`) and spacing (`utilities.css`) are strictly global, **highly specific structural logic** (like CSS grid track definitions, specialized flex behaviors, or unique visual clipping) remains encapsulated inside the component's `<style>` block. Do not pollute the global namespace with component-specific structures.

---

## 📌 Development Conventions
- **Component Props:** Always export a typed `Props` interface using TypeScript types exported from `src/types/variants.types.ts`.
- **Class Merging:** Always allow external parent styling by accepting `class` and `class:list` props and merging them natively using Astro's dynamic attributes.
- **Accessibility (A11y):** Use standard semantic elements (`<a>` for links, `<button>` for actions). Ensure high contrast rules are satisfied under both dark and light modes. Keyboard focus states must inherit `focus-visible` outline rings automatically.
