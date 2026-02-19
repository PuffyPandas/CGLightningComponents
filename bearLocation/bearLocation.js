import { LightningElement, api,wire } from 'lwc';
import {getRecord, getFieldValue} from 'lightning/uiRecordApi';

//set bear object fields

const NAME_FIELD = 'Bear__c.Name';
const LOCATION_LATITUDE_FIELD = 'Bear__c.Location__Latitude__s';
const LOCATION_LONGITUDE_FIELD = 'Bear__c.Location__Longitude__s';

const bearFields = [
    NAME_FIELD,
    LOCATION_LATITUDE_FIELD ,
    LOCATION_LONGITUDE_FIELD
];

export default class BearLocation extends LightningElement {

@api recordId;
name;
mapmarkers = [];

@wire(getRecord, { recordId: '$recordId', fields:bearFields })
loadbear({ error, data }) {
  if (data) {
    this.name = getFieldValue(data, NAME_FIELD);
    const Latitude = getFieldValue(data, LOCATION_LATITUDE_FIELD);
    const Longitude = getFieldValue(data, LOCATION_LONGITUDE_FIELD);

    this.mapmarkers = [{
        location: {Latitude, Longitude},
        title: this.name,
        description: `Cords: ${Latitude}, ${Longitude}`
    }];
  }  else if (error) {
     //console.error('Error:', error);
  }
}

  get cardtitle() {

    return this.name ?  `${this.name}'s location` : 'Bear Location';
  }
}