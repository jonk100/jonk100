# 🧪 The Design System Testing Handbook (2026 Edition)

Welcome to the testing guide! This document is designed to take you from "zero knowledge" to "testing expert." It explains **why** we test, **how** we do it, and provides a **master checklist** to ensure every component in our design system is rock-solid.

---

## 1. Testing 101: The "What" and "Why"

### What is testing?
Think of testing as a **"Robot User."** Instead of you manually clicking every button and checking every color after every change, we write scripts that do it for us. 
- If a change you make accidentally breaks a button's "loading" state, the robot will scream (fail the test) immediately.

### Why do we bother?
1.  **Confidence**: You can refactor complex code knowing that if you break something, you'll know instantly.
2.  **Documentation**: Tests show other developers exactly how a component is *supposed* to behave.
3.  **Accessibility**: We can automatically check if our components work for people using screen readers.

---

## 2. The Toolbox: 2026 Professional Setup

Based on the latest **Astro 7+** and **Vite 8** standards, here is how to set up your environment.

### ⚡ Vitest (Unit & Component Testing)
*Best for: Testing `.astro` files in isolation.*

**1. Install Dependencies:**
```bash
pnpm add -D vitest vitest-browser-astro @vitest/browser-playwright playwright
```

**2. Configuration (`vitest.config.ts`):**
We use **Browser Mode** because it's the 2026 standard for accurate hydration testing. Note that version 4.0+ requires the `instances` array.
```typescript
import { getViteConfig } from "astro/config";
import { astroRenderer } from "vitest-browser-astro/plugin";
import { playwright } from "@vitest/browser-playwright";

export default getViteConfig({
  plugins: [astroRenderer()],
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      instances: [
        { browser: "chromium" },
      ],
    },
  },
});
```

**3. VS Code Integration:**
- Install the **"Vitest"** extension (Publisher: `vitest.dev`).
- This adds a **"Flask" icon** to your sidebar and **Play buttons** directly in your code gutters.

---

### 🎭 Playwright (End-to-End & Interaction)
*Best for: Testing real user flows, Tabs, Modals, and Toasts.*

**1. Initialize:**
```bash
pnpm create playwright
```
*Choose **TypeScript** and **Yes** for GitHub Actions.*

> **Fedora User Note:** If `playwright install --with-deps` fails with "apt-get not found", install dependencies manually via DNF:
> ```bash
> sudo dnf install alsa-lib at-spi2-atk atk cairo cups-libs dbus-glib desktop-file-utils expat flite fontconfig freetype fribidi gdk-pixbuf2 glib2 graphite2 gtk3 harfbuzz libX11 libXcomposite libXcursor libXdamage libXext libXfixes libXi libXrandr libXrender libXScrnSaver libXtst libdrm libffi libgcc libicu libjpeg-turbo libpng libstdc++ libuuid libwebp libxcb libxkbcommon mesa-libgbm nss pango pixman systemd-libs wayland-libs zlib
> ```

**2. Configuration (`playwright.config.ts`):**
```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: { baseURL: 'http://localhost:4321' },
  webServer: {
    command: 'pnpm run preview',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
  },
});
```

**3. VS Code Integration:**
- Install the **"Playwright Test"** extension (Publisher: `Microsoft`).
- Use **"UI Mode"** (`npx playwright test --ui`) for a "time-travel" debugging experience.

---

### ♿ Axe (Automated Accessibility)
*Best for: Catching 57% of WCAG violations automatically.*

**1. Install Official Deque Integration:**
```bash
pnpm add -D @axe-core/playwright
```

**2. Implementation (Inside a Playwright Test):**
```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('page should have no a11y violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

---
## 4. The Master Testing Checklist

Use this list to mark off components as they are fully verified.

### 🔷 Primitives (Static HTML)

*Goal: Ensure props map to the correct CSS classes.*

- [ ] **Icon**: Renders the correct SVG path based on `name`.
- [ ] **Svg**: Autocomplete works; throws error/fallback if icon is missing.
- [ ] **Link**: 
    - [ ] `is-active` class appears on current page.
    - [ ] `preview` card appears after 400ms hover.
- [ ] **Paper**: 
    - [ ] Elevation levels (-1 to 5) change background/shadow.
    - [ ] `interactive` prop enables hover-lift transforms.
- [ ] **Frame**: Aspect ratios (square, circle, etc.) crop correctly.

### 📐 Layouts (Structure)

*Goal: Ensure spacing and alignment logic is perfect.*

- [ ] **Box**: Utility classes (`p-md`, `layer--1`) are applied correctly.
- [ ] **Center**: 
    - [ ] `axis="both"` centers perfectly in the middle.
    - [ ] `axis="horizontal"` stays at the top but centered left-to-right.
- [ ] **Columns**: `layout="13"` creates a 1fr/3fr grid.
- [ ] **Stack / Inline**: `gap` props map to the correct spacing tokens.
- [ ] **Bento**:
    - [ ] `colSpan` and `rowSpan` apply the right grid rules.
    - [ ] Responsive: Grid collapses to 1-column on mobile.

### ✍️ Typography (Reading)

*Goal: Ensure hierarchy and legibility.*

- [ ] **Text**: `as` prop correctly changes the tag (e.g., `<Text as="h1">` is an `<h1>`).
- [ ] **MdHeading**: 
    - [ ] Hovering reveals the `#` anchor link.
    - [ ] `sticky` headings stay at the top during scroll.
- [ ] **SectionLabel**: Divider reaches the edge of the container.
- [ ] **Prose**: Markdown content gets the correct relaxed line-height.

### 🕹️ Controls (Interaction)

*Goal: Ensure JS logic and state management are robust.*

- [ ] **Button**:
    - [ ] `loading={true}` disables clicks and shows Spinner.
    - [ ] `href` makes it a link; no `href` makes it a button.
- [ ] **Tabs**:
    - [ ] Clicking a tab button shows the correct panel.
    - [ ] Keyboard: `ArrowRight` moves focus to the next tab.
- [ ] **Accordion**:
    - [ ] Clicking the header toggles the `open` attribute.
    - [ ] `multiple={false}`: Opening A closes B.
- [ ] **Inputs (Search/ComboBox)**:
    - [ ] `Search` clear button works.
    - [ ] `ComboBox` shows the suggestion list when typing.

### 🔔 Feedback (Status)

*Goal: Ensure transient alerts work.*

- [ ] **Alert**: Theme colors match the intent (Red for danger, Green for success).
- [ ] **Toast**:
    - [ ] `toast.notify()` adds an element to the `ToastProvider`.
    - [ ] Toast disappears automatically after the `duration`.
- [ ] **Skeleton**:
    - [ ] Shimmer animation is active.
    - [ ] `SkeletonGroup` correctly swaps between "loading" and "content" slots.


## 4. Common "Edge Cases" (The Sneaky Bugs)

1.  **The "Ghost" Slot**: What happens if I leave a component empty?
2.  **The "Novel" Text**: What happens if I put 1,000 words in a small Button?
3.  **The "Broken Path"**: What happens if an `Image` URL doesn't exist?
4.  **The "Tab Trap"**: When a Modal is open, can I "tab" into the background?

---

## 5. Recommended Next Steps

1.  **Install the Tools**: Run the `pnpm` commands above.
2.  **Setup VS Code**: Install the Vitest and Playwright extensions.
3.  **Write Your First Test**: Create `src/components/ui/Button.test.ts`.
4.  **Go Green**: Run your tests and celebrate the checkmarks! ✅
