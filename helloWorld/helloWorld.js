import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {

    greeting = "World";

    handlerchange(event){
        this.greeting = event.target.value;
    }
}