const { $, $$, expect, browser } = require('@wdio/globals');
// const { expect } = require('@wdio/globals');
const data = require('../helpers/testdata.json');

class CreatePlanPage {
    // Locators
    get homeButton() { return $('//span[normalize-space()="Home"]'); }
    get plansButton() {
    return ( $('[href="/plans"]').isExisting())
        ? $('[href="/plans"]')
        : $('//span[normalize-space()="Plans"]');
    }
    get businessPlanButton() {
         return( $('[href="/plans/goal/business"]').isExisting())
         ? $('[href="/plans/goal/business"]')
         : $('//a[@href="/plans/goal/business"]');
        }
    get schoolPlanButton() { 
        return ($('[href="/plans/goal/school"]').isExisting())
        ? $('[href="/plans/goal/school"]')
        : $('//a[@href="/plans/goal/school"]')
    }
    get realEstatePlanButton() {
         return ($('[href="/plans/new/real-estate"]')).isExisting
         ? $('[href="/plans/new/real-estate"]')
         : $('//a[@href=/plans/new/real-estate"]')
         }
    get fixedIncomePlanButton() { return $("//a[@href='/plans/new/fixed-income']"); }
    get continueButton() { return $('//button[normalize-space()="Continue"]'); }
    get planNameField() { return $('#name'); }
    get usdCurrency() { return $('li:nth-child(2)'); }
    get nairaCurrency() { return $('li:nth-child(1)'); }
    get amountField() { return $('input[inputmode="decimal"]'); }
    get startDateField() { return $('input[placeholder="DD-MM-YYYY"]'); }
    get agreeAndContinueBtn() { return $('button[type="submit"]'); }
    get getStartedButton() { return $('button=Get started'); }
    get createPlanButton() { return $('button=Create plan'); }
    get seeAllPlans() { return $('//p[normalize-space()="See all plans"]'); }
    get investmentPlanButton() { return $('//a[@href="/plans/new/build-wealth"]'); }
    get startInvestingButton() { return $('//button[normalize-space()="Start Investing"]'); }
    get percentInput() { return $('#mui-1'); }
    get retirementAgeField() { return $('#mui-2'); }
    get agreeNdContinueBtn() { return $('//button[normalize-space()="Agree & Continue"]'); }
    get createPlanBtn() { return $('//button[normalize-space()="Create Plan"]'); }
    get plansButton() { return $('[href="/plans"]'); }

    // Random generators
    generatePlanName() {
        const planNames = data.planNames;
        return planNames[Math.floor(Math.random() * planNames.length)];
    }

    async selectRandomRadioOption() {
        const radioOptions = data.investmentOptions;
        const randomIndex = Math.floor(Math.random() * radioOptions.length);
        const selectedOption = await $(radioOptions[randomIndex]);

        await selectedOption.click();
        await browser.clickContinue();
    }

    generateRandomAmount() {
        const amounts = data.amounts;
        return amounts[Math.floor(Math.random() * amounts.length)];
    }

    generateRandomFutureDate() {
        const futureDates = data.futureDates;
        return futureDates[Math.floor(Math.random() * futureDates.length)];
    }

    getRandomPercentage(min = 1, max = 100) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getRandomRetirementAge(min = 29, max = 65) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    async selectRandomCurrency() {
        await browser.pause(2000);
        const items = await $$('ul.divide-y.divide-default.mt-5 li');
        if (items.length === 0) {
            throw new Error('No currency items found!');
        }
        await items[0].waitForClickable({ timeout: 5000 });
        if (items.length === 2) {
            const randomIndex = Math.floor(Math.random() * 2);
            await items[randomIndex].click();
        } else {
            throw new Error(`Expected exactly 2 currency items, found ${items.length}`);
        }
    }



    // Flow methods
    async usdBusinessPlan(name, amount, date) {
        await this.plansButton.click();
        await this.businessPlanButton.click();
        await this.continueButton.click();
        await this.planNameField.setValue(name);
        await this.continueButton.click();
        await this.usdCurrency.click();
        await this.amountField.setValue(amount);
        await this.continueButton.click();
        await this.startDateField.setValue(date);
        await this.continueButton.click();
        await this.agreeAndContinueBtn.click();
    }

