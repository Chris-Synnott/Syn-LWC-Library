import { createElement } from 'lwc';
//import calendar component
import Calendar from 'c/calendar';

describe('c-calendar', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    //it == 'test'
    it('c-calendar component in DOM', () => {
        // Create element
        const element = createElement('c-calendar', {
            is: Calendar
        });
        document.body.appendChild(element);

        // Verify component exists
        const div = element.shadowRoot.querySelector('c-calendar');
        expect(div).not.toBe('');
    });
});