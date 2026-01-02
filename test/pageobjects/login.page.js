const { $, expect, browser } = require('@wdio/globals');
const Page = require('./page');

class LoginPage extends Page {
    // Locators
    get inputEmail() { return $('input[id="email"]'); }
    get inputPassword() { return $('input[id="password"]'); }
    get btnSubmit() { return $('button[type="submit"]'); }
    get referEarnButton() { return $('span=Refer & earn!'); }
    get emailHelperText() { return $('#email-helper-text'); }
    get passwordHelperText() { return $('#password-helper-text'); }
    get errorMessage() { return $('div=Invalid email or password.'); }
    get visibility() { return $("//*[name()='path' and contains(@d,'M12 4.5C7 ')]"); }

    // Open the login page
    async open() {
        await super.open('login');
    }

    // General login action
    async login(email, password) {
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
        await browser.pause(1000);
    }

    async togglePasswordVisibility(email, password, visible = false) {
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        if (visible) {
            await this.visibility.click();
        }
    }

    // Empty password case
    async loginEmptyPassword(email, password) {
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await browser.clearFieldSmart(await this.inputPassword);
        await this.btnSubmit.click();
    }

    // Empty email case
    async loginEmptyEmail(email, password) {
        await this.inputEmail.setValue(email);
        await browser.clearFieldSmart(await this.inputEmail);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    // Empty email and password case
    async loginEmptyEmailAndPassword(email, password) {
        await this.inputEmail.setValue(email);
        await this.inputEmail.setValue(password);
        await browser.clearFieldSmart(await this.inputPassword);
        await browser.clearFieldSmart(await this.inputEmail);
        await this.btnSubmit.click();
    }

    // Assertions
    async assertLoginSuccessful() {
        await expect(this.referEarnButton).toBeDisplayed();
    }

    //  Assertion: check that password field is visible
    async assertPasswordVisible() {
        const type = await this.inputPassword.getAttribute('type');
        await expect(type).toBe('text'); // Visible password should have input type="text"
    }

    //  Assertion: check that password field is hidden
    async assertPasswordHidden() {
        const type = await this.inputPassword.getAttribute('type');
        await expect(type).toBe('password'); // Hidden password should have input type="password"
    }

    async assertLoginFailure() {
        await expect(this.errorMessage).toBeDisplayed();
    }

    async placeholders() {
        const emailLabelText = await $('#email-label').getText();
        const passwordLabelText = await $('#password-label').getText();

        await expect(emailLabelText).toContain('Email address');
        await expect(passwordLabelText).toContain('Password');
    }


    async assertInvalidEmail() {
        expect(await this.emailHelperText.getText())
            .toContain('Enter a valid email address');
        // const text = await this.emailHelperText.getText();
        // expect(text).toContain('Enter a valid email address');
    }

    async assertEmptyPassword() {
        expect(await this.passwordHelperText.getText()).toContain('Enter your password');
    }

    async assertEmptyEmail() {
        expect(await this.emailHelperText.getText()).toContain('Enter your email address');
    }
}

module.exports = new LoginPage();