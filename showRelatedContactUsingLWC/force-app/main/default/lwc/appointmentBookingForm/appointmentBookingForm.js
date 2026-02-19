import { LightningElement, wire, track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import getdoctorname from '@salesforce/apex/appoitmentbooking.getdoctorname';
import getspeciality from '@salesforce/apex/appoitmentbooking.getspeciality';
import getContacts from '@salesforce/apex/accountController.getContacts';


const columns =[{
    label: 'Doctor Name',
    fieldname: Name

    },
    {
        label: 'Zip code',
        fieldname: MailingAddress
    },
    {
        label: 'Years of experience',
        fieldname: Years_of_exp__c
    },
    {
        label: 'Picture',
        fieldname: Doctor_pic__c
    }
];

export default class AppointmentBookingForm extends LightningElement {

 /*   @track doctorname='';
    @track speciality='';
    @track contacts;
    @track columns = columns;

    @wire(getContacts) cons;
    onValueSelection(event){
        const selectedvalue = event.target.value;
        this.doctorname = event.target.value;
        this.speciality = event.target.value;

        if(selectedvalue!=null  && this.cons.Name == selectedvalue)
        {
            getdoctorname({doctorname: selectedvalue})
            .then(result=>{
                this.contcats=result;
            })
            .catch (error=>{
                this.error=error;
            });
        }
        else if (selectedvalue!=null && this.cons.speciality == selectedvalue)
        {
            getspeciality({speciality: selectedvalue})
            .then(result=>{
                this.contacts=result;
            })
            .catch(error=>{
                this.error=error;
            })
        }
    }
*/
   onsubmitaction(){
        const Toast = new ShowToastEvent({
            title: "Submitted",
            message: "Form is submitted succefully. You will be notified once the appointment is booked.",
            variant: "success"
        });
        this.dispatchEvent(Toast);
    }
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