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
  await page.fill('#user-name', 'wrong_user');
  await page.fill('//input[@id=\'password\']', 'wrong_pass');
  await page.click('//input[@id=\'login-button\']');
  await expect(page.locator('//span[text()=\'Products\']')).not.toBeVisible();
  await expect(page.locator('.error-message-container')).toBeVisible();
});


