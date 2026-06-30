// design/triggers/button/button.tokens.ts

export { TRIGGER_TOKENS as BUTTON_TOKENS } from "../../trigger.tokens";
export type { TriggerVariant as ButtonVariant, TriggerColor as ButtonColor, TriggerRadius as ButtonRadius }
  from "../../trigger.tokens";

/* ─── SIZE MAP ───────────────────────────────────────────── */
// p  = padding-block
// pi = padding-inline
// fs = font-size
// h  = min-height

export const BUTTON_SIZE_MAP = {
  "2xs": { p: "var(--space-in--3xs)", pi: "var(--space-in--2xs)",  fs: "var(--fs--3xs)", h: "var(--ui-height--2xs)" },
  xs: { p: "var(--space-in--2xs)", pi: "var(--space-in--xs)",  fs: "var(--fs--2xs)", h: "var(--ui-height--xs)" },
  sm: { p: "var(--space-in--xs)",  pi: "var(--space-in--sm)",  fs: "var(--fs--xs)", h:  "var(--ui-height--sm)" },
  md: { p: "var(--space-in--md)",  pi: "var(--space-in--md)",  fs: "var(--fs--sm)", h:  "var(--ui-height--md)" },
  lg: { p: "var(--space-in--md)",  pi: "var(--space-in--lg)",  fs: "var(--fs--md)", h: "var(--ui-height--lg)" },
  xl: { p: "var(--space-in--lg)",  pi: "var(--space-in--xl)",  fs: "var(--fs--lg)", h: "var(--ui-height--xl)" },
  "2xl": { p: "var(--space-in--lg)",  pi: "var(--space-in--2xl)",  fs: "var(--fs--xl)", h: "var(--ui-height--2xl)" },
  
} as const;

export type ButtonSize = keyof typeof BUTTON_SIZE_MAP;

export function resolveButtonSize(size: ButtonSize): string[] {
  const { p, pi, fs, h } = BUTTON_SIZE_MAP[size];
  return [
    `--button--p: ${p}`,
    `--button--pi: ${pi}`,
    `--button--fs: ${fs}`,
    `--button--h: ${h}`,
  ];
}

if (process.env.NODE_ENV === "development") {
  const assert = (cond: boolean, msg: string) => { if (!cond) throw new Error(`resolveButtonSize: ${msg}`); };
  const _md = resolveButtonSize("md");
  assert(_md.length === 4, "4 channels per size");
  assert(_md.every(s => s.startsWith("--button--")), "all channels are button-scoped");
  const _keys = ["p", "pi", "fs", "h"] as const;
  assert(_keys.every((k, i) => (_md[i] ?? "").startsWith(`--button--${k}:`)), "channels in order: p, pi, fs, h");
}

/* ─── CONSTANTS ──────────────────────────────────────────── */

export const BUTTON_TYPES   = ["button", "submit", "reset"] as const;
export const BUTTON_TARGETS = ["_self", "_blank", "_parent", "_top"] as const;

export type ButtonType   = typeof BUTTON_TYPES[number];
export type ButtonTarget = typeof BUTTON_TARGETS[number];

/* ─── DEFAULTS ───────────────────────────────────────────── */

export const BUTTON_DEFAULTS = {
  size:      "md"      as ButtonSize,
  type:      "button"  as ButtonType,
  iconOnly:  false,
  fullWidth: false,
} as const;