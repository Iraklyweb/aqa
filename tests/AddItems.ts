import {test, expect, Page, Locator} from '@playwright/test';

export class AddItems {

    private readonly page: Page;
    private readonly addItem: Locator;
    private readonly cart: Locator;
    private readonly expectItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addItem = page.locator('#add-to-cart-sauce-labs-backpack');
        this.cart = page.locator('#shopping_cart_container');
        this.expectItem = page.locator('[data-test="inventory-item"]');
    }

    async addItemToCart() {
        await this.addItem.click();
    }

    async openCart() {
        await this.cart.click();
    }

    async expectProducts() {
        await expect(this.expectItem).toBeVisible();
    }
}

