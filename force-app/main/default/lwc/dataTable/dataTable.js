/* eslint-disable no-console */
import { LightningElement, track} from 'lwc';

const sfcolumns = [
    {label: 'Opportunity name', fieldName: 'opportunityName', type: 'text'},
    {label: 'Contact Email', fieldName: 'contact', type: 'email'},
    {label: 'Contact Phone', fieldName: 'phone', type: 'phone'},
];

const sfdata = [{
    id: 'a',
    opportunityName: 'Cloudhub',
    confidence: 0.2,
    amount: 25000,
    contact: 'jrogers@cloudhub.com',
    phone: '2352235235',
    trendIcon: 'utility:down'
},
{
    id: 'b',
    opportunityName: 'Quip',
    confidence: 0.78,
    amount: 740000,
    contact: 'quipy@quip.com',
    phone: '2352235235',
    trendIcon: 'utility:up'
}];


const columns = [
    {label: 'label1', fieldName: 'f1', type: 'text'},
    {label: 'label2', fieldName: 'f2', type: 'email'},
    {label: 'label3', fieldName: 'f3', type: 'phone'},
];

const data = [
    {
        Id: '1',
        f1: 'a1',
        f2: 'a2',
        f3: 'a3' 
    },
    {
        Id: '2',
        f1: 'b1',
        f2: 'b2',
        f3: 'b3' 
    },
    {
        Id: '3',
        f1: 'c1',
        f2: 'c2',
        f3: 'c3' 
    },
    {
        Id: '4',
        f1: 'd1',
        f2: 'd2',
        f3: 'ad3' }
    ];

    var colkeys = 2;



export default class DataTable extends LightningElement {
    @track sfdata = sfdata;
    @track sfcolumns = sfcolumns;

    @track data = data;
    @track columns = columns;
    @track colkeys = colkeys;

    @track final = [];

    //"Called when the component is created."
    constructor(){
        super()
        this.createHeaderKey(colkeys);
        this.createData(columns,data);
        console.log('AGAIN:' + this.final);
    }

    //generates unique key for iteration header items
    createHeaderKey = (num) => { 
        var test = data;
        var i;
        console.log(test);
        for(i = 0; i<this.data.length;i++){
            console.log(i + ' colKey:' + num);
            this.data[i].key = num;
            num++;
        }
    }

    //two array's - 1.) col with keys 2.) data with keys
    createData(col,d){
        var i,j = 0;
        // eslint-disable-next-line no-unused-vars
        var fieldName;
        //var final = [];
        var item;
        console.log("col array: " + JSON.stringify(col));
        console.log("data array: " + JSON.stringify(d));

        //first must check size is the same
        //col = 3 cols
        //data = 10 items
        //1 : {key: '1', 
        //        items:{
        //          {isText: true, isPicklist: false, value: 'TEXT'}
        //          {isText: false, isPicklist: true, value: 'Preselected', picklist: pickListOptions}
        //        }
        //      }
            //f1 = 1
            //f2 = 2
            //f3 = 3
        for(i=0;i<d.length;i++){   //10
            for(j=0; j <col.length;j++){  //3
                fieldName = col[j].fieldName;
                if(j === 0){
                    this.final.push({'rowKey': i, items: []});
                }

                    item = {'colKey': j, 'value': d[i][fieldName]};
                    this.final[i].items.push(item);
                
                console.log("This Final: " + JSON.stringify(this.final));
            }
        }
    }


    // @api
    // get isText(){
    //     //this.currColIndex++;
    //     if(this.columns[this.currColIndex].type === 'text'){
    //         return true;
    //     }
    //         return false;
    // }


    //Called when the element is inserted into a document.
    //connectedCallback()

    //Called when the element is removed from a document.
    //disconnectedCallback()

    //complex, custom uses only. Gets invoked after connected callback
    //render()

    //called after every render of component
    //renderedCallback()

    //errorCallback(error, stack)


}