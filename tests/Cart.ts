import {test, expect, Page, Locator} from '@playwright/test';

export class Cart {

    private readonly page: Page;
    private readonly cart: Locator;
    private readonly expectItem: Locator;
    private readonly checkoutButton : Locator;
    private readonly firstnameInput : Locator;
    private readonly lastnameInput : Locator;
    private readonly postalCodeInput : Locator;
    private readonly continueButton : Locator;
    private readonly finishButton : Locator;
    private readonly completeText : Locator;

    constructor(page: Page) {
        this.page = page;
        this.cart = page.locator('#shopping_cart_container');
        this.expectItem = page.locator('[data-test="inventory-item"]');
        this.checkoutButton = page.locator('#checkout');
        this.firstnameInput = page.locator('#first-name');
        this.lastnameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.finishButton = page.locator('#finish');
        this.completeText = page.locator('[data-test="complete-header"]');
    }

    async openCart() {
        await this.cart.click();
    }

    async expectProducts() {
        await expect(this.expectItem).toBeVisible();
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }

    async fillCheckoutInfo(username: string, password: string, postalCode: string) {
        await this.firstnameInput.fill(username);
        await this.lastnameInput.fill(password);
        await this.postalCodeInput.fill(password);
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    async clickFinish() {
        await this.finishButton.click();
    }

    async expectCompletetext() {
        await expect(this.completeText).toHaveText('Thank you for your order!');
    }
}

