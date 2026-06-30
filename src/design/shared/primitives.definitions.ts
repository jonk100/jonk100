// design/shared/primitives.definitions.ts
//
// SINGLE SOURCE OF TRUTH for all design token values.
// The Vite plugin (plugins/tokens.ts) reads TOKEN_BLOCKS and generates
// src/styles/tokens.generated.css — never edit that file by hand.
//
// STRUCTURE
// ─────────────────────────────────────────────────────────────────
// TOKEN_BLOCKS drives the plugin. Each block becomes one CSS rule:
//
//   PRIMITIVE_SCALE + PRIMITIVE_COLOR + PRIMITIVE_MISC
//     → :root {}
//
//   SEMANTIC_SCALE + SEMANTIC_MISC
//     → :root {}  (same block, after primitives so they can forward-reference)
//
//   LIGHT_TOKENS
//     → :root, [data-theme="light"] {}
//
//   DARK_TOKENS
//     → [data-theme="dark"] {}
//
// CSS custom properties can reference each other within the same :root block
// regardless of declaration order — computed at used-value time, not parse time.

// ─── LAYER 0: RAW SIZE SCALE ─────────────────────────────────
// Two tiers: fixed component-level (--size-00 → --size-09)
// and fluid layout-level (--size-0 → --size-17).

import { 
  PRIMITIVE_COLOR_TOKENS, 
  PRIMITIVE_SIZE_TOKENS, 
  PRIMITIVE_MISC_TOKENS, 
  MOTION_TOKEN_DEFINITIONS, 
  FONT_TOKEN_DEFINITIONS, 
  SEMANTIC_SIZE_TOKENS, 
  LIGHT_THEME_TOKENS, 
  DARK_THEME_TOKENS,
  PRINT_THEME_TOKENS, 
  HIGH_CONTRAST_THEME_TOKENS 
} from "./definitions";

const PRIMITIVE_SIZE: Record<string, string> = PRIMITIVE_SIZE_TOKENS;
const PRIMITIVE_COLOR: Record<string, string> = PRIMITIVE_COLOR_TOKENS;
const PRIMITIVE_MISC: Record<string, string> = PRIMITIVE_MISC_TOKENS;
const SEMANTIC_SIZE: Record<string, string> = SEMANTIC_SIZE_TOKENS;
const SEMANTIC_MISC: Record<string, string> = {
  ...FONT_TOKEN_DEFINITIONS,
  ...SEMANTIC_SIZE,
  ...MOTION_TOKEN_DEFINITIONS,
  // Blur
  "blur--xs":  "var(--blur-2)", "blur--sm":  "var(--blur-3)", "blur--md": "var(--blur-4)",
  "blur--lg":  "var(--blur-6)", "blur--xl":  "var(--blur-7)", "blur--2xl": "var(--blur-8)",
  // Border width
  "border--thin": "var(--border-1)", "border--medium": "var(--border-2)",
  "border--thick": "var(--border-4)",
  // Z-index layers
  "z--below":    "var(--z-n1)",  "z--base":     "var(--z-0)",
  "z--raised":   "var(--z-10)",  "z--dropdown": "var(--z-100)",
  "z--sticky":   "var(--z-200)", "z--overlay":  "var(--z-300)",
  "z--tooltip":  "var(--z-400)", "z--modal":    "var(--z-400)",
  "z--toast":    "var(--z-500)", "z--top":      "var(--z-999)",
};

// ─── LAYER 2: THEMES ─────────────────────────────────────
const LIGHT_TOKENS: Record<string, string> =         LIGHT_THEME_TOKENS;
const DARK_TOKENS: Record<string, string> =          DARK_THEME_TOKENS;
const HIGH_CONTRAST_TOKENS: Record<string, string> = HIGH_CONTRAST_THEME_TOKENS;
const PRINT_TOKENS: Record<string, string> =         PRINT_THEME_TOKENS;

// ─── NEUTRAL ROLE ──────────────────────────────────────────────
// Maps to surface/border/text system vars — no palette steps.
// Theme-aware automatically because bg--*, border--*, text--*
// are already scoped to light/dark selectors.

const NEUTRAL_ROLE: Record<string, string> = {
  "neutral--subtle": "var(--bg--3)",
  "neutral--muted":  "var(--bg--4)",
  "neutral--base":   "var(--border--strong)",
  "neutral--vivid":  "var(--border--strong)",
  "neutral--deep":   "var(--text--layer-1)",
  "neutral--border": "var(--border--default)",
  "neutral--text":   "var(--text--layer-2)",
};

// ─── TOKEN BLOCKS ─────────────────────────────────────────────
// The plugin consumes this. Each block becomes one CSS rule.

export interface TokenBlock {
  selector: string;
  vars:     Record<string, string>;
  mediaQuery?: string;
}

export const TOKEN_BLOCKS: TokenBlock[] = [
  {
    // Raw primitives + semantic non-color scales (+ neutral role) — no theming
    selector: ":root",
    vars: {
      ...PRIMITIVE_SIZE,
      ...PRIMITIVE_COLOR,
      ...PRIMITIVE_MISC,
      ...SEMANTIC_SIZE,
      ...SEMANTIC_MISC,
      ...NEUTRAL_ROLE,
    },
  },
  {
    // Light theme (default)
    selector: `:root,\n[data-theme="light"]`,
    vars: LIGHT_TOKENS,
  },
  {
    // Dark theme — applied via data-theme="dark" on <html> or any subtree element
    selector: `[data-theme="dark"]`,
    vars: DARK_TOKENS,
  },
  { mediaQuery: "@media (prefers-contrast: more)", selector: ":root", vars: HIGH_CONTRAST_TOKENS },
  { mediaQuery: "@media print",                    selector: ":root", vars: PRINT_TOKENS         },
];