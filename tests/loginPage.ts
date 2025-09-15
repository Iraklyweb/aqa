import {test, expect, Page, Locator} from '@playwright/test';

export class LoginPage {

    private readonly page: Page;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly title: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.title = page.locator('//span[text()=\'Products\']');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async validateTitle() {
        await expect(this.title).toHaveText('Products');
    }

    async validateTitle() {
        await expect(this.title).not.toBeVisible();
    }
}













