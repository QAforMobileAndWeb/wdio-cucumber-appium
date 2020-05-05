const { removeSync } = require('fs-extra');
const { generate } = require('multiple-cucumber-html-reporter');
const { zip } = require('zip-a-folder');
const minimist = require('minimist');

const { argv } = process;

/*
 * Index 2 is used as:
 *  Index 0: program being ran (wdio); Index 1: First argument (config); Index 2 = Argument.
 */
const args = argv.slice(2);

// Pulls the value of the argument & Allows us to change the the platform, device and version dynamically from the command line using tags
const tagExpression = minimist(args).tags || '';
const { platform } = minimist(args);
const { device } = minimist(args);
const version = minimist(args).version.toString();
const language = 'English';
const appName = 'Sample wdio app';
const appVersion = minimist(args).appVersion || 'develop';

exports.dataProperties = {
    platform,
    device,
    version,
    language,
    appName,
    appVersion,
};

exports.config = {
    // ====================
    // Runner and framework
    // Configuration
    // ====================
    runner: 'local',
    framework: 'cucumber',

    // If you are using Cucumber you need to specify the location of your step definitions.
    cucumberOpts: {
        compiler: ['js:@babel/register'],
        require: ['./src/stepDefinitions/index.js'], // <string[]> (file/dir) require files before executing features
        backtrace: false, // <boolean> show full backtrace for errors
        dryRun: false, // <boolean> invoke formatters without executing steps
        failFast: false, // <boolean> abort the run on first failure
        format: ['pretty'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
        colors: true, // <boolean> disable colors in formatter output
        snippets: true, // <boolean> hide step definition snippets for pending steps
        source: true, // <boolean> hide source uris
        profile: [], // <string[]> (name) specify the profile to use
        strict: false, // <boolean> fail if there are any undefined or pending steps
        tagExpression, // <string[]> (expression) only execute the features or scenarios with tags matching the expression
        timeout: 200000, // <number> timeout for step definitions
        ignoreUndefinedDefinitions: false, // <boolean> Enable this config to treat undefined definitions as warnings.
    },

    sync: true,
    logLevel: 'info',
    deprecationWarnings: true,
    bail: 0,
    waitforTimeout: 20000,
    connectionRetryTimeout: 90000,

    // ====================
    // Appium Configuration
    // ====================
    services: ['appium'],
    appium: {
        // For options see
        // https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-appium-service
        // args: {
        //     For arguments see
        //     https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-appium-service
        // },
        command: 'appium',
    },
    baseUrl: 'https://appium.testobject.com/wd/hub',
    port: 4723,

    // To generates report after execution
    reporters: [
        'spec',
        [
            'cucumberjs-json',
            {
                jsonFolder: './test-reports/json/',
            },
        ],
    ],

    // To execute before running tests
    onPrepare: () => {
        removeSync('./test-reports/');
    },

    // To execute after running tests
    onComplete: async () => {
        // Generate the cucumber report when it all tests are done along with displaying the duration for each scenario
        generate({
            jsonDir: './test-reports/json/',
            reportPath: './test-reports/report/',
            displayDuration: true,
        });
        // generates zip file of the report folder

        await zip(
            './test-reports/report/',
            `./test-reports/Automation-Report.zip`,
        );
    },
    /**
     * Runs before a Cucumber scenario
     * @param {Object} scenario scenario details
     */
    // eslint-disable-next-line no-unused-vars
    beforeScenario(uri, feature, scenario) {
        driver.launchApp();
    },

    /**
     * Runs after a Cucumber scenario
     * @param {Object} scenario scenario details
     */
    // eslint-disable-next-line no-unused-vars
    afterScenario(uri, feature, scenario) {
        driver.closeApp();
    },

    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    // eslint-disable-next-line no-unused-vars
    beforeSession: (capabilities, specs) => {
        require('@babel/register');
    },
};
