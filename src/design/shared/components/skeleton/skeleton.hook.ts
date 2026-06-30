// design/shared/components/skeleton/skeleton.hook.ts

import type { SkeletonProps }              from "./skeleton.props";
import { SKELETON_TOKENS, SKELETON_DEFAULTS } from "./skeleton.tokens";
import { resolveTokens }                   from "~/shared/tokens";
import { useBaseCompose } from "~/shared/base.hook";

export function useSkeleton(props: SkeletonProps) {
  const {
    variant  = SKELETON_DEFAULTS.variant,
    lines    = SKELETON_DEFAULTS.lines,
    animated = SKELETON_DEFAULTS.animated,
    width,
    height,
    ratio,
    radius,
    class: className,
    ...base } = props;

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    SKELETON_TOKENS,
    { variant, radius },
    "skeleton",
  );

  // Inline style — width, height, ratio are raw CSS, not token channels
  const inlineStyle = [
    width  && `width: ${width}`,
    height && `height: ${height}`,
    // avatar uses height for both axes
    variant === "avatar" && height && `width: ${height}`,
    ratio  && `aspect-ratio: ${ratio}`,
  ].filter(Boolean).join("; ");

  const { className: cls, style, attrs, rest } = useBaseCompose(
    {
      className: [
        "skeleton",
        ...tokenClasses,
        !animated && "skeleton--static",
        className,
      ],
      style: [
        ...tokenStyle,
        inlineStyle,
      ],
    },
    base,
  );

  return {
    variant,
    lines:   variant === "text" ? Math.max(1, lines) : 1,
    props: {
      class:           cls,
      style:           style || undefined,
      "aria-hidden":   "true" as const,
      role:            "presentation" as const,
      ...attrs,
      ...rest,
    },
  };
}