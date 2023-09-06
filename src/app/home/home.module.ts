import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MediatekModule } from '../pages/mediatek/mediatek.module';
import { ShortenPipe } from '../shared/pipe/shorten.pipe';
import { MovieCardComponent } from '../component/movielist/movie-card/movie-card.component';
import { MovielistComponent } from '../component/movielist/movielist.component';
import { MovielistModule } from '../component/movielist/movielist.module';


@NgModule({
  declarations: [


  ],
  imports: [
    CommonModule,
    MovielistModule

  ], exports: [
    HomeRoutingModule,
    MovielistModule




  ]
})
export class HomeModule { }
