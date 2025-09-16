import {test, expect, Page, Locator} from '@playwright/test';

export class Inventory {

    private readonly page: Page;
    private readonly filter: Locator;
    private readonly itemPrice: Locator;
    private readonly container: Locator;
    private readonly addItem: Locator;
    private readonly cart: Locator;
    private readonly title: Locator;

    constructor(page: Page) {
        this.page = page;
        this.filter = page.locator('.select_container');
        this.container = page.locator('.product_sort_container');
        this.itemPrice = page.locator('.inventory_item_price');
        this.addItem = page.locator('#add-to-cart-sauce-labs-backpack');
        this.cart = page.locator('#shopping_cart_container');
        this.title = page.locator('//span[text()=\'Products\']');
    }

    async selectFilter() {
        await this.filter.click();
    }

    async addItemToCart() {
        await this.addItem.click();
    }

    async openCart() {
        await this.cart.click();
    }

    async validateTitle() {
        await expect(this.title).toHaveText('Products');
    }

    async invalidateElement() {
        await expect(this.title).not.toBeVisible();
    }

    async sortContainer(option: string) {
        await this.container.selectOption( option);
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
