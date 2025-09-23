import { test, expect } from '@playwright/test';
import {LoginPage} from "./loginPage";
import {CartPage} from "./CartPage";
import {InventoryPage} from "./inventoryPage";

test('Позитивный сценарий логина', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventory = new InventoryPage(page);
    await loginPage.navigation();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.clickLoginButton();
    await inventory.validateTitle();
});

test('Негативный сценарий логина', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventory = new InventoryPage(page);
    await loginPage.navigation();
    await loginPage.login('wrong_user', 'wrong_pass');
    await loginPage.clickLoginButton();
    await inventory.validateTitleBeNotVisible();
});

test('Добавить товар в магазин', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const cart = new CartPage(page);
    await loginPage.navigation();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.clickLoginButton();
    await cart.addItemToCart();
    await cart.openCart();
    await cart.availabilityProductCard();
});

test('Оформление заказа (checkout flow)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const cart = new CartPage(page);
    await loginPage.navigation();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.clickLoginButton();
    await cart.addItemToCart();
    await cart.openCart();
    await cart.clickCheckout();
    await cart.fillCheckoutInfo('TestFirstName','TestLastName','30301');
    await cart.clickContinue();
    await cart.clickFinish();
    await cart.expectOrderCompletionMessage();
});

test('Проверить фильтрацию', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventory = new InventoryPage(page);
    await loginPage.navigation();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.clickLoginButton();
    await inventory.selectFilter();
    await inventory.selectingFilterValue('lohi');
    await inventory.checkFilter();
});