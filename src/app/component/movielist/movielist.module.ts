import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovielistComponent } from './movielist.component';
import { MovieModule } from 'src/app/shared/component/movie/movie.module';
import { MovieCardComponent } from './movie-card/movie-card.component';


@NgModule({
  declarations: [
    MovielistComponent,
    MovieCardComponent
  ],
  imports: [
    CommonModule,
    MovieModule
  ], exports: [
    MovielistComponent,
    MovieCardComponent

  ]
})
export class MovielistModule { }
