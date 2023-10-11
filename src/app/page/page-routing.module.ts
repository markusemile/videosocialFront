import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { MediatekComponent } from './mediatek/mediatek.component';
import { InputTextModule } from 'primeng/inputtext';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from '../security/authGuard';
import { RegisterComponent } from './auth/register/register.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { MovieDetailTemplateComponent } from '../component/movieList/movie-detail-template/movie-detail-template.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "profile", component: ProfileComponent, canActivate: mapToCanActivate([AuthGuard]) },
  { path: "videotek", component: MediatekComponent, canActivate: mapToCanActivate([AuthGuard]) },
  { path: "videotek/movie/:id", component: MovieDetailTemplateComponent, canActivate: mapToCanActivate([AuthGuard]) },
  { path: "search", component: SearchComponent, canActivate: mapToCanActivate([AuthGuard]) },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "logout", component: LogoutComponent },
  { path: "", component: HomeComponent, pathMatch: "full" },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes), InputTextModule],
  exports: [RouterModule]
})
export class PageRoutingModule { }
