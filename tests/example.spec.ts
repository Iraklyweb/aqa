import { test, expect } from '@playwright/test';
import {PositiveLoginPage} from "./PositiveLoginPage";
import {NegativeLoginPage} from "./NegativeLoginPage";
import {AddItems} from "./AddItems";
import {CheckFilter} from "./CheckFilter";

test('Позитивный сценарий логина', async ({ page }) => {
    const loginPage = new PositiveLoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.clickButton();
    await loginPage.expectProduct();
});

test('Негативный сценарий логина', async ({ page }) => {
    const negativeLoginPage = new NegativeLoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await negativeLoginPage.login('wrong_user', 'wrong_pass');
    await negativeLoginPage.clickButton();
    await negativeLoginPage.expectProduct();
});

test('Добавить товар в магазин', async ({ page }) => {
    const addItems = new AddItems(page);
    await page.goto('https://www.saucedemo.com/');
    await addItems.login('standard_user', 'secret_sauce');
    await addItems.clickButton();
    await addItems.addItemToCart();
    await addItems.openCart();
    await addItems.expectProducts();

});

test('Проверить фильтрацию', async ({ page }) => {
    const checkFilter = new CheckFilter(page);
    await page.goto('https://www.saucedemo.com/');
    await checkFilter.login('standard_user', 'secret_sauce');
    await checkFilter.clickButton();
    await checkFilter.selectFilter();
    await checkFilter.sortContainer();
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

test('Проверка фильтрации товаров', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('.select_container');
    await page.selectOption('[data-test="product-sort-container"]', 'lohi');
    // проверить порядок цен/in progress
    const prices = await page.locator('[data-test="inventory-item-price"]').allTextContents();
    console.log('это будет цены в долларах', prices);
    const  values = prices.map(
        function (value, index, array){
            const textWithoutPrice = value.replace('$', '')
            const price = parseFloat(textWithoutPrice);
            return price;
        }
    );
    console.log('Это будет числа',values);

    values.forEach((value, index,array) => {
        if (index !== array.length -1) {
            expect(value).toBeLessThanOrEqual(array[index + 1]);
        }
    });
});
'lohi'