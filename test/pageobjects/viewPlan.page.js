const { $, expect } = require('@wdio/globals');
const Page = require('./page');

class ViewPlansPage extends Page {
    // Locators
    get plansButton() { return $("a[href='/plans']"); }
     get plansHeader() { return $("h2=Your plans"); }
    
    // Method to navigate to the plans section
    async openPlans() {
        await this.plansButton.waitForClickable({ timeout: 5000 });
        await this.plansButton.click(); 
        // wait for the Plans container to confirm navigation
        await this.plansHeader.waitForDisplayed({ timeout: 10000 });
    }

    // Assertion to verify plans page opened
    async assertPlans() {
        await expect(browser).toHaveUrl('');
    }
    // Assertion to verify plans are visible
    async assertPlansVisible() {
        await expect(this.plansHeader).toBeDisplayed();
    }

}

module.exports = new ViewPlansPage();