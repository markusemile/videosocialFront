import { Component, SimpleChanges } from '@angular/core';
import { LocaldbService } from '../../service/localdb/localdb.service';
import { AppDataService, UserData } from 'src/app/service/appdata/app-data.service';
import { ApiResponse } from '../../service/auth/auth.service';
import { SearchMovieResponse } from '../search/models/SearchMovieResponse.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mediatek',
  templateUrl: './mediatek.component.html',
  styleUrls: ['./mediatek.component.scss']
})
export class MediatekComponent {

  page: SearchMovieResponse | any = [];
  private userId: string | undefined;

  constructor(
    private localdbService: LocaldbService,
    private userData: AppDataService,
    private messageService: MessageService
  ) {

    const usDatas: UserData = this.userData.getUserDatas();
    const userId = usDatas?.id;
    this.userId=userId;

    this.localdbService.getVideotek(this.userId).subscribe((res: ApiResponse) => {
      if (res.data) {
        let data: SearchMovieResponse = res.data;
        data.page=0;
        console.log(data);
        this.page = data;
      } else {
        // log to toaster message
        this.messageService.add({ severity: 'warn', summary: 'warn', detail: res.message })
      }
    });
  }

  ngOnInit() {

  }


  callPage(e: number) {
    if(this.userId!==undefined)
    this.localdbService.getVideotek(this.userId,e).subscribe((res:ApiResponse)=>{
    const d:SearchMovieResponse = res.data;
    d.page++;
    console.log(d);

    this.page=d;

  })
  }

  ngOnChanges(changes:SimpleChanges){
    console.log(changes);


  }


}

export interface PaginationResponse {
  page: number;
  results: [];
  totalPages: number;
  totalRecords: number;
}


