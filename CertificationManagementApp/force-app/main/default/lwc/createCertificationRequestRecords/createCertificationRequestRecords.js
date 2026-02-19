import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class CreateCertificationRequestRecords extends LightningElement {
    handleSuccess(){
        const showToast = new ShowToastEvent({
            title : "Success",
            message : "Record is created successfully",
            variant : "success"
        });
        this.template.querySelector("c-get-certification-request-record").handleRefresh();
        this.dispatchEvent(showToast);
    }
    handleError(){
        const showToast = new ShowToastEvent({
            title : "Error",
            message : "Something went wrong",
            variant : "error"
        });
        this.dispatchEvent(showToast);
    }
}