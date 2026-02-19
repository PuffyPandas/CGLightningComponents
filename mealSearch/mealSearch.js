import { LightningElement } from 'lwc';
import MealDB from "@salesforce/resourceUrl/MealDB";

export default class MealSearch extends LightningElement {
     searchMeal;
    changehandler(event){
 
        this.searchMeal = event.target.value;
    }
 
    clickhandler(event){
        let mycustomevent = new CustomEvent('searchmeal',{
            detail: this.searchMeal
        });
        this.dispatchEvent(mycustomevent);
    }
   
}