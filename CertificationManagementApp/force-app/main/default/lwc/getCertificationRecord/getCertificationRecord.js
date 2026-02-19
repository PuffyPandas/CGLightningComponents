import { LightningElement, wire,api } from 'lwc';
import records from '@salesforce/apex/certificationController.getCertification';
import { refreshApex } from '@salesforce/apex';
import { deleteRecord } from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';


export default class GetCertificationRecord extends LightningElement {

    recordid;
    @wire(records)
    certification;

   certificationColumns = [

        { label: 'Cert Id', fieldName: 'Name' },
        { label: 'Certification Name', fieldName: 'Cert_Name__c' },
        { label: 'Cost', fieldName: 'Cost__c' }

    ];

    @api
    handleRefresh(){
        refreshApex(this.certification);
    }

    //selectedRows=[];
    getSelectedName(event) {
        
        const sr = event.detail.selectedRows;
        this.recordid = sr[0].Id;
        console.log(this.recordid);
        }

    handleDelete(){
        deleteRecord(this.recordid)
        .then((data) => {
            
            const sToast = new ShowToastEvent({
                title: "Success",
                message: "Record successfully deleted",
                variant: "success"
            });
            
            this.dispatchEvent(sToast);
            refreshApex(this.certification);
        })
        .catch((error) => {
            console.log(error);
        })

    }
}