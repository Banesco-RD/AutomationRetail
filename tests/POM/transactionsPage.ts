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
    readonly actualLimitPayDay: Locator;
    readonly productInfo: Locator;
    readonly labelAccNumber: Locator;
    readonly labelAccName: Locator;

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
        this.actualLimitPayDay = page.locator("div[class*='__details-footer'] div div div"); //use pos 1
        this.productInfo = page.locator("div.account-detail-base__item");
        this.labelAccNumber = page.locator("[data-role='savings-accounts'] div[class*='__bottom-row'] span");
        this.labelAccName = page.locator("[data-role='savings-accounts'] div[class*='--line-clamp']");
    }

    async selectTDC(){
        await this.btnTDCSelect.nth(0).click();
        await this.commonObj.pageTitle("Detalle de Producto");
        await expect(this.selectProduct).toBeVisible();
    }

    async selectAccount(){
        await this.btnAccSelect.nth(0).click();
        await this.commonObj.pageTitle("Detalle de Producto");
        await expect(this.selectProduct).toBeVisible();
    }

    async tdcDetails(){
        const tdcNumber = await this.labelTDCNumber.nth(0).innerText();
        const tdcName = await this.labelTDCName.nth(1).innerText();
        await this.selectTDC();

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

        
    }

}