import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FilterElems } from 'src/app/component/filter/filter.component';
import { SearchMovieResponse } from './models/SearchMovieResponse.model';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { HttpParams } from '@angular/common/http';
import { Subject, map, pipe, takeUntil, tap } from 'rxjs';
import { ThemoviedbService } from '../../service/moviedb/themoviedb.service';
import { LocaldbService } from '../../service/localdb/localdb.service';
import { AppDataService, UserData } from 'src/app/service/appdata/app-data.service';
import { ApiResponse } from 'src/app/service/auth/auth.service';
import { MovieCardInfo } from './models/MovieCardInfo.model';
import { environment } from 'src/environments/environment.development';
import { MovieModel } from './models/MovieDetail.model';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [
    MessageService
  ]
})
export class SearchComponent {


  //initialisation
  currentTermToSearch!: string;
  optionsFilters: FilterElems | any = { query: true, year: true, source: true };
  pager: SearchMovieResponse = { page: 0, results: [], total_pages: 0, total_results: 0 };
  paramsToSend: HttpParams = new HttpParams;
  userDatas: UserData = this.appdata.getUserDatas();
  localSource: string = "true";
  currentYear: string = '';



  private unSubscribe = new Subject();


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appdata: AppDataService,
    private localService: LocaldbService,
    private mdbService: ThemoviedbService,
    private messageService: MessageService
  ) {



    this.router.events.pipe(takeUntil(this.unSubscribe)).subscribe(event => {
      if (event instanceof NavigationEnd) {
        const urlExploded = event.url.split('?');
        urlExploded.shift();
        if (this.initWithUrl(urlExploded)) {
          this.search();
        }
      }

    })

  }

  ngOnInit(): void {

  }

  getCurrentTermToSearch() {
    return this.currentTermToSearch;
  }



  ngOnDestroy() {
    this.unSubscribe.next(null);
    this.unSubscribe.complete();
  }





  // METHODS


  /**
   * initalisation of search component
   *
   * @param e  array of queryparams
   * @returns true or false
   */
  initWithUrl(e: string[]): boolean {

    try {

      const queryString = e.join('&');
      const params = new URLSearchParams(queryString);

      // get present parameters
      const query = (params.has('query') && params.get('query') !== null) ? params.get('query') : null;
      const year = (params.has('year') && params.get('year') !== null) ? params.get('year') : null;
      const page = (params.has('page') && params.get('page') !== null) ? params.get('page') : null;
      const source = (params.has('src_dta') && params.get('src_dta') !== null) ? params.get('src_dta') : null;
      const include_adult=this.userDatas.includeAdult;
      const language = this.userDatas.language;

      if(include_adult!==null) this.addParamsToSend('include_adult',include_adult+"");
      if(language!==null && language!==undefined) this.addParamsToSend('language',language)

      if (query !== null) {
        if (query !== this.currentTermToSearch || query === this.currentTermToSearch && year !== null || year !== this.currentYear) {
          this.currentTermToSearch = query;
          this.addParamsToSend('query', query);
        }
      } else {
        throw new Error('Error: missing parameters')
      }

      if (year !== null && year !== '0' && year !== this.currentYear) this.addParamsToSend('year', year);
      else this.removeParamsToSend('year');

      if (page !== null) {
        this.pager.page = parseInt(page);
        this.addParamsToSend("page", page)
      } else {
        this.removeParamsToSend('page');
      }

      if (source !== null) {
        if (source !== this.localSource) {
          this.localSource = source;
        } else {
          this.localSource = this.localSource;
        }
      } else {
        this.localSource = "true";
      }
      return true;

    } catch (error) {
      throw new Error("Error: Cant' initialize parameters of filters");
      return false;
    }
  }


  /**
   * Methode to add value into params
   *
   * @param k  string - key of value to add
   * @param v  string - value of value to add
   */

  addParamsToSend(k: string, v: string) {
    let newParams: HttpParams = new HttpParams();
    if (v !== null) { newParams = newParams.set(k, v) };
    // add keys from existing params
    this.paramsToSend.keys().forEach((key) => {
      const value = this.paramsToSend.get(key);
      if (key !== k && value !== null) {
        newParams = newParams.append(key, value);
      }
    });
    this.paramsToSend = newParams;
  }



  removeParamsToSend(key: string) {
    if (this.paramsToSend.has(key)) {
      this.paramsToSend = this.paramsToSend.delete(key);
    }
  }


  /**
   * Function to search in local or moviedb api
   *
   */
  search(): ApiResponse {

    let searchRes!: ApiResponse

    if (this.localSource === 'true') {
      let newPager: SearchMovieResponse = { page: 0, results: [], total_pages: 0, total_results: 0 };
      this.localService.searchMovie(this.paramsToSend).subscribe((res: ApiResponse) => {
          if (res.stats === "SUCCESS") {
            const datas: LocalMovieListResponse = res.data;
            newPager.page = datas.number;
            newPager.results = datas.content;
            newPager.total_pages = datas.totalPages;
            newPager.total_results = datas.totalElements;
            this.pager = newPager;
          } else {
            this.pager.results.length = 0;
            this.messageService.add({ severity: "warn", summary: "warn", detail: "No movie find with this filters" })
          }

        })
    } else {
      let newPager: SearchMovieResponse = { page: 0, results: [], total_pages: 0, total_results: 0 };

      this.mdbService.searchMovie(this.paramsToSend).pipe(
        map(results => {
          const r: MovieCardInfo[] = results.results;
          r.map(m => {
            if (m.backdrop_path !== null) m.backdrop_path = environment.mediaExternalPath.w780 + m.backdrop_path;
            m.poster_path = (m.poster_path !== null) ? environment.mediaExternalPath.w220_and_h330_face + m.poster_path : "../../../assets/media/nopicture.png";
          })
          return results;
        }),
        takeUntil(this.unSubscribe)
      ).subscribe({
        next: (res: SearchMovieResponse) => {
          newPager.page = (res.page) ? res.page : 0;
          newPager.results = (res.results.length > 0) ? res.results : [];
          newPager.total_pages = (res.total_pages) ? res.total_pages : 0;
          newPager.total_results = (res.total_results) ? res.total_results : 0;
          this.pager = newPager;
        }

      })
    }

    return searchRes;
  }

  /**
   * save a movie to mediatek if came from localdatabase or
   * to movie local database if came from moviedb
   *
   * @param e number - Movie id
   * @returns ApiResponse
   */
  saveMovie(e: number): ApiResponse {
    let saveMovieRes!: ApiResponse;

    if(this.localSource==='true'){
      //add to mediatek
      this.localService.addToMediatek(this.userDatas.id,e)
      .subscribe((res:ApiResponse)=>{
        if(res.stats==="SUCCESS"){
          this.messageService.add({severity:"success",summary:"success",detail:res.message})
        }else if(res.stats==="ERROR"){
          this.messageService.add({severity:"error",summary:"error",detail:res.message})
        }
      })
    }else{
      //save to movie
      // and add to mediatek
      this.mdbService.searchMovieDetail(e).pipe(
        map((results:MovieModel)=>{
          const r = results;
          r.backdrop_path = (r.backdrop_path!==null) ? environment.mediaExternalPath.w533_and_h300_bestv2+r.backdrop_path?.slice(1) : '';
          r.poster_path = (r.poster_path!==null) ? environment.mediaExternalPath.w220_and_h330_face+r.poster_path?.slice(1) : "../../../assets/media/nopicture.png";
          return r;
        })
      ).subscribe((res:MovieModel)=>{
        if(res && res!==null){
          try{
              this.localService.saveMovie(res).subscribe((response:ApiResponse)=>{
                if(response.stats==="SUCCESS"){
                  this.messageService.add({severity:"success",summary:"success",detail:response.message});
                }else if(response.stats==="ERROR"){
                  this.messageService.add({severity:"error",summary:"error",detail:response.message});
                }
              })
          }catch(error){
            this.messageService.add({severity:"error",summary:"error",detail:"Cannot save the movie into the local database. Please contact the administrator !"});
          }

        }else{
          this.messageService.add({severity:"error",summary:"error",detail:"Cannot find on moviedb.org the movie with "+e+" id number !"});
        }

      })

    }


    return saveMovieRes;
  }

  /**
   *
   * @param e number - number of the page to call
   * @return redirection
   */
  callPage(e: number) {
    const pams: any = [];
    if (this.paramsToSend.get('query')) pams['query'] = this.paramsToSend.get('query');
    if (this.paramsToSend.get('year') && this.paramsToSend.get('year') !== '0') pams['year'] = this.paramsToSend.get('year');
    pams['src_dta'] = this.localSource;
    pams['page'] = e;

    this.router.navigate([], { relativeTo: this.route, queryParams: pams, queryParamsHandling: "merge" })
  }

}

// INTERFACE

export interface FilterResponse {
  query: string,
  year?: YearInterface,
  source?: string
}

export interface YearInterface {
  key: string,
  label: string,
  data: string
}

export interface LocalMovieListResponse {
  content: [],
  number: number
  totalPages: number,
  totalElements: number
}
