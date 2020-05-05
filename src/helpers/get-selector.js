import {
    iOSLocators,
    AndroidLocators,
    CommonLocators,
} from '../elementLocators/locators';

/**
 * Returns the selector for a given component
 * @param {string} key The key of the element to select.
 *  This comes from the feature file.
 * @returns {string} The selector for the element
 */
// eslint-disable-next-line consistent-return
export default function getSelector(key) {
    if (driver.isIOS && !driver.isAndroid) {
        return CommonLocators[key] || iOSLocators[key];
    }
    if (driver.isAndroid && !driver.isIOS) {
        return CommonLocators[key] || AndroidLocators[key];
    }
}
