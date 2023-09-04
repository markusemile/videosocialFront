import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation.component';



@NgModule({
  declarations: [
    NavigationComponent
  ],
  imports: [
    MenubarModule,
    ButtonModule,
    InputTextModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    MenubarModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    NavigationComponent



  ]
})
export class NavigationModule { }
