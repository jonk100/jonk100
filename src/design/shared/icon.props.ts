// design/shared/icon.props.ts

import type { SvgName } from "./icons";

/**
 * Shared interface for components that natively support rendering an icon.
 * Components extending this interface will automatically place the icon
 * in its optimal default position (e.g. left for buttons, center for tags).
 */
export interface IconProps {
  /** Optional icon to render inside the component. */
  icon?: SvgName;
}