    async nairaBusinessPlan(name, amount, date, useCommandDelete = false) {
        await this.plansButton.click();
        await this.businessPlanButton.click();
        await this.continueButton.click();
        await this.planNameField.setValue(name);
        await this.continueButton.click();
        await this.nairaCurrency.click();
        await this.amountField.setValue(amount);
        await this.continueButton.click();

        if (useCommandDelete) {
            await browser.commandDelete("#mui-1");
        } else {
            await browser.clearFieldSmart("#mui-1");
        }

        await browser.forceSetValue('#mui-1', date);
        await browser.pause(5000);
        console.log(`The date entered is ${date}`);
        await this.continueButton.click();
        await this.agreeAndContinueBtn.click();
    }


    async investmentPlan(name, amount, percent, age) {
        await this.plansButton.click();
        await this.investmentPlanButton.waitForClickable({ timeout: 5000 });
        await this.investmentPlanButton.click();
        await this.startInvestingButton.waitForClickable({ timeout: 5000 })
        await this.startInvestingButton.click();
        await this.selectRandomCurrency();
        await this.planNameField.setValue(name);
        await this.continueButton.click();
        await this.amountField.setValue(amount);
        await this.continueButton.click();
        await this.percentInput.setValue(percent);
        await this.continueButton.click();
        await this.retirementAgeField.setValue(age);
        await this.continueButton.click();
        await this.selectRandomRadioOption();
        await this.continueButton.click();
        await this.agreeNdContinueBtn.click();
        await this.createPlanBtn.click();
    }

    // Method to create a USD school plan
    async usdSchoolPlan(name, amount, date) {
        await this.plansButton.click();
        await browser.pause(2000);
        await this.schoolPlanButton.click();        // Navigate to school plan
        await this.continueButton.click();          // Continue to the next step
        await this.planNameField.setValue(name);    // Enter the plan name
        await this.continueButton.click();          // Continue to the next step
        await this.usdCurrency.click();             // Select USD currency
        await this.amountField.setValue(amount);    // Enter the investment amount
        await this.continueButton.click();          // Continue to the next step
        await this.startDateField.setValue(date);   // Enter the start date
        await this.continueButton.click();          // Continue to the next step
        await this.agreeAndContinueBtn.click();     // Agree and continue to create the plan
    }

    // Method to create a Naira school plan
    async nairaSchoolPlan(name, amount, date) {
        await this.plansButton.click();
        await this.schoolPlanButton.waitForClickable({ timeout: 5000 })
        await this.schoolPlanButton.click();        // Navigate to school plan
        await this.continueButton.click();          // Continue to the next step
        await this.planNameField.setValue(name);    // Enter the plan name
        await this.continueButton.click();          // Continue to the next step
        await this.nairaCurrency.click();           // Select Naira currency
        // enter amount after selecting currency
        await this.amountField.setValue(amount);    // Enter the investment amount
        await this.continueButton.click();          // Continue to the next step
        await this.startDateField.setValue(date);   // Enter the start date
        await this.continueButton.click();          // Continue to the next step
        await this.agreeAndContinueBtn.click();     // Agree and continue to create the plan
    }


    async realEstatePlan(name) {
        await this.plansButton.click();
        await this.realEstatePlanButton.click();
        await this.getStartedButton.waitForClickable({ timeout: 5000 })
        await this.getStartedButton.click();
        await this.planNameField.setValue(name);
        await this.continueButton.click();
    }

    async selectMonth(month) {
        await $(`//p[normalize-space()='${month}']`).waitForClickable({ timeout: 5000 });
        await $(`//p[normalize-space()='${month}']`).click();
    }

    async assertPercentage(expectedPercentage) {
        const element = await $('[data-test-id="est-returns"]').getText();;
        await expect(element).toContain(`${expectedPercentage}%`);
    }

