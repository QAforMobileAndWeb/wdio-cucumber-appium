/**
 * This file contains function related to login functionalities
 */

import { Given } from 'cucumber';
import { assert } from 'chai';
import getSelector from '../helpers/get-selector';

/**
 * Verifying the user is on the given tab or not
 */
Given('User is on the {string} page/tab', (tab) => {
    assert.isTrue($(getSelector(tab)).isEnabled());
});
