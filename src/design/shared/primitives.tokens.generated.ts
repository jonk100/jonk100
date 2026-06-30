// ================================================================
//  primitives.tokens.generated.ts
//  AUTO-GENERATED — do not edit.
//  Source: src/design/shared/primitives.definitions.ts → SCALE_DEFS
//  Regenerated automatically when primitives.definitions.ts is saved.
// ================================================================

import { scale } from "~/shared/tokens";

export const SPACE = scale({
  none:  "0",
  "3xs": "var(--space-in--3xs)",
  "2xs": "var(--space-in--2xs)",
  xs:    "var(--space-in--xs)",
  sm:    "var(--space-in--sm)",
  md:    "var(--space-in--md)",
  lg:    "var(--space-in--lg)",
  xl:    "var(--space-in--xl)",
  "2xl": "var(--space-in--2xl)",
  "3xl": "var(--space-in--3xl)",
  "4xl": "var(--space-in--4xl)",
  "5xl": "var(--space-in--5xl)",
  "6xl": "var(--space-in--6xl)",
});

export type Space = Extract<keyof typeof SPACE, string>;

export const SPACE_OUT = scale({
  none:  "0",
  "3xs": "var(--space-out--3xs)",
  "2xs": "var(--space-out--2xs)",
  xs:    "var(--space-out--xs)",
  sm:    "var(--space-out--sm)",
  md:    "var(--space-out--md)",
  lg:    "var(--space-out--lg)",
  xl:    "var(--space-out--xl)",
  "2xl": "var(--space-out--2xl)",
  "3xl": "var(--space-out--3xl)",
  "4xl": "var(--space-out--4xl)",
  "5xl": "var(--space-out--5xl)",
  "6xl": "var(--space-out--6xl)",
});

export type SpaceOut = Extract<keyof typeof SPACE_OUT, string>;

export const RADIUS = scale({
  none:  "var(--radius--none)",
  "3xs": "var(--radius--3xs)",
  "2xs": "var(--radius--2xs)",
  xs:    "var(--radius--xs)",
  sm:    "var(--radius--sm)",
  md:    "var(--radius--md)",
  lg:    "var(--radius--lg)",
  xl:    "var(--radius--xl)",
  "2xl": "var(--radius--2xl)",
  "3xl": "var(--radius--3xl)",
  "4xl": "var(--radius--4xl)",
  "5xl": "var(--radius--5xl)",
  "6xl": "var(--radius--6xl)",
  full:  "var(--radius--full)",
});

export type Radius = Extract<keyof typeof RADIUS, string>;

export const TEXT_SIZE = scale({
  "3xs": "var(--fs--3xs)",
  "2xs": "var(--fs--2xs)",
  xs:    "var(--fs--xs)",
  sm:    "var(--fs--sm)",
  md:    "var(--fs--md)",
  lg:    "var(--fs--lg)",
  xl:    "var(--fs--xl)",
  "2xl": "var(--fs--2xl)",
  "3xl": "var(--fs--3xl)",
  "4xl": "var(--fs--4xl)",
  "5xl": "var(--fs--5xl)",
  "6xl": "var(--fs--6xl)",
});

export type TextSize = Extract<keyof typeof TEXT_SIZE, string>;

export const TEXT_SIZE_FIXED = scale({
  "3xs": "var(--fsf--3xs)",
  "2xs": "var(--fsf--2xs)",
  xs:    "var(--fsf--xs)",
  sm:    "var(--fsf--sm)",
  md:    "var(--fsf--md)",
  lg:    "var(--fsf--lg)",
  xl:    "var(--fsf--xl)",
  "2xl": "var(--fsf--2xl)",
  "3xl": "var(--fsf--3xl)",
  "4xl": "var(--fsf--4xl)",
  "5xl": "var(--fsf--5xl)",
  "6xl": "var(--fsf--6xl)",
});

export type TextSizeFixed = Extract<keyof typeof TEXT_SIZE_FIXED, string>;

