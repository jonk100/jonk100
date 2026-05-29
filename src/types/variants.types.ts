export type ComponentTheme = "primary" | "ghost" | "secondary" | "outline" | "default";
export type Sizes = "xs" | "sm" | "md" | "base" | "lg" | "xl" | "icon" | "icon-sm" | "icon-lg";
export type WrapperSize = "sm" | "md" | "lg" | "xl" | "full" | "screen";

export type ComponentRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

export type BlockType = 'body' | 'body-sm' | 'heading-1' | 'heading-2' | 'heading-3' | 'caption' | 'label';
export type TextTone = 'default' | 'muted' | 'subtle' | 'accent' | 'primary' | 'secondary' | 'danger' | 'success';

/**
 * Universal spacing scale for padding and margins.
 * `fluid` responds dynamically to container dimensions via @container queries.
 */
export type SpacingScale = "none" | "3xs" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "fluid";

export type FrameVariant = 'light' | 'dark' | 'glass' | 'polaroid' | 'minimal' | 'accent' | 'primary' | 'secondary' | 'none';
export type ComponentEffect = 'screen' | 'glow' | 'grayscale';
export type ComponentShape = 'landscape' | 'portrait' | 'square' | 'circle' | 'none';

/** Shared interface for components using flexbox properties */
export interface FlexboxProps {
  gap?: SpacingScale;
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
  wrap?: boolean;
}
