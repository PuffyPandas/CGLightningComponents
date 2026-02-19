import { api, LightningElement } from 'lwc';

export default class CgExploreParentComponent extends LightningElement {
    // need to find a way to invoke msg in the child
    handleClick(){
        this.template
        .querySelector('c-cg-explore-child-component')
        .handleSum(10,20);
    }
}

