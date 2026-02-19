import { LightningElement, wire } from 'lwc';

import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext,
} from 'lightning/messageService';
import movieselected from '@salesforce/messageChannel/movieChannel__c';

export default class MovieDetail extends LightningElement {

    subscription=null;
    movieId;
    movieDetails={};
    loadcomponent =false;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

    
    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                movieselected,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }
    handleMessage(message) {
        this.movieId = message.movieId;
        console.log('Movie ID', this.movieId);
        this.fetchMovieDetail();
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    async fetchMovieDetail(){
        const url = `https://www.omdbapi.com/?i=${this.movieId}&plot=full&apikey=5e692ce0`;
        const res = await fetch(url);
        const data = await res.json();
        console.log('Movie Detail', data);
        this.movieDetails = data;
        this.loadcomponent = true;
    }
}