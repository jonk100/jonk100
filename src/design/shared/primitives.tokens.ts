// design/shared/primitives.tokens.ts
//
// Scales are generated from definitions/scales.ts via plugins/tokens.ts.
// This file re-exports them and adds the things that can't be generated:
// dimensions (carry modifier/scope metadata that requires a human decision)
// and the color-step utilities used by resolveColorChannels.
//
// TO ADD A SCALE VALUE: edit definitions/scales.ts only — one change, done.
// TO ADD A DIMENSION:   add it below and reference the generated scale.

import { dimension } from "./tokens";
import {
  SPACE, RADIUS, ALIGN, JUSTIFY,
  WEIGHT, FAMILY, LEADING, TRACKING,
  COLOR_ROLE, VARIANT, TEXT_COLOR, ICON_COLOR,
} from "./primitives.tokens.generated";
import type { ColorRole } from "./primitives.tokens.generated";

export * from "./primitives.tokens.generated";

/* ─── SHARED DIMENSIONS ──────────────────────────────────── */

export const GAP           = dimension("gap",      SPACE);
export const RADIUS_DIM    = dimension("radius",   RADIUS);
export const ALIGN_DIM     = dimension("align",    ALIGN);
export const JUSTIFY_DIM   = dimension("justify",  JUSTIFY);
export const WEIGHT_DIM    = dimension("weight",   WEIGHT);
export const FAMILY_DIM    = dimension("family",   FAMILY);
export const LEADING_DIM   = dimension("leading",  LEADING);
export const TRACKING_DIM  = dimension("tracking", TRACKING);
export const COLOR_DIM     = dimension("color",    COLOR_ROLE, { modifier: true });
export const VARIANT_DIM   = dimension("variant",  VARIANT,    { modifier: true });
export const TEXT_COLOR_DIM = dimension("color",   TEXT_COLOR);
export const ICON_COLOR_DIM = dimension("color", ICON_COLOR);

/* ─── COLOR STEPS ────────────────────────────────────────── */

export type ColorSteps = {
  subtle: string;
  muted:  string;
  base:   string;
  vivid:  string;
  deep:   string;
  border: string;
  text:   string;
};

export type ColorStepsMap = Record<ColorRole, ColorSteps>;

export const COLOR_STEPS = {
  primary: {
    subtle: "var(--primary--subtle)",
    muted:  "var(--primary--muted)",
    base:   "var(--primary--base)",
    vivid:  "var(--primary--vivid)",
    deep:   "var(--primary--deep)",
    border: "var(--primary--border)",
    text:   "var(--primary--text)",
  },
  secondary: {
    subtle: "var(--secondary--subtle)",
    muted:  "var(--secondary--muted)",
    base:   "var(--secondary--base)",
    vivid:  "var(--secondary--vivid)",
    deep:   "var(--secondary--deep)",
    border: "var(--secondary--border)",
    text:   "var(--secondary--text)",
  },
  accent: {
    subtle: "var(--accent--subtle)",
    muted:  "var(--accent--muted)",
    base:   "var(--accent--base)",
    vivid:  "var(--accent--vivid)",
    deep:   "var(--accent--deep)",
    border: "var(--accent--border)",
    text:   "var(--accent--text)",
  },
  tertiary: {
    subtle: "var(--tertiary--subtle)",
    muted:  "var(--tertiary--muted)",
    base:   "var(--tertiary--base)",
    vivid:  "var(--tertiary--vivid)",
    deep:   "var(--tertiary--deep)",
    border: "var(--tertiary--border)",
    text:   "var(--tertiary--text)",
  },
  danger: {
    subtle: "var(--danger--subtle)",
    muted:  "var(--danger--muted)",
    base:   "var(--danger--base)",
    vivid:  "var(--danger--base)",
    deep:   "var(--danger--text)",
    border: "var(--danger--border)",
    text:   "var(--danger--text)",
  },
  warning: {
    subtle: "var(--warning--subtle)",
    muted:  "var(--warning--muted)",
    base:   "var(--warning--base)",
    vivid:  "var(--warning--base)",
    deep:   "var(--warning--text)",
    border: "var(--warning--border)",
    text:   "var(--warning--text)",
  },
  success: {
    subtle: "var(--success--subtle)",
    muted:  "var(--success--muted)",
    base:   "var(--success--base)",
    vivid:  "var(--success--base)",
    deep:   "var(--success--text)",
    border: "var(--success--border)",
    text:   "var(--success--text)",
  },
  info: {
    subtle: "var(--info--subtle)",
    muted:  "var(--info--muted)",
    base:   "var(--info--base)",
    vivid:  "var(--info--base)",
    deep:   "var(--info--text)",
    border: "var(--info--border)",
    text:   "var(--info--text)",
  },
  neutral: {
    subtle: "var(--bg--3)",
    muted:  "var(--bg--4)",
    base:   "var(--border--strong)",
    vivid:  "var(--border--strong)",
    deep:   "var(--text--secondary)",
    border: "var(--border--default)",
    text:   "var(--text--secondary)",
  },
} as const satisfies ColorStepsMap;

export function resolveColorChannels(
  role: ColorRole,
  prefix: string,
): string[] {
  const steps = COLOR_STEPS[role];
  return (Object.entries(steps) as [keyof ColorSteps, string][])
    .map(([step, value]) => `--${prefix}--color-${step}: ${value}`);
}
