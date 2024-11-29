import { expect, Page, Locator } from '@playwright/test';
import { common } from './common';

export class transactionPage{
    readonly page: Page;
    readonly commonObj: common;
    readonly btnTDCSelect: Locator;
    readonly btnAccSelect: Locator;
    readonly labelTDCNumber: Locator;
    readonly labelTDCName: Locator;
    readonly productNumber: Locator;
    readonly productName: Locator;
    readonly selectProduct: Locator;
    readonly optionProduct: Locator;
    readonly optionProdNumber: Locator;
    readonly optionProdName: Locator;
    readonly actualLimitPayDay: Locator;
    readonly productInfo: Locator;
    readonly labelAccNumber: Locator;
    readonly labelAccName: Locator;
    readonly urlAccountInfo: Locator;
    readonly urlTransaction: Locator;
    readonly urlAccountStatus: Locator;
    readonly txtSearch: Locator;
    readonly btnFilter: Locator;
    readonly btnPrint: Locator;
    readonly btnDownload: Locator;
    readonly transactionItemList: Locator;
    readonly btnDownloadPDF: Locator;
    readonly btnDownloadCSV: Locator;
    readonly detailsAccName: Locator;
    readonly detailsBalance: Locator;
    readonly detailsCategory: Locator;
    readonly detailsAmountLabel: Locator;
    readonly detailsName: Locator;
    readonly detailsInfo: Locator;
    readonly detailsImgHeader: Locator;
    readonly btnAddNote: Locator;

    constructor(page:Page){
        this.page = page;
        this.commonObj = new common(this.page);
        this.btnTDCSelect = page.locator("[data-role='credit-cards'] div.bb-list__item");
        this.btnAccSelect = page.locator("[data-role='savings-accounts'] div.bb-list__item");
        this.labelTDCNumber = page.locator("[data-role='credit-cards'] span[data-role='product-number']");
        this.labelTDCName = page.locator("[data-role='credit-cards'] div[class*='--line-clamp']"); //use pos 1
        this.productNumber = page.locator("span[class*='__product-number']"); //use position 1
        this.productName = page.locator("div[class*='--line-clamp']"); //use postion 1
        this.selectProduct = page.locator("div.account-selector-item");
        this.optionProduct = page.locator("div.ng-option");
        this.optionProdNumber = page.locator("div.ng-option span[class*='__product-number']");
        this.optionProdName = page.locator("div.ng-option div.bb-ellipsis--line-clamp");
        this.actualLimitPayDay = page.locator("div[class*='__details-footer'] div div div"); //use pos 1
        this.productInfo = page.locator("div.account-detail-base__item");
        this.labelAccNumber = page.locator("[data-role='savings-accounts'] div[class*='__bottom-row'] span");
        this.labelAccName = page.locator("[data-role='savings-accounts'] div[class*='--line-clamp']");
        this.urlAccountInfo = page.locator("a.nav-link").nth(0);
        this.urlTransaction = page.locator("a.nav-link").nth(1);
        this.urlAccountStatus = page.locator("a.nav-link").nth(2);
        this.txtSearch = page.locator("input[class*='bb-search-box']");
        this.btnFilter = page.locator("button.btn-secondary").nth(1);
        this.btnPrint = page.locator("button.btn-secondary").nth(2);
        this.btnDownload = page.locator("button.btn-secondary").nth(3);
        this.transactionItemList = page.locator("div[role='listitem']");
        this.btnDownloadPDF = page.locator("a[role='menuitem']").nth(0);
        this.btnDownloadCSV = page.locator("a[role='menuitem']").nth(1);
        this.detailsAccName = page.locator("div.account-name");
        this.detailsBalance = page.locator("div.balance");
        this.detailsCategory = page.locator("div.categoryLabel");
        this.detailsAmountLabel = page.locator("div[class*='details__detalle'] div div").nth(5);
        this.detailsName = page.locator("div.pb-4 li label");
        this.detailsInfo = page.locator("div.pb-4 li span");
        this.detailsImgHeader = page.locator("div.my-3 h3");
        this.btnAddNote = page.locator("button.mt-4");
    }

