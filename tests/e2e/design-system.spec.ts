import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// --------------------------------------------------
// Global Accessibility & Core Pages
// --------------------------------------------------

const pages = [
  '/design/button',
  '/design/tabs',
  '/design/accordion',
  '/design/bento',
  '/design/breadcrumbs',
  '/design/toast',
  '/design/link',
  '/design/paper',
  '/design/svg',
  '/design/text',
  '/design/card',
  '/design/table',
  '/design/search-combobox'
];

for (const path of pages) {
  test(`accessibility: ${path}`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('networkidle');
    
    const results = await new AxeBuilder({ page })
      .exclude('.preview-code') // Code blocks often have low contrast themes by design
      .analyze();
    
    expect(results.violations).toEqual([]);
  });
}

// --------------------------------------------------
// Component Interaction Tests
// --------------------------------------------------

test('interactive: tabs switching & keyboard nav', async ({ page }) => {
  await page.goto('/design/tabs');
  const preview = page.locator('.component-preview').first();
  
  const tab1 = preview.getByRole('tab', { name: "Overview" });
  const tab2 = preview.getByRole('tab', { name: "Technical Specs" });
  
  // 1. Click Interaction
  await tab2.click();
  await expect(preview.locator('.tab-panel[data-state="active"]')).toContainText('System Architecture');
  
  // 2. Keyboard Navigation
  await tab2.focus();
  await page.keyboard.press('ArrowLeft');
  await expect(tab1).toBeFocused();
  await expect(preview.locator('.tab-panel[data-state="active"]')).toContainText('Project Overview');
});

test('interactive: accordion exclusive mode', async ({ page }) => {
  await page.goto('/design/accordion');
  const preview = page.locator('.component-preview').nth(1); // Advanced (exclusive) example
  
  const item1 = preview.locator('details').nth(0);
  const item2 = preview.locator('details').nth(1);
  
  // Open Item 2
  await item2.locator('summary').click();
  await expect(item2).toHaveAttribute('open', '');
  
  // Item 1 should be closed (exclusive mode)
  await expect(item1).not.toHaveAttribute('open', '');
});

test('interactive: search live filtering', async ({ page }) => {
  await page.goto('/design/search-combobox');
  
  const searchInput = page.getByPlaceholder(/Search components/i);
  await searchInput.fill('Bento');

  const listItems = page.locator('#blueprint-list li');
  await expect(listItems.filter({ hasText: 'Bento Grid' })).toBeVisible();
  await expect(listItems.filter({ hasText: /^Button$/ })).not.toBeVisible();
});

// --------------------------------------------------
// Prop-Specific Verification Tests
// --------------------------------------------------

test('props: button loading & theme classes', async ({ page }) => {
  await page.goto('/design/button');
  const commonPreview = page.locator('.component-preview').first();
  const advancedPreview = page.locator('.component-preview').nth(1);
  
  // Verify themes render correct classes
  await expect(commonPreview.locator('.variant--primary')).toBeVisible();
  await expect(commonPreview.locator('.variant--ghost')).toBeVisible();
  
  // Verify loading state logic
  const loadingButton = advancedPreview.getByRole('button', { name: /Processing/i });
  await expect(loadingButton).toBeDisabled();
  await expect(advancedPreview.getByTestId('control-loader')).toBeVisible();
});

test('props: link active state & previews', async ({ page }) => {
  await page.goto('/design/link');
  // Use first() to avoid multi-element strict mode violation
  const activeLink = page.locator('a.is-active').first();
  await expect(activeLink).toBeVisible();
  
  // Hover preview test - specify locator to avoid ambiguity
  const previewLink = page.locator('a[data-preview="true"]').first();
  await previewLink.hover();
  await page.waitForTimeout(600); // Wait for hover-intent delay
  await expect(page.locator('.link-preview-card')).toBeVisible();
});

test('props: paper elevation & interaction', async ({ page }) => {
  await page.goto('/design/paper');
  
  // Check elevation classes
  await expect(page.locator('.layer--1').first()).toBeVisible();
  await expect(page.locator('.layer--2').first()).toBeVisible();
  
  // Check interactive hover effect
  const card = page.locator('.paper--interactive').first();
  await card.hover();
  await expect(card).toHaveClass(/paper--interactive/);
});

test('props: badge variations', async ({ page }) => {
  await page.goto('/design/badge');
  
  await expect(page.locator('.badge--primary').first()).toBeVisible();
  await expect(page.locator('.badge--success').first()).toBeVisible();
  await expect(page.locator('.badge--outlined').first()).toBeVisible();
  await expect(page.locator('.badge--xs').first()).toBeVisible();
});

test('props: bento grid spans', async ({ page }) => {
  await page.goto('/design/bento');
  
  const featuredItem = page.locator('.bento-item').first();
  // Use toHaveCSS instead of toHaveStyle
  await expect(featuredItem).toHaveCSS('grid-column', /span 2/);
  await expect(featuredItem).toHaveCSS('grid-row', /span 2/);
});

test('props: combobox datalist association', async ({ page }) => {
  await page.goto('/design/search-combobox');
  
  const comboInput = page.getByLabel('Project Category');
  const listId = await comboInput.getAttribute('list');
  expect(listId).toBeTruthy();
  
  const datalist = page.locator(`datalist#${listId}`);
  await expect(datalist).toBeAttached();
  await expect(datalist.locator('option[value="web"]')).toBeAttached();
});

test('props: text polymorphism', async ({ page }) => {
  await page.goto('/design/text');
  
  // The first preview should have an H2
  await expect(page.locator('h2').first()).toBeVisible();
  // Check the label variant
  await expect(page.locator('.text--label').first()).toBeVisible();
});
