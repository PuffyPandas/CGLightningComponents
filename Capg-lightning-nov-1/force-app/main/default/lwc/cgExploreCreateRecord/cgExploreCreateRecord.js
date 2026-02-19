import { LightningElement } from 'lwc';

//1. import all the dependencies
import { createRecord } from 'lightning/uiRecordApi';
import ACC_OBJ from "@salesforce/schema/Account";
import ACC_NAME_FLD from "@salesforce/schema/Account.Name";
import ACC_IND_FLD from "@salesforce/schema/Account.Industry";
import ACC_RAT_FLD from "@salesforce/schema/Account.Rating";

import {ShowToastEvent} from "lightning/platformShowToastEvent";

export default class CgExploreCreateRecord extends LightningElement {

    handleClick(){

        //4. provide field mapping
        const fields = {};

        fields[ACC_NAME_FLD.fieldApiName]= "Creating record with LDS methods";
        fields[ACC_IND_FLD.fieldApiName]= "Apparel";
        fields[ACC_RAT_FLD.fieldApiName]="Hot";

        //3. provide the config obj
        const recordInput ={
            apiName: ACC_OBJ.objectApiName,
            fields: fields
        // apiname and fields are the config objects(ie keys in key value pair). cannot mess with their names, has to be the same
        };

        //2. invoke method
        //create record returns promise so we hvae to use .then and .catch
        createRecord(recordInput)
            .then((data)=>{
                console.log(data);
                const showToast = new ShowToastEvent({
                    title: "Success",
                    message: "Record is successfully saved",
                    variant: "success" // success - green color, info - grey, warning - orange, error - red
                });
                this.dispatchEvent(showToast);
            })
            .catch((error)=>{
                console.log(error);
                const showToast = new ShowToastEvent({
                    title: "Error",
                    message: "something went wrong",
                    variant: "error" // success - green color, info - grey, warning - orange, error - red
                });
                this.dispatchEvent(showToast);
            });
    }
}