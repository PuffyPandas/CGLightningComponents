import { LightningElement, api } from 'lwc';

export default class MealResultsLoad extends LightningElement {

    @api mealResult=[];
    selectedMeal;
    showModal=false;

    get checkMeals(){
        return typeof(this.mealResult) != 'undefined' && this.mealResult.length > 0;
    }

    recepieHandler(event){
        let selectedMealID = event.detail;
        console.log('selectedMealID',selectedMealID);

        //find method
        this.selectedMeal = this.mealResult.find(currmeal => currmeal.idMeal === selectedMealID);
        console.log('selectedMeal',this.selectedMeal);
        this.showModal = true;
    }

    closeHandler(){
        this.showModal = false;
    }

}