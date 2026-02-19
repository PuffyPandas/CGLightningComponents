import { LightningElement, track } from 'lwc';

export default class PublicMethogParent extends LightningElement {

    @track value;
    
    checkboxSelectHandler(){
        const childComponent = this.template.querySelector('c-public-method');
        const returnedmsg = childComponent.selectCheckbox(this.value);
        console.log('Returned Message',returnedmsg);
    }

    inputChangeHandler(event){
        this.value=event.target.value;
    }
}