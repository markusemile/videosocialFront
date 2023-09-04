import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovielistModule } from './movielist/movielist.module';
import { SearchEngineComponent } from './search-engine/search-engine.component';
import { FilterComponent } from './filter/filter.component';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    MovielistModule,
  ],
  exports: [
    MovielistModule,


  ]
})
export class ComponentModule { }
