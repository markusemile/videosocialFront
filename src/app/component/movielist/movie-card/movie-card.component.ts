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
    if (this.movie.poster_path !== null) {
      this.src = environment.mdbMedia.portrait220_330 + this.movie.poster_path;
    } else {
      this.src = "http://markusemile.be/app/svideo/media/movie/220_330/null.jpg";


    }

    console.log(this.src);

  }



}
