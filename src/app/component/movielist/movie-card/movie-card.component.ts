import { Component, Input } from '@angular/core';
import { ModelSearchMovieModel } from 'src/app/model/search.movie.response.model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {

  @Input() movie!: ModelSearchMovieModel;

}
