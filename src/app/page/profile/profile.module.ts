import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { InputTextModule } from "primeng/inputtext";
import { SelectButtonModule } from "primeng/selectbutton";
import { TreeSelectModule } from 'primeng/treeselect';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TreeSelectModule,
    InputTextModule,
    SelectButtonModule,

  ],
  exports: [
    TreeSelectModule,
    InputTextModule,
    SelectButtonModule,
    FormsModule,
    ReactiveFormsModule,

  ]

})
export class ProfileModule { }
