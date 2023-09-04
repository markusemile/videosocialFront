import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ComponentModule } from '../component/component.module';
import { MediatekModule } from '../pages/mediatek/mediatek.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,

  ], exports: [
    HomeRoutingModule,
    ComponentModule,
    MediatekModule


  ]
})
export class HomeModule { }
