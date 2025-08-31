import { expect, test } from '@playwright/test';

test.describe('Button Tab Flow check', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/articles'); // adjust to your route
  });

  test('should render with slot content', async ({ page }) => {
    // await page.goto('/articles');
    const button = page.getByRole('button', { name: 'Published' });
    await expect(button).toBeVisible();
  });

  test('should be clickable', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Published' });
    await button.click();

    // TODO failing have to check and fix
    // console.log(await button.textContent());
    // console.log('URL after click:', page.url());
    // await page.pause();
    // await expect(page).toHaveURL(/status=Published/);
    // await expect(page).toHaveURL(/.*status=Published/);
    // await expect(page).toHaveURL(/.*articles\?status=Published/);
    // await expect(button).toHaveClass(/text-orange-400/);
    
    await expect(button).toHaveClass(/text-orange-400/, { timeout: 5000 });
  });
});
