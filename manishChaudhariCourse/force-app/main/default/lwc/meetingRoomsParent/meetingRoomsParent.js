import { LightningElement, track } from 'lwc';

export default class MeetingRoomsParent extends LightningElement {

    @track selectedHandler;

    meetingRoomsInfo = [
        
        {roomName: 'A1', roomCapacity: '10'},
        {roomName: 'A2', roomCapacity: '15'},
        {roomName: 'A3', roomCapacity: '20'},
        {roomName: 'A4', roomCapacity: '30'},
        {roomName: 'B1', roomCapacity: '8'},
        {roomName: 'B2', roomCapacity: '12'},
        {roomName: 'B3', roomCapacity: '25'},
        {roomName: 'B4', roomCapacity: '16'}

    ];

    tileClickedHandler(event){
        const meetingRoomInfo = event.detail;
        this.selectedHandler = meetingRoomInfo.roomName;

    }

    constructor(){
        super();
        this.template.addEventListener('tileclick', this.tileClickedHandler.bind(this));
    }
}