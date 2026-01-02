const { browser } = require('@wdio/globals');
const deletePlans = require('../pageobjects/deletePlan.page');
const data = require('../helpers/testdata.json');

describe('Delete plans', () => {
    beforeEach(async () => {
        // assumes custom Login command
        await browser.Login(data.validEmail1, data.password1);
        await deletePlans.openPlans();
    });

    it('Verify user is able to delete all plans successfully', async () => {
        await deletePlans.deletePlans();       // deletes all plans
        await deletePlans.assertNoPlansExist(); // verifies no plans left
    });
});