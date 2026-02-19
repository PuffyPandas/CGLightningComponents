import { LightningElement, track } from 'lwc';

export default class SimpleCalculator extends LightningElement {
   @track currentresult;
   @track prevresuls = [];
   @track showprevresults = false;

   firstnumber;
   secondnumber;

   onchangehandler(event){
    const inputName = event.target.name;
    if (inputName === 'firstnumber')
    {
        this.firstnumber = event.target.value
    }
    else if (inputName === 'secondnumber')
    {
        this.secondnumber = event.target.value
    }
   }

   addHandler(){
    const no1 = pareseInt(this.firstnumber);
    const no2 = parseInt(this.secondnumber);
    //return this.currentresult = no1+no2;
    //return this.currentresult;
    this.currentresult = `Result of ${no1} + ${no2} is ${no1+no2}`;
    this.prevresuls.push(this.currentresult);
   }

   subHandler(){
    const no1 = parseInt(this.firstnumber);
    const no2 = parseInt(this.secondnumber);
    //return this.currentresult = no1-no2;
    this.currentresult = `Result of ${no1} - ${no2} is ${no1-no2}`;
    this.prevresuls.push(this.currentresult);
   }

   mulHandler(){
    const no1 = parseInt(this.firstnumber);
    const no2 = parseInt(this.secondnumber);
    //return this.currentresult = no1*no2;
    this.currentresult = `Result of ${no1} * ${no2} is ${no1*no2}`;
    this.prevresuls.push(this.currentresult);
   }
   
   divHandler(){
    const no1 = parseInt(this.firstnumber);
    const no2 = parseInt(this.secondnumber);
    //return this.currentresult = no1/no2;
    this.currentresult = `Result of ${no1} / ${no2} is ${no1/no2}`;
    this.prevresuls.push(this.currentresult);
   }
   

   showprevresulthandler(event){
        this.showprevresults = event.target.checked;
   }
}