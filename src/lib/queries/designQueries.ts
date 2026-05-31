/**
 * src/lib/queries/designQueries.ts
 * Composition and Astro/data fetching utilities for the design system.
 * 
 * This file is the orchestration layer:
 * - `fetch -> transform -> return ready to render data`
 * 
 * It should not contain low-level logic.
 */

import { getCollection } from 'astro:content';
import { groupComponentsByCategory } from './designGrouping';
import { categories, componentCategories, type ComponentCategory } from './designCategories';


/**
 * fetches all design components and groups them by category
 * @returns {Promise<{components: any[], groupedComponents: Record<string, any[]>}>}
 */
export async function getDesignComponentGroups() {
  const components = await getCollection('design');

  const sorted = [...components].sort((a, b) =>
    a.data.title.localeCompare(b.data.title)
  );

  return {
    components: sorted,
    groupedComponents: groupComponentsByCategory(sorted)
  };
}

/**
 * Returns only components in a specific category.
 * 
 */
export async function getComponentsByCategory(category: ComponentCategory) {
  const { groupedComponents } = await getDesignComponentGroups();
  return groupedComponents[category];
}

/**
 * Builds a flat searchable index of components.
 */
export async function getDesignSearchIndex() {
  const { components } = await getDesignComponentGroups();

  return components.map(c => ({
    id: c.id,
    title: c.data.title,
    description: c.data.description,
    category: c.data.category
  }));
}

export async function getSidebarData() {
  const { components, groupedComponents } =
    await getDesignComponentGroups();

  return {
    groupedComponents,
    categories: componentCategories
  };
}

/**
 * Navigation structure builder.
 * - Returns a flat list of categories and their component count
 */
export async function getDesignNavigation() {
  const { groupedComponents } =
    await getDesignComponentGroups();

  return categories.map(category => ({
    category,
    count: groupedComponents[category].length
  }));
}