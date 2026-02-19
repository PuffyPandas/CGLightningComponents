import { api, LightningElement, track } from 'lwc';

export default class CheckboxGroupBasic extends LightningElement {
    @track value = ['Red'];

    options =  [
            { label: 'Red Marker', value: 'Red' },
            { label: 'Blue Marker', value: 'Blue' },
            { label: 'Pink Marker', value: 'Pink' },
            { label: 'Violet Marker', value: 'Violet' }
        ];
    
    @api
    selectCheckbox(checkboxvalue){
        const selectedCheckBox = this.options.find(checkbox =>{
            return checkboxvalue === checkbox.value;
        })

        if (selectedCheckBox)
        {
            this.value = selectedCheckBox.value;
            return 'Successfully checked';
        }
        return "No checkbox found";
    }

    
}
