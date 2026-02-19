import {LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class PatientRegistrationForm extends LightningElement {

  /*  
    onsubmitaction(){
        const Toast = new ShowToastEvent({
            title: "Submitted",
            message: "Form is submitted succefully. You will be notified once the appointment is booked.",
            variant: "success"
        });
        this.dispatchEvent(Toast);
    }*/
    onsuccessaction(){
        const showToast = new ShowToastEvent({
            title: "Appoinment Confirmed",
            message : "Your appointment has been booked successfully.",
            variant : "success"
        });
        this.dispatchEvent(showToast);
    }

    onerroraction(){
        const showToast = new ShowToastEvent({
            title: "Oops!!",
            message: "looks like something went wrong, kindly try again.",
            variant:"error"
        });
        this.dispatchEvent(showToast);
    }
}