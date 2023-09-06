import { Component, Input } from '@angular/core';
import { ModelSearchMovieModel } from 'src/app/model/search.movie.response.model';
import { environment } from '../../../../environments/environment.development';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {

  src!: string;
  isLoading = true;

  constructor() {

  }

  @Input() movie!: ModelSearchMovieModel;

  ngOnInit(): void {
    this.src = environment.mdbMedia.portrait220_330 + this.movie.poster_path;
    console.log(this.src);

  }



}
