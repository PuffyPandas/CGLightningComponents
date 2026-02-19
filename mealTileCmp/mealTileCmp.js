import { api, LightningElement } from 'lwc';

export default class MealTileCmp extends LightningElement {
    @api meal;

    recepiehandler(){
        let myCustomEvent = new CustomEvent('recepie',{
            detail: this.meal.idMeal})

        this.dispatchEvent(myCustomEvent);
    }
}