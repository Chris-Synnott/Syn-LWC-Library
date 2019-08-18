/* eslint-disable no-console */
import { LightningElement, track, api} from 'lwc';


export default class tdValue extends LightningElement {
    @track indexVar;
    @track typeVal;
    @track valueTd;
    @track picklistArray = [];


    @track isPhone;
    @track isEmail;
    @track isText;
    @track isPicklist;

    //---index
    set index(value){
        this.indexVar = value;
        console.log('Set index: ' + value);
    }
    @api
    get index(){
        return this.indexVar;
    }

    //---index
    set value(value){
        this.valueTd = value;
        console.log('Set value: ' + value);
    }

    @api
    get value(){
        return this.valueTd;
    }
    
    //---picklist
    set picklist(value){
        this.picklistArray = value;
        console.log('Set picklist: ' + value);
    }
    @api
    get picklist(){
        return this.picklistArray;
    }


    @api
    get type(){
        return this.typeVal;
    }

    set type(value){
        console.log('Set Type: ' + value);
        this.typeVal = value;
        if(value === 'text'){this.isText = true;}
        else{this.isText = false;}

        if(value === 'phone'){this.isPhone = true;}
        else{this.isPhone = false;}

        if(value === 'email'){this.isEmail = true;}
        else{this.isEmail = false;}

        if(value === 'picklist'){this.isPicklist = true;}
        else{this.isPicklist = false;}

    }



    getPhoneLink(){
        //format phone first
        return 'tel:' + this.value;
    }

    getEmailLink(){
        return 'mailto:' + this.value;
    }



}