import { LightningElement } from 'lwc';

export default class MealHunter extends LightningElement {

    searchResult;

    async mealsearchhandler(event){
        let searchMeal = event.detail;
        console.log('searchmeal', searchMeal);

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMeal}`);

        let data = await response.json();
        console.log('Meal Data', data.meals);

        this.searchResult = data.meals;
            
    }
}