    async selectTDC(){
        await this.btnTDCSelect.nth(0).click();
        await this.productPageValidation();
    }

    async selectAccount(){
        await this.btnAccSelect.nth(0).click();
        await this.productPageValidation();
    }

    async productPageValidation(){
        await this.commonObj.pageTitle("Detalle de Producto");
        await Promise.all([
            expect(this.selectProduct).toBeVisible(),
            expect(this.urlAccountInfo).toBeVisible(),
            expect(this.urlTransaction).toBeVisible(),
            expect(this.urlAccountStatus).toBeVisible(),
        ]);
    }

    async tdcDetails(){
        const tdcNumber = await this.labelTDCNumber.nth(0).innerText();
        const tdcName = await this.labelTDCName.nth(1).innerText();
        await this.selectTDC();
        await this.tdcPageValidation(tdcName, tdcNumber);
    }

    async tdcPageValidation(tdcName, tdcNumber){
        await Promise.all([
            expect(this.productName.nth(1)).toContainText(tdcName),
            expect(this.productNumber.nth(1)).toContainText(tdcNumber),
            expect(this.productInfo.nth(0).locator("strong")).toContainText("Fecha límite de pago"),
            expect(this.actualLimitPayDay.nth(1)).toBeVisible(),
            expect(this.productInfo.nth(1).locator("strong")).toContainText("Cuota del mes"),
            expect(this.productInfo.nth(2).locator("strong")).toContainText("Pago total"),
            expect(this.productInfo.nth(3).locator("strong")).toContainText("Crédito disponible"),
            expect(this.productInfo.nth(4).locator("strong")).toContainText("Limite de crédito"),
            expect(this.productInfo.nth(5).locator("strong")).toContainText("Balance a la fecha"),
            expect(this.productInfo.nth(7).locator("strong")).toContainText("Monto del último pago"),
            expect(this.productInfo.nth(8).locator("strong")).toContainText("Fecha del último pago"),
            expect(this.productInfo.nth(9).locator("strong")).toContainText("Nº cuotas vencidas"),
            expect(this.productInfo.nth(10).locator("strong")).toContainText("Monto vencido"),
            expect(this.productInfo.nth(11).locator("strong")).toContainText("Tasa de interés"),
        ]);

        let productInfoNum = await this.productInfo.count();
        for(let i=0;i<productInfoNum; i++){

            if(i==0 || i==6 || i==8 || i==9){
                await expect(this.productInfo.nth(i).locator("div").nth(0)).toBeVisible();
                await expect(this.productInfo.nth(i).locator("div").nth(1)).toBeVisible();
            }else if((i>0 && i<5) || i==7 || i==10 || i==11){
                await expect(this.productInfo.nth(i).locator("div").nth(0)).toBeVisible();
                await expect(this.productInfo.nth(i).locator("div").nth(1)).toBeVisible();
                await expect(this.productInfo.nth(i).locator("div").nth(2)).toBeVisible();
            }
        }
    }

    async accountDetails(){
        const accountNumber = await this.labelAccNumber.nth(0).innerText();
        const accountName = await this.labelAccName.nth(1).innerText();
        await this.selectAccount();
        await this.accountPageValidation(accountName, accountNumber);
    }

    async accountPageValidation(accountName, accountNumber){
        await Promise.all([
            expect(this.productName.nth(1)).toContainText(accountName),
            expect(this.productNumber.nth(0)).toContainText(accountNumber),
            expect(this.productInfo.nth(0).locator("strong")).toContainText("Balance disponible"),
            expect(this.productInfo.nth(1).locator("strong")).toContainText("Balance total"),
            expect(this.productInfo.nth(2).locator("strong")).toContainText("Monto en tránsito"),
            expect(this.productInfo.nth(3).locator("strong")).toContainText("Fecha de apertura"),
            expect(this.productInfo.nth(4).locator("strong")).toContainText("Monto retenido"),
            expect(this.productInfo.nth(5).locator("strong")).toContainText("Estatus de la cuenta"),
            expect(this.productInfo.nth(6).locator("strong")).toContainText("Oficial de cuenta"),
            expect(this.productInfo.nth(7).locator("strong")).toContainText("Número cuenta regional"),
            expect(this.productInfo.nth(8).locator("strong")).toContainText("Sucursal de la cuenta"),
            expect(this.productInfo.nth(9).locator("strong")).toContainText("Tasa de interés"),
        ]);

        let productInfoNum = await this.productInfo.count();
        for(let i=0;i<productInfoNum; i++){
            await expect(this.productInfo.nth(i).locator("div").nth(0)).toBeVisible();
            await expect(this.productInfo.nth(i).locator("div").nth(1)).toBeVisible();
        }
    }