export const LABEL_SIZE = scale({
  "3xs": "var(--label--3xs)",
  "2xs": "var(--label--2xs)",
  xs:    "var(--label--xs)",
  sm:    "var(--label--sm)",
  md:    "var(--label--md)",
  lg:    "var(--label--lg)",
  xl:    "var(--label--xl)",
  "2xl": "var(--label--2xl)",
  "3xl": "var(--label--3xl)",
  "4xl": "var(--label--4xl)",
  "5xl": "var(--label--5xl)",
  "6xl": "var(--label--6xl)",
});

export type LabelSize = Extract<keyof typeof LABEL_SIZE, string>;

export const WEIGHT = scale({
  thin:     "var(--weight--thin)",
  light:    "var(--weight--light)",
  normal:   "var(--weight--normal)",
  medium:   "var(--weight--medium)",
  semibold: "var(--weight--semibold)",
  bold:     "var(--weight--bold)",
  black:    "var(--weight--black)",
});

export type Weight = Extract<keyof typeof WEIGHT, string>;

export const FAMILY = scale({
  sans:  "var(--family--sans)",
  serif: "var(--family--serif)",
  mono:  "var(--family--mono)",
});

export type Family = Extract<keyof typeof FAMILY, string>;

export const LEADING = scale({
  none:    "var(--leading--none)",
  tight:   "var(--leading--tight)",
  snug:    "var(--leading--snug)",
  normal:  "var(--leading--normal)",
  relaxed: "var(--leading--relaxed)",
  loose:   "var(--leading--loose)",
});

export type Leading = Extract<keyof typeof LEADING, string>;

export const TRACKING = scale({
  tight:  "var(--tracking--tight)",
  normal: "var(--tracking--normal)",
  wide:   "var(--tracking--wide)",
  wider:  "var(--tracking--wider)",
  caps:   "var(--tracking--caps)",
});

export type Tracking = Extract<keyof typeof TRACKING, string>;

export const COLOR_ROLE = scale({
  primary:   null,
  secondary: null,
  tertiary:  null,
  accent:    null,
  danger:    null,
  warning:   null,
  success:   null,
  info:      null,
  neutral:   null,
});

export type ColorRole = Extract<keyof typeof COLOR_ROLE, string>;

export const VARIANT = scale({
  solid:    null,
  soft:     null,
  outlined: null,
  ghost:    null,
  dashed:   null,
});

export type Variant = Extract<keyof typeof VARIANT, string>;

export const TEXT_COLOR = scale({
  primary:    "var(--text--primary)",
  secondary:  "var(--text--secondary)",
  muted:      "var(--text--muted)",
  tertiary:   "var(--text--tertiary)",
  disabled:   "var(--text--disabled)",
  inverse:    "var(--text--inverse)",
  "on-color": "var(--text--on-color)",
  inherit:    "inherit",
  success:    "var(--success--text)",
  danger:     "var(--danger--text)",
  warning:    "var(--warning--text)",
  info:       "var(--info--text)",
});

export type TextColor = Extract<keyof typeof TEXT_COLOR, string>;

export const ICON_COLOR = scale({
  primary:    "var(--primary--deep)",
  secondary:  "var(--secondary--deep)",
  tertiary:   "var(--tertiary--deep)",
  muted:      "var(--primary--muted)",
  disabled:   "var(--primary--disabled)",
  inverse:    "var(--primary--inverse)",
  "on-color": "var(--primary--on-color)",
  inherit:    "inherit",
  success:    "var(--success--deep)",
  danger:     "var(--danger--deep)",
  warning:    "var(--warning--deep)",
  info:       "var(--info--deep)",
});

export type IconColor = Extract<keyof typeof ICON_COLOR, string>;

export const ALIGN = scale({
  start:    "flex-start",
  center:   "center",
  end:      "flex-end",
  stretch:  "stretch",
  baseline: "baseline",
});

export type Align = Extract<keyof typeof ALIGN, string>;

export const JUSTIFY = scale({
  start:   "flex-start",
  center:  "center",
  end:     "flex-end",
  between: "space-between",
  around:  "space-around",
  evenly:  "space-evenly",
});

export type Justify = Extract<keyof typeof JUSTIFY, string>;
