import { LightningElement, wire } from 'lwc';

// named import - with {}
//default import - without {}

import anyName from "@salesforce/apex/cgExploreControllersApex.getAccounts";
import insertCont from "@salesforce/apex/cgExploreControllersApex.createContact";
export default class CgExpLightningApexControllers extends LightningElement {

    @wire(anyName)//wires o/p of apex method to property
    //wire with a property
    accounts;

    @wire(anyName)//wire with function
    accountsRecord({data,error}){
        if(data)
        {
            console.log(data);
        }
        else{
            console.log(error);
        }
    }

    handleClick(){
        insertCont()
        .then((response)=>{
            console.log(response);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
}