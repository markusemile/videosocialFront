import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScrollPanelModule } from 'primeng/scrollpanel'; import 'primeng/scrollpanel'

import { FilterModule } from '../filter/filter.module';
import { MovielistModule } from '../movielist/movielist.module';

import { SearchEngineComponent } from './search-engine.component';

@NgModule({
  declarations: [
    SearchEngineComponent
  ],
  imports: [
    CommonModule,
    FilterModule,
    MovielistModule,
    ScrollPanelModule
  ], exports: [

    SearchEngineComponent,
    ScrollPanelModule
  ]
})
export class SearchEngineModule { }
