import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { FilterResponseModel } from '../filter/filter-response.models';
import { DbService } from '../../services/db/db.service';
import { ThemoviedbOrgService } from 'src/app/services/moviedb/themoviedb.org.service';
import { HttpParams } from '@angular/common/http';
import { ModelSearchResponse } from 'src/app/model/search.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.scss']
})
export class SearchEngineComponent {

  fieldsToFilter: string[] = [];
  searchPage!: ModelSearchResponse | null;
  private searchMovieSub: Subscription | undefined

  private params: HttpParams = new HttpParams();


  @Input("filterTag") filterTag: string = "movie";


  constructor(
    private dbService: DbService,
    private mdbService: ThemoviedbOrgService
  ) { }


  ngOnInit(): void {

    this.fieldsToFilter = this.getFiltersParams(this.filterTag);

  }



  /**
   * function to return the params of a path for moviedb API
   *
   * @param tag tag to find
   * @returns array with all filter params
   */
  getFiltersParams(tag: string): string[] {
    const apiPath = environment.moviedb.api;
    let movieFilter: string[] = [];
    for (const key in apiPath) {
      if (apiPath.hasOwnProperty(key) && apiPath[key].tag === tag) {
        for (let k in apiPath[key].params) {
          movieFilter.push(k);
        }
      }
    }
    return movieFilter;
  }

  search(d: FilterResponseModel) {


    this.params = this.params.append("include_adult", d.include_adult);
    this.params = this.params.append("query", d.query);
    console.log("-----------------");
    console.log(d);
    console.log("-----------------");


    this.params = (d.year !== null && d.year?.data !== null && d.year != undefined && d.year.data != '' && d.year.data != undefined) ?
      this.params = this.params.append("year", d.year.data) : this.params.delete("year");

    const source = (d.sourceLocal === "true") ? "local" : "movieDb";

    console.log(this.params);

    if (source === "local") {

    } else {

      this.searchMovieSub = this.mdbService.searchMovie(this.params).subscribe({
        next: (n: ModelSearchResponse) => {
          this.searchPage = n;
        }, error: (e: Error) => console.error(e.message)
      })
    }

  }


  callPage(page: number) {
    const p = page + 1;
    this.params = this.params.append("page", p);
    this.searchMovieSub = this.mdbService.searchMovie(this.params).subscribe({
      next: (n: ModelSearchResponse) => {
        this.searchPage = n;
      }, error: (e: Error) => console.error(e.message)
    })

  }

  ngOnDestroy() {
    if (this.searchMovieSub) {
      this.searchMovieSub.unsubscribe();
    }
  }



}
