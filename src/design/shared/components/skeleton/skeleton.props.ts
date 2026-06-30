// design/feedback/skeleton/skeleton.props.ts

import type { BaseComponentProps }            from "~/shared/base.props";
import type { SkeletonVariant, SkeletonRadius } from "./skeleton.tokens";

export interface SkeletonProps extends BaseComponentProps {
  /**
   * The shape preset.
   *
   * - `text`    — single text line (~1em tall). Use `lines` for a block.
   * - `heading` — taller, narrower width. For title placeholders.
   * - `avatar`  — circular. Diameter set by `height` (default 2.5rem).
   * - `button`  — pill shape. For CTA placeholders.
   * - `image`   — rectangle with `ratio` aspect-ratio. For media.
   * - `block`   — no default size. Set `width` + `height` explicitly.
   *
   * @default "block"
   */
  variant?: SkeletonVariant;

  /**
   * Number of text lines to render.
   * Only applies to `variant="text"`. Renders stacked lines with the
   * last one at 65% width — a realistic paragraph placeholder.
   *
   * @default 1
   */
  lines?: number;

  /**
   * Explicit CSS width. Overrides the variant's default.
   * Any valid CSS length: `"200px"` | `"100%"` | `"12rem"`.
   */
  width?: string;

  /**
   * Explicit CSS height. Overrides the variant's default.
   * Any valid CSS length. For `avatar`, this also sets the width
   * (avatar is always square before border-radius rounds it).
   */
  height?: string;

  /**
   * CSS aspect-ratio for `variant="image"`.
   * @example "16/9" | "4/3" | "1/1"
   * @default "16/9"
   */
  ratio?: string;

  /**
   * Border radius. Overrides the per-variant default.
   * Useful when the skeleton must match the shape it replaces.
   * `avatar` ignores this — it is always a circle.
   */
  radius?: SkeletonRadius;

  /**
   * Whether the shimmer animation runs.
   * Set to `false` to show a static placeholder (e.g. in tests,
   * or when reduced-motion is handled at a higher level).
   *
   * @default true
   */
  animated?: boolean;
}