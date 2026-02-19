import {api, LightningElement } from 'lwc';

export default class CgExploreChidComponent extends LightningElement {

@api //decorators | 3 | api, track, wire
message;

@api
greeting;

// make it public via api
@api
handleSum(a,b){
    let c = a+b;
    console.log(c);
}
}