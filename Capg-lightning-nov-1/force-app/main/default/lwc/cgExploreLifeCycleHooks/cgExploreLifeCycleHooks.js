
import { LightningElement } from 'lwc';

export default class CgExploreLifeCycleHooks extends LightningElement {

    //initialising
    constructor(){
        super();
        console.log("This is in constructor");
    }

    //connecting - connecting multiple lwc comps in the same page

    connectedCallback(){
        console.log("This is in connected callback");
    }

    //connected web component
    renderedCallback(){
        console.log("This is in rendered callback");
    }

    //destroying a comp(something like cancelling the pop up)
    disconnectedCallback(){
        console.log("This is in cdisonnected callback");
    }
    
    errorCallback(){
        console.log("This is in error callback");
    }

}