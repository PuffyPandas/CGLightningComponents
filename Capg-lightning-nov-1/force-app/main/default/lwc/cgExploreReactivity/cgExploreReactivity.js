import { LightningElement, track } from 'lwc';

export default class CgExploreReactivity extends LightningElement {

    message = "Salesforce Casts!!";

    //by default each and every property is reactive(no matter how many times it is defined in the file)
    // BUT for an object(eg person), only if you redeclare the complete object it will be reactive
    // and the entire object will be mutated(updated)
    // so track is used when you want to modify just keys and not entire object

    @track
    person={
        name: "Teja",
        age: 100,
        travelling: true
    };

    handleClick(){
        //this.message = "SF Casts";
        /*
        this.person={
        name: "Krishna",
        age: 100,
        travelling: true
        };*/
        this.person.name = "Krishna";
    }
}