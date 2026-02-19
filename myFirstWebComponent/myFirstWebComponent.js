import { LightningElement } from 'lwc';

const Columns = 
[
    {
        label: 'Id',
        fieldName: 'Id',
        type: 'number'
    },
    {
        label: 'First Name',
        fieldName: 'FirstName',
        type: 'text'
    },
    {
        label: 'Last Name',
        fieldName: 'LastName',
        type: 'text'
    },
    {
        label: 'Title',
        fieldName: 'Title',
        type: 'text'
    }
];


export default class MyFirstWebComponent extends LightningElement {

    columns = Columns;

    Contacts = [
        {
            Id: 1,
            FirstName: 'Subhash',
            LastName: 'Gadhe',
            Title: 'VP of Sales'
        },
        {
            Id: 2,
            FirstName: 'Raj',
            LastName: 'Gadhe',
            Title: 'VP of Marketing'
        },
        {
            Id: 3,
            FirstName: 'Suresh',
            LastName: 'Gadhe',
            Title: 'VP of Engineering'
        },
        {
            Id: 4,
            FirstName: 'Virat',
            LastName: 'Kohli',
            Title: 'Manager'
        }
        
        
    ];
    
}