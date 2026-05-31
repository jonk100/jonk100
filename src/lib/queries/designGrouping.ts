/**
 * src/lib/queries/designGrouping.ts
 * - Grouping and filtering utilities for the design system.
 * 
 * This file is the pure transformation layer.
 * - all structural manipulation of component lists should happen here.
 * - it should stay completely unaware of Astro or collections.
 * 
 * 
 */
import { categories } from './designCategories';
import type { ComponentCategory } from './designCategories';

/**
 * Groups components by category.
 *
 * @param components - Component collection.
 * @returns Components grouped by category.
 */
export function groupComponentsByCategory<
  T extends {
    data: {
      category: ComponentCategory;
    };
  }
>(
  components: T[]
): Record<ComponentCategory, T[]> {
  return categories.reduce(
    (acc, category) => {
      acc[category] = components.filter(
        component =>
          component.data.category === category
      );

      return acc;
    },
    {} as Record<ComponentCategory, T[]>
  );
}

/**
 * Flattens grouped components into a single array with category metadata.
 */
export function flattenGroupedComponents<T>(
  grouped: Record<string, T[]>
): Array<T & { category: string }> {
  return Object.entries(grouped).flatMap(([category, items]) =>
    items.map(item => ({
      ...item,
      category
    }))
  );
}

/**
 * Counts components per category.
 */
export function getCategoryCounts<T>(
  grouped: Record<string, T[]>
): Record<string, number> {
  return Object.fromEntries(
    Object.entries(grouped).map(([k, v]) => [k, v.length])
  );
}

/**
 * Filters grouped components by category.
 */
export function filterGroupedComponents<T>(
  grouped: Record<string, T[]>,
  predicate: (item: T) => boolean
) {
  const result: Record<string, T[]> = {};

  for (const key in grouped) {
    result[key] = grouped[key].filter(predicate);
  }

  return result;
}

/**
 * Sorts categories within a category group.
 */
export function sortGroupedComponents<T extends { data: { title: string } }>(
  grouped: Record<string, T[]>
) {
  for (const key in grouped) {
    grouped[key].sort((a, b) =>
      a.data.title.localeCompare(b.data.title)
    );
  }

  return grouped;
}

/**
 * Groups categories while ensuring all categories exist
 */
export function createEmptyGroupedStructure<T>() {
  return categories.reduce((acc, c) => {
    acc[c] = [];
    return acc;
  }, {} as Record<typeof categories[number], T[]>);
}