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

    test('User can view the transaction details.', async({page}) => {
        const transaction = new transactionPage(page);

       await transaction.selectAccount();
       await transaction.goToTransactions();
       await transaction.viewTransactionDetails();
    });

});

test.describe.serial('Transaction notes tests.', () => {

    test('User can cancel notes in a transaction.', async({page}) => {
        const transaction = new transactionPage(page);

       await transaction.selectAccount();
       await transaction.goToTransactions();
       await transaction.cancelNote();
    });

    test('User can add notes to a transaction.', async({page}) => {
        const transaction = new transactionPage(page);

       await transaction.selectAccount();
       await transaction.goToTransactions();
       await transaction.addNote();
    });

    test('User can edit notes from a transaction.', async({page}) => {
        const transaction = new transactionPage(page);

       await transaction.selectAccount();
       await transaction.goToTransactions();
       await transaction.editNote();
    });

    test('User can delete notes from a transaction.', async({page}) => {
        const transaction = new transactionPage(page);

       await transaction.selectAccount();
       await transaction.goToTransactions();
       await transaction.deleteNote();
    });

});