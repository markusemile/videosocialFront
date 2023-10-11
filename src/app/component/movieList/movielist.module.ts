import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListingComponent } from './movie-listing/movie-listing.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovielistComponent } from './movielist.component';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { MovieDetailTemplateComponent } from './movie-detail-template/movie-detail-template.component';
import { MovieDetailTemplateModule } from './movie-detail-template/movie-detail-template.module';




@NgModule({
  declarations: [
    MovieListingComponent,
    MovieCardComponent,
    MovielistComponent,
    MovieDetailTemplateComponent

  ],
  imports: [
    CommonModule,
    ButtonModule,
    PaginatorModule,
    MovieDetailTemplateModule

  ], exports: [
    MovieCardComponent,
    MovieListingComponent,
    MovielistComponent,
    MovieDetailTemplateComponent

  ]
})
export class MovielistModule { }
