// design/feedback/skeleton/skeleton.tokens.ts

import { defineTokens, dimension, scale } from "~/shared/tokens";
import { RADIUS_DIM }                     from "~/shared/primitives.tokens";

// ─── VARIANTS ─────────────────────────────────────────────────
//
// Class-only — each drives shape/size defaults in skeleton.css.
// Width, height, and aspect-ratio can always be overridden via props.
//
//   text    — single text line. Use lines prop for a multi-line block.
//   heading — wider, taller than text. For title placeholders.
//   avatar  — square that CSS forces into a circle via border-radius: 50%.
//   button  — medium pill shape. For CTA placeholders.
//   image   — rectangle driven by aspect-ratio prop. For media placeholders.
//   block   — no default size. Fully controlled by width + height props.

const SKELETON_VARIANT = scale({
  text:    null,
  heading: null,
  avatar:  null,
  button:  null,
  image:   null,
  block:   null,
});

// ─── SPEC ─────────────────────────────────────────────────────

export const SKELETON_TOKENS = defineTokens({
  variant: dimension("variant", SKELETON_VARIANT, { modifier: true }),
  // radius overrides the per-variant default from skeleton.css.
  // Useful when a skeleton needs to match the shape it replaces
  // (e.g. a card image with rounded corners → radius="lg").
  radius:  RADIUS_DIM,
});

// ─── DERIVED TYPES ────────────────────────────────────────────

export type SkeletonVariant = keyof typeof SKELETON_VARIANT;
export type SkeletonRadius  = keyof typeof SKELETON_TOKENS.radius.values;

// ─── DEFAULTS ─────────────────────────────────────────────────

export const SKELETON_DEFAULTS = {
  variant:  "block"  as SkeletonVariant,
  lines:    1,
  animated: true,
} as const;