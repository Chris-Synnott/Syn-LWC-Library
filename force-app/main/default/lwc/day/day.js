import { LightningElement,api } from 'lwc';

export default class Day extends LightningElement {
    @api dayNumber;
    @api today;
    @api dayOfWeek;
    @api disabled;

    get dayClasses() { 
        return this.disabled ? 'dayContent disabled' : 'dayContent';
      }
    get isToday(){
        return this.today ? 'highlightDate' : '';
    }
}