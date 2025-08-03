/*import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
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
  await page.fill('//input[@placeholder=\'Username\']', 'standard_user');
  await page.fill('//input[@placeholder=\'Password\']', 'secret_sauce');
  await page.click('//input[@type=\'submit\' and @class=\'submit-button btn_action\']'); //на всякий случай еще по классу определил
  await expect(page.locator('//span[text()=\'Products\']')).toHaveText('Products');
});

test('Негативный сценарий логина', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('//input[@placeholder=\'Username\']', 'wrong_user');
  await page.fill('//input[@placeholder=\'Password\'', 'wrong_pass');
  await page.click('//input[@type=\'submit\' and @class=\'submit-button btn_action\']');
  await expect(page.locator('//span[text()=\'Products\']')).toBeVisible();
});


