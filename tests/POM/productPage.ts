import { expect, Page, Locator } from '@playwright/test';

export class productPage{
    readonly page: Page;

    constructor(page:Page){
        this.page = page;
    }
}