import { test, expect } from '@playwright/test';
import {LoginPage} from "./loginPage";
import {AddItems} from "./AddItems";
import {Inventory} from "./inventory";

test('Позитивный сценарий логина', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.clickLoginButton();
    await loginPage.validateTitle();
});

test('Негативный сценарий логина', async ({ page }) => {
    const negativeLoginPage = new NegativeLoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await negativeLoginPage.login('wrong_user', 'wrong_pass');
    await negativeLoginPage.clickButton();
    await negativeLoginPage.expectProduct();
});

test('Добавить товар в магазин', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const addItems = new AddItems(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.clickLoginButton();
    await addItems.addItemToCart();
    await addItems.openCart();
    await addItems.expectProducts();
});

test('Проверить фильтрацию', async ({ page }) => {
    const checkFilter = new Inventory(page);
    await page.goto('https://www.saucedemo.com/');
    await checkFilter.login('standard_user', 'secret_sauce');
    await checkFilter.clickButton();
    await checkFilter.selectFilter();
    await checkFilter.sortContainer('lohi');
    await checkFilter.checkFilter();
});

/*test('Оформление заказа (checkout flow)', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('#add-to-cart-sauce-labs-backpack');
    await page.click('#shopping_cart_container');
    await page.click('#checkout');
    await page.fill('#first-name', 'TestFirstName');
    await page.fill('#last-name', 'TestLastName');
    await page.fill('#postal-code', '30301');
    await page.click('#continue');
    await page.click('#finish');
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
});*/
