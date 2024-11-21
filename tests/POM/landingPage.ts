import { expect, Page, Locator } from '@playwright/test';
import { common } from './common';
import { read } from 'fs';

export class landingPage{
    readonly page: Page;
    readonly userName: string;
    readonly password: string;
    readonly userName_Pass: string;
    readonly newPassword1: string;
    readonly newPassword2: string;
    readonly newPassword3: string;
    readonly newPassword4: string;
    readonly otp: string;
    readonly txtUser: Locator;
    readonly txtPassword: Locator;
    readonly urlForgotPass: Locator;
    readonly urlCreateUser: Locator;
    readonly urlNewClient: Locator;
    readonly btnLogin: Locator;
    readonly msgFeedback: Locator;
    readonly otpSMS: Locator;
    readonly otpEmail: Locator;
    readonly btnCancelOTP: Locator;
    readonly btnContOTP: Locator;
    readonly btnCancelTerms: Locator;
    readonly btnAcceptTerms: Locator;
    readonly msgOTPSent: Locator;
    readonly txtOTP: Locator;
    readonly urlResendOtp: Locator;
    readonly otpTextResend: Locator;
    readonly otpListResend: Locator;
    readonly btnAcceptOTP: Locator;
    readonly validateLogin: Locator;
    readonly passwordReq: Locator;
    readonly txtNewPassword: Locator;
    readonly txtConfirmPass: Locator;
    readonly btnSubmitPass: Locator;
    readonly titleInvalidUser: Locator;
    readonly msgInvalidUser: Locator;
    readonly urlBackToApp: Locator;
    readonly msgForgotPass_Validation: Locator;

    constructor(page:Page){
        this.page = page;
        this.userName = process.env.USER as string;
        this.password = process.env.PASS as string;
        this.otp = process.env.OTP as string;
        this.userName_Pass = process.env.PASS_USER as string;
        this.newPassword1 = process.env.NEW_PASS1 as string;
        this.newPassword2 = process.env.NEW_PASS2 as string;
        this.newPassword3 = process.env.NEW_PASS3 as string;
        this.newPassword4 = process.env.NEW_PASS4 as string;
        this.txtUser = page.locator("#username");
        this.txtPassword = page.locator("#password");
        this.urlForgotPass = page.locator("#forgotPass");
        this.urlCreateUser = page.locator("a[href*='/auth/realms/banesco-retail/login-actions/registration?client_id=banesco-retail']")
        this.urlNewClient = page.locator("a[href*='prospect.banesco.do']");
        this.btnLogin = page.locator("#kc-login");
        this.msgFeedback = page.locator("p.kc-feedback-text");
        this.otpSMS = page.locator("#sms");
        this.otpEmail = page.locator("#email");
        this.btnCancelOTP = page.locator("#declineChoice");
        this.btnContOTP = page.locator("#acceptChoice");
        this.btnCancelTerms = page.locator("#declineTerms");
        this.btnAcceptTerms = page.locator("#acceptTerms");
        this.msgOTPSent = page.locator("p.info-message");
        this.txtOTP = page.locator("#otp");
        this.urlResendOtp = page.locator("#resendOtp");
        this.otpTextResend = page.locator("p.try-again-label");
        this.otpListResend = page.locator("ul.try-again-list");
        this.btnAcceptOTP = page.locator("#acceptOtp");
        this.validateLogin = page.locator("div.user-context-dropdown");
        this.passwordReq = page.locator("div.pw-reqs");
        this.txtNewPassword = page.locator("#password-new");
        this.txtConfirmPass = page.locator("#password-confirm");
        this.btnSubmitPass = page.locator("#submit");
        this.titleInvalidUser = page.locator("#kc-page-title");
        this.msgInvalidUser = page.locator("span.instruction");
        this.urlBackToApp = page.locator("#backToApplication");
        this.msgForgotPass_Validation = page.locator("label.kc-feedback-text");
    }

    async login(user, pass){
        await this.txtUser.fill(user);
        await this.txtPassword.pressSequentially(pass);

        await expect(this.btnLogin).toBeEnabled();
        await this.btnLogin.click();
    }

    async loginWrongUser(){
        await this.login("WrongUser", this.password);
        await expect(this.msgFeedback).toContainText("¡Ups! Revisa los datos ingresados e intenta nuevamente.");
    }

    async loginWrongPassword(){
        await this.login(this.userName, "12345678");
        await expect(this.msgFeedback).toContainText("¡Ups! Revisa los datos ingresados e intenta nuevamente.");
    }

    async loginSuccess(){
        await this.login(this.userName, this.password);
        await Promise.all([
            expect(this.otpEmail).toBeVisible(),
            expect(this.otpSMS).toBeVisible(),
            expect(this.btnContOTP).toBeVisible(),
            expect(this.btnCancelOTP).toBeVisible()
        ]);
    }

    async loginWithoutOTP(){
        await this.login(this.userName, this.password);
    }

    async loginCompleted(){
        await expect(this.validateLogin).toBeVisible();
    }

    async selectOTPSMS(){
        await this.otpSMS.click();
        await Promise.all([
            expect(this.msgOTPSent.nth(0)).toContainText("número telefónico"),
            expect(this.btnContOTP).toBeEnabled()
        ]);
        await this.btnContOTP.click();
    }

