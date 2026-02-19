import { LightningElement, api, wire, track} from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import Cont_name from '@salesforce/schema/Contact.Name';
import Cont_phone from '@salesforce/schema/Contact.Phone';
import Cont_email from '@salesforce/schema/Contact.Email';

export default class TestComponent extends LightningElement {
    @api recordId;
    @track record;
    @track error;

    @wire(getRecord, { recordId: '$recordId', fields : [Cont_name, Cont_phone, Cont_email]})

    accountRecord({ error, data }) {

    if (data) {

        this.record = data;

        this.error = undefined;

    } else if (error) {

    this.error = error;

    this.record = undefined;

    }

}

    get name() {

    console.log('JSON Data ==> '+JSON.stringify(this.record));

    return this.record.fields.Name.value;

    }
    get phone(){
        //console.log('JSON Data ==> '+JSON.stringify(this.record));
        return this.record.fields.Phone.value;
    }

    get email(){
        //console.log('JSON Data ==> '+JSON.stringify(this.record));
        return this.record.fields.Email.value;
    }
    
}