import { expect, test } from '@playwright/test';

test.describe('Home Page Check', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/'); // adjust to your route
  });

  test('home page has expected h1', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible();
  });

  test('On button Click, should navigate to Article Page', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    const linkToArticle = page.getByRole('link', { name: /book open Articles/ });
    await expect(linkToArticle).toBeVisible();
    await linkToArticle.hover();
    await linkToArticle.waitFor({ state: 'visible' });
    await linkToArticle.click();
    await expect(page.locator('text=Search')).toBeVisible();
  });
});
