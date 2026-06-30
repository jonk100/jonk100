/**
 * @file tokens.ts
 * @description The token engine. Pure functions, no values, no CSS knowledge.
 *
 * Three concepts this file owns:
 *
 *   scale      A value map authored once in primitives.tokens.ts.
 *              Keys are prop values ("sm", "md", "lg").
 *              Values are CSS var references ("var(--space-in--sm)") or null.
 *              null means the key is class-only — no CSS var is emitted.
 *
 *   dimension  A scale bound to a channel key, optional modifier behaviour,
 *              and optional scope override. The channel name is never stored
 *              as a literal — it's composed at resolve time from the key and
 *              the prefix passed to resolveTokens.
 *
 *   spec       A named bag of dimensions that a category or component resolves
 *              against. defineTokens() + composeTokens() build specs.
 *              resolveTokens() consumes them.
 *
 * Data flow:
 *   primitives.tokens.ts  authors scales + dimensions
 *   <category>.tokens.ts  assembles specs with defineTokens / composeTokens
 *   <component>.tokens.ts re-exports or narrows with pickValues
 *   <hook>.ts             calls resolveTokens(spec, selectedProps, prefix)
 *   component CSS         reads --{prefix}--{key} channels
 */

// ─── TYPES ────────────────────────────────────────────────────────────────────

/**
 * A map of prop value keys to their resolved CSS values.
 * `null` marks a key as class-only — the dimension emits a modifier
 * class but writes no CSS custom property for that value.
 *
 * @example
 *   { solid: null, outlined: null }  // variant — class-only
 *   { sm: "var(--space-in--sm)" }    // size — emits a CSS var
 */
export type ScaleValues = Record<string, string | null>;

/**
 * A single styleable dimension: one prop → one CSS channel and/or class modifier.
 *
 * @property key      - The CSS custom property suffix. The full channel name is
 *                      composed as `--{scope}--{key}` at resolve time.
 *                      Omit when the dimension is modifier-only (no CSS var).
 *
 * @property scope    - Pins the channel/class namespace, overriding the prefix
 *                      passed to resolveTokens. Use when only a component's own
 *                      stylesheet reads the channel — not the shared category rule.
 *                      @example gap: dimension("gap", SPACE, { scope: "paper" })
 *                      // always emits --paper--gap, regardless of resolveTokens prefix
 *
 * @property modifier - Emits a BEM-style class modifier on the resolved element.
 *                      true         → `{ns}--{value}`       e.g. trigger--solid
 *                      "variant"    → `{ns}--variant-{value}` (namespaced, collision-safe)
 *
 * @property values   - The allowed prop values and their CSS resolutions.
 *                      null values are class-only; string values write a CSS var.
 */
export type TokenDimension = {
  key?:      string;
  scope?:    string;
  modifier?: boolean | string;
  values:    ScaleValues;
};

/**
 * A named collection of dimensions that a component resolves against.
 * Built with defineTokens() and optionally extended with composeTokens().
 */
export type TokenSpec = Record<string, TokenDimension>;

/**
 * The typed prop surface derived from a spec.
 * Every key becomes an optional prop whose type is the union of that
 * dimension's value keys.
 *
 * @example
 *   type TriggerProps = TokenProps<typeof TRIGGER_TOKENS>
 *   // → { variant?: "solid" | "outlined" | …, color?: "primary" | …, … }
 */
export type TokenProps<S extends TokenSpec> = {
  [K in keyof S]?: keyof S[K]["values"] | undefined;
};

// ─── FUNCTIONS ────────────────────────────────────────────────────────────────

/**
 * Authors a value scale with literal key types preserved.
 *
 * Without this function, TypeScript widens object literal property types
 * from `"var(--space-in--sm)"` to `string`, which breaks `keyof` derivations.
 * Passing through a generic identity function captures the literal types.
 *
 * @example
 *   export const SPACE = scale({
 *     sm: "var(--space-in--sm)",
 *     md: "var(--space-in--md)",
 *   });
 *   type Space = keyof typeof SPACE; // "sm" | "md"
 */
