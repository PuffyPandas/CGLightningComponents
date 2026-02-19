import { api, LightningElement } from 'lwc';

export default class MeetingRoom extends LightningElement {

    @api meetingRoomInfo;
    @api showRoomInfo = false;

    tileClickHandler(){
        const tileclicked = new CustomEvent('tileclick', {detail : this.meetingRoomInfo, bubbles:true });

        this.dispatchEvent(tileclicked);
    }
}