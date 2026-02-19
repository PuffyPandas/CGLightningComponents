import { LightningElement, track, wire } from 'lwc';
import records from '@salesforce/apex/accountController.getAccountList';

const column = [
{label: 'Name', fieldName: 'Name'},
{label: 'Phone',fieldName: 'phone', type: 'phone'},
{label: 'Type',fieldName: 'Type'},
{label: 'Industry',fieldName: 'Industry'},
{label: 'Ticker Symbol',fieldName: 'TickerSymbol'},
{label: 'Employees',fieldName: 'NumberOfEmployees'},
{label: 'Data.com Key',fieldName: 'Jigsaw'}
];

export default class G_assign1 extends LightningElement {

    @track accountlist;

    columns=column;

    connectedCallback(){
        records()
            .then(data=>{
                this.accountlist=data;
                console.log("Data="+JSON.stringify(data));
            })
            .catch(error =>{
                console.log("error="+JSON.stringify(error));
            })
        
    }
}