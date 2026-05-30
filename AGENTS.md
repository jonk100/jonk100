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

**Exceptions to the Hardcoding Rule:**
We allow explicit, literal values ONLY in these specific graphical exceptions:
1. **Crisp Border/Line Thickness**: Using `1px` or `2px` for fine structural borders or dividers (e.g., `border: 1px solid var(--border)`).
2. **Ambient Asset Placement**: Extreme offsets (e.g., `top: -200px`, `left: -150px`) for decorative radial gradient blurs or backdrop elements.
3. **SVG Dimensions**: Native graphic dimensions on inline SVGs (e.g., `width="24" height="24"` or `viewBox="0 0 24 24"`).
4. **Shadow Offsets**: Offsets and blur radii inside shadows (e.g., `box-shadow: 0 4px 12px var(--shadow)`).

**Prohibition of Utility-Style Class Names in Scoped CSS:**
NEVER name a scoped CSS class after another framework's utility conventions (e.g., `.mt-4`, `.pl-2`, `.p-md`, `.w-full`, `.flex`) unless it is a genuinely semantic class name (e.g., `.text-center`). Instead:
- Use structural primitives like `<Stack gap="md">` or `<Inline gap="lg">` directly in your markup to manage spacing.
- If a custom margin/padding is strictly required in a stylesheet, use a semantic class (e.g., `.swatch-grid`, `.alerts-section`) and bind it to token variables (e.g., `margin-top: var(--space-lg)`).


## 3. Abstracting Shared Logic (DRY Methodology)
Avoid duplicating CSS styles or TypeScript interfaces across components. If a visual treatment or behavior applies to multiple components (like shapes, frame variants, or hover effects):

1. **Types**: Extract shared types into `src/types/variants.types.ts`.
2. **CSS**: Extract shared CSS classes (e.g., `.shape--*`, `.frame-variant--*`, `.effect--*`) into the appropriate file within `src/styles/variants/` (e.g., `shapes.css`, `frames.css`, `effects.css`).
3. **Usage**: Import the shared type, accept it as a prop, and conditionally append the global CSS class in the component's `class:list`.