export function scale<V extends ScaleValues>(values: V): V {
  return values;
}

/**
 * Builds a dimension from a scale, a channel key, and optional modifier/scope.
 *
 * The channel key becomes the CSS custom property suffix: a dimension with
 * key "radius" resolved under prefix "trigger" produces `--trigger--radius`.
 *
 * @param key    - The CSS custom property suffix (omit for class-only dimensions).
 * @param values - The scale this dimension draws from.
 * @param opts   - Optional modifier and scope overrides.
 *
 * @example CSS var + class modifier
 *   export const COLOR_DIM = dimension("color", COLOR_ROLE, { modifier: true });
 *   // size="primary" → --trigger--color: … AND class trigger--primary
 *
 * @example Class modifier only (null values)
 *   const VARIANT = dimension("variant", { solid: null, outlined: null }, { modifier: true });
 *   // variant="solid" → class trigger--solid, no CSS var
 *
 * @example Component-scoped channel
 *   dimension("gap", SPACE, { scope: "paper" })
 *   // always emits --paper--gap regardless of the prefix in resolveTokens
 */
export function dimension<V extends ScaleValues>(
  key: string,
  values: V,
  opts: { modifier?: boolean | string; scope?: string } = {},
): { key: string; values: V; modifier?: boolean | string; scope?: string } {
  return { key, values, ...opts };
}

/**
 * Assembles a token spec from a bag of dimensions, preserving literal types.
 *
 * The identity function is needed for the same reason as scale() — without it
 * TypeScript widens the spec's value types and breaks downstream type derivations.
 *
 * @example
 *   export const TRIGGER_TOKENS = defineTokens({
 *     variant: VARIANT,
 *     color:   COLOR_DIM,
 *     radius:  RADIUS_DIM,
 *   });
 *   export type TriggerVariant = keyof typeof TRIGGER_TOKENS.variant.values;
 */
export function defineTokens<S extends TokenSpec>(spec: S): S {
  return spec;
}

/**
 * Shallow-merges two specs. The extension spec wins on key conflicts.
 * Used to build component specs that inherit from their category spec.
 *
 * @example Extend category with new dimension
 *   export const PAPER_TOKENS = composeTokens(SURFACE_TOKENS, {
 *     gap: dimension("gap", SPACE, { scope: "paper" }),
 *   });
 *
 * @example Override an inherited dimension (paired with pickValues)
 *   export const HEADING_TOKENS = composeTokens(TYPOGRAPHY_TOKENS, {
 *     weight: pickValues(WEIGHT_DIM, ["semibold", "bold"] as const),
 *   });
 */
export function composeTokens<A extends TokenSpec, B extends TokenSpec>(
  base: A,
  ext: B,
): A & B {
  return { ...base, ...ext };
}

/**
 * Narrows a dimension to a subset of its value keys.
 * The channel key and all other dimension properties are preserved unchanged —
 * only the allowed values are narrowed. Used to restrict a component's prop
 * type to a subset of what the category dimension allows.
 *
 * The narrowing is enforced at the TypeScript level; the CSS output is
 * identical to the original dimension for whichever values are still allowed.
 *
 * @example Heading weight restricted to the heading-appropriate subset
 *   export const HEADING_TOKENS = composeTokens(TYPOGRAPHY_TOKENS, {
 *     weight: pickValues(WEIGHT_DIM, ["semibold", "bold"] as const),
 *   });
 *   // HeadingProps.weight → "semibold" | "bold"  (not "normal" | "medium")
 *   // weight="normal" is a TypeScript error at authoring time
 */
export function pickValues<
  V extends ScaleValues,
  K extends keyof V,
  D extends { values: V },
>(dim: D, keys: readonly K[]): Omit<D, "values"> & { values: Pick<V, K> } {
  const values = {} as Pick<V, K>;
  for (const k of keys) values[k] = dim.values[k];
  return { ...dim, values };
}

