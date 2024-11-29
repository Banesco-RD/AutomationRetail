import { expect, Page, Locator } from '@playwright/test';
import { common } from './common';

export class productPage{
    readonly page: Page;
    readonly commonObj: common;
    readonly labelProduct: Locator;
    readonly btnSavingAcc: Locator;
    readonly btnTDC: Locator;
    readonly labelAccSaving: Locator;
    readonly labelAccSimple: Locator;
    readonly labelAccPayroll: Locator;
    readonly labelTDCMulti: Locator;
    readonly labelTDCPlatinum: Locator;
    readonly labelAccNumber: Locator; //this has the account number in position 0 and balance label in 1
    readonly labelTDCNumner: Locator;
    readonly labelTDCBalances: Locator; // postion 0 available, 1 used
    readonly headerQuickAction: Locator;
    readonly urlMultiWithdraw: Locator;
    readonly urlServicePay: Locator;
    readonly urlPayTDC: Locator;

    constructor(page:Page){
        this.page = page;
        this.commonObj = new common(this.page);
        this.labelProduct = page.locator("div.bb-heading-widget h3.bb-heading-widget__heading");
        this.btnSavingAcc = page.locator("[data-role='Savings Account']");
        this.btnTDC = page.locator("[data-role='Credit Card']");
        this.labelAccSaving = page.locator(
            "//div[contains(@class,'bb-ellipsis') and contains(string(),'Ahorro')]"
        );
        this.labelAccSimple = page.locator(
            "//div[contains(@class,'bb-ellipsis') and contains(string(),'Cuenta Simple')]"
        );
        this.labelAccPayroll = page.locator(
            "//div[contains(@class,'bb-ellipsis') and contains(string(),'Ahorro nómina')]"
        );
        this.labelTDCMulti = page.locator(
            "//div[contains(@class,'bb-ellipsis') and contains(string(),'Multicrédito')]"
        );
        this.labelTDCPlatinum = page.locator(
            "//div[contains(@class,'bb-ellipsis') and contains(string(),'Mastercard Platinum')]"
        );
        this.labelAccNumber = page.locator("[data-role='savings-accounts'] div[class*='__bottom-row'] span");
        this.labelTDCNumner = page.locator("[data-role='credit-cards'] span[data-role='product-number']");
        this.labelTDCBalances = page.locator("//div[contains(@class,'__item__row')]/span");
        this.headerQuickAction = page.locator("h3.mb-3");
        this.urlMultiWithdraw = page.locator("a[title='Multicredito withdrawal']");
        this.urlServicePay = page.locator("a[title='Servicies and taxes']");
        this.urlPayTDC = page.locator("a[title='Banesco credit cards']");
    }

    async productSummary(){
        await Promise.all([
            expect(this.labelProduct).toContainText("Mis productos"),
            expect(this.btnSavingAcc).toContainText("Cuentas de ahorros"),
            expect(this.btnTDC).toContainText("Tarjetas de crédito"),
            expect(this.labelAccSaving.nth(0)).toBeVisible(),
            expect(this.labelAccSimple.nth(0)).toBeVisible(),
            expect(this.labelAccPayroll.nth(0)).toBeVisible(),
            expect(this.labelTDCMulti.nth(0)).toBeVisible(),
            expect(this.labelTDCPlatinum.nth(0)).toBeVisible(),
            expect((await this.labelAccNumber.nth(0).innerText()).length).toBe(11),
            expect(this.labelAccNumber.nth(1)).toContainText("Balance disponible"),
            expect((await this.labelTDCNumner.nth(0).innerText()).length).toBe(19),
            expect(this.labelTDCBalances.nth(0)).toContainText("Balance Disponible"),
            expect(this.labelTDCBalances.nth(1)).toContainText("Balance Utilizado")
        ]);
    }

    async quickActions(){
        await Promise.all([
            expect(this.headerQuickAction).toContainText("Acciones rápidas"),
            expect(this.urlMultiWithdraw).toBeVisible(),
            expect(this.urlMultiWithdraw).toContainText("Desembolso multicrédito"),
            expect(this.urlServicePay).toBeVisible(),
            expect(this.urlServicePay).toContainText("Pago de servicios"),
            expect(this.urlPayTDC).toBeVisible(),
            expect(this.urlPayTDC).toContainText("Pago de tarjetas Banesco")
        ]);
    }

    async quickActions_MultiWithdraw(){
        await this.urlMultiWithdraw.click();
        await this.commonObj.pageTitle("Desembolso multicrédito");
    }

    async quickActions_PayService(){
        await this.urlServicePay.click();
        await this.commonObj.pageTitle("Servicios e impuestos");
    }

    async quickActions_PayTDC(){
        await this.urlPayTDC.click();
        await this.commonObj.pageTitle("Pago de tarjetas Banesco");
    }
}