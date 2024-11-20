import { test } from '@playwright/test';
import { landingPage } from '../../POM/landingPage';
import { common } from '../../POM/common';

/*test('Session Setup: save state.', async({page}) => {
    const landing = new landingPage(page);
    const commonObj = new common(page);

    await commonObj.goToBanescoRetail();
    await landing.loginSuccess();
    await landing.selectOTPSMS();
    await landing.validateOTP(1);
    await landing.loginCompleted();
});*/