import { test } from '@playwright/test';
import { transactionPage } from '../POM/transactionsPage';
import { common } from '../POM/common';

test.beforeEach(async({page}) =>{//go to BD retail
    const commonObj = new common(page);
    await commonObj.goToBanescoRetail();
});

test.describe('Product Details tests', () => {

    test('User can see TDC details.', async({page}) => {
        const transaction = new transactionPage(page);

       await transaction.tdcDetails(); 
    });

    test('User can see Account details.', async({page}) => {
        const transaction = new transactionPage(page);

       await transaction.accountDetails(); 
    });

});