import { Component } from '@angular/core';
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
  private userId: number | undefined;

  constructor(
    private localdbService: LocaldbService,
    private userData: AppDataService,
    private messageService: MessageService
  ) {

    const usDatas: UserData = this.userData.getUserDatas();
    const userId = usDatas?.id;

    this.localdbService.getVideotek(userId).subscribe((res: ApiResponse) => {
      if (res.data) {
        let data: SearchMovieResponse = res.data;
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

  }
}

export interface PaginationResponse {
  page: number;
  results: [];
  totalPages: number;
  totalRecords: number;
}


