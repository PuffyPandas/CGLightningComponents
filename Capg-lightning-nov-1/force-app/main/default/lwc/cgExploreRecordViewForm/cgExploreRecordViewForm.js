import { api, LightningElement } from 'lwc';

export default class CgExploreRecordViewForm extends LightningElement {

    @api
    recordId;


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