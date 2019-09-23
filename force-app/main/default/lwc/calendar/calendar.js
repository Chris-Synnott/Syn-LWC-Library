/* eslint-disable no-console */
import { LightningElement,track,api } from 'lwc';

//helper arrays
var daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];  
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

export default class Calendar extends LightningElement {
    @api calendarData = {};
    @track data = [];
    @track eventData = {};
    //int values
    @track currYear;
    @track currMonth;
    @track currDay;
    //string value
    @track month;
    daysOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
    todayDate;

    //Init component
    constructor(){
        var today;
        super();
        today = new Date();
        this.currYear = today.getFullYear();
        this.currMonth = today.getMonth();
        this.currDay = today.getDate();
        this.todayDate = new Date();
        this.todayDate.setHours(0,0,0,0);
    }

    //Call init methods once data is passed into child from parent component
    connectedCallback(){
        this.buildEvents(this.calendarData);
        this.buildDays(this.currMonth,this.currYear);
    }

    buildEvents(inputEvents){
        //TODO: sort by start date first

        //Deep clones passed in READ ONLY prop. Allows to write.
        var e = JSON.parse(JSON.stringify(inputEvents));
        var i;
        var list;
        this.eventData = {};
        for(i = 0;i<e.length;i++){
            e[i].key = i;
            if(e[i].StartDate in this.eventData){
                this.eventData[e[i].StartDate].push(e[i]);
            }
            else{
                list = [];
                list.push(e[i]);
                this.eventData[e[i].StartDate] = list;
            }
        }
        console.log('Event List: ' + this.eventData);
    }

    //formats JS dates to SF Date Syntax (YYYY/MM/DD)
    formatDate(d,m,y){
        //convert to strings, add leading zero if needed for m and d
        var formattedDate = '';
        d = d.toString();
        m = m.toString();
        y = y.toString();
        if(d.length === 1){
            d = '0' + d;
        }
        if(m.length === 1){
            m = '0' + m;
        }
        formattedDate = y + '/' + m + '/' + d;
        //console.log('before: ' + y + ' ' + m + ' ' + d);
        //console.log('after: ' + formattedDate);
        return formattedDate;
    }

    /****** 
     * Desc: Builds Javascript Objects, representing each day in 32 square grid
     * Params: m = (int) current month, y = (int) current year
    *******/
    buildDays(m,y){
        var day;
        var date = new Date(y,m,1);
        var dayEvents = [];
        var monthStart = '';
        //key is used for lwc iteration (unique)
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
        while(key <= 34){
            //display first month string in first square regardless
            if(key === 0){
                monthStart = months[date.getMonth()].substring(0, 3);
            }
            //if next month exists in calendar
            else if(key > 0 && (date.getMonth() !== m) && date.getDate() === 1){
                monthStart = months[date.getMonth()].substring(0, 3);
            }
            //if curr month
            else if((date.getMonth() === m) && date.getDate() === 1){
                monthStart = months[date.getMonth()].substring(0, 3);
            }

            //get the current dates events
            dayEvents = this.eventData[this.formatDate(date.getDate(),date.getMonth() + 1,date.getFullYear())];
            if(dayEvents === undefined){
                dayEvents = [];
            }

            //if day is in current month
            if(date.getMonth() === m){
                day = {'key': key,'day':date.getDate(),'isToday':this.isToday(date),'dayOfWeek':daysOfWeek[date.getDay()],'disabled':false, 'events': dayEvents, 'month':monthStart};
            }
            //else show disabled
            else{
                day = {'key': key,'day':date.getDate(),'isToday':this.isToday(date),'dayOfWeek':daysOfWeek[date.getDay()],'disabled':true, 'events': dayEvents, 'month':monthStart};
            }
            this.data.push(day);
            dayEvents = [];
            monthStart = '';
            key++;
            date.setDate(date.getDate() + 1);
        }
    }

    //check if date is today
    isToday(d){
        //zero out time for correct comparision
        d.setHours(0,0,0,0);
        return (d.valueOf() === this.todayDate.valueOf()) ? true : false;
    }

    //Moves to previous month
    prevMonth(){
        //if curr month is Jan (0), set to Dec (11)
        if (this.currMonth === 0) {
            this.currMonth = 11;
            this.currYear = this.currYear - 1;
        }
        else {
            this.currMonth = this.currMonth - 1;
        }
        //rebuild day data
        this.buildDays(this.currMonth,this.currYear);
    }

    //Moves to next month
    nextMonth(){
        //if curr month is Dec (11), set to Jan (0)
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