import { LightningElement } from 'lwc';

export default class CgFirstLightningComp extends LightningElement {

message = "Hello. This message is through property(in js)";

handleClick(){
    console.log('Clicked the button');
}

handleChange(event){
    console.log(event.target.value);
    console.log(event.target.name);
}
}