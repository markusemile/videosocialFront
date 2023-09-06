import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { PaginatorModule } from 'primeng/paginator'

import { MovielistComponent } from './movielist.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SpinnerModule } from 'primeng/spinner';


@NgModule({
  declarations: [
    MovieCardComponent,
    MovielistComponent
  ],
  imports: [
    CommonModule,
    PaginatorModule,
    SharedModule,
    SpinnerModule

  ], exports: [
    MovielistComponent




  ]
})
export class MovielistModule { }
