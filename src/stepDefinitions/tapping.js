/**
 * This file contains function to tap on an element
 */
import { When } from 'cucumber';
import getSelector from '../helpers/get-selector';

/**
 * Taps on an element based on the given element alias
 * @param element
 */
When(
    'User taps on {string} button/section/link/tab/input/option',
    (element) => {
        $(getSelector(element)).waitForExist(5000);
        $(getSelector(element)).click();
    },
);
