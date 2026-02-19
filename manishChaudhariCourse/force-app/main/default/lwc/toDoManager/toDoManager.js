import addTodo from '@salesforce/apex/toDoController.addTodo';
import { LightningElement, track, api } from 'lwc';


export default class ToDoManager extends LightningElement {

    @track time = '8:15PM';
    @track greeting = 'Good Morning';
    @track todos = [];
    /* todoId;
    todoName;
    done=false; */
    //@track todosId = [];
    

    connectedCallback(){
        this.gettime();

        setInterval( () =>{ 
            this.gettime();
            console.log('Set inetrval');
            }, 1000 * 60);
    }

    gettime(){
        const date = new Date();
        const hour = date.getHours();
        const min = date.getMinutes();
        //console.log('OUTPUT : Checking');
        this.time = `${this.getHour(hour)}:${this.getDoubleDigit(min)} ${this.getMidDay(hour)}`;

        this.setGreeting(hour);
    }

    getHour(hour){
        return hour === 0 ? 12 : hour > 12 ? (hour-12) : hour;
    }

    getMidDay(hour){
        return hour>=12 ? 'PM' : 'AM'; /* written using original hr format ie 24 hr format*/
    }

    getDoubleDigit(digit){
        return digit<10 ? '0'+digit : digit;
    }

    setGreeting(hour){
        //console.log('OUTPUT : '+hour);
        if(hour < 12){
            this.greeting = 'Good Morning';
        }else if (hour >= 12 && hour < 17){
            this.greeting = 'Good Afternoon';
        }else if(hour >= 17){
            this.greeting= 'Good Evening';
        }
    }

    todoHandler(){
        const inputbox = this.template.querySelector('lightning-input');
        console.log('OUTPUT : Extra Name ', inputbox.value);
        
        /* todoId = this.todos.length;
        todoName = inputbox.value; */
       const todo = {
           //todoId : this.todos.length,
           todoName : inputbox.value,
           done : false,
           //todoDate : new Date()
       };

       addTodo({payload: JSON.stringify(todo)})
        .then(response =>{
            console.log('item inserted successfully');
        })
        .catch(error =>{
            console.log('Error in inserting'+ error);
        })
         
        //this.todos.push(todo);
        //console.log('OUTPUT : '+JSON.stringify(this.todos));
        inputbox.value = "";
    }

    get upcomingTasks(){
        console.log('OUTPUT : JSON '+JSON.stringify(this.todos));
        return this.todos && this.todos.length ? this.todos.filter(todo => !todo.done) : [];
        
    }

    get completedTasks(){
        console.log('OUTPUT : JSON '+JSON.stringify(this.todos));
        return this.todos && this.todos.length ? this.todos.filter(todo => todo.done) : [];
        
    }
}