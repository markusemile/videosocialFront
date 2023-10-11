import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { NavigationComponent } from './navigation.component';
import { InputTextModule } from 'primeng/inputtext'
import { FormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'



@NgModule({
  declarations: [
    NavigationComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
  ], exports: [
    NavigationComponent,
    MenubarModule,
  ]
})
export class NavigationModule { }
