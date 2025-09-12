import {test, expect, Page, Locator} from '@playwright/test';

export class NegativeLoginPage {

    private readonly page: Page;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly expectProducts: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.expectProducts = page.locator('//span[text()=\'Products\']');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
    }

    async clickButton() {
        await this.loginButton.click();
    }

    async expectProduct() {
        await expect(this.expectProducts).not.toBeVisible();
    }
}
