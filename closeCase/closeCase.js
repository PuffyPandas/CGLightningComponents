import { LightningElement, api} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';

export default class CloseCase extends LightningElement {

    @api recordId;
    isModal= false; 
    isClosing = false;
    uploadedFiles= [];
    

    rootCause='';
    description='';
    comments='';
    
    errorMessage = '';


    handleCloseCase(){
         this.isModal = true;
        this.errorMessage = '';
        console.log(this.recordId);
    }

    handleInputChange(event){
        const {name,value} = event.target;
        if(name === 'rootCause'){
            this.rootCause = value;
        }else if (name === 'description'){
            this.description = value;
        }else if (name === 'comments'){
            this.comments = value;
        }
    }

    handleCancel(){
         if (this.isClosing) return;
        this.isModal = false;
        this.errorMessage = '';
    }

   async handleSubmit(){

        console.log("entering submit");
        const fields = {
            //Id: this.recordId,
            Id: '500Qy00000haGqXIAU',
            Status: "Closed",
            Root_Cause__c: this.rootcause,
            Description: this.description,
            Comments: this.comments
        };
        this.isClosing = true;
        console.log("before try block");
        try{
            console.log("in try block");
            await updateRecord({ fields });
            
            this.showToast('Success', 'Case has been closed.', 'success');
            this.isModal = false;
            this.isClosing = false;
            //console.log("before 2nd try block");
            try {
                await refreshApex(); // best effort, no wired value to pass here
            } catch (e) {
                // ignore
            }
            //this.dispatchEvent(new CustomEvent('recordchange'));
            console.log("exiting try block");

        }
        catch(error){
            console.log("in catch block");
            this.isClosing = false;
            this.errorMessage = this.normalizeError(error);
            this.showToast('Error closing Case', this.errorMessage, 'error');
        }

    }

    get acceptedFormat(){
        return ['.pdf', '.jpg', '.doc', '.xlsx'];
    }

    handleFileUpload(event){
        this.uploadedFiles = event.detail.files || [];
        this.showToast('Files Uploaded', `${this.uploadedFiles.length} files uploaded`, 'success');
    }
    

     /*async handleSubmit() {
        this.errorMessage = '';
        console.log("entering submit");

        // Validate required Root Cause
        if (!this.rootCause || this.rootCause.trim().length === 0) {
            this.errorMessage = 'Root Cause is required.';
            this.showToast('Validation Error', this.errorMessage, 'error');
            return;
        }

        // Build LDS record input
        // Using the field API names provided:
        // - Root_Cause__c (Text)
        // - Description (standard)
        // - Comments (Case.Comments)
        // - Status = 'Closed'
        const fields = {
            Id: this.recordId,
            Status: 'Closed',
            Root_Cause__c: this.rootCause,
            Description: this.description,
            Comments: this.comments
        };

        this.isClosing = true;
        console.log("before try block");
        try {
            console.log("in try block");
            const result = await updateRecord({ fields });
            console.log(result);
            this.showToast('Success', 'Case has been closed.', 'success');

            // Close modal and reset state
            this.isModal = false;
            this.isClosing = false;

            // Attempt to refresh page data
            console.log("before 2nd try block");
            try {
                await refreshApex(); // best effort, no wired value to pass here
            } catch (e) {
                // ignore
            }

            // Ask the record page to refresh via standard event
            this.dispatchEvent(new CustomEvent('recordchange'));

        } catch (error) {
            console.log("in catch block");
            this.isClosing = false;
            this.errorMessage = this.normalizeError(error);
            this.showToast('Error closing Case', this.errorMessage, 'error');
        }
    }*/


    normalizeError(error) {
        // Provide user-friendly error, respecting FLS/sharing via LDS
        if (!error) return 'Unknown error';
        if (Array.isArray(error.body)) {
            return error.body.map(e => e.message).join(', ');
        } else if (error.body && typeof error.body.message === 'string') {
            return error.body.message;
        }
        return error.message || 'Unknown error';
    }

    
    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title,
                message,
                variant
            })
        );
    }
}