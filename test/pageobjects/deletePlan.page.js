const { $, $$, expect } = require('@wdio/globals');
const Page = require('./page');

class DeletePlansPage {
    // Locators
    get plansButton() { return $('[href="/plans"]'); }
    get seeAllPlans() { return $('//p[normalize-space()="See all plans"]'); }
    get userPlans() { return $$('a[data-test-id="user-plan"]'); }
    get addMoneyPopup() { return $('//h2[contains(text(),"Would you like to add money now?")]'); }
    get fundLaterBtn() { return $('//button[normalize-space()="No, later"]'); }
    get optionBtn() { return $("//header//button[2]"); }
    get deletePlanBtn() { return $('//button[contains(@class,"space-x-3 w-full")]'); } // more flexible
    get confirmDeleteBtn() { return $('//button[normalize-space()="Yes"]'); }

    // Open Plans Page
    async openPlans() {
        await this.plansButton.waitForClickable({ timeout: 5000 });
        await this.plansButton.click();
    }

    // Delete all plans recursively
    async deletePlans() {
        await browser.pause(5000);

        // If "See all plans" exists, click it
        if (await this.seeAllPlans.isDisplayed().catch(() => false)) {
            await this.seeAllPlans.click();
        }

        const plans = await this.userPlans;
        if (plans.length > 0) {
            const firstPlan = plans[0];
            await firstPlan.click();

            // Handle "Add money now?" popup safely
            if (await this.addMoneyPopup.isDisplayed().catch(() => false)) {
                await this.fundLaterBtn.click();

                // Wait for the entire modal overlay to vanish
                const modal = await $('[data-test-id="fund-plan-modal"]');
                await browser.waitUntil(
                    async () => !(await modal.isDisplayed().catch(() => false)),
                    {
                        timeout: 15000,
                        timeoutMsg: 'fund-plan-modal overlay did not disappear in time',
                    }
                );
            }

            // --- CLICK OPTION BUTTON WITH FALLBACK ---
            try {
                await this.optionBtn.scrollIntoView();
                await this.optionBtn.waitForClickable({ timeout: 15000 });
                await this.optionBtn.click();
            } catch (err) {
                console.warn('Regular click failed, using JS click fallback');
                const btn = await this.optionBtn;
                await browser.execute((el) => el.click(), btn);
            }
            // --- END FALLBACK ---

            // Click delete plan
            await this.deletePlanBtn.waitForClickable({ timeout: 10000 });
            await this.deletePlanBtn.click();

            // Confirm delete
            await this.confirmDeleteBtn.waitForClickable({ timeout: 10000 });
            await this.confirmDeleteBtn.click();

            // Recursively delete next plan
            await this.deletePlans();
        } else {
            console.log("No plans to delete.");
        }
    }

    // Assertion
    async assertNoPlansExist() {
        await expect(this.userPlans).not.toBeElementsArrayOfSize({ gte: 1 });
    }
}

module.exports = new DeletePlansPage();
