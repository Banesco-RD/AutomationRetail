// pageObject.ts
import { Locator, Page } from '@playwright/test';

export class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get usernameInput(): Locator {
        return this.page.locator('#username');
    }

    get passwordInput(): Locator {
        return this.page.locator('#password');
    }

    get loginButton(): Locator {
        return this.page.locator('#kc-login');
    }

    get languageDropdown(): Locator {
        return this.page.locator('#kc-current-locale-link');
    }

    get languageOptionEnglish(): Locator {
        return this.page.locator('a.language-option.en');
    }

    get languageOptionSpanish(): Locator {
        return this.page.locator('a.language-option.es');
    }

    async enterUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async selectLanguage(language: 'en' | 'es') {
        await this.languageDropdown.click();
        if (language === 'en') {
            await this.languageOptionEnglish;
        } else {
            await this.languageOptionSpanish.click();
        }
    }
}