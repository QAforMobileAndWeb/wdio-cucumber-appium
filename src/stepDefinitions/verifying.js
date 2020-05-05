/**
 * This file contains functions to verify if an element exists
 */
import { Then } from 'cucumber';
import { assert } from 'chai';
import getSelector from '../helpers/get-selector';

/**
 * Checking if an element exists within 5 seconds
 * @param element
 */
Then('User should see( the) {string}', (element) => {
    assert.isTrue(
        $(getSelector(element)).isDisplayed(),
        `${element} is not displaying`,
    );
});
