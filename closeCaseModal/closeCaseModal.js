import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';

export default class CloseCaseModal extends LightningElement {
    @api recordId; // Case Id from record page
    @track isModalOpen = false;
    @track isClosing = false;

    // form fields
    @track rootCause = '';
    @track description = '';
    @track comments = '';
    uploadedFiles = [];

    // simple string error for UI (we also have c-error-panel structure if needed)
    errorMessage = '';

    handleOpen() {
        this.isModalOpen = true;
        this.errorMessage = '';
        console.log(this.recordId);
    }

    handleClose() {
        if (this.isClosing) return;
        this.isModalOpen = false;
        this.errorMessage = '';
    }

    
    handleInputChange(event) {
        const { name, value } = event.target;
        if (name === 'rootCause') {
            this.rootCause = value;
        } else if (name === 'description') {
            this.description = value;
        } else if (name === 'comments') {
            this.comments = value;
        }
    }

    async handleSubmit() {
        this.errorMessage = '';

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
        try {
            await updateRecord({ fields });

            this.showToast('Success', 'Case has been closed.', 'success');

            // Close modal and reset state
            this.isModalOpen = false;
            this.isClosing = false;

            // Attempt to refresh page data
            try {
                await refreshApex(); // best effort, no wired value to pass here
            } catch (e) {
                // ignore
            }

            // Ask the record page to refresh via standard event
            this.dispatchEvent(new CustomEvent('recordchange'));

        } catch (error) {
            this.isClosing = false;
            this.errorMessage = this.normalizeError(error);
            this.showToast('Error closing Case', this.errorMessage, 'error');
        }
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

    // For c-error-panel compatibility if used
    get normalizedErrors() {
        return this.errorMessage
            ? [{ message: this.errorMessage }]
            : [];
    }

    get acceptedFormats() {
        // Add more as needed; ContentVersion will enforce org/file size limits
        return ['.pdf', '.png', '.jpg', '.jpeg', '.doc', '.docx', '.xls', '.xlsx', '.txt'];
    }

    handleUploadFinished(event) {
        // event.detail.files is an array of {documentId, name}
        this.uploadedFiles = event.detail.files || [];
        // Provide immediate feedback
        this.showToast('Files Uploaded', `${this.uploadedFiles.length} file(s) uploaded.`, 'success');
    }

    
}
