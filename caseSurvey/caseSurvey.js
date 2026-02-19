import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getCaseStatus from '@salesforce/apex/CaseSurveyController.getCaseStatus';
import createSurvey from '@salesforce/apex/CaseSurveyController.createSurvey';

export default class CaseSurvey extends LightningElement {
    @api recordId; // Case Id from record page
    @track loading = true;
    @track saving = false;
    @track error;

    // form state
    @track comments = '';
    @track questions = [
        { api: 'Q1__c', label: 'Overall satisfaction', value: null },
        { api: 'Q2__c', label: 'Agent responsiveness', value: null },
        { api: 'Q3__c', label: 'Resolution quality', value: null },
        { api: 'Q4__c', label: 'Communication clarity', value: null },
        { api: 'Q5__c', label: 'Likelihood to recommend', value: null }
    ];

    // UX flags
    showForm = false;
    showNotClosed = false;
    showAlreadySubmitted = false;

    // Fetch case status via Apex
    static renderMode = 'light';
    connectedCallback() {
        this.loadCase();
    }

    async loadCase() {
        this.loading = true;
        this.error = undefined;
        try {
            const status = await getCaseStatus({ caseId: this.recordId });
            if (!status || status.toLowerCase() !== 'closed') {
                this.showNotClosed = true;
                this.showForm = false;
            } else {
                this.showForm = true;
                this.showNotClosed = false;
            }
        } catch (e) {
            this.error = [e];
        } finally {
            this.loading = false;
        }
    }

    get isSubmitDisabled() {
        if (this.saving || !this.showForm) return true;
        // require all five ratings 1-5
        return !this.questions.every(q => Number(q.value) >= 1 && Number(q.value) <= 5);
    }

    handleRatingChange(event) {
        const api = event.target.dataset.api;
        const val = event.detail.value ? Number(event.detail.value) : null;
        this.questions = this.questions.map(q => (q.api === api ? { ...q, value: val } : q));
    }

    handleCommentsChange(event) {
        this.comments = event.detail.value;
    }

    handleReset() {
        this.comments = '';
        this.questions = this.questions.map(q => ({ ...q, value: null }));
    }

    async handleSubmit() {
        this.saving = true;
        this.error = undefined;
        try {
            await createSurvey({
                caseId: this.recordId,
                q1: Number(this.getVal('Q1__c')),
                q2: Number(this.getVal('Q2__c')),
                q3: Number(this.getVal('Q3__c')),
                q4: Number(this.getVal('Q4__c')),
                q5: Number(this.getVal('Q5__c')),
                comments: this.comments || null
            });

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Thank you',
                    message: 'Your feedback has been submitted.',
                    variant: 'success'
                })
            );
            this.showForm = false;
            this.showAlreadySubmitted = true;
        } catch (e) {
            this.error = [e];
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error submitting feedback',
                    message: this.normalizeError(e),
                    variant: 'error',
                    mode: 'sticky'
                })
            );
        } finally {
            this.saving = false;
        }
    }

    getVal(api) {
        const q = this.questions.find(x => x.api === api);
        return q ? q.value : null;
    }

    normalizeError(e) {
        try {
            if (Array.isArray(e.body)) {
                return e.body.map(err => err.message).join(', ');
            } else if (e.body && e.body.message) {
                return e.body.message;
            }
        } catch {
            // ignore
        }
        return e.message || 'Unknown error';
    }
}
