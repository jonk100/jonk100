/**
 * src/lib/queries/designCategories.ts
 * Pure data + derived types.
 * 
 * This file is for taxonomy and metadata only.
 * - no fetching or transformation logic
 * 
 * Rules:
 * - If it defines what a category is, put it here.
 * 
 * Exports:
 * 
 * 
 */

/**
 * 
 */
export const componentCategories = {
  primitives: {
    title: '01 / Atomic Primitives',
    description:
      'Atomic foundations used to crop assets, load graphics, anchor actions, and elevated sheets.',
    icon: 'zap'
  },

  layouts: {
    title: '02 / Layout Primitives',
    description:
      'Compositional layout primitive wrappers that manage fluid grids, padding scales, and gaps.',
    icon: 'info'
  },

  controls: {
    title: '03 / Action Controls',
    description:
      'Standard inputs, select menus, toggle switches, and buttons governing actions.',
    icon: 'check-circle'
  },

  overlays: {
    title: '04 / Portal Overlays',
    description:
      'Backdrop dialogues, popovers, and hover tooltips utilizing native Anchor systems.',
    icon: 'alert-circle'
  },

  feedback: {
    title: '05 / Visual Feedback',
    description:
      'Inline callout alerts, badge indicators, spinners, and loading skeleton blocks.',
    icon: 'alert-triangle'
  }
} as const;

/**
 * Valid category keys.
 */
export type ComponentCategory =
  keyof typeof componentCategories;

/**
 * Metadata shape for a category.
 */
export type CategoryInfo =
  (typeof componentCategories)[ComponentCategory];

/**
 * Ordered category list.
 *
 * Uses object order, which is preserved in modern JavaScript.
 */
export const categories =
  Object.keys(componentCategories) as ComponentCategory[];

/**
 * Returns metadata for a category.
 *
 * @param category - Category key.
 * @returns Category metadata.
 */
export function getCategory(
  category: ComponentCategory
): CategoryInfo {
  return componentCategories[category];
}

/**
 * Ordered category list.
 *
 * Uses object order, which is preserved in modern JavaScript.
 */
export const categoryOrder: ComponentCategory[] = [
  'primitives',
  'layouts',
  'controls',
  'overlays',
  'feedback'
];

/**
 * Category visibility metadata.
 * - Public categories are always visible
 * - Private categories are only visible in the sidebar
 */
export const categoryVisibility: Record<ComponentCategory, {
  public: boolean;
  showInSidebar: boolean;
}> = {
  primitives: { public: true, showInSidebar: true },
  overlays: { public: true, showInSidebar: true },
  feedback: { public: true, showInSidebar: true },
  controls: { public: true, showInSidebar: true },
  layouts: { public: true, showInSidebar: true }
};

/**
 * Category grouping labels.
 */
export const categoryGroupLabels = {
  core: ['primitives', 'layouts'],
  interactive: ['controls', 'overlays'],
  system: ['feedback']
} as const;

/**
 * Category icon mapping enhancements.
 */
export const categoryIcons = {
  primitives: 'zap',
  layouts: 'grid',
  controls: 'cursor',
  overlays: 'layers',
  feedback: 'alert'
} as const;