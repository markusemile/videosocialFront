import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter.component';

import { CheckboxModule } from 'primeng/checkbox';
import { TreeSelectModule } from 'primeng/treeselect';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FilterComponent
  ],
  imports: [
    CommonModule,
    CheckboxModule,
    TreeSelectModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    SelectButtonModule
  ], exports: [
    FilterComponent
  ]
})
export class FilterModule { }
