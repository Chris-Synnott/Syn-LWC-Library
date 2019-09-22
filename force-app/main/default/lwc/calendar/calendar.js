import { LightningElement,track } from 'lwc';

//var data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32];

//['day':'5','isToday':false,'dayOfWeek':'Monday','disabled':false];


var daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];  
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

export default class Calendar extends LightningElement {
    daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    @track data = [];
    currentDate;

    //int values
    @track currYear;
    @track currMonth;
    @track currDay;

    //string value
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
        var day;
        var date = new Date(y,m,1);
        //key is used for lwc iteration
        var key = 0;
        //reset data array
        this.data = [];
        //set month text string
        this.month = months[this.currMonth];
        //Fill out beginning of calendar with previous month's days
        while(date.getDay() > 0){
            date.setDate(date.getDate() - 1);
        }
        //loop through each calendar square
        while(key <=34){
            //if day is in current month
            if(date.getMonth() === m){
                day = {'key': key,'day':date.getDate(),'isToday':this.isToday(date),'dayOfWeek':daysOfWeek[date.getDay()],'disabled':false};
            }
            //else show disabled
            else{
                day = {'key': key,'day':date.getDate(),'isToday':this.isToday(date),'dayOfWeek':daysOfWeek[date.getDay()],'disabled':true};
            }
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