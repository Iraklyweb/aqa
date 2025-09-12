import {test, expect, Page, Locator} from '@playwright/test';

export class AddItems {

    private readonly page: Page;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly addItem: Locator;
    private readonly cart: Locator;
    private readonly expectItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.addItem = page.locator('#add-to-cart-sauce-labs-backpack');
        this.cart = page.locator('#shopping_cart_container');
        this.expectItem = page.locator('[data-test="inventory-item"]');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
    }

    async clickButton() {
        await this.loginButton.click();
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

