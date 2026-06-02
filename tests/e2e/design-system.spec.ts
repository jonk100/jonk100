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

  const tab2 = page.getByRole('tab', { name: /Technical Specs/i });
  await tab2.click();

  await expect(page.getByText('System Architecture')).toBeVisible();
  await expect(page.getByText('Project Overview')).not.toBeVisible();
});

test('toast notification system', async ({ page }) => {
  await page.goto('/design/toast');

  const successBtn = page.getByRole('button', { name: /Success Toast/i });
  await successBtn.click();

  const toast = page.locator('.toast-item');
  await expect(toast).toBeVisible();
  await expect(toast).toContainText('Blueprint saved successfully');
});
