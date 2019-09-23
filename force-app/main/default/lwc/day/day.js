import { LightningElement,api } from 'lwc';

export default class Day extends LightningElement {
    @api dayNumber;
    @api today;
    @api dayOfWeek;
    @api disabled;

    get dayClasses() { 
        return this.disabled ? 'daySquare disabled' : 'daySquare';
      }
    get isToday(){
        return this.today ? 'dayWrapper highlightDate' : 'dayWrapper';
    }
}