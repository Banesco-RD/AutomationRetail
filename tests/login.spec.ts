import { test, expect } from '@playwright/test';
const { randomUUID } = require('crypto');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    let screenshotPath = `test-results/screenshots/screenshot-${randomUUID()}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
    testInfo.annotations.push({type: 'testrail_attachment', description: screenshotPath});
  }
});

test.describe('Log In', () => {
  
test('Login successfull', async ({ page },testInfo) => {

  testInfo.annotations.push({type: 'testrail_case_field', description: "refs: Inicio de Seccion"});

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Sign in to banesco-retail/);

  testInfo.annotations.push({type: 'testrail_result_comment', description: "Page Login"});
  //Log In
  await page.getByLabel('Username').fill('randujar11');

  await page.getByLabel('Password').click();
  
  await page.keyboard.type('Banesco01');

  await expect(page.getByRole('button', { name: 'Log in' })).toBeEnabled();

  await page.getByRole('button', { name: 'Log in' }).click();

  testInfo.annotations.push({type: 'testrail_result_comment', description: "Page Verification"});

  // Verification
  await expect(page.getByRole('heading', { name: 'Verification' })).toBeVisible();

  await page.getByLabel('+18').click();

  await expect(page.getByRole('button', { name: 'Continue ' })).toBeEnabled();
  await page.getByRole('button', { name: 'Continue ' }).click();

  testInfo.annotations.push({type: 'testrail_result_comment', description: "Page OTP"});

  // Verification Code
  await expect(page.getByRole('heading', { name: 'Verification code' })).toBeVisible();
  await page.locator('#otp').click();
  await page.keyboard.type('123456');

  await expect(page.getByRole('button', { name: 'Confirm' })).toBeEnabled();
  await page.getByRole('button', { name: 'Confirm' }).click();

  testInfo.annotations.push({type: 'testrail_result_comment', description: "Page Dashboard"});

  //Dashboard
  await expect(page.getByRole('heading', { name: 'My accounts' })).toBeVisible();
 });


test('Login failed', async ({ page }) => {

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Sign in to banesco-retail/);
  //Log In
  await page.getByLabel('Username').fill('lolito');
  await page.getByLabel('Password').click();
  await page.keyboard.type('Banesco');
  await expect(page.getByRole('button', { name: 'Log in' })).toBeEnabled();
  await page.getByRole('button', { name: 'Log in' }).click();

  //await expect(page.getByLabel('Oops! Please check the information entered and try again.'));

  //await expect(page.getByRole('caption', { name: 'Oops! Please check the information entered and try again.'})).toBeEnabled();

});

});
