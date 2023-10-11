import { NgModule } from "@angular/core";
import { MovieDetailTemplateComponent } from "./movie-detail-template.component";

import { TabViewModule } from "primeng/tabview";
import { DatePipe } from "@angular/common";

@NgModule({
  declarations:[
  ],
  imports:[
    TabViewModule,
    DatePipe
  ],
  exports:[
    TabViewModule
  ]
})

export class MovieDetailTemplateModule {}
