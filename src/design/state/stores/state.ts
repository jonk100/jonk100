/**
 * Thome Store - stores and persists the value of the theme (light/dark) persistently.
 */
import { createPersistedStore, createStore, derivedStore  } from '../createStore';
export const theme = createPersistedStore<'light' | 'dark'>('dark', 'theme');

/**
 * Sidebar Store - stores the value of whether the sidebar is open or closed.
 */
export const sidebar = createStore(false);


/**
 * Motion Store - stores the value of `reduced motion` for accessibility.
 */
export const motion = createStore(true);

/**
 * Sandbox Store - stores and persists values from the sandbox and stores whether it is active/open
 */
export const sandbox = createPersistedStore({
  active: false,
  code: '',
}, 'sandbox');

