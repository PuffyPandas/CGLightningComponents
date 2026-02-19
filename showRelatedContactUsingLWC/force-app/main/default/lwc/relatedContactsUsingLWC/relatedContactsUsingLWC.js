import { LightningElement,wire,track } from 'lwc';
import getAccountList from '@salesforce/apex/accountController.getAccountList';
import getContacts from '@salesforce/apex/accountController.getContacts';
 
const columns = [{
        label: 'First Name',
        fieldName: 'FirstName', editable: true
    },
    {
        label: 'Last Name',
        fieldName: 'LastName', editable: true
    },
    {
        label: 'Email',
        fieldName: 'Email',
        type: 'email', editable: true
    },
    {
        label: 'Phone',
        fieldName: 'phone',
        type: 'phone', editable: true
    }
 
];


export default class RelatedContactsUsingLWC extends LightningElement {
    @track accountId = '';
    @track contacts;
    @track columns = columns;
    //  invoke apex method with wire property and fetch picklist options.
    // pass 'object information' and 'picklist field API name' method params which we need to fetch from apex
    
    @wire(getAccountList) accounts;
    onValueSelection(event) {
        // eslint-disable-next-line no-alert
        const selectedAccount = event.target.value;
        this.accountId = event.target.value;
        if (selectedAccount != null) {
            getContacts({
                    accountId: selectedAccount
                })
                .then(result => {
                    this.contacts = result;
                    // eslint-disable-next-line no-console
                    console.log('result' + JSON.stringify(result) + selectedAccount);
                })
                .catch(error => {
                    this.error = error;
                });
        }
    }
}



