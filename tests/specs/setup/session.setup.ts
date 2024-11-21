import { test as setup } from '@playwright/test';
import { landingPage } from '../../POM/landingPage';
import { common } from '../../POM/common';
import path from 'path';

const authFile = path.join(__dirname, './sessionFile.json');

setup('Session Setup: save state.', async({page}) => {
    const landing = new landingPage(page);
    const commonObj = new common(page);

    await commonObj.goToBanescoRetailLogin();
    await landing.loginSuccess();
    await landing.selectOTPSMS();
    await landing.validateOTP(1);
    await landing.loginCompleted();
    await page.context().storageState({path: authFile});
});