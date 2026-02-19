import { LightningElement, wire } from 'lwc';
import { MessageContext, subscribe, unsubscribe } from 'lightning/messageService';
import myMessageChannel from '@salesforce/messageChannel/myChannel__c';

export default class SubscriberComponent extends LightningElement {

    name='';
    subscription=null;

    @wire(MessageContext) messageContext;

    connectedCallback(){

        this.handleSubscribe();
    }

    disconnectedCallback(){

        this.handleUnsubscribe();
    }

    handleSubscribe(){

        if(!this.subscription){
            this.subcription = subscribe(this.messageContext,myMessageChannel,
                (listener)=>{
                    this.name=listener.Names;
                });
        }
    }

    handleUnsubscribe(){
        unsubscribe(this.subscription);
        this.subscription = null;
    }
}