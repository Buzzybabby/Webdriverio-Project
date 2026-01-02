const { browser } = require('@wdio/globals');
const createPlan = require('../pageobjects/createPlan.page');
const data = require('../helpers/testdata.json'); 

describe('Create Plan Suite', () => {

    beforeEach(async () => {
        await browser.Login(data.validEmail1, data.password1);
    });

    it('Verify user can create Business USD plan', async () => {
        const name = createPlan.generatePlanName();
        const amount = createPlan.generateRandomAmount();
        const date = createPlan.generateRandomFutureDate();

        await createPlan.usdBusinessPlan(name, amount, date);
        await createPlan.assertSuccess();
        await createPlan.assertPlanCreatedSuccessfully(name);
        await createPlan.deleteCreatedPlan();
    });

    it('Verify user can create Business Naira plan', async () => {
        const name = createPlan.generatePlanName();
        const amount = createPlan.generateRandomAmount();
        const date = createPlan.generateRandomFutureDate();

        await createPlan.nairaBusinessPlan(name, amount, date);
        await createPlan.assertSuccess();
        await createPlan.assertPlanCreatedSuccessfully(name);
        await createPlan.deleteCreatedPlan();
    });

    it('Verify user can create new Investment Plan', async () => {
        const name = createPlan.generatePlanName();
        const amount = createPlan.generateRandomAmount();
        const percent = createPlan.getRandomPercentage();
        const age = createPlan.getRandomRetirementAge();

        await createPlan.investmentPlan(name, amount, percent, age);
        await createPlan.assertSuccess();
        await createPlan.assertPlanCreatedSuccessfully(name);
        await createPlan.deleteCreatedPlan();
    });

    it('Verify user is able to create a School Naira plan successfully', async () => {
        const name = createPlan.generatePlanName();
        const amount = createPlan.generateRandomAmount();
        const date = createPlan.generateRandomFutureDate();

        await createPlan.nairaSchoolPlan(name, amount, date);
        await createPlan.assertSuccess();
        await createPlan.assertPlanCreatedSuccessfully(name);
        await createPlan.deleteCreatedPlan();
    });

    it('Verify user is able to create a School USD plan successfully', async () => {
        const name = createPlan.generatePlanName();
        const amount = createPlan.generateRandomAmount();
        const date = createPlan.generateRandomFutureDate();

        await createPlan.usdSchoolPlan(name, amount, date);
        await createPlan.assertSuccess();
        await createPlan.assertPlanCreatedSuccessfully(name);
        await createPlan.deleteCreatedPlan();
    });

    // Real Estate Plan Tests
    for (const { months, expectedPercentage } of data.realEstateTenor) {
        it(`User is able to create real estate plan and display correct percentage for ${months} months`, async () => {
            const planName = createPlan.generatePlanName();

            console.log(`Creating plan for ${months} months | Expected rate: ${expectedPercentage}%`);

            await createPlan.completeRealEstatePlan(planName, months, expectedPercentage);
            await createPlan.assertSuccess();
            await createPlan.assertPlanCreatedSuccessfully(planName);
            await createPlan.deleteCreatedPlan();
        });
    }

    // Fixed Income Plan Tests
    for (const { months, expectedPercentage } of data.fixedIncomeTenor) {
        it(`User is able to create fixed income plan and display correct percentage for ${months} months`, async () => {
            const planName = createPlan.generatePlanName();

            console.log(`Creating plan for ${months} months | Expected rate: ${expectedPercentage}%`);

            await createPlan.completeFixedIncomePlan(planName, months, expectedPercentage);
            await createPlan.assertSuccess();
            await createPlan.assertPlanCreatedSuccessfully(planName);
            await createPlan.deleteCreatedPlan();
        });
    }

    it('Verify user cannot create plan with past date', async () => {
        const name = createPlan.generatePlanName();
        const amount = createPlan.generateRandomAmount();
        const date = data.pastDate;

        await createPlan.nairaBusinessPlan(name, amount, date);
        await createPlan.assertPastDateFailure();
    });

    it('Verify user cannot create plan with invalid date', async () => {
        const name = createPlan.generatePlanName();
        const amount = createPlan.generateRandomAmount();
        const date = data.invalidDate;

        await createPlan.nairaBusinessPlan(name, amount, date, true);
        await createPlan.assertDateFailure();
    });
});