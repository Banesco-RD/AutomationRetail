import { test } from '@playwright/test';
import { productPage } from '../POM/productPage';
import { common } from '../POM/common';

test.beforeEach(async({page}) =>{//go to BD retail
    const commonObj = new common(page);
    await commonObj.goToBanescoRetail();
});

test.describe('LogOut Test.', () => {

    test('User can Logout.', async({page}) => {
        const commonObj = new common(page);

        await commonObj.logOut();
    });

});