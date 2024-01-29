import { test, expect } from '@playwright/test';

// get text 58K and print to console.
// this is git version control from SM
test('my practice', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  expect(await page.locator('.DocSearch-Button-Placeholder').isVisible()).toBe(true);
  await page.locator('.DocSearch-Button-Placeholder').click();
  await page.waitForTimeout(5000);
  await page.locator("#docsearch-input").fill('image');
  await page.locator('#docsearch-item-2').click();
  //let pageText = await page.locator('').textContent(); 
  // await page.locator("[aria-label='58k+ stargazers on GitHub']").click();
  // Click the get started link.
  // await page.getByRole('link', { name: 'star' }).click();

  // Expects page to have a heading with the name of Installation.
  // await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

//#docsearch-item-2
