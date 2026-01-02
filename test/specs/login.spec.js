const { expect } = require('@wdio/globals');
const LoginPage = require('../pageobjects/login.page');
const data = require('../helpers/testdata.json');

describe.only('User Sign In Process', () => {

    beforeEach(async () => {
        await LoginPage.open();
    });

    it('should sign in successfully with valid credentials', async () => {
        await LoginPage.login(data.validEmail, data.password);
        await LoginPage.assertLoginSuccessful();
    });

    it('should not sign in with a wrong email address', async () => {
        await LoginPage.login(data.wrongEmail, data.password);
        await LoginPage.assertLoginFailure();
    });

    it('should not sign in with an invalid email format', async () => {
        await LoginPage.login(data.invalidEmail, data.password);
        await LoginPage.assertInvalidEmail();
    });

    it('should not sign in with an invalid password', async () => {
        await LoginPage.login(data.validEmail, data.invalidPassword);
        await LoginPage.assertLoginFailure();
    });

    it('should not sign in with an empty password field', async () => {
        await LoginPage.loginEmptyPassword(data.validEmail, data.password);
        await LoginPage.assertEmptyPassword();
    });

    it('should not sign in with an empty email field', async () => {
        await LoginPage.loginEmptyEmail(data.validEmail, data.password);
        await LoginPage.assertEmptyEmail();
    });

    it('should not sign in with both email and password fields empty', async () => {
        await LoginPage.loginEmptyEmailAndPassword(data.validEmail, data.password);
        await LoginPage.assertEmptyEmail();
        await LoginPage.assertEmptyPassword();
    });

    it('should allow login with uppercase email letters', async () => {
        await LoginPage.login(data.validEmail.toUpperCase(), data.password);
        await LoginPage.assertLoginSuccessful();
    });

    it('should trim whitespace in email and password fields', async () => {
        await LoginPage.login(`  ${data.validEmail}  `, `  ${data.password}  `);
        await LoginPage.assertLoginFailure();
    });

    it('should toggle password visibility', async () => {
        await LoginPage.togglePasswordVisibility(data.validEmail, data.password, true); // Implement method to click eye icon
        await LoginPage.assertPasswordVisible();
    });

    it('should keep password hidden when visibility is not toggled', async () => {
        await LoginPage.togglePasswordVisibility(data.validEmail, data.password, false);
        await LoginPage.assertPasswordHidden();
    });

    it('should show error with both wrong email and password', async () => {
        await LoginPage.login(data.wrongEmail, data.invalidPassword);
        await LoginPage.assertLoginFailure();
    });

    it('should display properly on mobile view', async () => {
        await browser.setWindowSize(375, 812); // iPhone X dimensions
        await LoginPage.open();
        await expect(await LoginPage.inputEmail).toBeDisplayed();
    });

    it('should display correct placeholders for email and password fields', async () => {
        await LoginPage.placeholders();
    });

});