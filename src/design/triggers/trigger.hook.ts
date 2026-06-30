// design/triggers/triggers.hook.ts

import type { TriggerProps } from "./trigger.props";
import { TRIGGER_TOKENS } from "./trigger.tokens";
import { resolveTokens } from "~/shared/tokens";
import { resolveColorChannels } from "~/shared/primitives.tokens";
import { useBaseCompose } from "~/shared/base.hook";
import type { TriggerVariant } from "./trigger.tokens";

export function useTrigger(props: TriggerProps) {
  const {
    size     = "md",
    variant  = (props.v ?? "solid") as TriggerVariant,
    color    = "primary",
    radius   = "md",
    disabled = false,
    loading  = false,
    type     = "button",
    href,
    target,
    rel,
    class: className,
    bg,
    ...base
  } = props;

  const isLink     = Boolean(href);
  const isDisabled = disabled || loading;

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    TRIGGER_TOKENS,
    { variant, color, radius, size },
    "trigger",
  );

  const colorStyle = resolveColorChannels(color, "trigger");

  const { className: cls, style, attrs, rest } = useBaseCompose(
    {
      className: [
        "trigger",
        ...tokenClasses,
        disabled  && "trigger--disabled",
        loading   && "trigger--loading",
        className,
      ],
      style: [
        ...tokenStyle,
        ...colorStyle,
        bg && `--trigger--bg: ${bg}`,
      ],
      disabled: isDisabled,
      loading,
    },
    // Pass target into base so useBaseCompose can emit data-target for the action system.
    // For link buttons target is also used below as the HTML anchor attribute.
    { ...base, ...(target !== undefined ? { target } : {}) },
  );

  const Tag = isLink ? "a" : "button";

  const resolvedRel = isLink
    ? (rel ?? (target === "_blank" ? "noopener noreferrer" : undefined))
    : undefined;
  const linkDisabledAttrs = isLink && isDisabled ? {
    tabindex: "-1",
    style: "pointer-events: none;"
  } : {};

  return {
    Tag,
    triggerClass:  cls,
    triggerStyle:  style,
    triggerAttrs:  {
      ...attrs,
      ...linkDisabledAttrs,
      type:           !isLink ? type : undefined,
      href:           isLink  ? href : undefined,
      target:         isLink  ? target : undefined,
      rel:            resolvedRel,
      disabled:       !isLink && isDisabled ? true : undefined,
    },
    disabled,
    loading,
    size,
    rest,
  };
}