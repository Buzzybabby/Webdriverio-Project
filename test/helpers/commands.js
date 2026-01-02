const { browser, $ } = require('@wdio/globals');

browser.addCommand('Login', async (username, password) => {
    await browser.url("");

    const userInput = await $('#email');
    const passwordInput = await $('#password');
    const btnSubmit = $('button[type="submit"]');

    await userInput.setValue(username);
    await passwordInput.setValue(password);

    await btnSubmit.click();
    await browser.pause(4000);
});

browser.addCommand('clickContinue', async () => {
    await browser.pause(3000);
    const continueButton = await $('//button[normalize-space()="Continue"]');
    await continueButton.click();
});

browser.addCommand('highlight', async function (element) {
    await browser.execute("arguments[0].style.border='3px solid lime'; arguments[0].style.transition='all 0.3s ease';", element);
});

browser.addCommand('commandDelete', async function (selector) {
    const element = await $(selector);
    await element.click();

    const platform = await browser.capabilities.platformName || '';
    const modifier = platform.toLowerCase().includes('mac') ? 'Meta' : 'Control';

    await browser.keys([modifier]);
    await browser.keys('Delete');
    await browser.keys('NULL');
});

// test/helpers/commands.js
browser.addCommand('clearFieldSmart', async function (selector) {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout: 5000 });
    await element.click();

    const platform = (await browser.capabilities.platformName || '').toLowerCase();

    if (platform.includes('mac')) {
        await browser.keys(['Meta', 'a']); // Select all
    } else {
        await browser.keys(['Control', 'a']); // Select all
    }

    await browser.keys('Backspace'); // Delete selected text
});

browser.addCommand('forceSetValue', async function (selector, value) {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout: 5000 });
    await element.click();

    // Try standard setValue first
    await element.setValue(value);

    // Verify if the value was correctly set
    const currentValue = await element.getValue();
    if (currentValue !== value) {
        console.warn(`Field value not set correctly (got: "${currentValue}"), retrying with keyboard input...`);

        // Fallback: type manually (character by character)
        await element.click();
        await browser.keys(['Meta', 'a']); // Select all (Mac)
        await browser.keys('Backspace');
        await browser.keys(value.split('')); // Type each character manually
    }

    console.log(`Forcefully set value: ${value}`);
});
