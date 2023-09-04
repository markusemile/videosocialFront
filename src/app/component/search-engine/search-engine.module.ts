import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchEngineComponent } from './search-engine.component';
import { FilterComponent } from '../filter/filter.component';
import { FilterModule } from '../filter/filter.module';
import { MovielistComponent } from '../movielist/movielist.component';
import { MovielistModule } from '../movielist/movielist.module';


@NgModule({
  declarations: [
    SearchEngineComponent
  ],
  imports: [
    CommonModule,
    FilterModule,
    MovielistModule
  ], exports: [

    SearchEngineComponent
  ]
})
export class SearchEngineModule { }
