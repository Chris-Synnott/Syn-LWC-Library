import { LightningElement,track } from 'lwc';

//var data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32];

//['day':'5','isToday':false,'dayOfWeek':'Monday','disabled':false];


var daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];  
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

export default class Calendar extends LightningElement {
    @track data = [];
    currentDate;

    @track currYear;
    @track currMonth;
    @track currDay;

    @track month;

    todayDate;

    constructor(){
        var today;
        super();
        today = new Date();
        this.currYear = today.getFullYear();
        this.currMonth = today.getMonth();
        this.currDay = today.getDate();
        this.todayDate = new Date();
        this.todayDate.setHours(0,0,0,0);
        this.buildDays(this.currMonth,this.currYear);
    }

    buildDays(m,y){
        //var data;
        var day;
        var date;
        var key = 0;
        var firstDay;
        this.data = [];
        //set month text string
        this.month = months[this.currMonth];

        firstDay = new Date(y,m,1);
        //first we need to check if any prev month overflows start of calendar
        date = new Date(y,m,1);
        //if not a sunday, go prev day
        if(firstDay.getDay() > 0){
            date.setDate(date.getDate() - 1);
        }

        //----------this is broken-----cant push in reverse order
        //add prev months days
        while(date.getDay() > 0){
            //push to data
            day = {'key': key,'day':date.getDate(),'isToday':this.isToday(date),'dayOfWeek':daysOfWeek[date.getDay()],'disabled':true};
            this.data.push(day);
            key++;
            //go to previous date
            date.setDate(date.getDate() - 1);
        }

        //add current day
        date = firstDay;
        day = {'key': key,'day':date.getDate(),'isToday':this.isToday(date),'dayOfWeek':daysOfWeek[date.getDay()],'disabled':false};
        this.data.push(day);
        key++;
        date.setDate(date.getDate() + 1);

        //add rest of current month days
        while(date.getMonth() === m){
            day = {'key': key,'day':date.getDate(),'isToday':this.isToday(date),'dayOfWeek':daysOfWeek[date.getDay()],'disabled':false};
            this.data.push(day);
            key++;
            date.setDate(date.getDate() + 1);
        }

        //add next months days fitting into calendar
        while(key <=34){
            day = {'key': key,'day':date.getDate(),'isToday':this.isToday(date),'dayOfWeek':daysOfWeek[date.getDay()],'disabled':true};
            this.data.push(day);
            key++;
            date.setDate(date.getDate() + 1);
        }
    }

    //check if date is today
    isToday(d){
        //zero out time
        d.setHours(0,0,0,0);
        return (d.valueOf() === this.todayDate.valueOf()) ? true : false;
    }

    prevMonth(){
        if (this.currMonth === 0) {
            this.currMonth = 11;
            this.currYear = this.currYear - 1;
        }
        else {
            this.currMonth = this.currMonth - 1;
        }
        this.buildDays(this.currMonth,this.currYear);
    }


    nextMonth(){
        if (this.currMonth === 11) {
            this.currMonth = 0;
            this.currYear = this.currYear + 1;
        }
        else {
            this.currMonth = this.currMonth + 1;
        }
        this.buildDays(this.currMonth,this.currYear);
    }


}