import { LightningElement,api } from 'lwc';

export default class Day extends LightningElement {
    //Props passed in Parent
    @api dayNumber;
    @api today;
    @api dayOfWeek;
    @api events;
    @api disabled;
    @api month;

    //returns css classes for square 
    get dayClasses() { 
        return this.disabled ? 'daySquare disabled' : 'daySquare';
    }
    //returns css classes for current day square
    get isToday(){
        return this.today ? 'dayWrapper highlightDate' : 'dayWrapper';
    }
}