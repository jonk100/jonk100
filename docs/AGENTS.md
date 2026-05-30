# 🤖 AI Agent Guidelines & Coding Standards

This document is the official operational playbook for all AI Coding Agents (such as Antigravity, Claude, or Gemini) working in this portfolio repository. It ensures absolute architectural consistency, strict styling standards, and codebase cleanliness.

> [!IMPORTANT]
> All AI agents must read and strictly adhere to these instructions before introducing any code modifications, additions, or documentation.

---

## 🏗️ Technical Architecture Constraints

### 1. CSS Architecture: Global Design System vs. Scoped Encapsulation
* **Standard CSS Only:** This codebase is built with vanilla CSS variables and custom properties. ❌ **Never** write `@apply` or Tailwind utility classes.
* **The Split Rule:** When creating a component, you must correctly map its properties to our global CSS systems before falling back to scoped styles:
    * **1. Visual States (`variants.css`):** All colors, hover states, and active backgrounds for interactive elements use the global `.variant--*` classes.
    * **2. Fluid Spacing (`utilities.css`):** All padding, margin, and sizing across EVERY primitive (Buttons, Cards, Inputs, Frames) MUST use the global spacing utility scale (`.p-*`, `.m-*`, `.control-*`). Do not scope arbitrary padding scales inside individual components. Utilize the `.p-fluid` and `.m-fluid-y` container queries where responsive spacing is needed.
    * **3. Scoped Encapsulation:** Only highly specific structural logic (like CSS grid configurations, specialized flex behaviors, or unique visual clipping) remains encapsulated inside the component's scoped `<style>` block. Do not pollute the global namespace with component-specific logic.

### 2. The Interactive Variant Convention
We utilize a unified, zero-cost CSS variant architecture to styling interactive components like `Button.astro`, `Link.astro`, and custom cards.
* **Shared Visuals:** All variations in color, hover states, active states, and backgrounds reside in `src/styles/variants.css` under global class names `.variant--<name>`.
* **Component-Side Binding:** Components simply append these class names dynamically in the template frontmatter:
  ```astro
  const classes = ["control", `variant--${variant}`, `control--${size}`, cls].join(" ");
  ```
* **Structural Styling:** Only layout-related properties (display flex, align-items, margins, paddings, sizing scales, border-radius) should remain encapsulated in the component's scoped `<style>` block.

### 3. Strict TypeScript Sizing and Variants
* Interactive component types must import `Variants` and `Sizes` from `src/types/variants.types.ts`:
  ```typescript
  import type { Variants, Sizes } from '../types/variants.types';
  ```
* Props must be typed as singular options, **not arrays**:
  ```typescript
  export interface Props {
    variant?: Variants; // ✅ Good
    size?: Sizes;       // ✅ Good
    // variant?: Variants[]; ❌ Bad
  }
  ```

### 4. Dynamic HTML Tags
* When creating primitives that function as either active buttons or page links (e.g. `Button.astro`), utilize dynamic element tagging so that the element compiles as either `<a>` or `<button>` automatically based on the presence of the `href` prop.
  ```astro
  ---
  const Tag = as || (href ? "a" : "button");
  ---
  <Tag {...tagProps}><slot /></Tag>
  ```

### 5. Single-File Component Architecture for Primitives
When creating structural or visual primitives (e.g., `Text.astro`, `Paper.astro`, `Frame.astro`), consolidate **all** logic, typings, and styling into a single `.astro` file.
* ❌ **Do Not** create separate `.css`, `.types.ts`, or `.variants.ts` files for primitives.
* ✅ **Do** embed typescript interfaces and variant types directly in the component frontmatter, and use scoped `<style>` blocks for the CSS classes.

---

## 📌 Development Workflow Rules

1. **Maintain Comments and Docstrings:** Never strip existing code documentation or architecture comments when refactoring unless they are explicitly incorrect.
2. **Proactive Type Checking:** Verify compilation correctness before completing a task by executing typescript or Astro verification commands.
3. **No Visual Placeholders:** When adding cards or sections, use real-world descriptive texts, authentic SVG inline icons, or generate high-fidelity assets using system tools. Do not use generic grey blocks or "lorem ipsum" text.
4. **Accessibility (A11y) Focus:** Ensure all interactive elements have semantic meaning, keyboard support, high contrast ratios, and clear `:focus-visible` outline rings.

---

## 📝 Documentation Writing Style Guidelines

When creating or modifying component documentation files (such as MDX entries in `src/content/design/`), adhere to the following writing style and layout rules:

* **Context & Rationale**: Discuss the concrete use case and the specific reason we extended or built on the underlying standard HTML element (e.g., standardizing styling, handling lazy loading fallbacks, or managing dynamic element tags). Explicitly say so even if it is just to standardize aesthetic styling.
* **Tone**: Keep the writing casual, matter-of-fact, informative, and educational, yet highly concise.
* **Engineering Insights**: Explain any specific architectural design decisions we made that might be interesting to someone designing a system (e.g., dynamic tag resolution, lobotomized owl vertical spacing selectors, or field-sizing content scales).
* **Accessible Readability Gradient**: Ensure the introduction is extremely accessible and easy to read, but allow the vocabulary and concepts to drift into more advanced system-level engineering terminology in the second half of the page where advanced usage and custom parameters are covered.
* **Consolidated Core Previews**: When an element (such as `Button`) has multiple standard visual themes or size variants, combine them into a single visual preview showcase (e.g., rendering `[primary, small]`, `[default]`, and `[secondary, large]` together in one inline grid). This frees up the secondary "Advanced" preview slot to demonstrate something much cooler, more unique, or highly interactive (e.g., combined dynamic animations or complex structural matting).
* **Compound Component Grouping**: Do not create separate pages for tightly coupled compound elements:
  * Document `ButtonGroup` and similar wrapper groups (like `InputGroup`, `RadioGroup`) directly on the parent element's page.
  * Document `Card` and all of its direct structural children (`CardHeader`, `CardContent`, etc.) on a single, unified `Card` page.
  * Document `Modal` and its sub-primitives on the same page, and apply the same layout unity to overlays, grids, and dialogs.

---

## 📂 Codebase File Layout Reference
* `src/components/` — UI components and functional primitives.
* `src/styles/tokens/` — Core theme variables (colors, typography, spacing, layouts, animations).
* `src/styles/variants.css` — Global shared visual states.
* `src/styles/global.css` — Global CSS entry point importing tokens and variants.
* `docs/planned-components.md` — Roadmap of intended components.
* `docs/spec.md` — System Design Specifications.
* `docs/AGENTS.md` — This instruction set.
