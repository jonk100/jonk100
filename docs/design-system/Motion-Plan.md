# Motion & Constant Flow Implementation Plan

This document outlines the architectural roadmap for fully integrating a cohesive, performant, and accessible motion system across the portfolio. It bridges the gap between static design tokens (`motion.css`, `animations.css`), client-side reactive state (Custom Vanilla Stores), and Astro's View Transitions.

## 1. State Management Foundation (Vanilla Pub/Sub)

The first step is establishing a unified client-side state contract so the entire UI can react to user preferences instantly. Rather than using external libraries like NanoStores, we will build a lightweight, zero-dependency reactive state engine.

**Deliverables:**
- **`src/design/state/store.ts`**: Implement custom `createStore`, `createPersistedStore`, and `createDerived` functions utilizing a simple pub/sub pattern (observers).
- **`src/design/state/preferences.ts`**: Utilize the custom stores to manage:
  - `reducedMotion` (boolean, syncing automatically with `window.matchMedia('(prefers-reduced-motion: reduce)')`)
  - `theme` (light/dark)
- **Global Initialization Script**: Create a tiny, non-blocking inline script placed in `<head>` (or via an Astro island) that reads the `reducedMotion` and `theme` states and immediately attaches dataset attributes to the `<html>` element (e.g., `<html data-reduced-motion="true" data-theme="dark">`). This prevents FOUC (Flash of Unstyled Content).

## 2. CSS Architecture & Token Refinement

Currently, motion tokens exist in `motion.css`, but components are hardcoding transition values (e.g., `transition: all 0.2s ease`). The goal is to funnel *all* movement through the token layer and enforce global accessibility kill-switches.

**Deliverables:**
- **Refactor Interactive Components**: Audit `Button.astro`, `Paper.astro`, `Chip.astro`, `IconButton.astro`, etc. Replace hardcoded transitions with tokens: `transition: all var(--base) var(--ease-out);`.
- **Global Motion Kill-Switch**: Update `animations.css` and `motion.css` to hook into the `data-reduced-motion` attribute:
  ```css
  html[data-reduced-motion="true"] *,
  html[data-reduced-motion="true"] *::before,
  html[data-reduced-motion="true"] *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  ```
  *(Note: `0.01ms` is safer than `none` because it still triggers necessary JavaScript `transitionend` events).*

## 3. Enhancing `Transition.astro`

The current `Transition.astro` is a great start, but it needs to be more powerful to orchestrate complex page-to-page flows.

**Deliverables:**
- **Dynamic View-Transition Names**: Extend the component to automatically hash or generate unique `view-transition-name` strings if a specific ID is provided, allowing developers to wrap an `<Image>` on a blog index and automatically link it to the Hero Image on the blog detail page.
- **Entering vs. Exiting**: Standardize how components animate *into* the DOM vs. how they animate *out*.

## 4. Building Choreography Components (Constant Flow)

Static pages jump. Cinematic pages flow. To achieve "constant flow," we need primitives that manage the timing of multiple elements entering the viewport.

**Deliverables:**
- **`Reveal.astro` (Scroll-Triggered Intersections)**: 
  A wrapper component utilizing a lightweight `IntersectionObserver` via a custom web element `<scroll-reveal>`. When the element enters the viewport, it adds a `.is-visible` class, triggering the CSS keyframes defined in `animations.css` (like `animate-slide-up`).
- **`StaggerGroup.astro` (List Choreography)**:
  A layout wrapper (ideal for `BentoGrid` or `Timeline`) that automatically applies incremental `--stagger-delay` CSS variables to its children. 
  ```css
  .stagger-item {
    animation-delay: calc(var(--stagger-index) * var(--fast));
  }
  ```
  This allows lists to "waterfall" into view sequentially rather than appearing simultaneously.

## 5. View Transitions API Integration

The final layer is tying page navigation together. Astro makes this easy, but the design system needs explicit rules on *what* should transition.

**Deliverables:**
- **`<ClientRouter />` Integration**: Ensure the router is mounted in the root layout.
- **Hero Image Morphing**: Map the `Image` component on Project Cards directly to the Hero Header on `ProjectLayout.astro` using shared `view-transition-name: project-hero-${slug}` properties.
- **Shared Navigation Headers**: Ensure headers and sidebars are excluded from page transitions (or configured as persistent) so they remain statically anchored while the main content cross-fades below them.

## Summary

By wiring the **Custom Vanilla Stores** (`reducedMotion`) to the **Root DOM** (`data-reduced-motion`), tying **Component CSS** to **Motion Tokens**, and wrapping content in **Intersection Observers (`Reveal`)**, the portfolio will gain a cinematic, unified flow that degrades gracefully and perfectly respects accessibility preferences.
