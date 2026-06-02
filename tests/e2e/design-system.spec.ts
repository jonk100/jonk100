import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('design system pages accessibility and logic', async ({ page }) => {
  // Test Button documentation page
  await page.goto('/design/button');
  
  // Verify interactive states
  const loadingButton = page.getByRole('button', { name: /Processing/i });
  await expect(loadingButton).toBeDisabled();
  await expect(page.getByTestId('control-loader')).toBeVisible();

  // Run Axe accessibility scan
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});

test('tabs interaction', async ({ page }) => {
  await page.goto('/design/tabs');

  // Target the first preview specifically
  const preview = page.locator('.component-preview').first();
  const tab2 = preview.getByRole('tab', { name: "Technical Specs" });
  await tab2.click();

  // Verify the panel content within that specific preview
  const panel = preview.locator('.tab-panel[data-state="active"]');
  await expect(panel).toContainText('System Architecture');
  
  // Use a more specific role-based locator for the hidden text
  const overviewHeading = preview.getByRole('heading', { name: 'Project Overview' });
  await expect(overviewHeading).not.toBeVisible();
});

test('toast notification system', async ({ page }) => {
  await page.goto('/design/toast');

  const successBtn = page.getByRole('button', { name: "Success Toast" });
  await expect(successBtn).toBeVisible();
  
  await successBtn.click();

  // The toast-container should be in the DOM
  const container = page.locator('.toast-container');
  await expect(container).toBeAttached();

  // Wait for the toast item to appear
  const toast = page.locator('.toast-item');
  await expect(toast).toBeVisible({ timeout: 5000 });
  await expect(toast).toContainText('Blueprint saved successfully');
});
