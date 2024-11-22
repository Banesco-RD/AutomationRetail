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

test.describe('Product Summary page tests.', () => {

    test('User is able to see all available products', async({page}) => {
        const product = new productPage(page);

        await product.productSummary();
    });

    test('User to see the quick actions section.', async({page}) => {
        const product = new productPage(page);

        await product.quickActions;
    });

    test('User is able to use the quick actions to access Multicredit withdraw.', async({page}) => {
        const product = new productPage(page);

        await product.quickActions_MultiWithdraw();
    });

    test('User is able to use the quick actions to access Service Pay.', async({page}) => {
        const product = new productPage(page);

        await product.quickActions_PayService();
    });

});