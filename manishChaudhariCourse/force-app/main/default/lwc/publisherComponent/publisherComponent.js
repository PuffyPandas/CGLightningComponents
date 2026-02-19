import { publish,MessageContext } from 'lightning/messageService';
import { LightningElement, wire } from 'lwc';
import myMessageChannel from '@salesforce/messageChannel/myChannel__c';

export default class PublisherComponent extends LightningElement {

    name='';
    @wire(MessageContext) messageContext;

    handleChange(event)
    {
        this.name=event.target.value;
    }

    handleClick(event)
    {
        let payload = {Names:this.name};
        publish(this.messageContext,myMessageChannel,payload);
    }
}