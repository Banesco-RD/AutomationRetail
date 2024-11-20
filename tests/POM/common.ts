import { Page, Locator, expect } from '@playwright/test';
import exp from 'constants';

export class common{
    readonly page: Page;
    readonly btnLanguage: Locator;
    readonly btnSpanish: Locator;
    readonly txtUser: Locator;
    readonly dropUser: Locator;
    readonly btnLogOut: Locator;

    constructor(page:Page){
        this.page = page;
        this.btnLanguage = page.locator("#kc-current-locale-link");
        this.btnSpanish = page.locator("a.es");
        this.txtUser = page.locator("#username");
        this.dropUser = page.locator("div.user-context-dropdown");
        this.btnLogOut = page.locator("button[data-role='logout']");
    }

    async goToBanescoRetail(){
        await this.page.goto(process.env.BASEURL as string);
        await this.btnLanguage.click();
        await this.btnSpanish.click();
        await expect(this.txtUser).toBeVisible();
    }

    async logOut(){
        await this.dropUser.click();
        await this.btnLogOut.click();
        await expect(this.txtUser).toBeVisible();
    }
}