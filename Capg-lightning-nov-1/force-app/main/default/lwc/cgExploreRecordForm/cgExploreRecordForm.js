import { api, LightningElement } from 'lwc';

import ACCOUNT_NAME_FIELD from "@salesforce/schema/Account.Name";
import ACCOUNT_Industry_FIELD from "@salesforce/schema/Account.Industry";
import ACCOUNT_Rating_FIELD from "@salesforce/schema/Account.Rating";
import ACCOUNT_Number_FIELD from "@salesforce/schema/Account.AccountNumber";

//create an array of field references
const fields = [
    ACCOUNT_NAME_FIELD,
    ACCOUNT_Industry_FIELD,
    ACCOUNT_Rating_FIELD,
    ACCOUNT_Number_FIELD
];

export default class CgExploreRecordForm extends LightningElement {

    @api
    recordId;

    fields = fields;
    handleLoad(){
        console.log("this is handle load");
    }

    handleSubmit(){
        console.log("This is handle submit");
    }

    handleSuccess(){
        console.log("This is handle success");
    }

    handleError(){
        console.log("This is handle error");
    }
}