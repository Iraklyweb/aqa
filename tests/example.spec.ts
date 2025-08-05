
/*test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
 */

import { test, expect } from '@playwright/test';

test('Позитивный сценарий логина', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('//input[@id=\'user-name\']', 'standard_user');
  await page.fill('//input[@id=\'password\']', 'secret_sauce');
  await page.click('//input[@id=\'login-button\']');
  await expect(page.locator('//span[text()=\'Products\']')).toHaveText('Products');
});

test('Негативный сценарий логина', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('//input[@id=\'user-name\']', 'wrong_user');
  await page.fill('//input[@id=\'password\']', 'wrong_pass');
  await page.click('//input[@id=\'login-button\']');
  await expect(page.locator('//span[text()=\'Products\']')).toBeVisible();
});


