import {test, expect, Page, Locator} from '@playwright/test';

export class InventoryPage {

    private readonly page: Page;
    private readonly filter: Locator;
    private readonly itemPrice: Locator;
    private readonly container: Locator;
    private readonly title: Locator;

    constructor(page: Page) {
        this.page = page;
        this.filter = page.locator('.select_container');
        this.container = page.locator('.product_sort_container');
        this.itemPrice = page.locator('.inventory_item_price');
        this.title = page.locator('//span[text()=\'Products\']');
    }

    async selectFilter() {
        await this.filter.click();
    }

    async validateTitle() {
        await expect(this.title).toHaveText('Products');
    }

    async validateTitleBeNotVisible() {
        await expect(this.title).not.toBeVisible();
    }

    async selectFilterValue(option: string) {
        await this.container.selectOption(option);
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
