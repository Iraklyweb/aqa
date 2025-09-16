import { test, expect } from '@playwright/test';
import {LoginPage} from "./loginPage";
import {Cart} from "./Cart";
import {Inventory} from "./inventory";

test('Позитивный сценарий логина', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventory = new Inventory(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.clickLoginButton();
    await inventory.validateTitle();
});

test('Негативный сценарий логина', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventory = new Inventory(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('wrong_user', 'wrong_pass');
    await loginPage.clickLoginButton();
    await inventory.invalidateElement();
});

test('Добавить товар в магазин', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const cart = new Cart(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.clickLoginButton();
    await loginPage.addItemToCart();
    await cart.openCart();
    await cart.expectProducts();
});

test('Оформление заказа (checkout flow)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const cart = new Cart(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.clickLoginButton();
    await loginPage.addItemToCart();
    await cart.openCart();
    await cart.clickCheckout();
    await cart.fillCheckoutInfo('TestFirstName','TestLastName','30301');
    await cart.clickContinue();
    await cart.clickFinish();
    await cart.expectCompletetext();
});

test('Проверить фильтрацию', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventory = new Inventory(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.clickLoginButton();
    await inventory.selectFilter();
    await inventory.sortContainer('lohi');
    await inventory.checkFilter();
});