// design/triggers/trigger.props.ts

import type { BaseComponentProps } from "~/shared/base.props";
import type { TriggerVariant, TriggerColor, TriggerRadius, TriggerSize } from "./trigger.tokens";

export interface TriggerProps extends BaseComponentProps {
  /** Visual treatment. @default 'solid' */
  variant?:  TriggerVariant;
  /** Color role. @default 'primary' */
  color?:    TriggerColor;
  /** Border radius. @default 'md' */
  radius?:   TriggerRadius;
  /** Disables all interaction. @default false */
  disabled?: boolean;
  /** Shows loading state. @default false */
  loading?:  boolean;
  size?: TriggerSize;
  /** HTML button type. @default 'button' */
  type?: "button" | "submit" | "reset";
  /** Renders as <a> when set. */
  href?: string;
  /** Anchor target. Only used with href. */
  target?: string;
  /** Anchor rel. Auto-set to 'noopener noreferrer' when target='_blank'. */
  rel?: string;
}