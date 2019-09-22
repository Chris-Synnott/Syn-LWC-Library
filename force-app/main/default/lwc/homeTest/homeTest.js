import { LightningElement, track } from 'lwc';
const options =[
    {
        label: 'label-1',
        value: 'value-1'
    },
    {
        label: 'label-2',
        value: 'value-2'
    },
    {
        label: 'label-3',
        value: 'value-3'
    }
];


const columns = [
    {label: 'label1', fieldName: 'f1', type: 'email'},
    {label: 'label2', fieldName: 'f2', type: 'phone'},
    {label: 'label3', fieldName: 'f3', type: 'picklist'}
];

const data = [
    {
        Id: '1',
        f1: 'test@email.com',
        f2: '18189420978',
        f3: options
    },
    {
        Id: '2',
        f1: 'b1',
        f2: '8189420978',
        f3: options
    },
    {
        Id: '3',
        f1: 'test2.com',
        f2: '1-310-344-5940',
        f3: options
    },
    {
        Id: '4',
        f1: 'd1',
        f2: '16611231234',
        f3: options 
    }
    ];


export default class HomeTest extends LightningElement {

    @track inputData = data;
    @track inputColumns = columns;

}