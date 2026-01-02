const { browser } = require('@wdio/globals');
const viewPlans = require('../pageobjects/viewPlan.page');
const data = require('../helpers/testdata.json');

describe('View plans flow', () => {

    beforeEach(async () => {
       await browser.Login(data.validEmail1, data.password1);
    });

    it('Verify user is able to view plans', async () => {
        // Navigate to plans
        await viewPlans.openPlans();

        // Assert plans are displayed
        await viewPlans.assertPlansVisible();
    });
});