const { browser } = require('@wdio/globals');
const viewWallet = require('../pageobjects/viewWallet.page'); 
const data = require('../helpers/testdata.json');

describe('view wallet flow', () => {

    beforeEach(async () => {
        await browser.Login(data.validEmail1, data.password1);
    });

    it('should allow user to view wallet successfully', async () => {
       await viewWallet.openWallet();
        await viewWallet.assertBalance();
    });
});