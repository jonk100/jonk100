// design/shared/spacing.props.ts

import { SPACE, SPACE_OUT } from "./primitives.tokens";
import type { Space, SpaceOut } from "./primitives.tokens";

/**
 * A spacing value: a single space token ("md"), a space-separated set of tokens
 * ("sm lg"), or a raw CSS length passed through untouched ("99px", "1rem 2rem").
 * Authoring stays loose on purpose; `resolveSpacingStyles` maps known tokens to
 * their CSS vars and passes anything unrecognized straight through.
 */
export type SpaceValue = Space | (string & {}) | undefined;

export interface SpacingProps {
  /** Padding, all sides. */            p?:  SpaceValue;
  /** Padding, inline axis (l/r). */    px?: SpaceValue;
  /** Padding, block axis (t/b). */     py?: SpaceValue;
  /** Padding top (block-start). */     pt?: SpaceValue;
  /** Padding right (inline-end). */    pr?: SpaceValue;
  /** Padding bottom (block-end). */    pb?: SpaceValue;
  /** Padding left (inline-start). */   pl?: SpaceValue;

  /** Margin, all sides. */             m?:  SpaceValue;
  /** Margin, inline axis (l/r). */     mx?: SpaceValue;
  /** Margin, block axis (t/b). */      my?: SpaceValue;
  /** Margin top (block-start). */      mt?: SpaceValue;
  /** Margin right (inline-end). */     mr?: SpaceValue;
  /** Margin bottom (block-end). */     mb?: SpaceValue;
  /** Margin left (inline-start). */    ml?: SpaceValue;
}

// Call this in a component hook (not in useBaseCompose) to convert spacing props
// into CSS custom property strings, e.g. "--image--mt: var(--space-out--lg)".
// Pass the same prefix used in the component's CSS (e.g. "image" → --image--mt).
// See layout.hook.ts for the reference implementation.
export function resolveSpacingStyles(
  props: SpacingProps,
  prefix: string,
): string[] {
  const keys = ["m","mx","my","mt","mr","mb","ml"] as const;
  const paddingKeys = ["p","px","py","pt","pr","pb","pl"] as const;
  const results: string[] = [];

  for (const k of keys) {
    const v = props[k];
    if (v == null) continue;
    const resolved = v
      .trim()
      .split(/\s+/)
      .map(token => SPACE_OUT[token as SpaceOut] ?? token)
      .join(" ");
    if (resolved) results.push(`--${prefix}--${k}: ${resolved}`);
  }
  for (const k of paddingKeys) {
    const v = props[k];
    if (v == null) continue;
    const resolved = v
      .trim()
      .split(/\s+/)
      .map(token => SPACE[token as Space] ?? token)
      .join(" ");
    if (resolved) results.push(`--${prefix}--${k}: ${resolved}`);
  }

  return results;
}