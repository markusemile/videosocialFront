import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovielistComponent } from '../component/movielist/movielist.component';
import { HomeComponent } from './home.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { MediatekComponent } from '../pages/mediatek/mediatek.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "list", component: MovielistComponent },
  { path: "profile", component: ProfileComponent },
  { path: "media-tek", component: MediatekComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
