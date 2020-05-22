const { config, dataProperties } = require('../wdio.shared.conf');

// ============
// Specs
// ============
config.specs = ['./src/features/**/*.feature'];

// ============
// Capabilities
// ============
config.capabilities = [
    {
        // testobject_app_id: '1', // The reference id to the app out of all versions
        testobject_api_key: '29C5EB8CAEA8480AADB7FF645E54CAC7', // The api key that has a reference to the android app-project in the saucelabs cloud
        testobject_test_name: 'Android sample app test', // The name of the test for in the cloud
        phoneOnly: true,
        tabletOnly: false,
        automationName: 'UiAutomator2',
        platformName: dataProperties.platform,
        deviceName: dataProperties.device,
        platformVersion: dataProperties.version,
        orientation: 'PORTRAIT',
        maxInstances: 1,
        autoGrantPermissions: true,
        noReset: false,
        newCommandTimeout: 240,
        'cjson:metadata': {
            // custom metadata below refers to the information that is provided in the 'multiple cucumber html reporter': app name, version, platform and language
            app: {
                name: dataProperties.appName,
                version: dataProperties.appVersion,
            },
            platform: {
                version: dataProperties.version,
            },
            language: dataProperties.language,
        },
    },
];

// =========================
// Sauce RDC specific config
// =========================
config.services = ['sauce'];
// If you need to connect to the US RDC cloud comment the below line of code
config.region = 'eu';

// This port was defined in the `wdio.shared.conf.js`
delete config.port;

exports.config = config;
