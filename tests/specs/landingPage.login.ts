import { chromium, test } from '@playwright/test';
import { landingPage } from '../POM/landingPage';
import { common } from '../POM/common';

test.beforeEach(async({page}) =>{//go to BD retail
    const commonObj = new common(page);
    await commonObj.goToBanescoRetail();
});

test.describe('Login page tests.', () => {

    test('User cannot login with Wrong User.', async({page}) => {
        const landing = new landingPage(page);

        await landing.loginWrongUser();
    });

    test('User cannot login with Wrong password.', async({page}) => {
        const landing = new landingPage(page);

        await landing.loginWrongPassword();
    });

    test('User enters the correct user and password.', async({page}) => {
        const landing = new landingPage(page);

        await landing.loginSuccess();
    });

});

test.describe('Forgot password tests.', () => {

    test('User can reset password with the forgot password option.', async({page}) => {
        const landing = new landingPage(page);

        await landing.goToForgotPassword();
        await landing.forgotPassword_Success();
    });

    test('User cannot reset password with an invalid user.', async({page}) => {
        const landing = new landingPage(page);

        await landing.goToForgotPassword();
        await landing.forgotPassword_WrongUser();
    });

    test('User new and confirmation passwords must match.', async({page}) => {
        const landing = new landingPage(page);

        await landing.goToForgotPassword();
        await landing.forgotPassword_Missmatch();
    });

    test('User password must not exceed 28 characters.', async({page}) => {
        const landing = new landingPage(page);

        await landing.goToForgotPassword();
        await landing.forgotPassword_28Max();
    });

    test('User password must have at least one letter.', async({page}) => {
        const landing = new landingPage(page);

        await landing.goToForgotPassword();
        await landing.forgotPassword_MustHaveLetter();
    });

    test('User password must include at least one number.', async({page}) => {
        const landing = new landingPage(page);

        await landing.goToForgotPassword();
        await landing.forgotPassword_MustHaveNumber();
    });

});

test.describe('OTP tests.', () => {

    test('User can complete otp via SMS.', async({page}) => {
        const landing = new landingPage(page);

        await landing.loginSuccess();
        await landing.selectOTPSMS();
        await landing.validateOTP(1);
        await landing.loginCompleted();
    });

    test('User can complete otp via Email.', async({page}) => {
        const landing = new landingPage(page);

        await landing.loginSuccess();
        await landing.selectOTPEmail();
        await landing.validateOTP(1);
        await landing.loginCompleted();
    });

    test('User can resend the OTP via SMS.', async({page}) => {
        const landing = new landingPage(page);

        await landing.loginSuccess();
        await landing.selectOTPSMS();
        await landing.resendOTP();
        await landing.validateOTP(1);
        await landing.loginCompleted();
    });

    test('User can resend the OTP via Email.', async({page}) => {
        const landing = new landingPage(page);

        await landing.loginSuccess();
        await landing.selectOTPEmail();
        await landing.resendOTP();
        await landing.validateOTP(1);
        await landing.loginCompleted();
    });

    test('User cannot enter an invalid OTP.', async({page}) => {
        const landing = new landingPage(page);
        
        await landing.loginSuccess();
        await landing.selectOTPEmail();
        await landing.validateOTP(0);
    });

    test('User can select the remember OTP opcion.', async({browser}) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const landing = new landingPage(page);
        const commonObj = new common(page);

        await landing.loginSuccess();
        await landing.selectOTPSMS();
        await landing.validateOTP(2);
        await landing.loginCompleted();
        await commonObj.logOut();
        await landing.loginWithoutOTP();
        await landing.loginCompleted();
    });

});

test.describe('LogOut Test.', () => {

    test('User can Logout.', async({page}) => {
        const landing = new landingPage(page);
        const commonObj = new common(page);

        await landing.loginSuccess();
        await landing.selectOTPSMS();
        await landing.validateOTP(1);
        await landing.loginCompleted();
        await commonObj.logOut();
    });

});