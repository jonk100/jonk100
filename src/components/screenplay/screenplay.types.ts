/**
 * Shared props for screenplay components
 *
 * Inputs:
 * - children: text content from MDX
 *
 * Output:
 * - formatted screenplay block
 */
export interface ScreenplayTextProps {
  children: string;
}

export interface ScreenplayWrapperProps {
  title?: string;
}
