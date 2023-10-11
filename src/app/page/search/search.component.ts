import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterElems } from 'src/app/component/filter/filter.component';
import { ThemoviedbService } from 'src/app/service/moviedb/themoviedb.service';
import { SearchMovieResponse } from './models/SearchMovieResponse.model';
import { MovieCardInfo } from './models/MovieCardInfo.model';
import { YearListElem } from 'src/app/component/filter/datas/allYear';
import { MovieModel } from './models/MovieDetail.model';
import { LocaldbService } from '../../service/localdb/localdb.service';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { ApiResponse } from '../../service/auth/auth.service';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [
    MessageService
  ]
})
export class SearchComponent {

  termToSearch: string | undefined;
  optionsFilters: FilterElems = { query: true, year: true, source: true };
  source: string = "false"; //moviedb
  page: SearchMovieResponse | undefined;


  constructor(
    private route: ActivatedRoute,
    private serviceMdb: ThemoviedbService,
    private serviceDb: LocaldbService,
    private cookieService: CookieService,
    private messageService: MessageService
  ) { }


  ngOnInit() {
    // dans le cas d'une recherche via la barre de navigation
    this.route.queryParams.subscribe((param) => {
      if (param && param['term']) {
        const t = param['term'].trim();
        if (t && t.length > 0) {
          this.termToSearch = t;
          this.search({ query: param['term'] });
        }
      }
    });
  }


  search(e?: any) {

    // on check si query
    if (e && e.hasOwnProperty('query')) {
      this.termToSearch = e.query;
    } else {
      e.query = this.termToSearch;
    }

    // on check si year
    if (e && e.hasOwnProperty('year')) {
      const y: YearListElem = e.year;
      e.year = y.data;
    }

    if (this.source === 'true') {
      // search in local api
    } else {
      //search in extern api

      this.serviceMdb.searchMovie(e).subscribe({
        next: (res: SearchMovieResponse) => {

          if (res && res.total_results > 0) {
            let newResult: MovieCardInfo[] = [];
            res.results.forEach((m: MovieCardInfo) => {
              if (m.backdrop_path != null) m.backdrop_path = "https://www.themoviedb.org/t/p/w220_and_h330_face/" + m.backdrop_path;
              if (m.poster_path != null) {
                m.poster_path = "https://www.themoviedb.org/t/p/w220_and_h330_face/" + m.poster_path;
              } else {
                m.poster_path = "./assets/media/nopicture.png";
              }
              newResult.push(m);
            });
            this.page = res;
            this.page.results = newResult;
          }
        },
        error: (err: Error) => {
          console.error("Research give no result ! : => Error:" + err); // add toaster
        }

      });

    }
  }

  callPage(e: number) {
    this.search({ page: e + 1 })
  }

  saveMovie(e: number) {
    if (this.source === 'true') {
      // si on est en local on sauve le film dans la videotek du user --> fini
    } else {
      this.serviceMdb.searchMovieDetail(e).pipe(
        map((e: MovieModel) => { // updating des image pour sauver dans le back
          if (e.backdrop_path && e.backdrop_path !== null) e.backdrop_path = environment.mediaExternalPath.w533_and_h300_bestv2 + e.backdrop_path;
          if (e.poster_path && e.poster_path !== null) e.poster_path = environment.mediaExternalPath.w220_and_h330_face + e.poster_path;
          if (e.belongs_to_collection && e.belongs_to_collection.backdrop_path !== null) e.belongs_to_collection.backdrop_path = environment.mediaExternalPath.w533_and_h300_bestv2 + e.belongs_to_collection.backdrop_path;
          if (e.belongs_to_collection && e.belongs_to_collection.poster_path != null) e.belongs_to_collection.poster_path = environment.mediaExternalPath.w220_and_h330_face + e.belongs_to_collection.poster_path;
          return e;
        })
      ).subscribe({
        next: (m: MovieModel | any) => {

          this.serviceDb.saveMovie(m).subscribe((res: ApiResponse) => {
            if (res.status === 'SUCCESS') {

              this.messageService.add({ severity: "success", summary: 'success', detail: res.message })
            } else if (res.status === "ERROR") {
              this.messageService.add({ summary: "error", severity: 'error', detail: res.message });
            }

          })
        }, error: (err: Error) => {
          this.messageService.add({ severity: "error", summary: "error", detail: "Not find detail of movie " + e + " : Error=> " + err });

        }
      })

    }

  }


}
