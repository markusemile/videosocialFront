import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'

import { AppDataService } from './appdata/app-data.service';
import { LocaldbService } from './localdb/localdb.service';
import { ThemoviedbService } from './moviedb/themoviedb.service';
import { AuthService } from './auth/auth.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    HttpClientModule,
    AppDataService,
    LocaldbService,
    ThemoviedbService,
    AuthService
  ], exports: [
    HttpClientModule,
  ]
})
export class ServiceModule { }
