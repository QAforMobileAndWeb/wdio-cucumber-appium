const { config, dataProperties } = require('./wdio.shared.conf'); // ============
// Specs
// ============
config.specs = ['./src/features/**/*.feature'];

// ============
// Capabilities
// ============
config.capabilities = [
    {
        automationName: 'XCUITest',
        platformName: dataProperties.platform,
        deviceName: dataProperties.device,
        platformVersion: dataProperties.version,
        orientation: 'PORTRAIT',
        bundleId: dataProperties.appName,
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

exports.config = config;
