import { LightningElement,api,wire } from 'lwc';
import {getRecord, getFieldValue} from 'lightning/uiRecordApi';
import BEAR from '@salesforce/schema/Bear__c'; // giving only bear__c will work putting fields wont work

const SUPERVISOR_FIELD = BEAR.Supervisor__c;
const bearfields = [SUPERVISOR_FIELD];

export default class BearSupervisor extends LightningElement {

    @api recordId;
    @wire(getRecord, { recordid: '$recordId', fields:bearfields })
    bear;

    get supervisorid(){
        return getFieldValue(this.bear.data, SUPERVISOR_FIELD);
    }
}