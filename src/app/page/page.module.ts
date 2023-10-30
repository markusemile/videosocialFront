import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { MediatekComponent } from './mediatek/mediatek.component';
import { HomeComponent } from './home/home.component';
import { ProfileModule } from './profile/profile.module';
import { SearchComponent } from './search/search.component';
import { FilterModule } from '../component/filter/filter.module';
import { MovielistModule } from '../component/movieList/movielist.module';
import { LoginComponent } from './auth/login/login.component';
import { LoginModule } from './auth/login/login.module';
import { ToastModule } from 'primeng/toast';
import { RegisterComponent } from './auth/register/register.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { LogoutModule } from './auth/logout/logout.module';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    ProfileComponent,
    MediatekComponent,
    HomeComponent,
    SearchComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,

  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    ProfileModule,
    MovielistModule,
    FilterModule,
    LoginModule,
    ToastModule,
    LogoutModule,

  ],
  exports: [
  ],
  providers: [
    MessageService
  ]
})
export class PageModule { }
