// design/triggers/trigger.tokens.ts

import { defineTokens, dimension, scale } from "~/shared/tokens";
import { RADIUS_DIM, COLOR_DIM } from "~/shared/primitives.tokens";

/**
 * Trigger token spec.
 *
 * Each prop maps to a CSS custom property or class modifier written inline
 * by useTrigger and read by trigger.css. All trigger components share this
 * spec — components resolve size into their own channels via their own
 * SIZE_MAP (e.g. resolveButtonSize).
 *
 * prop       channel / modifier              CSS property
 * ──────────────────────────────────────────────────────────────────
 * variant  → .trigger--{variant}             selects the variant rule block
 * color    → .trigger--{color}               selects the color role class
 *            --trigger--color-subtle         background for soft variants
 *            --trigger--color-muted          hover background for soft
 *            --trigger--color-base           solid fill / active border
 *            --trigger--color-vivid          hover on solid
 *            --trigger--color-deep           pressed state
 *            --trigger--color-border         outlined / dashed border
 *            --trigger--color-text           text on neutral bg
 * radius   → --trigger--radius               border-radius
 * size     → .trigger--{size}                class hook only — each component
 *                                            writes its own spatial channels
 *
 * Handled as boolean modifiers in the hook (not through resolveTokens):
 * disabled → .trigger--disabled + [data-disabled]
 * loading  → .trigger--loading  + [data-loading]
 */

const VARIANT = dimension(
  "variant",
  { solid: null, outlined: null, ghost: null, soft: null, dashed: null },
  { modifier: true },
);

const SIZE = scale({
  "3xs": null,
  "2xs": null,
  xs:    null,
  sm:    null,
  md:    null,
  lg:    null,
  xl:    null,
  "2xl": null,
  "3xl": null,
  "4xl": null,
  "5xl": null,
  "6xl": null,
});

export const TRIGGER_TOKENS = defineTokens({
  variant: VARIANT,
  color:   COLOR_DIM,
  radius:  RADIUS_DIM,
  size:    dimension("size", SIZE, { modifier: true }),
});

export type TriggerVariant = keyof typeof TRIGGER_TOKENS.variant.values;
export type TriggerColor   = keyof typeof TRIGGER_TOKENS.color.values;
export type TriggerRadius  = keyof typeof TRIGGER_TOKENS.radius.values;
export type TriggerSize    = keyof typeof TRIGGER_TOKENS.size.values;