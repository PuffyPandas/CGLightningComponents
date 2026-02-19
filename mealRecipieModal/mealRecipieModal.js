import { api, LightningElement } from 'lwc';

export default class MealRecipieModal extends LightningElement {

    @api selectedMeal;

    handleClick(){
        let myCustomEvent = new CustomEvent('closemodal');
        this.dispatchEvent(myCustomEvent);
    }
}