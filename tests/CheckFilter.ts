import {test, expect, Page, Locator} from '@playwright/test';

export class CheckFilter {

    private readonly page: Page;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly filter: Locator;
    private readonly itemPrice: Locator;
    private readonly container: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.filter = page.locator('.select_container');
        this.container = page.locator('.product_sort_container');
        this.itemPrice = page.locator('.inventory_item_price');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
    }

    async clickButton() {
        await this.loginButton.click();
    }

    async selectFilter() {
        await this.filter.click();
    }

    async sortContainer() {
        await this.container.selectOption( 'lohi');
    }

    async checkFilter() {
     const prices = await this.itemPrice.allTextContents();
     const values = prices.map(
         function (value, index, array) {
             const textWithoutPrice = value.replace('$', '')
             const price = parseFloat(textWithoutPrice);
             return price;
         }
     );
     values.forEach((value, index, array) => {
         if (index !== array.length - 1) {
             expect(value).toBeLessThanOrEqual(array[index + 1]);
         }
     });
 }
}
