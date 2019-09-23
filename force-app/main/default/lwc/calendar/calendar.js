/* eslint-disable no-console */
import { LightningElement,track } from 'lwc';

//var data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32];

//['day':'5','isToday':false,'dayOfWeek':'Monday','disabled':false];

//YYYY/MM/DD
//{'Name': 'Event 1', 'StartDate':'2019/09/25','EndDate':'2019-09-25','Description':'Description1'};
//{'Name': 'Event 2', 'StartDate':'2019/09/25','EndDate':'2019-09-25','Description':'Description2'};
const sampleEventData =[
    {
    'Name': 'Event 1', 
    'StartDate':'2019/09/01',
    'EndDate':'2019/09/01',
    'Description':'Description1'
    },
    {
        'Name': 'Event 2', 
        'StartDate':'2019/09/01',
        'EndDate':'2019/09/01',
        'Description':'Description2'
    },
    {
        'Name': 'Event 3', 
        'StartDate':'2019/09/03',
        'EndDate':'2019/09/03',
        'Description':'Description3'
    },

];

var daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];  
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

export default class Calendar extends LightningElement {
    daysOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
    @track data = [];
    @track eventData = {};
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
        this.buildEvents(sampleEventData);
        this.buildDays(this.currMonth,this.currYear);
    }

    buildEvents(e){
        //TODO: sort by start date first
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
        var formattedDate = '';
        d = d.toString();
        m = m.toString();
        y = y.toString();
        //console.log('before: ' + y + ' ' + m + ' ' + d);
        if(d.length === 1){
            d = '0' + d;
        }
        if(m.length === 1){
            m = '0' + m;
        }
        formattedDate = y + '/' + m + '/' + d;
        //console.log('after: ' + formattedDate);
        return formattedDate;
    }

    buildDays(m,y){
        var day;
        var date = new Date(y,m,1);
        var dayEvents = [];
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
            //get the current dates events
            dayEvents = this.eventData[this.formatDate(date.getDate(),date.getMonth() + 1,date.getFullYear())];
            if(dayEvents === undefined){
                dayEvents = [];
            }

            //if day is in current month
            if(date.getMonth() === m){
                day = {'key': key,'day':date.getDate(),'isToday':this.isToday(date),'dayOfWeek':daysOfWeek[date.getDay()],'disabled':false, 'events': dayEvents};
            }
            //else show disabled
            else{
                day = {'key': key,'day':date.getDate(),'isToday':this.isToday(date),'dayOfWeek':daysOfWeek[date.getDay()],'disabled':true, 'events': dayEvents};
            }
            this.data.push(day);
            dayEvents = [];
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