/**
 * Resolves a set of selected prop values against a spec, producing
 * inline CSS custom property declarations and BEM class modifiers.
 *
 * This is the only function with runtime logic. Everything else is
 * type infrastructure. Call this once per hook per component.
 *
 * Channel name composition:
 *   `--{ns}--{dim.key}`  where ns = dim.scope ?? prefix
 *   e.g. `--trigger--color: var(--color-primary)`, `.trigger--primary`
 *   e.g. `stack--gap`, `.stack--gap-md`
 *   e.g. `.inline--align-center`
 *
 * @param spec     - The token spec to resolve against (category or component).
 * @param selected - The prop values chosen by the consumer. Unset props are skipped.
 * @param prefix   - The CSS namespace. Should match the category stylesheet that
 *                   reads these channels (e.g. "trigger", "typography").
 *                   Overridden per-dimension by dim.scope when set.
 *
 * @returns style   - Array of `"--ns--key: value"` strings for inline style.
 * @returns classes - Array of `"ns--value"` class modifier strings.
 *
 * @example
 *   resolveTokens(TRIGGER_TOKENS, { variant: "solid", color: "primary", radius: "md" }, "trigger")
 *   //* style:   ["--trigger--radius: var(--radius--md)"]
 *   //* classes: ["trigger--solid", "trigger--primary"]
 *   //
 *   //* Note: color has null values → no CSS var emitted, only the modifier class.
 *   //* Note: radius has no modifier → no class emitted, only the CSS var.
 */
export function resolveTokens<S extends TokenSpec>(
  spec: S,
  selected: TokenProps<S>,
  prefix: string,
): { style: string[]; classes: string[] } {
  const style: string[]   = [];
  const classes: string[] = [];

  for (const name in spec) {
    const key   = name as keyof S;
    const dim   = spec[key];
    const value = selected[key];
    if (!dim || value == null) continue;

    const ns      = dim.scope ?? prefix;
    const resolved = dim.values[value as string];

    if (dim.key && resolved != null) {
      style.push(`--${ns}--${dim.key}: ${resolved}`);
    }
    if (dim.modifier) {
      const seg = typeof dim.modifier === "string" ? `${dim.modifier}-` : "";
      classes.push(`${ns}--${seg}${String(value)}`);
    }
  }

  return { style, classes };
}

// ponytail: simplified implementation; only iterates own enumerable spec keys
if (process.env.NODE_ENV === "development") {
  const assert = (cond: boolean, msg: string) => { if (!cond) throw new Error(`resolveTokens: ${msg}`); };

  const _spec = defineTokens({
    variant: dimension("variant", { solid: null, soft: null }, { modifier: true }),
    size:    dimension("size",    { md: "var(--space-in--md)" }),
    gap:     dimension("gap",     { md: "4px" }, { scope: "paper" }),
  });

  // modifier-only dim (null value) → class only, no CSS var
  const _r1 = resolveTokens(_spec, { variant: "solid" }, "ns");
  assert(_r1.classes.includes("ns--solid"), "modifier class emitted");
  assert(_r1.style.length === 0,            "null value emits no CSS var");

  // CSS-var dim, no modifier → style only, no class
  const _r2 = resolveTokens(_spec, { size: "md" }, "ns");
  assert(_r2.style[0] === "--ns--size: var(--space-in--md)", "CSS var emitted with correct channel");
  assert(_r2.classes.length === 0, "no modifier class for non-modifier dim");

  // scoped dim → channel uses scope, not prefix
  const _r3 = resolveTokens(_spec, { gap: "md" }, "ns");
  assert((_r3.style[0] ?? "").startsWith("--paper--gap:"), "dim.scope overrides prefix");

  // empty selection → nothing emitted
  const _r4 = resolveTokens(_spec, {}, "ns");
  assert(_r4.style.length === 0 && _r4.classes.length === 0, "empty selection emits nothing");
}