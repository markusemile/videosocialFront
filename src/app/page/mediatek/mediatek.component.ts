import { Component, OnChanges } from '@angular/core';
import { LocaldbService } from '../../service/localdb/localdb.service';
import { ApiResponse } from '../../service/auth/auth.service';
import { SearchLocalMovieResponse, SearchMovieResponse } from '../search/models/SearchMovieResponse.model';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, ParamMap, Router} from '@angular/router';
import { MediatekService } from '../../service/mediatek/mediatek.service';
import { AppDataService } from 'src/app/service/appdata/app-data.service';
import { Observable, Subject } from 'rxjs';
import { Location } from '@angular/common';




@Component({
  selector: 'app-mediatek',
  templateUrl: './mediatek.component.html',
  styleUrls: ['./mediatek.component.scss']
})
export class MediatekComponent {

  pager: SearchMovieResponse={page:0,results:[],total_pages:0,total_results:0};
  private requestedPage: number=0;
  private movieList: string[] = [];
  private lastUrl: string="";
  urlChanged:Subject<Object> = new Subject();
  private sub:any;
  row:number=20;


  constructor(
     private route: ActivatedRoute,
    private router: Router,
    private localdbService: LocaldbService,
    private toaster: MessageService,
    private mediatekService: MediatekService,
    private appData: AppDataService,


  ) {




  }


  ngOnInit() {
    this.route.queryParamMap.subscribe((params)=>{

      const currentPage = this.route.snapshot.queryParamMap.get('page');
      this.requestedPage = (currentPage!==null) ? parseInt(currentPage) : 0;

      const lastPage = this.mediatekService.getCurrentPager().page;

      console.log("currentpage--> "+currentPage);
      console.log("requiredPage--> "+this.requestedPage);
      console.log("lastPage--> "+lastPage);

      if(this.requestedPage!==lastPage){
        this.getMovieTek();
      }else{
        this.refreshData();
      }



    })
  }

  refreshData(){
    console.log("REFRESH");
    const l:SearchMovieResponse = this.mediatekService.getCurrentPager();
    this.pager={...l};
    console.log(this.pager);

    console.log("UPDATED");


  }

  getMovieTek() {

    this.localdbService.getVideotek(this.requestedPage).subscribe((res: ApiResponse) => {
      if (res.data) {
        const d:SearchLocalMovieResponse = res.data;
        this.pager=d.pager;
        console.log(d.pager);
        this.mediatekService.updateService(d);
        this.movieList=d.movie_list;
      } else {
        // log to toaster message
        this.toaster.add({ severity: 'warn', summary: 'warn', detail: res.message })
      }
    });

    this.mediatekService.setPage(this.requestedPage);


}

  callPage(e: number) {
      console.log("CALLLLPAGE");

     this.router.navigate(['/videotek'], { queryParams: { page: e } })
     this.router.navigate(['/videotek'],{relativeTo:this.route,queryParams:{page:e}})
  }

  deleteMovie(e: number) {
    // 1. remove from local
    const pos = this.pager.results.findIndex(el => el.id===e);
    this.pager.results.splice(pos,1);
    this.movieList.splice(pos,1);
    // 2. get the next movie in the list if is not the last page
      if(this.pager.page<this.pager.total_pages){
      const nextMovie:number=parseInt(this.movieList[this.row-1]);

      if(nextMovie){
        // 3. load the movie with id
        this.localdbService.getMovie(nextMovie).subscribe((res:ApiResponse)=>{
          if(res !== null){
            let newMoviesArray = this.pager.results;
            newMoviesArray.push(res.data);
            this.pager.results=newMoviesArray;
          }
        })
      }
    }
    // 4 . remove from mediatek
    this.localdbService.removeMovieFromMediatek(e).subscribe((res:ApiResponse)=>{
      if(res && res.stats==="SUCCESS"){
        this.toaster.add({ severity: 'success', summary: 'success', detail: res.message })
        //
      }else if(res && res.stats==="ERROR"){
        this.toaster.add({ severity: 'error', summary: 'error', detail: res.message })
      }else{
        this.toaster.add({summary:"error",severity:"error", detail:'Cannot remove the move id:'+e+".\n Contact the Administrator of the website."});
      }
    })
    // 5. update mediatek service
    this.mediatekService.setCurrentList(this.movieList);
    this.mediatekService.setModified(this.pager.page);
  }
}

export interface PaginationResponse {
  page: number;
  results: [];
  totalPages: number;
  totalRecords: number;
}