    async completeRealEstatePlan(name, month, expectedPercentage) {
        await this.realEstatePlan(name);
        await this.selectMonth(month);
        await this.assertPercentage(expectedPercentage);
        await this.createPlanButton.click();
    }

    async fixedIncomePlan(name) {
        await this.plansButton.click();
        await this.fixedIncomePlanButton.click();
        await this.getStartedButton.waitForClickable({ timeout: 5000 })
        await this.getStartedButton.click();
        await this.planNameField.setValue(name);
        await this.continueButton.click();
    }

    async completeFixedIncomePlan(name, month, expectedPercentage) {
        await this.fixedIncomePlan(name);
        await this.selectMonth(month);
        await this.assertPercentage(expectedPercentage);
        await this.createPlanButton.click();
    }

    async assertSuccess() {
        const successHeader = await $('.mt-8.text-center.text-xl');
        await expect(successHeader).toBeDisplayed({timeout:5000});
        const text = await successHeader.getText();
        await expect(text).toContain('You just created your');
    }

    // Function to assert that the most recently created plan is displayed correctly
    async assertPlanCreatedSuccessfully(planName) {
        await this.plansButton.waitForClickable({ timeout: 5000 })
        await this.plansButton.click(); // Navigate to the plans page

        // Check if 'See all plans' button exists
        await browser.pause(3000);
        const seeAllPlans = await $$("p=See all plans");
        if (seeAllPlans.length > 0) {
            console.log('More than four plans found, clicking See All Plans.');
            await seeAllPlans[0].click(); // Click 'See all plans'
        } else {
            console.log('Less than four plans found, proceeding without clicking See All Plans.');
        }

        await browser.pause(3000); // Wait for plans to load

        // Get the first plan and assert that its name matches the created plan
        const plans = await $$('a[data-test-id="user-plan"]');
        if (plans.length > 0) {
            const firstPlan = plans[0];
            const planNameText = await firstPlan.$('p').getText();

            console.log(`Expected plan name: ${planName}`);
            console.log(`Found plan name: ${planNameText}`);

            // Assert that the first plan matches the expected plan name
            await expect(planNameText.trim()).toEqual(planName);
        } else {
            throw new Error('No plans found to verify.');
        }
    }


    async assertPastDateFailure() {
        const textElement = await $$(".font-tomato");
        const text = await textElement[3].getText();
        expect(text).toContain('-');
    }

    async assertDateFailure() {
        const textElement = await $$(".font-tomato");
        const text = await textElement[3].getText();
        expect(text).toContain('$NaN');
    }

    // Method to delete created plan
    async deleteCreatedPlan() {
        await this.plansButton.waitForClickable({ timeout: 5000 });
        await this.plansButton.click(); // Navigate to the plans page

        // Check if 'See all plans' button exists
        const body = await $('body');
        const seeAllPlans = await $$("p=See all plans");

        if (seeAllPlans.length > 0) {
            console.log('More than four plans found, clicking See All Plans.');
            await seeAllPlans[0].click(); // Click to see all plans
        } else {
            console.log('Less than four plans found, proceeding without clicking See All Plans.');
        }

        await browser.pause(3000); // Wait for plans to load

        // Get the first plan and attempt to delete it
        const plans = await $$('a[data-test-id="user-plan"]');

        if (plans.length > 0) {
            const firstPlan = plans[0];

            // Get plan name
            const planName = await firstPlan.$('p').getText();
            console.log(`Deleting Plan: ${planName}`);

            // Click on the first plan
            await firstPlan.click();

            // Proceed with deletion steps
            const noLaterBtn = await $("button=No, later");
            await browser.pause(2000);
            if (await noLaterBtn.isDisplayed()) {
                await noLaterBtn.click();
            }

            // Delete plan
            await $$("//header//button")[1].click(); // Click delete icon/button in header
            await $("span=Delete Plan").click(); // Confirm delete plan
            await $("button=Yes").click(); // Final confirmation

            await browser.pause(2000); // Wait for the process to complete
        } else {
            console.log('No plans found to delete.');
        }
    }

}

module.exports = new CreatePlanPage();