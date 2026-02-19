import { LightningElement, wire } from 'lwc';

// Import message service features required for publishing and the message channel
import { publish, MessageContext } from 'lightning/messageService';
import movieselected from '@salesforce/messageChannel/movieChannel__c'
const DELAY = 500
export default class MovieSearch extends LightningElement {

    selesctedType = "";
    selectedSearch = "";
    selectedPage= 1;
    loading=false;
    delaytimeout;
    movieList = [];
    selectedMovie="";

     @wire(MessageContext)
    messageContext;

    get typeoptions() {
        return [
            { label: 'None', value: 'None' },
            { label: 'Movie', value: 'movie' },
            { label: 'Series', value: 'searies' },
            { label: 'Episode', value: 'episode' },
        ];
    }

    handleChange(event) {
        let {name, value} = event.target;
        this.loading = true;
        if(name === 'type') {
            this.selesctedType = value;
        } else if(name === 'search') {
            this.selectedSearch = value;
        }
        else if(name === 'page') {
            this.selectedPage = value;
        }

        //debouncing - delaying a process for particular seconds to reduce api calls
        /*setTimeout(() => {
            this.searchMovie();
        }, 500);*/

        if(this.delaytimeout) {
            clearTimeout(this.delaytimeout);
        }

        this.delaytimeout = setTimeout(() => {
            this.searchMovie();
        }, DELAY);
           
    }

    //this method will handle api call and search for entered movie
    async searchMovie()
    {
        //fetch always returns promise so to handle that we need to use async await
        const url =`https://www.omdbapi.com/?s=${this.selectedSearch}&type=${this.selesctedType}&page=${this.selectedPage}&apikey=5e692ce0`;
        const res = await fetch(url);
        //fetch returns another promise which can be accessed by res.json and to handle that promise we have to make another api call
        const data = await res.json();
        console.log("Movie search output",data);
        this.loading = false;
        if (data.Response === "True") {
            this.movieList = data.Search;
        } 
    }

    selectedMovieHandler(event){
        this.selectedMovie = event.detail;
        console.log("selectedMovieHandler",this.selectedMovie);

        const payload = { movieId: this.selectedMovie }; //movieId field defined in message channel
        publish(this.messageContext, movieselected, payload);
    }

    get displaySearchResult() {
        return this.movieList.length > 0 ? true : false
    }
        
}