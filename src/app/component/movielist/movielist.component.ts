import { Component, Input } from '@angular/core';
import { ModelSearchMovieModel } from 'src/app/model/search.movie.response.model';
import { ModelSearchResponse } from '../../model/search.model';



@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.scss']
})
export class MovielistComponent {

  movies!: ModelSearchMovieModel[];

  @Input("page") page!: ModelSearchResponse | null;

  ngOnInit() {
    if (this.page !== undefined && this.page !== null) {
      if (this.page.results !== undefined && this.page.results.length > 0) {
        this.movies = this.page.results;
      }
    }

  }


}
