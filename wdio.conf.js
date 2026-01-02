 (
    'This repository is for code review only. Test execution is disabled.'
  )

const { $, browser, expect } = require('@wdio/globals');

exports.config = {

    runner: 'local',
    specs: ['./test/specs/**/*.js'],
    exclude: [],

    maxInstances: 5,
    capabilities: [{
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
            args: [
                '--window-size=1920,1080',
                '--disable-notifications',
                '--disable-infobars',
                '--no-sandbox',
                '--disable-gpu',
                // '--headless=new'
            ],
        },
    }],

    logLevel: 'info',                   // "trace" | "debug" | "info" | "warn" | "error" | "silent"
    bail: 0,                            // Stops test execution after X failed tests
    waitforTimeout: 10000,              // Default timeout for `waitFor*` commands
    connectionRetryTimeout: 120000,     // Timeout for WebDriver requests
    connectionRetryCount: 3,            // Retry count for failed requests

    services: [],

    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 600000, // test timeout (ms)
    },

    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],

    before: function (capabilities, specs) {
        require('./test/helpers/commands');
    },


    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            await browser.takeScreenshot();
        }
    },
};