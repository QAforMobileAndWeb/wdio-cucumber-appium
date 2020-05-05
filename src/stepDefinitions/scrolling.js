/* eslint-disable no-plusplus */
/**
 * This file contains functions to scroll up/down & swipt left/right
 */
import { When } from 'cucumber';
import getSelector from '../helpers/get-selector';
import Gestures from '../helpers/Gestures';

/**
 * The function will first check if the element exists and then scroll to the position if the element exists
 * If the element is not present, the scroll will not begin.
 * @param {string} scrollDirection The direction to scroll in
 * @param {float} scrollSpeed The speed to scroll down by
 * @param {string} element The element being searched for
 */
When(
    'User scrolls {string} the page with a speed of {float} until they see {string}',
    (scrollDirection, scrollSpeed, element) => {
        const selectedElement = $(getSelector(element));
        if (scrollDirection === 'down' && selectedElement.isExisting())
            Gestures.checkIfDisplayedWithScrollDown(
                selectedElement,
                30,
                0,
                scrollSpeed,
            );
        if (scrollDirection === 'up' && selectedElement.isExisting())
            Gestures.checkIfDisplayedWithScrollUp(
                selectedElement,
                30,
                0,
                scrollSpeed,
            );
    },
);

/**
 * Swipe an element a specific number of times
 * @param element The element that the user is swiping on
 * @param number The number of times the element is swiped
 */
When('User swipes {string} {int} times', (direction, number) => {
    if (direction === 'left')
        for (let i = 0; i < number; i++) Gestures.swipeLeft(1);
    if (direction === 'right')
        for (let i = 0; i < number; i++) Gestures.swipeRight(1);
});
