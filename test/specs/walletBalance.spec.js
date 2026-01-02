const { browser } = require('@wdio/globals');
const walletBalance = require('../pageobjects/walletBalance.page');
const data = require('../helpers/testdata.json'); 

describe('Show/Hide Wallet Balance flow', () => {

    beforeEach(async () => {
        // Login first
        await browser.Login(data.validEmail1, data.password1);

        // Navigate to wallet
        await walletBalance.openWallet();

        // Confirm wallet page loaded
        await walletBalance.assertBalance();
    });

    it('Verify user is able to hide wallet balance', async () => {
        await walletBalance.clickEyeIcon(); 
        await walletBalance.assertHideBalance(); 
    });

    it('Verify user is able to show wallet balance', async () => {
        await walletBalance.clickEyeIcon(); // Hide first
        await walletBalance.clickEyeIcon(); // Then show again
        await walletBalance.assertShowBalance(); 
    });
});