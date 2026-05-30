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

## 2. Design Tokens vs. Design Variants

To maintain a clean and scalable design system, we strictly separate atomic style variables (Tokens) from reusable class selectors (Variants).

### A. Design Tokens (`src/styles/tokens/`)
* **Purpose**: Raw, atomic values (design system variables) declared as CSS Custom Properties under a `:root` selector.
* **Content Rule**: **No CSS class selectors, HTML elements, or layout rules are allowed.** Only CSS Custom Properties (e.g., `--space-4`, `--color-primary`, `--rad-md`).
* **Core Token Areas**:
  - **Spacing & Radii (`spacing.css`)**: Use `--space-*` for padding, margins, and gaps. Use `--rad-*` for border radius.
  - **Colors (`colors.css`)**: Use `--bg-*`, `--text-*`, `--border-*` for thematic colors.
  - **Typography Scale (`typography.css`)**: Use `--text-*` or `--fs-*` for font-size, `--leading-*` for line-height.
  - **Sizes (`sizes.css`)**: Use `--size-*` for component width/height constraints.

* **Exceptions to the Hardcoding Rule:**
  We allow explicit, literal values ONLY in these specific graphical exceptions:
  1. **Crisp Border/Line Thickness**: Using `1px` or `2px` for fine structural borders or dividers (e.g., `border: 1px solid var(--border)`).
  2. **Ambient Asset Placement**: Extreme offsets (e.g., `top: -200px`, `left: -150px`) for decorative radial gradient blurs or backdrop elements.
  3. **SVG Dimensions**: Native graphic dimensions on inline SVGs (e.g., `width="24" height="24"` or `viewBox="0 0 24 24"`).
  4. **Shadow Offsets**: Offsets and blur radii inside shadows (e.g., `box-shadow: 0 4px 12px var(--shadow)`).

* **Prohibition of Utility-Style Class Names in Scoped CSS:**
  NEVER name a scoped CSS class after another framework's utility conventions (e.g., `.mt-4`, `.pl-2`, `.p-md`, `.w-full`, `.flex`) unless it is a genuinely semantic class name (e.g., `.text-center`). Instead:
  - Use structural primitives like `<Stack gap="md">` or `<Inline gap="lg">` directly in your markup to manage spacing.
  - If a custom margin/padding is strictly required in a stylesheet, use a semantic class (e.g., `.swatch-grid`, `.alerts-section`) and bind it to token variables (e.g., `margin-top: var(--space-lg)`).

### B. Design Variants (`src/styles/variants/`)
* **Purpose**: Reusable, class-based visual styles, semantic modifiers, and component states that compose raw Design Tokens into clean, reusable CSS classes.
* **Content Rule**: **Must use CSS class selectors (e.g. `.variant--*`, `.shape--*`, `.effect--*`, `.control--*`).** Raw pixel values or unmapped colors are forbidden; everything must be bound to CSS custom properties from `src/styles/tokens/`.
* **Core Variant Categories**:
  - **Themes (`themes.css`)**: Shared interactive states and component tones (e.g., `.variant--primary`, `.variant--ghost`).
  - **Controls (`controls.css`)**: Base structures for interactive elements (e.g., `.control`).
  - **Typography (`typography.css`)**: Semantic text color tones, sizes, and headers (e.g., `.text--accent`, `.control--lg`).
  - **Frames & Shapes (`frames.css`, `shapes.css`)**: Visual shapes, crop forms, and borders (e.g., `.shape--circle`, `.frame-variant--minimal`).
  - **Effects & Motion (`effects.css`, `animations.css`)**: Hover filters, micro-animations, transits (e.g., `.effect--shimmer`, `@keyframes float`).


## 3. Abstracting Shared Logic (DRY Methodology)
Avoid duplicating CSS styles or TypeScript interfaces across components. If a visual treatment or behavior applies to multiple components (like shapes, frame variants, or hover effects):

1. **Types**: Extract shared types into `src/types/variants.types.ts`.
2. **CSS**: Extract shared CSS classes into the appropriate file within `src/styles/variants/` (e.g., `shapes.css`, `frames.css`, `effects.css`).
3. **Usage**: Import the shared type, accept it as a prop, and conditionally append the global CSS class in the component's `class:list`.

## 4. Custom Agent Slash Commands

### `/blogthat` — Automating Technical Blog Creation
When the user types `/blogthat` in a prompt, the agent must immediately execute the **Technical Blog Generation Workflow** to write a long-form, educational, first-person developer narrative post about the most recent implementation tasks or engineering breakthroughs.

**Execution Directive**:
1. **Source Context**: Scan recent Git commits, implementation plans, implementation tasks (`task.md`), walkthroughs, and conversation logs.
2. **Select Topic**: Brainstorm a compelling, highly technical, and educational topic (focusing on both design/architectural choices and debugging/engineering struggles).
3. **Formulate Title**: Draft a catchy, professional title and outline, then **stop and verify them with the user** for explicit confirmation before writing.
4. **Draft the Post**: Once approved, write a long-form `.mdx` file under `src/content/blog/` following the detailed writing style guide defined in `docs/workflows/blog-generation-workflow.md`.

