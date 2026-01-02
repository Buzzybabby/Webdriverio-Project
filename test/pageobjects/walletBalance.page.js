const { $, expect } = require('@wdio/globals');
const Page = require('./page');

class WalletBalancePage extends Page {
      // Locators
    get walletButton() { return $("//span[normalize-space()='Wallet']"); }
    get passwordField() { return $('#password'); }
    get signinBtn() { return $("button[type='submit']"); }
    get balanceText() { return $('h3.text-2xl.font-semibold.h-8'); }
    get eyeIcon() { return $('[data-testid="VisibilityOffIcon"]'); }
    get hiddenBalance() { return $('span.block.text-[2rem].mt-[0.35rem]'); }
    get walletBalance() { return $('//p[normalize-space()="Wallet Balance"]'); }


    
    // Method to navigate to the wallet section
    async openWallet() {
        await this.walletButton.click();
    }
    async assertBalance() {
        await expect(browser).toHaveUrl('');
        await this.balanceText.waitForDisplayed({ timeout: 10000 });
        await expect(this.balanceText).toBeDisplayed();

        const text = await this.balanceText.getText();
        console.log('Wallet Balance:', text);

        await expect(text).not.toEqual('');
    }

      // Assertion to verify that the balance is displayed
    async assertShowBalance() {
        await this.balanceText.waitForDisplayed({ timeout: 10000 });
        const text = await this.balanceText.getText();
        console.log('Wallet Balance:', text);
        await expect(this.balanceText).toBeDisplayed();
        await expect(text).not.toEqual('');
    }

    // Method to click the eye icon to toggle balance visibility
    async clickEyeIcon() {
        await this.eyeIcon.waitForClickable({ timeout: 5000 });
        await this.eyeIcon.click();
    }

    // Assertion to verify that the balance is hidden
    async assertHideBalance() {
    const hiddenBalance = await $('//span[contains(text(),"******")]');
        await hiddenBalance.waitForDisplayed({ timeout: 5000 });
        await expect(hiddenBalance).toBeDisplayed();
    }

}

module.exports = new WalletBalancePage();