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

test('Добавление товара в корзину', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    // логин
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    // добавить товар
    await page.click('#add-to-cart-sauce-labs-backpack');
    // перейти в корзину
    await page.click('#shopping_cart_container');
    await expect(page.locator('[data-test="inventory-item"]')).toBeVisible();
});

test('Оформление заказа (checkout flow)', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    // добавить товар
    await page.click('#add-to-cart-sauce-labs-backpack');
    // перейти в корзину
    await page.click('#shopping_cart_container');
    // судя по тз нам не обязательно видеть карточку await expect(page.locator('.cart_list')).toBeVisible();
    await page.click('#checkout');
    // заполнить форму
    await page.fill('#first-name', 'TestFirstName');
    await page.fill('#last-name', 'TestLastName');
    await page.fill('#postal-code', '30301');
    await page.click('#continue'); // Continue
    await page.click('#finish'); // Finish
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
});

test('Проверка фильтрации товаров', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    // логин
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('.select_container');
    // выбрать сортировку
    await page.selectOption('[data-test="product-sort-container"]', 'lohi');
    // проверить порядок цен/in progress
});
