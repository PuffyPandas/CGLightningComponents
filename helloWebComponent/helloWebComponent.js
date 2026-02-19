import { LightningElement, track } from 'lwc';
export default class HelloWebComponent extends LightningElement {

greeting = 'Trailblazer';
currentdate = new Date().toDateString();
handlegreetingchange(event){
    this.greeting = event.target.value;

}

get capitalizedgreeting(){
    return `Hello ${this.greeting.toUpperCase()}!`;
}

}