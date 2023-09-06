import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieModule } from './component/movie/movie.module';
import { ShortenPipe } from './pipe/shorten.pipe';



@NgModule({
  declarations: [
    ShortenPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ShortenPipe
  ]
})
export class SharedModule { }
