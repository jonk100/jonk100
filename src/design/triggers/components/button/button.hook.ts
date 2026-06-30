import type { ButtonProps } from "./button.props";
import { BUTTON_DEFAULTS, BUTTON_SIZE_MAP } from "./button.tokens";
import type { ButtonSize } from "./button.tokens";
import { useTrigger } from "../../trigger.hook";
import { composeClass, composeStyle } from "~/shared/base.hook";
import { resolveComponentSizes } from "~/shared/base.tokens";

 
export function useButton(props: ButtonProps) {
  const {
    type      = BUTTON_DEFAULTS.type,
    href,
    target,
    rel,
    icon,
    iconOnly  = BUTTON_DEFAULTS.iconOnly,
    fullWidth = BUTTON_DEFAULTS.fullWidth,
    ...triggerProps
  } = props;
 
  const { Tag, triggerClass, triggerStyle, triggerAttrs, rest }
    = useTrigger({
      ...triggerProps,
      type,
      ...(href   !== undefined ? { href }   : {}),
      ...(target !== undefined ? { target } : {}),
      ...(rel    !== undefined ? { rel }    : {}),
    });
    
  const sizeStyle = props.size !== undefined
    ? resolveComponentSizes("button", props.size as ButtonSize, BUTTON_SIZE_MAP)
    : [];

  let finalStyle = triggerStyle
    ? triggerStyle.split(";").map(s => s.trim()).filter(Boolean)
    : [];

  if (props.color === undefined) {
    finalStyle = finalStyle.filter(s => !s.startsWith("--trigger--color-"));
  }
  if (props.radius === undefined) {
    finalStyle = finalStyle.filter(s => !s.startsWith("--trigger--radius:"));
  }

  return {
    Tag,
    props: {
      class: composeClass(
        triggerClass,
        "button",
        props.size && `button--${props.size}`,
        iconOnly  && "button--icon-only",
        fullWidth && "button--full-width",
      ),
      style: composeStyle(
        ...finalStyle,
        ...sizeStyle,
      ),
      ...triggerAttrs,
      ...rest,
    },
  };
}
 
