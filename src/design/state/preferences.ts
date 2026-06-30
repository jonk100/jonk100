/**
 * src/design/state/preferences.ts
 * User preference state management with system preference sync.
 * Manages theme and reduced motion preferences that sync with browser settings.
 */

import { createStore, createPersistedStore, createDerived } from './store';

/**
 * Theme preference store (light/dark)
 * Persists to localStorage and can be manually toggled by user
 */
export const theme = createPersistedStore<'light' | 'dark'>('theme', 'dark');

/**
 * Reduced motion preference store
 * Automatically syncs with system preference: window.matchMedia('(prefers-reduced-motion: reduce)')
 * Can also be manually overridden by user
 */
export const reducedMotion = (() => {
  // Get initial value from system preference
  const getSystemReducedMotion = (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  // Create store with initial system value
  const store = createStore<boolean>(getSystemReducedMotion());

  // Sync with system preference changes
  if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Listen for system preference changes
    const handleChange = (e: MediaQueryListEvent) => {
      store.set(e.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } 
    // Legacy fallback
    else if ('addListener' in mediaQuery) {
      // @ts-ignore
      mediaQuery.addListener(handleChange);
    }
  }

  return store;
})();

/**
 * Derived store for isDark (convenience helper)
 */
export const isDark = createDerived(theme, (t) => t === 'dark');
