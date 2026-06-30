// design/shared/base.tokens.ts
//
// Centralized token resolution helpers for component-scoped styles.

/**
 * Resolves a selected size into component-scoped CSS custom properties using a declared map.
 *
 * @param prefix  - CSS prefix for the variables (e.g., "button" -> --button--p)
 * @param size    - Selected size step (e.g., "md")
 * @param sizeMap - Data structure mapping size keys to property values
 */
export function resolveComponentSizes<
  Prefix extends string,
  Size extends string,
  Properties extends Record<string, string>
>(
  prefix: Prefix,
  size: Size,
  sizeMap: Record<Size, Properties>
): string[] {
  const props = sizeMap[size];
  if (!props) return [];
  return Object.entries(props).map(([prop, val]) => `--${prefix}--${prop}: ${val}`);
}
