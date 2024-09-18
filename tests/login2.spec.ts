import { test, expect } from '@playwright/test';
import { LoginPage } from '../POM/loginPage';

test.describe('Login Page Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await page.goto('/');
    });

    test('should display login form', async () => {
        await expect(loginPage.usernameInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
    });

    test('should allow user to enter username and password', async () => {
        await loginPage.enterUsername('testuser');
        await loginPage.enterPassword('testpassword');

        await expect(loginPage.usernameInput).toHaveValue('testuser');
        await expect(loginPage.passwordInput).toHaveValue('testpassword');
    });

    test('should disable login button when fields are empty', async () => {
        await expect(loginPage.loginButton).toBeDisabled();
    });

    test('should change language to Spanish', async () => {
        await loginPage.selectLanguage('es');
        const currentLocale = await loginPage.languageDropdown.innerText();
        expect(currentLocale.trim()).toBe('Español');
    });

    test('should change language to English', async () => {
        await loginPage.selectLanguage('en');
        const currentLocale = await loginPage.languageDropdown.innerText();
        expect(currentLocale.trim()).toBe('English');
    });

   
});