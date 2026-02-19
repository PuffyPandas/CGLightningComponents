import { LightningElement, api } from 'lwc';
import ursusResources from '@salesforce/resourceUrl/Bear_pic1';
export default class BearTile extends LightningElement {
	@api bear;
	appResources = {
		bearSilhouette: `${ursusResources}`,
	};

    handleOpenRecordClick(){
        const selectevent = new CustomEvent('bearview',{detail:this.bear.Id});

        this.dispatchEvent(selectevent);
    }
}