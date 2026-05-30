# Antigravity Agent Guidelines

Welcome to the project! As an AI agent working on this codebase, please adhere to the following rules to maintain consistency, performance, and code quality.

## 1. Documentation & JSDoc Headers
Every `.astro` component must include a standardized JSDoc block immediately following the opening `---` of the frontmatter.

**Template:**
```astro
---
/**
 * src/components/path/to/file.astro
 * [A single sentence describing the component's purpose]
 * - [Bullet point detailing a feature]
 * - [Bullet point detailing another feature]
 * @props (local): prop1, prop2
 * @props (global): class, class:list, frame, effects
 * - [Explanation of complex prop 1]
 * - [Explanation of complex prop 2]
 */
```
*Note: Only explain complex props. Do not explain standard props like `class`, `href`, or `id`.*

## 2. Global CSS Variables (Design Tokens)
NEVER hardcode pixel values (e.g., `12px`, `#ff0000`, `1.5rem`) in scoped CSS or inline styles. You must use the established global design tokens defined in `src/styles/tokens/`.

**Spacing & Radii (`spacing.css`):**
- Use `--space-*` for padding, margins, and gaps.
- Use `--rad-*` for border radius.

**Colors (`colors.css`):**
- Use `--bg-*`, `--text-*`, `--border-*` for thematic colors.

## 3. Abstracting Shared Logic (DRY Methodology)
Avoid duplicating CSS styles or TypeScript interfaces across components. If a visual treatment or behavior applies to multiple components (like shapes, frame variants, or hover effects):

1. **Types**: Extract shared types into `src/types/variants.types.ts`.
2. **CSS**: Extract shared CSS classes (e.g., `.shape--*`, `.frame-variant--*`, `.effect--*`) into the appropriate file within `src/styles/variants/` (e.g., `shapes.css`, `frames.css`, `effects.css`).
3. **Usage**: Import the shared type, accept it as a prop, and conditionally append the global CSS class in the component's `class:list`.
