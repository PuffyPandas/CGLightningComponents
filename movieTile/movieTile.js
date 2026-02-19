import { LightningElement, api } from 'lwc';

export default class MovieTile extends LightningElement {
    @api movie;
    @api selectedMovieId;
    clickHandler(){
        console.log("clickHnadler",this.movie.imdbID)

        const evt = new CustomEvent('movieselected',{
            detail: this.movie.imdbID
        })

        this.dispatchEvent(evt);
    }
    get tileSelected(){
        return this.selectedMovieId === this.movie.imdbID ?"tile selected": "tile";
    }
}