    async selectDifferentProduct(){
        await this.selectAccount();
        await this.selectProduct.click();
        await expect(this.optionProduct.nth(0)).toBeVisible();
        const productNumber = await this.optionProdNumber.nth(0).innerText();
        const productName = await this.optionProdName.nth(1).innerText();

        await this.optionProduct.nth(0).click();
        await expect(this.optionProduct.nth(0)).toBeHidden();
        await this.accountPageValidation(productName, productNumber);
    }

    async goToTransactions(){
        await this.urlTransaction.click();
        await Promise.all([
            expect(this.txtSearch).toBeVisible(),
            expect(this.btnFilter).toBeVisible(),
            expect(this.btnPrint).toBeVisible(),
            expect(this.btnDownload).toBeVisible(),
            expect(this.transactionItemList.nth(0)).toBeVisible(),
        ]);
    }

    async printTransaction(){
        await this.page.evaluate('(() => {window.waitForPrintDialog = new Promise(f => window.print = f);})()');
        await this.btnPrint.click();
        await this.page.waitForFunction('window.waitForPrintDialog');
    }

    async downloadTransactionPDF(){
        const downloadPromise = this.page.waitForEvent('download');
        await this.btnDownload.click();
        await this.btnDownloadPDF.click();
        const download = await downloadPromise;
        await expect(download).toBeTruthy();
    }

    async downloadTransactionCSV(){
        const downloadPromise = this.page.waitForEvent('download');
        await this.btnDownload.click();
        await this.btnDownloadCSV.click();
        const download = await downloadPromise;
        await expect(download).toBeTruthy();
    }

    async viewTransactionDetails(){
        await this.transactionItemList.nth(0).click();
        await Promise.all([
            expect(this.detailsAccName).toBeVisible(),
            expect(this.detailsBalance).toBeVisible(),
            expect(this.detailsCategory).toBeVisible(),
            expect(this.detailsAmountLabel).toBeVisible(),
            expect(this.detailsName.nth(0)).toContainText("Fecha de transacción"),
            expect(this.detailsName.nth(1)).toContainText("Fecha de aplicación"),
            expect(this.detailsName.nth(2)).toContainText("Descripción"),
            expect(this.detailsName.nth(3)).toContainText("Número del cheque"),
            expect(this.detailsName.nth(4)).toContainText("Monto débito"),
            expect(this.detailsName.nth(5)).toContainText("Monto crédito"),
            expect(this.detailsName.nth(6)).toContainText("Estatus de la transacción"),
            expect(this.detailsName.nth(7)).toContainText("Balance total"),
            expect(this.detailsName.nth(8)).toContainText("Código de aprobación"),
            expect(this.detailsName.nth(9)).toContainText("Número de referencia"),
            expect(this.detailsInfo.nth(0)).toBeVisible(),
            expect(this.detailsInfo.nth(1)).toBeVisible(),
            expect(this.detailsInfo.nth(2)).toBeVisible(),
            expect(this.detailsInfo.nth(3)).toBeVisible(),
            expect(this.detailsInfo.nth(4)).toBeVisible(),
            expect(this.detailsInfo.nth(5)).toBeVisible(),
            expect(this.detailsInfo.nth(6)).toBeVisible(),
            expect(this.detailsInfo.nth(7)).toBeVisible(),
            expect(this.detailsInfo.nth(8)).toBeVisible(),
            expect(this.detailsInfo.nth(9)).toBeVisible(),
            expect(this.detailsImgHeader).toContainText("Imágenes de cheques"),
            expect(this.btnAddNote).toContainText("Agregar nota")
        ]);
    }

}