import { LightningElement } from 'lwc';
import girlProducts from '@salesforce/apex/BarbieGirls.productList';

export default class BeautyProducts extends LightningElement {

    connectedCallback() {
    this.load();  
    }

    load() {
        alert('Hey Girls, I am loaded');
        girlProducts()
        .then(data => {
        console.log('Girls are happy to see beauty products ==> '+JSON.stringify(data));
        })
        .catch(error => {
        console.error('Girls are angry..!!! => '+error);
        })        
        }
}







