import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchEngineModule } from 'src/app/component/search-engine/search-engine.module';
import { MediatekComponent } from './mediatek.component';

@NgModule({
  declarations: [
    MediatekComponent
  ],
  imports: [
    CommonModule,
    SearchEngineModule
  ],
  exports: [
    MediatekComponent
  ]
})
export class MediatekModule { }