    async selectOTPEmail(){
        await this.otpEmail.click();
        await Promise.all([
            expect(this.msgOTPSent.nth(1)).toContainText("correo electrónico"),
            expect(this.btnContOTP).toBeEnabled()
        ]);
        await this.btnContOTP.click();
    }

    async resendOTP(){
        await this.page.waitForTimeout(30000);
        await this.urlResendOtp.click();
        await expect(this.msgOTPSent).toContainText("Código de verificación enviado, llegará en un instante.");
    }

    async validateOTP(flag){
        await Promise.all([
           expect(this.txtOTP).toBeVisible(),
           expect(this.urlResendOtp).toBeVisible(),
           expect(this.otpTextResend).toContainText([
                "Si no has recibido el código de verificación al método seleccionado, haz clic en",
                "Reenviar",
                "o contáctanos al:"
            ].join(" ")),
           expect(this.otpListResend).toContainText([
                "Principal 829-893-8200",
                "Desde el interior sin cargos 1-809-200-1101",
                "Whatsapp 829-647-8100"
            ].join(" ")),
            expect(this.btnCancelOTP).toBeVisible(),
            expect(this.btnAcceptOTP).toBeDisabled(),
            expect(this.btnAcceptOTP).toBeVisible(),
        ]);

        await this.txtOTP.click();

        if(flag == 1){//correct OTP
            await this.txtOTP.pressSequentially(this.otp);
            await this.btnAcceptOTP.click();
        }else{//wrong OTP
            await this.txtOTP.pressSequentially("999999");
            await this.btnAcceptOTP.click();
            await expect(this.msgFeedback).toContainText("Código incorrecto introducido. Por favor, inténtalo nuevamente.");
        }
    }

    async goToForgotPassword(){
        await this.urlForgotPass.click();
        await expect(this.txtUser).toBeVisible();
        await expect(this.btnAcceptTerms).toBeVisible();
    }

    async forgotPassword_WrongUser(){
        await this.txtUser.fill("invalid123456");
        await this.btnAcceptTerms.click();
        await Promise.all([
            expect(this.titleInvalidUser).toContainText("Algo no salió bien"),
            expect(this.msgInvalidUser).toContainText(
                "Error inesperado durante la petición de identificación al proveedor de identidad."
            ),
            expect(this.urlBackToApp).toBeVisible()
        ]);
    }

    async forgotPassword_UserOTP(){
        await this.txtUser.fill(this.userName_Pass);
        await this.btnAcceptTerms.click();
        await this.selectOTPSMS();
        await this.txtOTP.click();
        await this.txtOTP.pressSequentially(this.otp);
        await this.btnAcceptOTP.click();

        await expect(this.passwordReq).toContainText([
            "Requisitos de Contraseña:",
            "Mínimo 8 caracteres",
            "Máximo 28 caracteres",
            "Mínimo un número del 0 al 9",
            "Mínimo una letra",
            "Diferente a las últimas 2 contraseñas utilizadas"
        ].join(""));
    }

    async forgotPassword_Success(){
        await this.forgotPassword_UserOTP();
        let currentPassword;
        const passwordError = "Contraseña incorrecta: no puede ser igual a ninguna de las últimas 2 contraseñas.";

        for(let i=0; i<3; i++){
            if(i==0){
                currentPassword = this.newPassword1;
            }else if(i==1){
                currentPassword = this.newPassword2;
            }else if(i==2){
                currentPassword = this.newPassword3;
            }else if(i==3){
                currentPassword = this.newPassword4;
            }
            await this.txtNewPassword.pressSequentially(currentPassword);
            await this.txtConfirmPass.pressSequentially(currentPassword);
            await this.btnSubmitPass.click();
            
            if(!await this.page.url().includes("UPDATE_PASSWORD")){
                break;
            }
        }
        await expect(this.validateLogin).toBeVisible();
    }

    async forgotPassword_Enter(pass1, pass2){
        await this.forgotPassword_UserOTP();
        await this.txtNewPassword.pressSequentially(pass1);
        await this.txtConfirmPass.pressSequentially(pass2);
    }

    async forgotPassword_Missmatch(){
        await this.forgotPassword_Enter("Banesco01", "Banesco02");

        await Promise.all([
            expect(this.msgForgotPass_Validation.nth(1)).toBeVisible(),
            expect(this.msgForgotPass_Validation.nth(1)).toContainText(
                "Ambas contraseñas deben ser iguales. Intenta nuevamente."
            )
        ]);
    }

    async forgotPassword_28Max(){
        await this.forgotPassword_Enter("Banesco0111111111111111111111","Banesco0111111111111111111111");

        await Promise.all([
            expect(this.msgForgotPass_Validation.nth(2)).toBeVisible(),
            expect(this.msgForgotPass_Validation.nth(2)).toContainText("Máximo 28 caracteres")
        ]);
    }

    async forgotPassword_MustHaveLetter(){
        await this.forgotPassword_Enter("123456789","123456789");

        await Promise.all([
            expect(this.msgForgotPass_Validation.nth(3)).toBeVisible(),
            expect(this.msgForgotPass_Validation.nth(3)).toContainText("Mínimo una letra")
        ]);
    }

    async forgotPassword_MustHaveNumber(){
        await this.forgotPassword_Enter("BanescoAB","BanescoAB");

        await Promise.all([
            expect(this.msgForgotPass_Validation.nth(4)).toBeVisible(),
            expect(this.msgForgotPass_Validation.nth(4)).toContainText("Mínimo un número del 0 al 9")
        ]);
    }
}