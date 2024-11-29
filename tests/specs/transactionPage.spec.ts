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

    test('User is able to switch to another product using the dropdown menu.', async({page}) => {
        const transaction = new transactionPage(page);

       await transaction.selectDifferentProduct();
    });

});

test.describe('Transaction Details tests', () => {

    test('User is able to see the product transactions.', async({page}) => {
        const transaction = new transactionPage(page);

       await transaction.selectAccount();
       await transaction.goToTransactions();
    });

    test('User is able to print the product transactions.', async({page}) => {
        const transaction = new transactionPage(page);

       await transaction.selectAccount();
       await transaction.goToTransactions();
       await transaction.printTransaction();
    });

    test('User is able to download the product transactions in PDF.', async({page}) => {
        const transaction = new transactionPage(page);

       await transaction.selectAccount();
       await transaction.goToTransactions();
       await transaction.downloadTransactionPDF();
    });

    test('User is able to download the product transactions in CSV.', async({page}) => {
        const transaction = new transactionPage(page);

       await transaction.selectAccount();
       await transaction.goToTransactions();
       await transaction.downloadTransactionCSV();
    });

});