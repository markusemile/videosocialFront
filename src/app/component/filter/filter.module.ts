import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter.component';
import { TreeSelectModule } from 'primeng/treeselect';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FilterComponent
  ],
  imports: [
    CommonModule,
    TreeSelectModule,
    InputTextModule,
    SelectButtonModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule
  ], exports: [
    FilterComponent
  ]
})
export class FilterModule { }
